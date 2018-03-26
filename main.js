#!/usr/bin/env node
const request = require("request-promise");

let exitNodes;
async function refresh() {
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

async function isTorExit(ip, print) {
  if (!exitNodes) {
    await refresh();
  }

  const answer = exitNodes.has(ip);
  if (print) {
    console.log(ip, answer);
  }
  return answer;
}

module.exports = { isTorExit, refresh };

if (require.main === module) {
  (async () => {
    for (const ip of process.argv.slice(2)) {
      isTorExit(ip, true);
    }
  })();
}
