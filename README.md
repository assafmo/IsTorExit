# IsTorExit

Check if an IP is a Tor exit node.

[![npm version](https://badge.fury.io/js/istorexit.svg)](https://badge.fury.io/js/istorexit)

# Usage

## CLI

```bash
npm install -g istorexit
istorexit [ip...]
```

## NodeJs

```javascript
const IsTorExit = require("istorexit");
IsTorExit("104.200.20.46").then(console.log); // true
IsTorExit("1.1.1.1").then(console.log); // false
```
