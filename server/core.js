const serverless = require("serverless-http");
const express = require("express");
const { getFile, getListFile, validStr } = require("./utils");

const app = express();
app.use("/assets", express.static("assets"));
app.set("view engine", "pug");

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

app.disable("x-powered-by");
app.enable("trust proxy");
module.exports = app;
module.exports.handler = serverless(app);
