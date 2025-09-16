const express = require("express");
const users = require("../fixtures/users.json");
const emails = require("../fixtures/emails.json");
const { sendFormattedResponse } = require("./utils");
const PORT = process.env.PORT || 3000;
let app = express();
const router = express.Router();

let getUsersRoute = (req, res) => {
  res.send(users);
};
let getUserRoute = (req, res) => {
  let user = users.find((user) => user.id === req.params.id);
  res.send(user);
};
let getEmailsRoute = (req, res) => {
  res.send(emails);
};
let getEmailRoute = (req, res) => {
  let email = emails.find((email) => email.id === req.params.id);
  res.send(email);
};
let noRouteFound = (req, res) => {
  let route = req.method + " " + req.url;
  res.end(res.end("You asked for " + route));
};
router.get("/users", getUsersRoute);
router.get("/emails", getEmailsRoute);
router.get("/users/:id", getUserRoute);
router.get("/emails/from/:sender/to/:recipient", (req, res) => {
  console.log(req.params);
});
router.get("/emails/:id", getEmailRoute);

app.use(router);

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("listening on port " + PORT);
});
