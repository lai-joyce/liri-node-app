var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var apiKeys = require("./keys.js");

// console.log(apiKeys);

var twitterClient = new Twitter(apiKeys.twitterKeys);
var spotifyClient = new Spotify(apiKeys.spotifyKeys);

var params = process.argv;

// var action = process.argv[2];
// var song = process.argv[3];

// var runAction = function() {

	switch(params[2]) {
		case "my-tweets":

		getTweets(); 

		break;

		case "spotify-this-song":

		spotifyIt(params.slice(3).join(" "));

		break;

		case "movie-this":

		grabMovieInfo(params.slice(3).join(" "));

		break;

		case "do-what-it-says":

		followTheText();

		break;
	}

// }




function getTweets() {

	twitterClient.get('statuses/user_timeline', { screen_name: 'dovesnunicorns', count: 20 }, 
		function(error, tweets, response) {
			if (!error) {
				for (var i = 0; i < tweets.length; i++ ) {
					console.log(tweets[i].text);
					console.log(tweets[i].created_at)

						// console.log(tweets);
					}

				}
				else {
					console.log("ERROR: " + error);
				}
			});
}

function spotifyIt(song) {


// 	for (var i = 3; i < params.length; i++) {

//   // Build a string with the arguments.
//   song = song + " " + params[i];

// }

	// song = params.slice(3).join(" ");

		// console.log("this song is : " + song)
		
		if(!song) song = "The Sign Ace of Base";
	// }
	// console.log(song)

	spotifyClient.search({ type: 'track', query: song }, function(err, data) {
		
		// console.log(JSON.stringify(data, null, 2));
		if ( err ) {
			console.log('Error occurred: ' + err);
	        return;  //from spotify npm docs
	    }

	    else{
	    	var songInfo = data.tracks.items[0];
	    	var songResult = console.log(songInfo.artists[0].name)
	    	console.log(songInfo.name)
	    	console.log(songInfo.album.name)
	    	console.log(songInfo.preview_url)
	    // console.log(songResult);
	};
});
}

function grabMovieInfo(movie) {
	// var movieName = process.argv[3];
	// movie = params.slice(3).join(" ");
	if(!movie) movie = "Mr. Nobody";

	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

// console.log(queryUrl);

request(queryUrl, function(error, response, body) {
	// console.log(JSON.parse(body));

	if (!error && response.statusCode === 200) {

		console.log("Movie: " + JSON.parse(body).Title);
		console.log("Release Year: " + JSON.parse(body).Year);
		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		console.log("Country Produced: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Actors: " + JSON.parse(body).Actors);

	}
});
}

function followTheText() {

	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
			return console.log(error);
		}

		// console.log(data);

		var dataArr = data.split(",");

		// console.log(dataArr);


		
		if (dataArr[0] === "spotify-this-song") {
			spotifyIt(dataArr[1]);
		}
		
		else {
			grabMovieInfo(dataArr[1]);
		}
		

	});
}
