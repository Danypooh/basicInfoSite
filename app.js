const http = require("node:http");
const fs = require("fs");

const hostname = "localhost";
const port = 8080;

const server = http.createServer();

server.on("request", (req, res) => {
  const fileName =
    req.url === "/" || req.url === "/index"
      ? "./pages/index.html"
      : req.url === "/about"
      ? "./pages/about.html"
      : req.url === "/contact-me"
      ? "./pages/contact-me.html"
      : "./pages/404.html";

  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
