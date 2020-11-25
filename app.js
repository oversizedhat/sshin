'use strict';
const inquirer = require('inquirer');
const fs = require('fs');

const homedir = require('os').homedir();
const defaultFilePath = `${homedir}/.ssh/config`;

const SSHConfig = require('ssh-config');
const { spawn } = require('child_process');

async function exec(argv) {
  let filePath = getConfigFilePath(argv);

  let file;
  let conf;

  try {
    file = fs.readFileSync(filePath, 'utf8');
    conf = SSHConfig.parse(file);
  } catch (err) {
    return Promise.reject(`Failed to read or parse config file. Make sure the file exists: ${filePath}`);
  }

  const questions = [
    {
      type: 'list',
      name: 'host',
      message: 'Connect to host:',
      choices: conf,
    },
  ];

  if (filePath != defaultFilePath) {
    console.log(`Using config file: ${filePath}`);
  }

  inquirer.prompt(questions).then((answer) => {
    spawnShell(filePath, answer.host);
  });
}

function spawnShell(confFilePath, host) {
  console.log(`SSHing to ${host}...`);
  const shell = spawn('ssh',["-F", confFilePath, host], { stdio: 'inherit' });
}

function getConfigFilePath(argv) {
  let filePath = defaultFilePath;

  if (argv[2] && argv[2].substring(0,2) === "-F") {
    if (argv[2].substring(2,3) === "=") {
      filePath = argv[2].substring(3,argv[2].length);
    } else if (argv[3]){
      filePath = argv[3];
    }
  }
  return filePath.trim();
};

module.exports = {
  exec
}