#!/usr/bin/env node
const { promisify } = require("util");
const lookup = promisify(require("dns").lookup);

async function isTorExit(ip, print) {
  let address;
  try {
    const result = await lookup(
      `${ip
        .split(".")
        .reverse()
        .join(".")}.6667.4.3.2.1.ip-port.exitlist.torproject.org`
    );
    address = result.address;
  } catch (e) {
    if (e.code == "ENOTFOUND") {
      if (print) {
        console.log(ip, false);
      }
      return false;
    } else {
      throw e;
    }
  }

  if (!address) {
    if (print) {
      console.log(ip, false);
    }
    return false;
  }

  const answer = address.startsWith("127.0.0.") && address != "127.0.0.1";
  if (print) {
    console.log(ip, answer);
  }
  return answer;
}

module.exports = isTorExit;

if (require.main === module) {
  (async () => {
    for (const ip of process.argv.slice(2)) {
      try {
        await isTorExit(ip, true);
      } catch (e) {
        throw e;
      }
    }
  })();
}
