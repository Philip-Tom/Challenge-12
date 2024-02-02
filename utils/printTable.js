var { AsciiTable3 } = require("ascii-table3");

const printTable = (data) => {
  const table = new AsciiTable3();

  if (Array.isArray(data) && data.length > 0) {
    data.sort((a, b) => a.id - b.id);
    const headings = Object.keys(data[0]);
    table.setHeading(...headings);
    table.setHeadingAlign(...headings.map(() => AsciiTable3.LEFT));

    data.forEach((row) => {
      const values = headings.map((heading) => row[heading]);
      table.addRow(...values);
    });

    table.setStyle("compact");
    console.log(`\n${table.toString()}\n`);
  } else {
    console.error(
      "\nNo data to display.\n"
    );
  }
};

module.exports = printTable;
