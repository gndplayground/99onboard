import { IconButton } from "@components";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useDeleteAchievementMutation } from "@store/achievements-slice";
import { DialogConfirmDelete } from "../DialogConfirmDelete";
import { useState } from "react";

export interface AchievementItemProps {
  id: string;
  dateAchieved: string;
  description: string;
  title: string;
  temperature?: string;
  humidity?: string;
  onRequestEdit?: (id: string) => void;
}

export function AchievementItem({
  dateAchieved,
  description,
  title,
  id,
  onRequestEdit,
  humidity,
  temperature,
}: AchievementItemProps) {
  const [isOpenComfirm, setIsOpenComfirm] = useState(false);

  const date = new Date(dateAchieved).toLocaleDateString("en-SG", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const [deleteMutation, { isLoading: isDeleting }] =
    useDeleteAchievementMutation();

  function handleDelete() {
    deleteMutation(id);
  }

  function handleEdit() {
    onRequestEdit?.(id);
  }

  return (
    <div className="py-4 px-4 border-t-2 border-blue-500 rounded-sm shadow-lg relative">
      {isDeleting && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-wait">
          <span className="text-white">Deleting...</span>
        </div>
      )}
      <div className="flex items-center">
        <time className="text-gray-500 text-sm ">{date}</time>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="ml-auto" asChild>
            <IconButton>
              <DotsVerticalIcon width="1em" height="1em" />
            </IconButton>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content className="z-50 min-w-[8rem] overflow-hidden rounded-md border  p-1 text-popover-foreground shadow-md bg-white">
            <DropdownMenu.Item
              className="text-gray-500 py-2 px-1 cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="text-red-500 py-2 px-1 cursor-pointer"
              onClick={() => {
                setIsOpenComfirm(true);
              }}
            >
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      {(temperature || humidity) && (
        <div className="text-gray-500 text-sm mb-2 flex items-center gap-1">
          {temperature && (
            <span className="text-gray-500">Temperature: {temperature}°C</span>
          )}
          {humidity && (
            <span className="text-gray-500 ml-2">Humidity: {humidity}%</span>
          )}
        </div>
      )}
      <div className="flex items-start">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text mt-1">{description}</p>

      {isOpenComfirm && (
        <DialogConfirmDelete
          onConfirm={handleDelete}
          open={isOpenComfirm}
          onOpenChange={setIsOpenComfirm}
        />
      )}
    </div>
  );
}
