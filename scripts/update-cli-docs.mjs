import { $ } from "zx";
import replaceInFile from "replace-in-file";

import { spinner } from "zx/experimental";
import { fetchLatestTags } from "./utils.mjs";

const REPO = "axelarnetwork/axelar-core";

$.verbose = false;

const maxVersions = 2;

const latestTags = await spinner(
  `fetching latest ${maxVersions} tags from ${REPO}`,
  () =>
    fetchLatestTags({
      limit: maxVersions,
      repository: REPO,
    })
);

console.log("latest tags:", latestTags.join(", "));

for (const tag of latestTags) {
  await generateDocsForTag(tag);
}

await generateMetaFile(latestTags);

async function generateMetaFile(tags = []) {
  const jsonContent = JSON.stringify(
    tags.reduce((acc, tag) => ({ ...acc, [tag.replace(/\./g, "_")]: tag }), {}),
    null,
    2
  );

  await $`echo ${jsonContent} > pages/cli-docs/meta.json`;
}

async function generateDocsForTag(tag = "0") {
  const snakefiedTag = tag.replace(/\./g, "_");
  const releasePath = `axelarnetwork/axelar-core/docs/cli#${tag}`;
  const outDir = `pages/cli-docs/${snakefiedTag}`;

  // color green
  const spinnerPrefix = `[cli-docs(${tag})]:`;

  await $`rm -rf ${outDir}`;

  const spinnerMessage = (m = "") => [spinnerPrefix, m].join(" ");

  await spinner(
    spinnerMessage("downloading docs from axelar-core"),
    () => $`degit ${releasePath} ${outDir}`
  );

  // Cleanup .md files

  async function prettify() {
    return await spinner(
      spinnerMessage("prettifying .md files"),
      () => $`prettier --write ${outDir}/**/*.md`
    );
  }

  await prettify();

  /**
   * fix malformed links
   *
   * find: axelard([a-z-_]*).md
   * replace: /cli-docs/${snakeTag}/$0
   */
  await spinner(spinnerMessage("Fixing malformed links"), () =>
    replaceInFile({
      files: `${outDir}/**/*.md`,
      from: /axelard([a-z-_]*).md/g,
      to: (match) => `/cli-docs/${snakefiedTag}/${match}`,
      encoding: "utf-8",
    })
  );

  /**
   * fix remaining malformed links
   *
   * find: .md
   * replace: ""
   */
  await spinner(spinnerMessage("Fixing remaining malformed links"), () =>
    replaceInFile({
      files: `${outDir}/**/*.md`,
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
  await spinner(spinnerMessage("Fixing code lines with backticks"), () =>
    replaceInFile({
      files: `${outDir}/**/*.md`,
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
  await spinner(spinnerMessage("Fixing tags with simple backticks"), () =>
    replaceInFile({
      files: `${outDir}/**/*.md`,
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
  await spinner(
    spinnerMessage("Fixing json snippets with simple backticks"),
    () =>
      replaceInFile({
        files: `${outDir}/**/*.md`,
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
  await spinner(
    spinnerMessage("Fixing malformed inline tags with simple backticks"),
    () =>
      replaceInFile({
        files: `${outDir}/**/*.md`,
        from: /\\\`<(.*)>`/g,
        to: (_, e) => `\`<${e}>\``,

        encoding: "utf-8",
      })
  );

  // run prettier again to fix the backticks
  await prettify();
}
