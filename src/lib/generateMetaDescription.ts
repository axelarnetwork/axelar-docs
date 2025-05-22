export function generateMetaDescription(
  content: string,
  maxLength: number = 160,
): string {
  // First clean the entire conten

  const cleanedContent = content
    ?.replace(/^#\s.*$/gm, "") // Remove H1 headers
    ?.replace(/^#{1,6}\s.*$/gm, "") // Remove all headers (H1-H6)
    ?.replace(/```[\s\S]*?```/g, "") // Remove code blocks
    ?.replace(/`[\s\S]*?`/g, "") // Remove inline code blocks
    ?.replace(/import\s+.*?from\s+['"].*?['"];?/g, "") // Remove import statements
    ?.replace(/export\s+.*?from\s+['"].*?['"];?/g, "") // Remove export statements
    ?.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Convert markdown links to plain text
    ?.replace(/#/g, "") // Remove all # characters
    ?.replace(/\*\*/g, "") // Remove bold
    ?.replace(/\*/g, "") // Remove italic
    ?.replace(/`/g, "") // Remove inline code
    ?.replace(/<[^>]*>/g, "") // Remove HTML/MDX tags
    ?.replace(/&quot;/g, '"') // Replace HTML entities
    ?.replace(/&amp;/g, "&") // Replace HTML entities
    ?.replace(/&lt;/g, "<") // Replace HTML entities
    ?.replace(/&gt;/g, ">") // Replace HTML entities
    ?.replace(/\n/g, " ") // Replace newlines with spaces
    ?.replace(/\s+/g, " ") // Replace multiple spaces with single space
    ?.replace(/^\s*[-*+]\s*/gm, "") // Remove bullet points
    ?.replace(/^\s*\d+\.\s*/gm, "") // Remove numbered lists
    ?.replace(/^\s*import\s+.*$/gm, "") // Remove any remaining import lines
    ?.replace(/^\s*export\s+.*$/gm, "") // Remove any remaining export lines
    ?.trim();

  // Then get the first paragraph
  const firstParagraph = cleanedContent?.split(/\s{2,}/)[0]?.trim();

  if (!firstParagraph) return "";

  return firstParagraph.length > maxLength
    ? firstParagraph.substring(0, maxLength - 3) + "..."
    : firstParagraph;
}
