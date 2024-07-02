import { configureStore } from "@reduxjs/toolkit";
import { achievementSlice, achievementsApi } from "./achievements-slice";

export const store = configureStore({
  reducer: {
    [achievementsApi.reducerPath]: achievementsApi.reducer,
    achievements: achievementSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(achievementsApi.middleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
