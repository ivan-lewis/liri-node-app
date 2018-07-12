//Node packages-variables
require("dotenv").config();
var fs = require('fs');
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Input variables
var command = process.argv[2];
var criteria = process.argv.slice(3).join(" ");

// Twitter function
function grabTweets() {
    client.get('statuses/user_timeline', params = { screen_name: criteria }, function (error, tweets, response) {
        if (!error && response.statusCode === 200) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(
                    "================" +
                    "\nTweet: " + tweets[i].text +
                    "\nDate Created: " + tweets[i].created_at
                );
            };
        }
    });
};

// Spotify function
function spotification() {
    spotify.search({ type: 'track', query: criteria, count: 1 }, function (err, data){
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var j = 0; j < data.tracks.items.length; j++) {
            console.log(
                "================" +
                "\nArtist(s): " + data.tracks.items[j].album.artists[0].name + 
                "\nSong: " + data.tracks.items[j].name +
                "\nSpotify Preview: " + data.tracks.items[j].preview_url +
                "\nAlbum: " + data.tracks.items[j].album.name
            );
        }
    })
};

// Movie function
function getMovie() {
    request("http://www.omdbapi.com/?t=" + criteria + "&y=&plot=short&apikey=trilogy",
        function (error, response, body) {
            // Error handling
            if (!error && response.statusCode === 200) {
                var movie = JSON.parse(body);
                console.log(
                    "================" +
                    "\nMovie Title: " + movie.Title +
                    "\nRelease Year: " + movie.Year +
                    "\nIMDB Rating: " + movie.imdbRating +
                    "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value +
                    "\nCountry Produced in: " + movie.Country +
                    "\nLanuag e: " + movie.Language +
                    "\nPlot: " + movie.Plot +
                    "\nActors: " + movie.Actors
                );
            }
        })
};

//Switch to handle the type of command
switch (command) {
    case 'my-tweets':
        grabTweets();
        break;
    case 'spotify-this-song':
        spotification();
        break;
    case 'movie-this':
        getMovie();
        break;
    case 'do-what-it-says':
        dowhatitsays();
        break;
};
