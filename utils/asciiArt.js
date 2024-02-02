const figlet = require("figlet");
const cliBoxes = require('cli-boxes');


function printAsciiArt(word) {
  return new Promise((resolve, reject) => {
    figlet(word, function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      const box = cliBoxes.single;
      const lines = data.split('\n');
      console.log(box.topLeft + box.top.repeat(lines[0].length) + box.topRight);
      lines.forEach(line => console.log(box.left + line + box.right));
      console.log(box.bottomLeft + box.bottom.repeat(lines[lines.length - 1].length) + box.bottomRight);

      resolve();
    });
  });
}

module.exports = printAsciiArt;
