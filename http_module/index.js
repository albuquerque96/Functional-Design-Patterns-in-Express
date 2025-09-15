const express = require("express");
const users = require("../fixtures/users.json");
const emails = require("../fixtures/emails.json");
const { sendFormattedResponse } = require("./utils");
const PORT = process.env.PORT || 3000;
let app = express();

let getUsersRoute = (req, res) => {
  res.send(users);
};

let getEmailsRoute = (req, res) => {
  res.send(emails);
};
let noRouteFound = (req, res) => {
  let route = req.method + " " + req.url;
  res.end(res.end("You asked for " + route));
};
let routes = {
  "GET /users": getUsersRoute,
  "GET /emails": getEmailsRoute,
};
let router = (req, res) => {
  //console.log(req.headers.accept);
  let route = req.method + " " + req.url;
  let handler = routes[route]||noRouteFound;
  handler(req, res);
}
app.use(router);

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("listening on port " + PORT);
});
