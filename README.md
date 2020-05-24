# IsTorExit

Check if an IP is a Tor exit node.

[![npm version](https://badge.fury.io/js/istorexit.svg)](https://badge.fury.io/js/istorexit) [![CircleCI](https://circleci.com/gh/assafmo/IsTorExit.svg?style=shield&circle-token=623500f4b3622a23c93c0141dcd8f3f5e9e17ee6)](https://circleci.com/gh/assafmo/IsTorExit)

# Usage

## CLI

```console
$ npm install -g istorexit
$ istorexit --help
NAME
  istorexit - Check if an IP is a Tor exit node

SYNOPSIS
  istorexit [options] [IP...]

OPTIONS
  -h, --help
      Print this message and exit
$ istorexit 1.1.1.1 1.2.1.1 1.3.1.1 1.4.1.1 1.5.1.1 104.200.20.46
1.1.1.1 false
1.2.1.1 false
1.3.1.1 false
1.4.1.1 false
1.5.1.1 false
104.200.20.46 true
```

## NodeJs

```js
const IsTorExit = require("istorexit");
IsTorExit("104.200.20.46").then(console.log); // true
IsTorExit("1.1.1.1").then(console.log); // false
```
