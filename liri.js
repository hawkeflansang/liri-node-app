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
    };
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

function songQuery() {
    var song = "";
    for (var i = 3; i < searched.length; i++) {
        if (i > 3 && i < searched.length) {
            song = song + "+" + searched[i];
        } else {
            song += searched[i];
        }
    };
    spotify.search({ type: "track", query: song}, function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Song " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name);

    });
}

function movieQuery() {
    var movie = "";
    for (var i = 3; i < searched.length; i++) {
        if (i > 3 && i < searched.length) {
            movie = movie + "+" + searched[i];
        } else {
            movie += searched[i];
        }
    };
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(function(response){
        console.log("Title: ", response.data.Title);
        console.log("Year: ", response.data.Year);
        console.log("IMDB Rating: ", response.data.imdbRating);
        console.log("Rotten Tomatoes: ", response.data.Ratings[1].Value);
        console.log("Country: ", response.data.Country);
        console.log("Language: ", response.data.Language);
        console.log("Plot: ", response.data.Plot);
        console.log("Actors: ", response.data.Actors);
    }).catch(function (err) {
        console.log(err);
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        songQuery(data);
    })
}