import { ClosingCta } from "@/components/platform/blocks";

/** Closing call to action. Same design as every other page (image background). */
export function CtaBanner({
  title = "Ready to move your trade finance forward?",
  text = "Create your account, upload your trade documents and let participating lenders review your application.",
}: {
  title?: string;
  text?: string;
}) {
  return <ClosingCta title={title} text={text} />;
}
