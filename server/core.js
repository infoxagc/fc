const serverless = require("serverless-http");
const express = require("express");
const fs = require("fs");

const app = express();
app.use("/assets", express.static("assets"));
app.engine("pug", require("pug").__express);
app.set("view engine", "pug");
app.disable("x-powered-by");
app.enable("trust proxy");

const getFile = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(process.cwd() + "/" + path, "utf-8", (err, data) => {
      if (err) {
        resolve("err");
      } else {
        resolve(data);
      }
    });
  });
};

const set = async (str) => {
  let data = await getFile("settings.json");
  data = await JSON.parse(data);
  return new Promise((resolve, reject) => {
    resolve(data[str]);
  });
};

app.get("/", async (req, res) => {
  res.render("layout", {
    title: await set("title"),
    titlePage: "",
    favicon: await set("favicon"),
    bodyClass: "homefirstpage",
    type: "",
  });
});

module.exports = app;
module.exports.handler = serverless(app);
