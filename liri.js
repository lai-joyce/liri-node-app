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

		grabMovieInfo();

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

	// console.log(song);

	// var song = "";
	// console.log(arguments);


// 	for (var i = 3; i < params.length; i++) {

//   // Build a string with the arguments.
//   song = song + " " + params[i];

// }

	

	// if(arguments[0]){
	// 	song = arguments[0];
	// } 
	// else{
		// song = params.slice(3).join(" ");

		// console.log("params: " + params);

		// console.log("this song is : " + song)
		// console.log("song: " + song);
		if(!song) song = "The Sign Ace of Base";
	// }
	// console.log(song)

	spotifyClient.search({ type: 'track', query: song }, function(err, data) {
		// console.log(song, 'SONGSONGSONG')
		// console.log('typeof', typeof song === typeof "The Sign Ace of Base")
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

function grabMovieInfo() {
	// var movieName = process.argv[3];
	movie = params.slice(3).join(" ");
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

// function followTheText() {
//      fs.readFile("random.txt", "utf8", function(error, data)
//      {
//      	// If an error was experienced we say it.
//      	if(error){
//      		console.log(error);
//      	}
//           else {
//                var dataArray = data.split(',');
//                var argOne = dataArray[0];
//                var argTwo = dataArray[1];
//                switch(argOne) {
//                     case "my-tweets":
//                          getTweets();
//                          break;
//                     case "spotify-this-song":
//                        var queryInput = "the sign ace of base";
//                        if (argTwo !== undefined){
//                            queryInput = argTwo;
//                        }
                         // function spotifyIt() {
                         //      var queryInput = "the sign ace of base";
                         //      if (argTwo !== undefined){
                         //           queryInput = argTwo;
                         //      }
                         //      console.log('TYPE', typeof queryInput);
                         //      spotifyClient.search({ type: 'track', query: queryInput }, function(err, data) {
                         //           if ( err ) {
                         //                console.log('Error occurred: ' + err);
                         //                return;
                         //           } else {
                         //           		console.log(data)
                         //           }

                         //           // console.log("Artist: " + data.tracks.items[0].artists[0].name);
                         //           // console.log("Song Name: " + data.tracks.items[0].name);
                         //           // console.log("Spotify Preview Link: " + data.tracks.items[0].preview_url);
                         //           // console.log("Album: " + data.tracks.items[0].album.name);
                         //           // fs.appendFile('log.txt', "Artist: " + data.tracks.items[0].artists[0].name + "\n" + 
                         //           // 	"Song Name: " + data.tracks.items[0].name + "\n" + "Spotify Preview Link: " + 
                         //           // 	data.tracks.items[0].external_urls.spotify + "\n" + "Album: " + 
                         //           // 	data.tracks.items[0].album.name + "\n" + "=================================================================");
                         //      });
                         // }
                    //      spotifyIt(queryInput);
                    //      break;
                    // case "movie-this":
                    //      function grabMovieInfo() {
                    //           var queryInput = "Mr. Nobody";
                    //           if (argTwo !== undefined) {
                    //                queryInput = argTwo;
                    //           }
                    //           request('http://www.omdbapi.com/?t=' + queryInput + "&tomatoes=true", function (error, response, body) {
                    //                if (!error && response.statusCode == 200) {
                    //                     var movieData = JSON.parse(body);
                    //                     console.log("Title: " + movieData.Title);
                    //                     console.log("Year: " + movieData.Year);
                    //                     console.log("IMDB Rating: " + movieData.imdbRating);
                    //                     console.log("Country: " + movieData.Country);
                    //                     console.log("Language: " + movieData.Language);
                    //                     console.log("Plot: " + movieData.Plot);
                    //                     console.log("Actors: " + movieData.Actors);
                    //                     console.log("Rotten Tomatoes Rating: " + movieData.tomatoUserRating);
                            		     // console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);
                                   //      fs.appendFile('log.txt', "Title: " + movieData.Title + "\n" + "Year: " + movieData.Year + "\n" + 
                                   //      	"IMDB Rating: " + movieData.imdbRating + "\n" + "Country: " + movieData.Country + 
                                   //      	"\n" + "Language: " + movieData.Language + "\n" + "Plot: " + movieData.Plot + "\n" + 
                                   //      	"Actors: " + movieData.Actors + "\n" + "Rotten Tomatoes Rating: " + movieData.tomatoUserRating + "\n" + 
                                   //      	"Rotten Tomatoes URL: " + movieData.tomatoURL + "\n" + "=================================================================");
                         //           }
                         //           else {
                         //                console.log(error);
                         //           }
                         //      });
                         // }
//                          grabMovieInfo();
//                          break;
//                }
//           }
//      });
// }

function followTheText() {

	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
			return console.log(error);
		}

		// console.log(data);

		var dataArr = data.split(",");

		// console.log(dataArr);

  // console.log( "THis is my file reader: " + dataArr[1]);


  		spotifyIt(dataArr[1]);
  // if (dataArr[0] === "spotify-this-song") {
  // 		spotifyIt(dataArr[1]);
  // }
  
  // else {
  // 		grabMovieInfo(dataArr[1]);
  // }
  		

});
}
