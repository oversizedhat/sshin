# sshin
[![Build Status](https://travis-ci.org/oversizedhat/sshin.svg?branch=master)](https://travis-ci.org/oversizedhat/sshin)

Interactive cli-menu for user-specific OpenSSH file client configuration files (~/.ssh/config).

Built using Inquirer.js for interactive cli and ssh-config for config parsing.
```sh
# Install
npm install -g sshin

# Run (default config ~/.ssh/config)
sshin
? Connect to host: (Use arrow keys)
❯ somehost 
  someotherhost 
  anotherhost 

# Supports different config files same way as ssh command does
# [-F path_to_custom_config_file ] 
sshin -F ./myconfig
Using config file: ./mockconfig
...
```

But first! Make sure your ~/.ssh/config file is looking sleek.
https://linuxize.com/post/using-the-ssh-config-file/