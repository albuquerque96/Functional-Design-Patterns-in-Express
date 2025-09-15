const csv = require("csv");
const { response } = require("express");
const xmlbuilder = require("xmlbuilder");
const getResponseType = require("./different_responses")

async function sendFormattedResponse(req, res, data) {
  const responseType = getResponseType(req);
  switch (responseType) {
    case "application/xml":
      const xml = await jsonToXml(data);
      res.type(responseType)
      res.send(xml);
      break;
    case "text/csv":
      const csv = await jsonToCsv(data);
      res.type(responseType)
      res.send(csv);
      break;
    case "json":
      default:
        res.type(responseType)
        res.json(data);
        break;
  }
}

function jsonToCsv(data) {
  return new Promise((resolve, reject) => {
     csv.stringify(data, (error, csv) => {
      if (error) {
        reject(error);
      }
      resolve(csv);
    });
  });
}

function jsonToXml(data, rootElement = "root") {
  const xml = xmlbuilder.create(rootElement);
  if (Array.isArray(data)) {
    data.forEach((item) => {
      xml.ele("item", item);
    });
  } else {
    xml.ele("item", data);
  }
  return xml.end({ pretty: true });
}

module.exports = {sendFormattedResponse}