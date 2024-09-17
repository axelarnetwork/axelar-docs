interface CalloutProps {
  children: any;
  type: "" | "warning" | "error";
  emoji?: string;
}
// https://www.notion.so/Callout-blocks-5b2638247b54447eb2e21145f97194b0
export const Callout = ({
  children,
  type = "warning",
  emoji = "💡",
}: CalloutProps) => {
  return (
    <div className={`bg-yellow-100/50 border border-yellow-400 ${type}`}>
      <div style={{ padding: "32px" }}>{emoji}</div>
      <div>{children}</div>
    </div>
  );
};
