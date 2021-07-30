const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");
const { name } = require("./package.json");

module.exports = (job, settings, action, type) => {
  if (type != "prerender") {
    throw new Error(
      `Action ${name} can be only run in prerender mode, you provided: ${type}.`
    );
  }

  if (!action.output) {
    throw new Error("No action.output value was provided.");
  }

  return new Promise((resolve, reject) => {
    fs.createReadStream(job.template.dest)
      .pipe(unzipper.Extract({ path: job.workpath }))
      .on("close", () => {
        job.template.dest = path.join(
          job.workpath,
          path.basename(action.output)
        );
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
