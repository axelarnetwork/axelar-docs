import fs from "fs";
import path from "path";
import algoliasearch from "algoliasearch";
import crypto from "crypto";
import matter from "gray-matter";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
// Using strip because stripping via remarkMdx rendering wasn't working
import strip from "strip-markdown";
import { exit } from "process";

const client = algoliasearch("ECUG3H1E0M", process.env.ALGOLIA_KEY);
const CONTENT_PATH = "src/content/docs";

if (!process.env.ALGOLIA_KEY) {
  console.error("ALGOLIA_KEY not set");
  exit(1);
}

const index = client.initIndex("documentation");

const sitemap = [];

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);

    if (stats.isDirectory()) {
      walk(filepath);
    } else if (
      file.endsWith(".astro") ||
      file.endsWith(".mdx") ||
      file.endsWith(".md")
    ) {
      // remove file extension, order matters here
      const url = filepath
        .replace(CONTENT_PATH, "")
        .replace(".astro", "/")
        .replace(".mdx", "/")
        .replace(".md", "/");
      const mtime = stats.mtime.toISOString();
      const sha = crypto.createHash("sha256");
      sha.update(url);
      const id = sha.digest("hex");

      const fileContents = fs.readFileSync(filepath, "utf-8");

      // console.log("about to parse", filepath);

      // Get rid of frontmatter
      let data, content;
      try {
        ({ data, content } = matter(fileContents));
      } catch (e) {
        // couldn't parse the greymatter, oh well
        content = fileContents;
      }

      // Get rid of markdown
      if (filepath.indexOf(".mdx") > -1 || filepath.indexOf(".md") > -1) {
        content = String(remark().use(strip).processSync(content));
        // console.log("rendering from", fileContents.substring(0,1000));
        // console.log("current content:",content);

        // Remove imports
        content = content.replace(/^import.*from.*;?$/g, "");
      }

      // Get rid of HTML
      if (filepath.indexOf(".astro" > -1)) {
        content = stripTags(content);
      }
      // Remove callout
      content = content.replace(
        /import\s*{\s*Callout\s*}\s*from\s*['"][^"']*['"]\s*;?/g,
        "",
      );

      // Fix newlines
      content = content.replace(/\n/g, " ");

      // Shorten to fit in Algolia Index
      if (content) {
        content = content.substring(0, 8000);
      }

      let title = data?.title;
      const pattern = /^# (.*)$/;

      if (!title && fileContents[0] == "#" && /#+(.*)/) {
        title = /#+\s?(.*)/.exec(fileContents)[1];
      }

      if (!title) {
        const titleLine = fileContents.split("\n").find((line) => {
          return pattern.test(line);
        });
        const proposedTitle = pattern.exec(titleLine);
        if (proposedTitle && proposedTitle.length > 1) {
          title = proposedTitle[1];
        }
      }

      sitemap.push({
        url: url,
        lastmod: mtime,
        objectID: id,
        title: title,
        frontmatter: {
          ...data,
        },
        contents: content,
      });
    }
  }
}

walk(CONTENT_PATH);

// console.dir(sitemap, { maxArrayLength: null });

try {
  index
    .replaceAllObjects(sitemap, {})
    .then(({ objectIDs }) => {
      console.log("saved search index", objectIDs);
    })
    .catch((e) => {
      console.error("error saving search index", e, e.message);
    });
} catch (e) {
  console.error("error saving search index", e, e.message);
}

function stripTags(html) {
  if (!html || !html.replace) {
    return html;
  }
  // Create a regular expression to match all HTML tags.
  const regex = /<[^>]+>/g;

  // Replace all HTML tags with an empty string.
  return html.replace(regex, "");
}
