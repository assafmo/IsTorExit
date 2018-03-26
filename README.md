# IsTorExit

Check if IP is a Tor exit node.

[![npm version](https://badge.fury.io/js/istorexit.svg)](https://badge.fury.io/js/istorexit)

# Install

```bash
npm install -g istorexit
```

# Usage

```bash
istorexit [ip...]
```

```javascript
const IsTorExit = require("istorexit");
IsTorExit("104.200.20.46").then(console.log); // true
```
