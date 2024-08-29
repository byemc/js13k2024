
var fs = require("fs");
var stats = fs.statSync("build/game.zip");
var fileSizeInBytes = stats.size;
var fileSizeInKilobytes = fileSizeInBytes / 1024;

var statsUncompressed = fs.statSync("build/index.html");
var fileSizeInBytesUncompressed = statsUncompressed.size;
var fileSizeInKilobytesUncompressed = fileSizeInBytesUncompressed / 1024;

var compressionRatio = fileSizeInBytesUncompressed / fileSizeInBytes;

console.log(`Current game size: ${Math.round(fileSizeInKilobytes*10)/10}/13.0 KB (${Math.round((fileSizeInKilobytes/13)*100)}%)`);
console.log(`Current game size (uncompressed): ${fileSizeInKilobytesUncompressed.toFixed(1)}/${(13.0 * compressionRatio).toFixed(1)} KB (${Math.round((fileSizeInKilobytesUncompressed/(13 * compressionRatio))*100)}%)`)
