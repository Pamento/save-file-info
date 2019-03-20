require('custom-env').env();
const express        = require('express');
const bodyParser     = require('body-parser');
const cors           = require('cors');
const path = require("path");
const port = process.env.NODE_PORT || 8080;

const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require('./app/routes/routes');
app.use('/',routes);
// Serve any static files built by React
// app.use(express.static(path.join(__dirname, "client/build")));

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

app.listen(port, () => console.log(`Listening on port ${port}`));