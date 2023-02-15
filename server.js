// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const logger = require("./lib/logger");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl).catch((e) => {
        next(e);
        logger.log("error", "next error", e);
      });
    } catch (err) {
      logger.log("error", "Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(3000, (error) => {
    if (error) logger.log("error", error);
  });
});
