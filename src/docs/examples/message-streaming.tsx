import { useEffect, useState } from "react"
import { Composer } from "@/components/shell/composer"
import { Caret, Message, Reasoning, ToolCall } from "@/components/shell/message"

const answer = "Moved the terminal under the editor and saved the layout. Run the tests whenever you're ready."

export default function Example() {
  const [step, setStep] = useState<"thinking" | "streaming" | "done">("thinking")
  const [words, setWords] = useState(0)
  const total = answer.split(" ").length

  useEffect(() => {
    if (step === "thinking") {
      const t = setTimeout(() => setStep("streaming"), 1600)
      return () => clearTimeout(t)
    }
    if (step === "streaming") {
      if (words >= total) {
        setStep("done")
        return
      }
      const t = setTimeout(() => setWords((n) => n + 1), 60)
      return () => clearTimeout(t)
    }
  }, [step, words, total])

  const restart = () => {
    setWords(0)
    setStep("thinking")
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-5">
      <Message from="user">Put the terminal under the editor.</Message>
      <Message from="assistant">
        <Reasoning streaming={step === "thinking"} duration={2}>
          The terminal is in the right group. Moving it to the bottom edge of the editor group splits it vertically.
        </Reasoning>
        {step !== "thinking" && (
          <>
            <p>
              {answer.split(" ").slice(0, words).join(" ")}
              {step === "streaming" && <Caret />}
            </p>
            <ToolCall title='dock.move("terminal", { to: "editor", edge: "bottom" })' status={step === "done" ? "done" : "running"} />
          </>
        )}
      </Message>
      <Composer
        onSubmit={restart}
        pending={step !== "done"}
        onStop={() => {
          setWords(total)
          setStep("done")
        }}
        placeholder="Send anything to replay"
      />
    </div>
  )
}
