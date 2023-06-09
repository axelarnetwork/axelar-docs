import { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";

export default function MarkdownComponent({ src, darkMode }) {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    if (src) {
      fetch(src)
        .then((res) => res.text())
        .then((md) => setMarkdown(md));
    }
  }, [src]);

  return (
    <Markdown
      options={{
        overrides: {
          table: {
            props: {
              className: darkMode ? "markdown-dark-table" : "markdown-light-table",
            },
          },
        },
      }}
    >
      {markdown}
    </Markdown>
  );
}
