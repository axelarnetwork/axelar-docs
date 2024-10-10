interface CollapsibleHeader {
  header: HTMLSpanElement;
  group: HTMLDivElement;
  isExpanded: boolean;
}

function toggleHeader(header: CollapsibleHeader) {
  header.isExpanded = !header.isExpanded;
  header.header.classList.toggle("expanded");
  header.group.classList.toggle("expanded");
}

// Function to initialize collapsible headers
function initCollapsibleHeaders() {
  const headers: CollapsibleHeader[] = [];

  const groupElements = document.querySelectorAll(".group");
  // Calculate the header elements as previous sibling to group elements
  const headerElements = [...groupElements].map(
    (group) =>
      !group.parentElement ||
      group.parentElement.children[
        [...group.parentElement.children].indexOf(group) - 1
      ],
  );

  for (let i = 0; i < headerElements.length; i++) {
    const header = headerElements[i] as HTMLSpanElement;
    const group = groupElements[i] as HTMLDivElement;

    headers.push({ header, group, isExpanded: false });

    header.addEventListener("click", () => toggleHeader(headers[i]));
  }

  // Open the active path
  // @TODO there may be a bug here that requires this to be run AFTER active path detection
  // Ordering shouldn't matter ideally
  const activeHeader = headers.map((header) => {
    if (header.group.querySelector(".active")) {
      toggleHeader(header);
    }
  });
}

// Call the initialization function
initCollapsibleHeaders();
