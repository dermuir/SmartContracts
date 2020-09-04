var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/factura.js");
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:8080'}));
app.use("/factura", routes);

const PORT = process.env.PORT || 3600;

var server = app.listen(PORT, function () {
    console.log("app running on port.", PORT); 
}); 