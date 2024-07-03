import { Achievement } from "@models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { store } from "@store";
import { apiCall } from "src/utils";

const getAchievements = (): Achievement[] =>
  JSON.parse(localStorage.getItem("achievements") || "[]");

const saveAchievements = (achievements: Achievement[]) =>
  localStorage.setItem("achievements", JSON.stringify(achievements));

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatDateForApi(date: string) {
  const dateObjec = new Date(date);
  // Change to timezone of Singapore
  dateObjec.setHours(dateObjec.getHours() + 8);

  // 2022-11-22T02:02:00.000Z
  // need to remove the .000Z
  return dateObjec.toISOString().split(".")[0];
}

function fetchTemperature(date: string) {
  const url = `https://api.data.gov.sg/v1/environment/air-temperature?date_time=${formatDateForApi(date)}`;

  return apiCall<{ items: { readings: { value: string }[] }[] }>({
    url,
  });
}

function fetchHumidity(date: string) {
  const url = `https://api.data.gov.sg/v1/environment/relative-humidity?date_time=${formatDateForApi(date)}`;

  return apiCall<{ items: { readings: { value: string }[] }[] }>({
    url,
  });
}

interface AchievementState {
  search?: string;
  sortDate?: "asc" | "desc";
}

const initialState: AchievementState = {
  search: "",
};

export const achievementSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{
        search?: string;
        sortDate?: "asc" | "desc";
      }>,
    ) => {
      state.search = action.payload.search;
      state.sortDate = action.payload.sortDate;
    },
  },
});

export const { setFilter } = achievementSlice.actions;

export const achievementsApi = createApi({
  reducerPath: "achievementsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Achievement", "Detail"],
  endpoints: (builder) => ({
    getAchievements: builder.query<
      Achievement[],
      {
        search?: string;
        sortDate?: "asc" | "desc";
      }
    >({
      queryFn: async ({ search, sortDate }) => {
        let achievements = getAchievements();
        console.log("Fetching achievements");
        await sleep(3000);
        if (search) {
          achievements = achievements.filter(
            (a) =>
              a.title.toLowerCase().includes(search.toLowerCase()) ||
              a.description.toLowerCase().includes(search.toLowerCase()),
          );
        }

        if (sortDate) {
          achievements = achievements.sort((a, b) => {
            if (sortDate === "asc") {
              return (
                new Date(a.dateAchieved).getTime() -
                new Date(b.dateAchieved).getTime()
              );
            } else {
              return (
                new Date(b.dateAchieved).getTime() -
                new Date(a.dateAchieved).getTime()
              );
            }
          });
        }

        return { data: achievements };
      },
      providesTags: (_result, _error, { search, sortDate }) => [
        { type: "Achievement", search, sortDate },
      ],
      keepUnusedDataFor: 60,
    }),

    getAchievement: builder.query<Achievement | undefined, string>({
      queryFn: async (id) => {
        await sleep(2000);
        const achievements = getAchievements();
        return { data: achievements.find((ach) => ach.id === id) };
      },
      providesTags: (_result, _error, id) => [{ type: "Detail", id }],
    }),

    addAchievement: builder.mutation<Achievement, Partial<Achievement>>({
      queryFn: async (newAchievement) => {
        await sleep(2000);

        const achievements = getAchievements();
        const newId = new Date().getTime().toString();
        const fullAchievement = { ...newAchievement, id: newId } as Achievement;
        const updatedAchievements = [...achievements, fullAchievement];

        try {
          const [humidity, temperature] = await Promise.allSettled([
            fetchHumidity(fullAchievement.dateAchieved),
            fetchTemperature(fullAchievement.dateAchieved),
          ]);

          if (humidity.status === "fulfilled") {
            fullAchievement.humidity =
              humidity.value.items[0].readings[0].value;
          }

          if (temperature.status === "fulfilled") {
            fullAchievement.temperature =
              temperature.value.items[0].readings[0].value;
          }
        } catch (error) {
          // Ignore error
        }

        saveAchievements(updatedAchievements);

        return { data: fullAchievement };
      },
      invalidatesTags: ["Achievement"],
    }),

    updateAchievement: builder.mutation<Achievement, Partial<Achievement>>({
      queryFn: async (updatedAchievement) => {
        await sleep(2000);
        const achievements = getAchievements();
        const index = achievements.findIndex(
          (ach) => ach.id === updatedAchievement.id,
        );
        const newAchievement = {
          ...achievements[index],
          ...updatedAchievement,
        };
        achievements[index] = newAchievement;
        saveAchievements(achievements);
        return { data: newAchievement };
      },

      onQueryStarted: (
        updatedAchievement,
        { dispatch, queryFulfilled, getState },
      ) => {
        const state = (getState as typeof store.getState)();

        const patchResult = dispatch(
          achievementsApi.util.updateQueryData(
            "getAchievements",
            {
              search: state.achievements.search,
              sortDate: state.achievements.sortDate,
            },
            (draftAchievements) => {
              const index = draftAchievements.findIndex(
                (ach) => ach.id === updatedAchievement.id,
              );
              const currentAchievement = draftAchievements[index];
              const newAchievement = {
                ...currentAchievement,
                ...updatedAchievement,
              };
              if (index !== -1) draftAchievements[index] = newAchievement;
            },
          ),
        );

        queryFulfilled.catch(() => {
          patchResult.undo();
        });
      },

      invalidatesTags: (_result, _error, { id }) => [{ type: "Detail", id }],
    }),

    deleteAchievement: builder.mutation<string, string>({
      queryFn: async (achievementId) => {
        await sleep(2000);

        const achievements = getAchievements();

        const updatedAchievements = achievements.filter(
          (ach) => ach.id !== achievementId,
        );

        saveAchievements(updatedAchievements);

        return { data: achievementId };
      },
      onQueryStarted: (
        achievementId,
        { dispatch, queryFulfilled, getState },
      ) => {
        const state = (getState as typeof store.getState)();

        const patchResult = dispatch(
          achievementsApi.util.updateQueryData(
            "getAchievements",
            {
              search: state.achievements.search,
              sortDate: state.achievements.sortDate,
            },
            (draftAchievements) => {
              const index = draftAchievements.findIndex(
                (achievement) => achievement.id === achievementId,
              );
              if (index !== -1) draftAchievements.splice(index, 1);
            },
          ),
        );

        queryFulfilled.catch(() => {
          patchResult.undo();
        });
      },
    }),
  }),
});

export const {
  useGetAchievementsQuery,
  useAddAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
  useGetAchievementQuery,
  useLazyGetAchievementQuery,
} = achievementsApi;
