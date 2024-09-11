const fs = require("fs");
const stats = fs.statSync("build/game.zip");
const fileSizeInBytes = stats.size;
const fileSizeInKilobytes = fileSizeInBytes / 1024;

const statsUncompressed = fs.statSync("build/index.html");
const fileSizeInBytesUncompressed = statsUncompressed.size;
const fileSizeInKilobytesUncompressed = fileSizeInBytesUncompressed / 1024;

const compressionRatio = fileSizeInBytesUncompressed / fileSizeInBytes;

console.log(`Current game size: ${Math.round(fileSizeInKilobytes*10)/10}/13.0 KB (${Math.round((fileSizeInKilobytes/13)*100)}%)`);
console.log(`Current game size (uncompressed): ${fileSizeInKilobytesUncompressed.toFixed(1)}/${(13.0 * compressionRatio).toFixed(1)} KB (${Math.round((fileSizeInKilobytesUncompressed/(13 * compressionRatio))*100)}%)`)
