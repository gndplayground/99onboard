import { AchievementForm, AchievementList } from "./components";
import { useMemo, useState } from "react";
import { Achievement } from "@models";

interface ViewState {
  view: "list" | "edit" | "create";
  data?: {
    id: string;
    data: Achievement;
  };
}

export function AchievementView() {
  const [viewState, setViewState] = useState<ViewState>({
    view: "list",
  });

  function handleReturnToList() {
    setViewState({ view: "list" });
  }

  function handleClickCreate() {
    setViewState({ view: "create" });
  }

  function handleEdit(id: string, data: Achievement) {
    setViewState({
      view: "edit",
      data: {
        id,
        data,
      },
    });
  }

  const defaultValues = useMemo(() => {
    if (viewState.view === "edit" && viewState.data?.data) {
      return {
        title: viewState.data.data.title,
        description: viewState.data.data.description,
        dateAchieved: viewState.data.data.dateAchieved,
      };
    }
  }, [viewState.data?.data, viewState.view]);

  if (viewState.view === "create" || viewState.view === "edit") {
    return (
      <AchievementForm
        edit={viewState.data?.id}
        onRequestClose={handleReturnToList}
        defaultValues={defaultValues}
      />
    );
  }

  return (
    <AchievementList
      onRequestCreate={handleClickCreate}
      onRequestEdit={handleEdit}
    />
  );
}
