#!/usr/bin/env node
const request = require("request-promise");
const validateIP = require("validate-ip-node");

let exitNodes;
async function isTorExit(ip, print) {
  if (!validateIP(ip)) {
    if (print) {
      console.log(ip, false);
    }
    return false;
  }

  if (!exitNodes) {
    const exitNodesText = await request(
      "https://check.torproject.org/cgi-bin/TorBulkExitList.py?ip=8.8.8.8"
    );

    exitNodes = new Set(
      exitNodesText
        .split("\n")
        .filter(line => line[0] != "#")
        .map(line => line.replace(/\r/g, ""))
    );
  }

  const answer = exitNodes.has(ip);
  if (print) {
    console.log(ip, answer);
  }
  return answer;
}

module.exports = isTorExit;

if (process.argv.length > 2) {
  (async () => {
    for (const ip of process.argv.slice(2)) {
      isTorExit(ip, true);
    }
  })();
}
