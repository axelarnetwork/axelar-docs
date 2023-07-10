import fs from "fs";
import path from "path";
import matter from "gray-matter";
import removeMd from "remove-markdown";


const filenames = fs.readdirSync(path.join("../"))
const data = filenames.map(filename => {
  try {
    const markdownWithMeta = fs.readFileSync("../" + filename)
    const { data: frontmatter, content } = matter(markdownWithMeta)
    return {
      objectID: frontmatter.slug,
      slug: frontmatter.slug,
      title: frontmatter.title,
      content: removeMd(content).replace(/\n/g, ""),
    }
  } catch (e) {
    // console.log(e.message)
  }
})