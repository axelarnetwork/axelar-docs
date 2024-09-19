import clsx from "clsx";

interface CalloutProps {
  children: any;
  type: "" | "warning" | "error";
  emoji?: string;
  render?: "md" | "html";
  longConent?: boolean;
}
// https://www.notion.so/Callout-blocks-5b2638247b54447eb2e21145f97194b0
export const Callout = ({
  children,
  type = "warning",
  emoji = "💡",
  render = "html",
  longConent = false,
}: CalloutProps) => {
  return (
    <div
      className={clsx(
        ` my-4 bg-background-neutral-dark  flex items-center gap-4 p-5 rounded-md border border-border `,
        type,
        render === "md" ? "" : "not-prose",
      )}
    >
      <div className={clsx(longConent ? "hidden md:block" : "")}>{emoji}</div>
      <div className="[&>p]:my-0">{children}</div>
    </div>
  );
};
