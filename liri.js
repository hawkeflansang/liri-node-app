require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var userCommand = process.argv[2];
var searched = process.argv;

switch (userCommand) {
    case "concert-this":
        concertQuery();
        break;

    case "spotify-this-song":
        songQuery();
        break;

    case "movie-this":
        movieQuery();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("Please choose a defined command.");
}

function concertQuery() {
    var artist = "";
    for (var i = 3; i < searched.length; i++) {
        if (i > 3 && i < searched.length) {
            artist = artist + "+" + searched[i];
        } else {
            artist += searched[i];
        }
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function(response) {
        //console.log(queryUrl);
        //console.log()
        console.log("Venue Name: " + response.data[0].venue.name);
        console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
        console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
    }).catch(function (err) {
        console.log(err);
    });
}

function songQuery()