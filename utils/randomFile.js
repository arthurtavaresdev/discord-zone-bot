const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

exports.randomFile = async function () {
  const dir = path.resolve("assets", "memes");
  try {
    const files = await fsPromises.readdir(dir);
    let randomIndex = Math.floor(Math.random() * files.length);
    const file = files[randomIndex];
    return path.resolve(dir, file);
  } catch (err) {
    console.error("Error occured while reading directory!", err);
  }
};
