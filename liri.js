var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var apiKeys = require("./keys.js");

console.log(apiKeys);

var twitterClient = new Twitter(apiKeys.twitterKeys);
var spotifyClient = new Spotify(apiKeys.spotifyKeys);

var params = process.argv

switch(params[2]) {
	case "my-tweets": 
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

	break;
	
case "spotify-this-song":

var song = "";

// 	for (var i = 3; i < params.length; i++) {

//   // Build a string with the arguments.
//   song = song + " " + params[i];

// }

song = params.slice(3).join(" ");
// console.log("song: " + song);
if(!song) song = "The Sign Ace of Base";

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

break;
case "movie-this":
var movieName = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

console.log(queryUrl);

// request(queryUrl, function(error, response, body) {

//   if (!error && response.statusCode === 200) {
  
//   console.log("Release Year: " + JSON.parse(body).Year);

//   }
// });

break;

case "do-what-it-says":

break;
}