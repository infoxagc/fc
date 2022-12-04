const serverless = require("serverless-http");
const express = require("express");
const { Home } = require("./routes");

const app = express();
app.use("/assets", express.static("assets"));
app.set("view engine", "pug");

app.get("/", Home);

app.disable("x-powered-by");
app.enable("trust proxy");
module.exports = app;
module.exports.handler = serverless(app);
