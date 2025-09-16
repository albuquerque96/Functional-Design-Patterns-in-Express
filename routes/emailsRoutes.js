const express = require("express");
const emailsRouter = express.Router();
const emails = require("../fixtures/emails.json");

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




emailsRouter.get("/", getEmailsRoute);
emailsRouter.get("/from/:sender/to/:recipient", getEmailsFromTo);
emailsRouter.get("/:id", getEmailRoute);

module.exports = emailsRouter