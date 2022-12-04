const serverless = require("serverless-http");
const express = require("express");
const Routes = require("./routes");

const app = express();
app.set("view engine", "pug");
app.disable("x-powered-by");
app.enable("trust proxy");
app.use(Routes);

module.exports = app;
module.exports.handler = serverless(app);
