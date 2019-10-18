const search = require('youtube-search');
const fs = require('fs');
// const readline = require('readline');
const youtubedl = require('youtube-dl');
const youtube = require('youtube-node');
const lineReader = require('line-reader');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");

const YouTube = new youtube();

// Key 1
// YouTube.setKey('AIzaSyBzfgR6jFOonz0YkzIirPnSS8YoacmcueQ');
// Key 2
// YouTube.setKey('AIzaSyCKsokR5zZVEEJ0uWg7lm59pwdOFlca_4Q');
// Key 3
// YouTube.setKey('AIzaSyA8lPuQ82GVykcWfnfYKF2JfBSoB64_dds');
// Key 4
// YouTube.setKey('AIzaSyBm_qAwGGtzPDJCifMxgWmjvi-vFInEQu0');
// Key 5
YouTube.setKey('AIzaSyCk8HEu8YcRN6zF3UCqwj3dO_pQtNkRVIY');

const YD = new YoutubeMp3Downloader({
    "ffmpegPath": "/usr/bin/ffmpeg",        // Where is the FFmpeg binary located?
    "outputPath": "songs",    // Where should the downloaded and encoded files be stored?
    "youtubeVideoQuality": "highest",       // What video quality should be used?
    "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
    "progressTimeout": 2000                 // How long should be the interval of the progress reports
});

let songs = [];

lineReader.eachLine('./songs.txt', (line) => {
	songs.push(line)
});

let song_urls = [
  '6akIpq8liUI', 'N_akQmuxvcY', 'qas9G3HGYfQ',
  'bO77h1B_VY0', 'ytQ5CYE1VZw', 'xPAqoUGKACU',
  'jyGEnsM15tY', '8BbtaVnYIkE', '04cqLT7YZ9A',
  'SohI0df6KsU', '5byguP0ohr4', 'BHwSqo6eTsg',
  'n-lHXEVnk9w', 'epdjoD4zdjA', 'tNjqRSdA1Vk',
  'ts-EjUOtBAQ', 'c1qpTuv7dYs', 'E9qqvDjopos',
  'BCvzXbLRq2Y', '_WNNOtsIDOo', 'L9Yuzrj5OzM',
  'Kv3EHf1fTtk', 'k1H0MdQqHOA', 'SAeRcPsvxc0',
  '5rBTyoEIQ64', 'tIgE8nUUBNg', 'zzxYkGZAobI',
  'aB7hI43L6iM', 'sGJjxyecjNw', '3EWOQ_curhg',
  'whuzeBFjSaU', '_qE0jd5LuMM', 'nrA4il7H8Yw',
  'MnNjom7IutA', 'BzM_MF-zrgw', 'CXGm5u2Co5g',
  '0cBzg-MwN50', 'QIwdOY1c_ro', 'yHS05yU7oZ4',
  'dAp_XcBC7mo'
];

// setTimeout(() => {
// 	songs.map(song => {
// 		YouTube.search(song, 1, function(error, result) {
// 		  if (error) {
// 		    console.log(error);
// 		  }
// 		  else {
// 		  	setTimeout(() => {
// 		    	song_urls.push(result.items[0].id.videoId)
// 		  	}, 200);
// 		    // result.items[0].id.videoId
// 		    // https://www.youtube.com/watch?v=${etag of song}
// 		  }
// 		});	
// 		})
// }, 500);

setTimeout(() => {
	console.log(song_urls);
	// Download video and save as MP3 file
	song_urls.map(url => {
		YD.download(url);
		 
		YD.on("finished", function(err, data) {
		    console.log(JSON.stringify(data));
		});
		 
		YD.on("error", function(error) {
		    console.log(error);
		});
		 
		YD.on("progress", function(progress) {
		    console.log(JSON.stringify(progress));
		});
		})
}, 200);

// var search_options = {
//   maxResults: 1,
//   key: 'AIzaSyBzfgR6jFOonz0YkzIirPnSS8YoacmcueQ'
// };

// const readInterface = readline.createInterface({
//     input: fs.createReadStream('./songs.txt'),
//     output: process.stdout,
//     console: false
// });
// console.log('1q')

// let songs = [];

// readInterface.on('line', (line) => {
//     songs.push(line);
// });

// songs.map(song => {
// 	search(song, opts, (err, results) => {
// 	  if(err) return console.log(err);
	 
// 	  console.log(results);
// 	});	
// })

// readInterface.on('line', (line) => {
//     // console.log(line);
//     search(line, search_options, function(err, results) {
// 	  // if(err) return console.log(err);
// 	});
// });

// setTimeout(() => {
// 	// songs.map(song => {
// 	// 	search(song, search_options, (err, results) => {
// 	// 	  if(err) return console.log(err);
		 
// 	// 	  console.log(results.method);
// 	// 	});	
// 	// })
// 	search(songs[0], search_options, (err, response) => {
// 		if(err) return console.log(err);

// 		console.log(response)
// 	})
// }, 200)