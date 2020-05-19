const fs = require("fs");
const request = require("request");
const path = require("path");

exports.default = function (url, filename) {
  let filePath = path.resolve("assets", "memes", filename);

  const response = request(url);
  console.log(response.headers);

  return Promise.resolve(response.pipe(fs.createWriteStream(filePath)));
};
