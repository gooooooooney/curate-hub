import { Button } from "@nextui-org/button";
import { Calendar } from "@nextui-org/calendar";

export default function Page() {
  return (
    <>
      <Button>Get Started</Button>
      <Calendar aria-label="Date (No Selection)" />
      <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" />
      <div className="mx-auto h-full w-full max-w-3xl rounded-xl bg-muted/50" />
    </>
  )
}
