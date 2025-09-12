const http = require("http");

const PORT =  process.env.PORT || 3000;

let server = http.createServer((req, res) => {
  let route = req.method + " " + req.url;
  res.end("you asked for " + route);
});

server.listen(PORT,(error)=>{
  if (error) {
    console.log(error);
  }
  console.log("listening on port "+ PORT);
});
