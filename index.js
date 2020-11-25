#!/usr/bin/env node
var sshin = require('./app');

if (["-?", "?", "--help"].some((value) => {
 return process.argv[2] == value
})) {
  console.log("sshin")
  console.log(" -F path_to_custom_config_file");
  return;
}

sshin.exec(process.argv);