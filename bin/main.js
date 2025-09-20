#!/usr/bin/env node
const meow = require('meow')
const app = require('../src/app')
const networks = require('../src/network')

const cli = meow(`
    !!! Important !!!
    This is a beta version. It supports regtest, testnet, and dogeev networks.
  
    Usage
      $ dogecoin-spv <command>
      
    Commands
      start          Start the spv node

    Options
      --regtest, -r  Start in regtest mode
      --dev, -d      Start node as dev (local data folder and not user)
      --dogeev, -e   Start in dogeev mode

    Examples
      $ dogecoin-spv start --regtest
      
`, {
  flags: {
    regtest: {
      type: 'boolean',
      alias: 'r'
    },
    dogeev: {
      type: 'boolean',
      alias: 'e'
    },
    dev: {
      type: 'boolean',
      alias: 'd'
    }
  }
})

if (cli.input[0] !== 'start') {
  cli.showHelp()
}

let network = networks.TESTNET

if (cli.flags.regtest) {
  network = networks.REGTEST
}

if (cli.flags.dogeev) {
  network = networks.DOGEEV
}

app({ network, dev: cli.flags.dev })
  .catch(function (err) {
    console.error(err)
  })
