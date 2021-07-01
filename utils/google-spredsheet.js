const fs = require('fs');
const getStream = require('get-stream');
const parse = require('csv-parser');

module.exports = async (filePath) => {
  const parseStream = parse({ delimiter: ',', headers: ['created_at', 'name', 'birth_date'], skipLines: 1 });
  return await getStream.array(fs.createReadStream(filePath).pipe(parseStream));
}