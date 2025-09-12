const http = require("http");

const PORT = process.env.PORT || 3000;
const users = require("../fixtures/users.json");
const emails = require("../fixtures/emails.json");

let server = http.createServer((req, res) => {
  let route = req.method + " " + req.url;
  if (route === "GET /users") {
    res.end(JSON.stringify(users));
  } else if (route === "GET /emails") {
    res.end(JSON.stringify(emails));
  } else {
    res.end("You asked for " + route);
  }
});

server.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("listening on port " + PORT);
});
