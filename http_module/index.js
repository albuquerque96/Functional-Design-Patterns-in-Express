const express = require("express");
const users = require("../fixtures/users.json");
const emails = require("../fixtures/emails.json");
const {sendFormattedResponse} = require("./utils");
const PORT = process.env.PORT || 3000;
let app = express();

app.use((req, res) => {
  //console.log(req.headers.accept);
  let route = req.method + " " + req.url;
  if (route === "GET /users") {
   sendFormattedResponse(req, res,users);
  } else if (route === "GET /emails") {
    sendFormattedResponse(req,res,emails);
  } else {
    res.end("You asked for " + route);
  }
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("listening on port " + PORT);
});
