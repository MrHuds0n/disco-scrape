var express = require("express")
var fs      = require("fs")
var request = require("request")
var cheerio = require("cheerio")

var port = process.env.PORT || 3000;

//Initialize Express
var app     = express()

//Frontend dependencies
var stylus = require('stylus')
var nib = require('nib')

//Stylus+nib compile
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
//View engine
app.set('view engine', 'pug');

//Public stylesheets and scripts
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'))

//DiscoveryGC players list url
require("./routes.js")(app, request, cheerio)

app.listen(port)

console.log("Fired on port 3000.")
exports = module.exports = app;
