import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { Button, IconButton, InputField } from "@components";
import { Cross1Icon } from "@radix-ui/react-icons";

import {
  useAddAchievementMutation,
  useUpdateAchievementMutation,
} from "../../../../store/achievements-slice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const AchievementSchema = z.object({
  dateAchieved: z.string().refine(
    (val) => {
      const newDate = new Date(val);
      return newDate < new Date();
    },
    {
      message: "Date achieved must be in the past",
    },
  ),
  description: z.string().min(1, { message: "Description is required" }),
  title: z.string().min(1, { message: "Title is required" }),
});

type AchievementSchemaType = z.infer<typeof AchievementSchema>;

function getErrorMessage<T extends FieldValues>(
  errors: FieldErrors<T>,
  key: keyof T,
) {
  return errors[key] ? String(errors[key]?.message) : null;
}

function formatError(error: FetchBaseQueryError | SerializedError = {}) {
  if ("data" in error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error.data as any)?.message;
  }

  if ("message" in error) {
    return error.message;
  }
}

export interface AchievementFormProps {
  edit?: string;
  onRequestClose?: () => void;
  defaultValues?: AchievementSchemaType;
}

export function AchievementForm({
  onRequestClose,
  edit,
  defaultValues,
}: AchievementFormProps) {
  const methods = useForm<AchievementSchemaType>({
    resolver: zodResolver(AchievementSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      dateAchieved: "",
      ...defaultValues,
    },
  });

  const [add, addState] = useAddAchievementMutation();
  const [update, updateState] = useUpdateAchievementMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: AchievementSchemaType) => {
    if (edit) {
      updateState.reset();
      await update({ id: edit, ...data }).unwrap();
    } else {
      addState.reset();
      await add(data).unwrap();
    }
    onRequestClose?.();
  };

  return (
    <div className="max-w-[600px] mx-auto py-10 px-4">
      <div className="rounded-lg shadow-lg px-4 py-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            {edit ? `Edit: ${defaultValues?.title}` : `Create Achievement`}
          </h1>
          <IconButton
            className="ml-auto"
            aria-label="Back"
            onClick={onRequestClose}
            disabled={isSubmitting}
          >
            <Cross1Icon width="1em" height="1em" className="text-gray-500" />
          </IconButton>
        </div>
        {addState.error && (
          <div className="bg-red-100 text-red-500 p-4 mt-4 rounded-md">
            {formatError(addState.error) ||
              formatError(updateState.error) ||
              "An error occurred"}
          </div>
        )}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="flex flex-col gap-4">
              <InputField
                label="Title"
                inputProps={{
                  ...register("title"),
                  type: "text",
                  placeholder: "My super achievement",
                  disabled: isSubmitting,
                }}
                error={getErrorMessage(errors, "title")}
              />

              <InputField
                label="Description"
                inputProps={{
                  ...register("description"),
                  type: "text",
                  placeholder: "Description",
                  disabled: isSubmitting,
                }}
                error={getErrorMessage(errors, "description")}
                multiline
              />

              <InputField
                label="Date achieved"
                inputProps={{
                  ...register("dateAchieved"),
                  type: "datetime-local",
                  placeholder: "Date achieved",
                  disabled: isSubmitting,
                }}
                error={getErrorMessage(errors, "dateAchieved")}
              />
            </div>

            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[200px]"
                loading={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
