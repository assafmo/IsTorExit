# IsTorExit

Check if an IP is a Tor exit node.

[![npm version](https://badge.fury.io/js/istorexit.svg)](https://badge.fury.io/js/istorexit)

# Usage

## CLI

### Synopsis

```
istorexit [--dest-ip <my_ip>] [--dest-port <my_port>] [--ip <ip_to_check>...]
```

### Install & run

```bash
$ npm install -g istorexit
$ istorexit --help
Options:
  --dest-ip: The target IP to which the Tor exit node communicates
    (default: "216.58.206.110")
  --dest-port: The target TCP port in "dest-ip" to which the Tor exit
    node communicates
    (default: 443)
    (a number)
  --ip: The IP to check if is a Tor exit node
    (default: null)
$ istorexit --dest-ip 185.60.216.35 --dest-port 443 --ip 1.1.1.1 --ip 1.2.1.1 --ip 1.3.1.1 --ip 1.4.1.1 --ip 1.5.1.1 --ip 104.200.20.46
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
