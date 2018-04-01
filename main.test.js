const IsTorExit = require(require("path").join(__dirname, "main.js"));
const request = require("request-promise");

const defaultDestinationIp = "216.58.206.110"; // google.com
const defaultDestinationPort = 443; // https

describe("Not exit nodes", () => {
  test("google", async done => {
    const result = await IsTorExit(defaultDestinationIp);
    expect(result).toBe(false);
    done();
  });

  test("facebook", async done => {
    const result = await IsTorExit("185.60.216.35");
    expect(result).toBe(false);
    done();
  });
});

// TODO: make it work. about 5% of the ips from the exported list
// are returning as false

// describe("Exit nodes", () => {
// const ips = require("fs")
//   .readFileSync(require("path").join(__dirname, "ips.txt"), {
//     encoding: "utf8"
//   })
//   .split("\n")
//   .map(line => line.replace(/\r/g, "").trim())
//   .filter(line => line[0] != "#" && line)
//   .slice(0, 100);
// for (const ip of ips) {
//   test(
//     ip,
//     done => {
//       IsTorExit(ip)
//         .then(result => expect(result).toBe(true))
//         .then(done);
//     },
//     15000
//   );
// }
// });
