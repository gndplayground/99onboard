import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components";

export interface DialogConfirmDeleteProps {
  onConfirm: () => void;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function DialogConfirmDelete(props: DialogConfirmDeleteProps) {
  const { onConfirm, open, onOpenChange } = props;
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this achievement</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the achievement. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
