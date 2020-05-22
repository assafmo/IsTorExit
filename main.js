#!/usr/bin/env node
const { promisify } = require("util");
const lookup = promisify(require("dns").lookup);

function reverseIp(ip) {
  return ip
    .split(".")
    .reverse()
    .join(".");
}

// https://www.torproject.org/projects/tordnsel.html
async function isTorExit(ip, print) {
  let outputAddress;
  try {
    const result = await lookup(`${reverseIp(ip)}.dnsel.torproject.org`);
    outputAddress = result.address;
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

  if (!outputAddress) {
    if (print) {
      console.log(ip, false);
    }
    return false;
  }

  const answer =
    outputAddress.startsWith("127.0.0.") && outputAddress != "127.0.0.1";
  if (print) {
    console.log(ip, answer);
  }
  return answer;
}

module.exports = isTorExit;

if (require.main === module) {
  const cmdArgs = process.argv.slice(2);
  const helpMesg = `NAME
  istorexit - Check if an IP is a Tor exit node

SYNOPSIS
  istorexit [options] [IP...]

OPTIONS
  -h, --help
      Print this message and exit`;

  if (cmdArgs.length == 0) {
    console.log(helpMesg);
    process.exit(0);
  }

  const ips = [];

  for (let i = 0; i < cmdArgs.length; i++) {
    if (cmdArgs[i] == "-h" || cmdArgs[i] == "--help") {
      console.log(helpMesg);
      process.exit(0);
    }

    ips.push(cmdArgs[i]);
  }

  (async () => {
    for (const ip of ips) {
      if (ip == null) {
        continue;
      }

      try {
        await isTorExit(ip, true);
      } catch (e) {
        throw e;
      }
    }
  })();
}
