const unirest = require("unirest");
const mime = require("mime-types");
const { getImages, getSentences } = require("./api");
const { getFile, getListFile, validStr } = require("./utils");

const Routes = async (req, res, next) => {
  let dataSetting = await getFile("settings.json");
  dataSetting = await JSON.parse(dataSetting);
  let proto = req.headers["x-forwarded-proto"];
  if (proto) {
    proto = proto;
  } else {
    proto = "http";
  }
  let originUrl = (await proto) + "://" + req.headers.host;
  let fullUrl = (await originUrl) + req.url;
  try {
    if (
      (req.url.split("/assets/")[1] == undefined) == false &&
      req.method === "GET"
    ) {
      // File assets
      let dataFile = req.url.split("/assets/")[1];
      if (dataFile.length > 0) {
        let files = await getListFile("assets");
        let fixFile = "";
        for (let aa of files) {
          if (aa == "assets/" + dataFile) {
            fixFile = aa;
          }
        }
        if (fixFile.length > 0) {
          let typeMime = mime.lookup(fixFile);
          if (typeMime) {
            let data = await getFile(fixFile);
            res.writeHead(200, { "Content-Type": typeMime });
            res.write(Buffer.from(data).toString("utf8"));
            res.end();
          } else {
            res.end("404");
          }
        } else {
          res.end("404");
        }
      } else {
        res.end("404");
      }
    } else if (req.url == "/" && req.method === "GET") {
      res.render("layout", {
        title: dataSetting["title"],
        titlePage: "",
        favicon: dataSetting["favicon"],
        bodyClass: "homefirstpage",
        type: "",
      });
    } else if (
      req.url == "/p/contact" ||
      (req.url == "/p/contact/" && req.method === "GET")
    ) {
      res.render("layout", {
        title: dataSetting["title"],
        titlePage: "Contact Us",
        favicon: dataSetting["favicon"],
        bodyClass: "",
        type: "contact",
      });
    }
  } catch (e) {
    console.log(e);
  }

  next();
};

module.exports = Routes;
