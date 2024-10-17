const wrapTablesWithOverflow = () => {
  const tables = document.getElementsByTagName("table");
  const tablesArray = Array.from(tables);
  console.log("tablesArray", tablesArray);

  tablesArray.forEach((table) => {
    if (table && table.parentNode) {
      const wrapperDiv = document.createElement("div");
      wrapperDiv.classList.add("overflow-x-auto");
      table.parentNode.insertBefore(wrapperDiv, table);
      wrapperDiv.appendChild(table);
    } else {
      console.warn("Table does not have a parent node:", table);
    }
  });
};

wrapTablesWithOverflow();
