# IsTorExit

Check if an IP is a Tor exit node.

[![npm version](https://badge.fury.io/js/istorexit.svg)](https://badge.fury.io/js/istorexit) [![CircleCI](https://circleci.com/gh/assafmo/IsTorExit.svg?style=shield&circle-token=5a80e4447cbbdbd5d740a1679fee6a7799f22da7)](https://circleci.com/gh/assafmo/IsTorExit)

# Usage

## CLI

```bash
$ npm install -g istorexit
$ istorexit --help
NAME
  istorexit - Check if an IP is a Tor exit node

SYNOPSIS
  istorexit [options] [IP...]

OPTIONS
  --dest-ip
      The target IP to which the Tor exit node communicates
      (default: "216.58.206.110")

  --dest-port
      The target TCP port in "--dest-ip" to which the Tor exit node communicates
      (default: 443)
      (a number)

  -h, --help
      Print this message and exit
$ istorexit --dest-ip 185.60.216.35 1.0.1.1 --dest-port 443 1.1.1.1 1.2.1.1 1.3.1.1 1.4.1.1 1.5.1.1 104.200.20.46
1.0.1.1 false
1.1.1.1 false
1.2.1.1 false
1.3.1.1 false
1.4.1.1 false
1.5.1.1 false
104.200.20.46 true
```

## NodeJs

```javascript
const IsTorExit = require("istorexit");
IsTorExit("104.200.20.46").then(console.log); // true
IsTorExit("1.1.1.1").then(console.log); // false

IsTorExit("104.200.20.46", "185.60.216.35").then(console.log); // true
IsTorExit("1.1.1.1", "185.60.216.35").then(console.log); // false

IsTorExit("104.200.20.46", "185.60.216.35", 80).then(console.log); // true
IsTorExit("1.1.1.1", "185.60.216.35", 80).then(console.log); // false
```

# License

[MIT](/LICENSE)
