const express = require("express");
const app = express();
function getResponseType(req) {
 return  req.accepts(["json", "xml", "csv"]);
} 
module.exports = getResponseType;
