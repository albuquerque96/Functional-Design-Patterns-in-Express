const express = require("express");
const users = require("../fixtures/users.json");
const emails = require("../fixtures/emails.json");
const { sendFormattedResponse } = require("./utils");
const PORT = process.env.PORT || 3000;
let app = express();
const emailsRouter = express.Router();
const usersRouter = express.Router();

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

let getEmailsFromTo = (req, res) => {
  let { sender,recipient } = req.params;
  let emailsFromTo = emails.find((email) => email.from === sender && email.to === recipient);
  console.log(emailsFromTo);
  res.status(200).json(emailsFromTo);
};

usersRouter.get("/users", getUsersRoute);
usersRouter.get("/users/:id", getUserRoute);

emailsRouter.get("/emails", getEmailsRoute);
emailsRouter.get("/emails/from/:sender/to/:recipient", getEmailsFromTo);
emailsRouter.get("/emails/:id", getEmailRoute);

app.use(usersRouter);
app.use(emailsRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("listening on port " + PORT);
});
