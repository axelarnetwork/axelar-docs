import SyntaxHighlighter from "react-syntax-highlighter";

export default ({ language, children }) => {
  return (
    <SyntaxHighlighter language={language} className="my-2 code-block">
      {typeof children === "string" ? children.replace(/\\/g, "\n") : children}
    </SyntaxHighlighter>
  );
};
