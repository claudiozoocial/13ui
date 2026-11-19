import { useState } from "react"
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function Example() {
  const [answer, setAnswer] = useState<string | null>(null)
  return (
    <div className="flex items-center gap-3">
      <AlertDialog onOpenChange={(open, details) => !open && setAnswer(String(details.returnValue ?? "dismissed"))}>
        <AlertDialogTrigger render={<Button variant="destructive" />}>Delete project</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              The project, its sessions and its files will be deleted for everyone. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose value="cancel">Cancel</AlertDialogClose>
            <AlertDialogClose value="confirm" variant="destructive">
              Delete
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <span className="text-ui text-muted-foreground">{answer ? `Answer: ${answer}` : "No answer yet"}</span>
    </div>
  )
}
