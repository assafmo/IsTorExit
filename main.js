#!/usr/bin/env node
const { promisify } = require("util");
const lookup = promisify(require("dns").lookup);

const defaultIpDest = "216.58.206.110"; // google.com
const defaultPortDest = 443; // https

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
      `${reverseIp(ipToCheckIfTor)}.${portDest || defaultPortDest}.${reverseIp(
        ipDest || defaultIpDest
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
  const flags = require("flags");
  flags.defineString(
    "dest-ip",
    defaultIpDest,
    "The target IP to which the Tor exit node communicates"
  );
  flags.defineNumber(
    "dest-port",
    defaultPortDest,
    'The target TCP port in "dest-ip" to which the Tor exit node communicates'
  );
  flags.defineMultiString("ip", null, "The IP to check if is a Tor exit node");
  flags.parse();

  const ips = flags.get("ip");
  if (!ips) {
    flags.help();
    console.log("Must provide at least one --ip");
    process.exit(1);
  }

  (async () => {
    for (const ip of flags.get("ip")) {
      if (ip == null) {
        continue;
      }

      try {
        await isTorExit(ip, flags.get("dest-ip"), flags.get("dest-port"), true);
      } catch (e) {
        throw e;
      }
    }
  })();
}
