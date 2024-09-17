import { visit } from "unist-util-visit";

export function tip() {
  const variants = new Set([
    "note",
    "tip",
    "caution",
    "danger",
    "heading-banner",
    "call-to-action-banner",
    "button-group",
    "github-btn",
  ]);

  // All remark and rehype plugins return a separate function
  return function (tree, file) {
    console.log("tree", tree);
    visit(tree, (node, index, parent) => {
      if (!parent || index === null || node.type !== "containerDirective")
        return;

      const type = node.name;

      if (!variants.has(type)) return;

      const data = node.data || (node.data = {});
      const attributes = node.attributes || {};

      data.hName = "div";

      switch (type) {
        case "tip":
          data.hProperties = {
            class:
              "not-prose flex gap-10 items-center  border-border border p-5 bg-background-neutral-dark rounded-lg",
          };

          console.log(node.children[0].children[0].value);

          data.hChildren = [
            {
              type: "element",
              tagName: "p",
              properties: {
                class:
                  "text-start text-base text-foreground flex items-center gap-x-2",
              },
              children: [
                {
                  type: "raw",
                  value: `
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      
                      stroke = "currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_2237_36992)">
                        <path
                          d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                         
                          stroke-width="1.125"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 12V9"
                         
                          stroke-width="1.125"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 6H9.0075"
                         
                          stroke-width="1.125"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2237_36992">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  `,
                },

                {
                  type: "text",
                  value: node.name.toUpperCase(),
                },
              ],
            },

            {
              type: "element",
              tagName: "p",
              properties: {
                class: "text-start text-base text-foreground",
              },
              children: [
                {
                  type: "text",
                  value: node.children[0].children[0].value,
                },
              ],
            },
          ];

          break;

        default:
          data.hProperties = {
            class:
              "not-prose my-10 space-y-4 rounded-lg border-l-4 border-l-[#C1C8CD] bg-[#F1F0EF] px-5 py-5 text-lg font-medium",
          };
          break;
      }
    });
  };
}
