import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

// Render <Toaster /> once near your app's root; these docs already do.
export default function Example() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => toast("Session renamed", { description: "Now called “Pricing page”." })}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Changes saved")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Couldn't reach the server")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Storage is almost full")}>
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Panel closed", {
            action: { label: "Undo", onAction: () => toast.info("Panel restored") },
          })
        }
      >
        With action
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: "Deploying…",
            success: "Deployed to production",
            error: "Deploy failed",
          })
        }
      >
        Promise
      </Button>
    </div>
  )
}
