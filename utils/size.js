
var fs = require("fs");
var stats = fs.statSync("build/game.zip");
var fileSizeInBytes = stats.size;
var fileSizeInKilobytes = fileSizeInBytes / 1024;

console.log(`Current game size: ${Math.round(fileSizeInKilobytes*10)/10}/13.0 KB (${Math.round((fileSizeInKilobytes/13)*100)}%)`);
