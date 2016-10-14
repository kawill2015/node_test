 /* jshint esversion:6 */

var fs = require('fs');


var useStdin = function() {
	var input = process.stdin.read();
	if (input !== null) {
		var inputSplit = input.toString().trim().split(" ");
		if (inputSplit[0] == "cat") {
			//cat <filename>
			catFile(inputSplit[1]);
		} else if (inputSplit[0] == "touch") {
			//touch <filename>
			createNewFile(inputSplit[1]);
		} else if (inputSplit[0] == "rm") {
			deleteFile(inputSplit[1]);
		} else if (inputSplit[0] == "replace") {
			replaceWord(inputSplit[1], inputSplit[2], inputSplit[3]);
		} else if (inputSplit[0] == "grep") {
			grep(inputSplit[1], inputSplit[2]);

			}
	}
};

//create a file (touch)
function createNewFile(fileName) {
	fs.writeFile(fileName, "", function(err){
		if (err) {
			console.log("Could not write to file");
		} else {
			console.log("File created and saved");
		}
	});
}

//read from a file (cat)
function catFile(fileName) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Unable to read from file");
		} else {
			console.log(data.toString());
		}
	});
}

function deleteFile(fileName) {
	fs.unlink(fileName, function(err) {
		if (err) {
			console.log("Unable to delete file");
		} else {
			console.log("File deleted");
		}
	});
}

function replaceWord(fileName, oldWord, newWord) {
	oldWorld = oldWord.toLowerCase();
	newWord = newWord.toLowerCase();
		fs.readFile(fileName, function(err, data){ 
			if (err) {
				console.log("Unable to read from file");
			} else {	
				var arr = data.toString().toLowerCase().split(" ");
				for (var i in arr) {
					if (arr[i] == oldWord) {
						arr[i] = newWord;
					}
				} 
				var str = arr.join(" ");
				fs.writeFile(fileName, str, function(err){
					if (err) {
					console.log("Could not write to file");
					} else {
					console.log("File created and saved");
					}
				});
			}
				
		});		
}

function grep(fileName, search) {
	fs.readFile(fileName, (err, data) => {
		if (err) {return console.log(err);}
		search = search.toLowerCase();
		data = data.toString().toLowerCase().split("\n");
		for(var str of data) {
			if(str.includes(search)) {
				console.log(str);
			}
		}
	});
}
process.stdin.on('readable', useStdin);

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt

	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/
