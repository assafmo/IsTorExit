#!/usr/bin/env node
const { promisify } = require("util");
const lookup = promisify(require("dns").lookup);

const defaultDestinationIp = "216.58.206.110"; // google.com
const defaultDestinationPort = 443; // https

function reverseIp(ip) {
  return ip
    .split(".")
    .reverse()
    .join(".");
}

// https://www.torproject.org/projects/tordnsel.html
async function isTorExit(ipToCheckIfTor, ipDest, portDest, print) {
  let outputAddress;
  try {
    const result = await lookup(
      `${reverseIp(ipToCheckIfTor)}.${portDest ||
        defaultDestinationPort}.${reverseIp(
        ipDest || defaultDestinationIp
      )}.ip-port.exitlist.torproject.org`
    );
    outputAddress = result.address;
  } catch (e) {
    if (e.code == "ENOTFOUND") {
      if (print) {
        console.log(ipToCheckIfTor, false);
      }
      return false;
    } else {
      throw e;
    }
  }

  if (!outputAddress) {
    if (print) {
      console.log(ipToCheckIfTor, false);
    }
    return false;
  }

  const answer =
    outputAddress.startsWith("127.0.0.") && outputAddress != "127.0.0.1";
  if (print) {
    console.log(ipToCheckIfTor, answer);
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
  --dest-ip
      The target IP to which the Tor exit node communicates
      (default: "216.58.206.110")

  --dest-port
      The target TCP port in "dest-ip" to which the Tor exit node communicates
      (default: 443)
      (a number)

  -h, --help
      Print this message and exit`;

  let destIp = defaultDestinationIp;
  let destPort = defaultDestinationPort;
  const ips = [];

  for (let i = 0; i < cmdArgs.length; i++) {
    if (cmdArgs[i] == "-h" || cmdArgs[i] == "--help") {
      console.log(helpMesg);
      process.exit(0);
    }

    if (cmdArgs[i] == "--dest-ip" && cmdArgs[i + 1]) {
      destIp = cmdArgs[i + 1];
      i++;
      continue;
    }

    if (cmdArgs[i] == "--dest-port" && cmdArgs[i + 1]) {
      destPort = cmdArgs[i + 1];
      i++;
      continue;
    }

    ips.push(cmdArgs[i]);
  }

  (async () => {
    for (const ip of ips) {
      if (ip == null) {
        continue;
      }

      try {
        await isTorExit(ip, destIp, destPort, true);
      } catch (e) {
        throw e;
      }
    }
  })();
}
