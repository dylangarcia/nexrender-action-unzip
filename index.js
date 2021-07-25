const fs = require("fs");
const unzipper = require("unzipper");
const { name } = require("./package.json");

module.exports = (job, settings, action, type) => {
  if (type != "prerender") {
    throw new Error(
      `Action ${name} can be only run in prerender mode, you provided: ${type}.`
    );
  }

  if (!settings.output) {
    throw new Error('No settings.output value was provided.');
  }

  return new Promise((resolve, reject) => {
    fs.createReadStream(job.template.dest)
      .pipe(unzipper.Extract({ path: job.workpath }))
      .on("close", () => {
        job.template.dest = settings.output;
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};