import fs from "fs";
import path from "path";
import algoliasearch from "algoliasearch";
import crypto from "crypto";
import matter from "gray-matter";
import { remark } from "remark";
import remarkMdx from "remark-mdx";

const client = algoliasearch("ECUG3H1E0M", process.env.ALGOLIA_KEY);

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
        .replace("src/pages", "")
        .replace(".astro", "")
        .replace(".mdx", "")
        .replace(".md", "");
      const mtime = stats.mtime.toISOString();
      const sha = crypto.createHash("sha256");
      sha.update(url);
      const id = sha.digest("hex");

      const fileContents = fs.readFileSync(filepath, "utf-8");

      console.log("about to parse", filepath);
      let data, contents;
      try {
        ({ data, contents } = matter(fileContents));
      } catch (e) {
        // couldn't parse the greymatter, oh well
      }
      if (filepath.indexOf(".mdx") > -1) {
        const mdxOutput = remark().use(remarkMdx).processSync(fileContents);

        console.log("mdx rendered to:", String(mdxOutput));
        contents = stripTags(String(mdxOutput));
      }
      if (contents) {
        contents = contents.substring(0, 8000);
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
        contents: contents,
      });
    }
  }
}

walk("src/pages");

console.dir(sitemap, { maxArrayLength: null });

try {
  //   if (true) exit;
  index
    .saveObjects(sitemap, {})
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
  // Create a regular expression to match all HTML tags.
  const regex = /<[^>]+>/g;

  // Replace all HTML tags with an empty string.
  return html.replace(regex, "");
}
