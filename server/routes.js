const unirest = require("unirest");
const mime = require("mime-types");
const { getImages, getSentences } = require("./api");
const { getFile, getListFile, validStr } = require("./utils");

const set = async (str) => {
  let data = await getFile("settings.json");
  data = await JSON.parse(data);
  return new Promise((resolve, reject) => {
    resolve(data[str]);
  });
};

const Home = async (req, res) => {
  res.render("layout", {
    title: await set("title"),
    titlePage: "",
    favicon: await set("favicon"),
    bodyClass: "homefirstpage",
    type: "",
  });
};

module.exports = { Home };
