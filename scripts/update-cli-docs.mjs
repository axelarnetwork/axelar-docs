import { $ } from "zx";
import replaceInFile from "replace-in-file";

import { spinner } from "zx/experimental";
import { fetchLatestTagForRepo } from "./utils.mjs";

const REPO = "axelarnetwork/axelar-core";

console.log("Fetching latest tag for axelar-core repo...");

let TARGET_TAG = process.env.TAG;

if (!TARGET_TAG) {
  const latestTag = await spinner("Fetching latest tag", () =>
    fetchLatestTagForRepo(REPO)
  );
  console.log("Latest tag for axelar-core repo:", latestTag);
  TARGET_TAG = latestTag;
}

const SNAKE_TAG = TARGET_TAG.replace(/\./g, "_");

const GIT_PATH_DOCS = `axelarnetwork/axelar-core/docs/cli#${TARGET_TAG}`;

const OUTPUT_DIR = `pages/cli-docs/${SNAKE_TAG}`;

await spinner(
  "Downloading docs from axelar-core repo",
  () => $`rm -rf pages/cli-docs/* && degit ${GIT_PATH_DOCS} ${OUTPUT_DIR}`
);

const META_JSON_CONTENT = JSON.stringify(
  {
    [SNAKE_TAG]: TARGET_TAG,
  },
  null,
  2
);

await $`echo ${META_JSON_CONTENT} > pages/cli-docs/meta.json`;

console.log("meta.json updated");

// Cleanup .md files

async function prettify() {
  return await spinner(
    "formatting files",
    () => $`prettier --write pages/cli-docs/`
  );
}

await prettify();

// # # change links (vscode)

// find and replace in all files under OUTPUT_DIR

/**
 * find: axelard([a-z-_]*).md
 * replace: /cli-docs/${SNAKE_TAG}/$0
 */
await spinner("Fixing axelard links", () =>
  replaceInFile({
    files: `${OUTPUT_DIR}/**/*.md`,
    from: /axelard([a-z-_]*).md/g,
    to: (match) => `/cli-docs/${SNAKE_TAG}/${match}`,
    encoding: "utf-8",
  })
);

/**
 * find: .md
 * replace: ""
 */
await spinner("Fixing remaining .md links", () =>
  replaceInFile({
    files: `${OUTPUT_DIR}/**/*.md`,
    from: /\.md/g,
    to: "",
    encoding: "utf-8",
  })
);

/**
 * replace $ code lines with backticks
 * find: \$ <(.*)
 * replace: ```$0```
 */
await spinner("Fixing $ code lines", () =>
  replaceInFile({
    files: `${OUTPUT_DIR}/**/*.md`,
    from: /\$ <(.*)/g,
    to: (match) => `\`\`\`bash\n${match}\n\`\`\``,
    encoding: "utf-8",
  })
);

/**
 * replace tags by tags + simple backticks
 *
 * find: (?<!(\$\s))<(.)*>
 * replace: `$0`
 */
await spinner("Fixing tags", () =>
  replaceInFile({
    files: `${OUTPUT_DIR}/**/*.md`,
    from: /(?<!(\$ ))<(.)*>/g,
    to: (match) => `\`${match}\``,
    encoding: "utf-8",
  })
);

// run prettier again to fix the backticks

await prettify();

/**
 * replace json snippets by json snippets + simple backticks
 */
await spinner("Fixing json snippets", () =>
  replaceInFile({
    files: `${OUTPUT_DIR}/**/*.md`,
    from: /(?<!\`\`\`)(\s*{\s*[\s\S]*?\s*}\s*)(?!\`\`\`)/g,
    to: (match) => `\n\`\`\`json\n${match}\n\`\`\`\n`,
    encoding: "utf-8",
  })
);

// run prettier again to fix the backticks
await prettify();

/**
 * fix malformed inline tags
 *
 * find: \\\`<(.*)>
 * replace: \`<$1>\`
 */
await spinner("Fixing inline tags", () =>
  replaceInFile({
    files: `${OUTPUT_DIR}/**/*.md`,
    from: /\\\`<(.*)>`/g,
    to: (_, e) => `\`<${e}>\``,

    encoding: "utf-8",
  })
);

// run prettier again to fix the backticks
await prettify();
