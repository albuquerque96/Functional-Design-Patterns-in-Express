const express = require("express");

const { sendFormattedResponse } = require("./utils");
const PORT = process.env.PORT || 3000;
let app = express();
const emailsRouter = require("../routes/emailsRoutes")
const usersRouter = require("../routes/usersRoutes.js");

app.use("/users",usersRouter);
app.use("/emails",emailsRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("listening on port " + PORT);
});
