console.log("Hello, World!");

var a = 3;

console.log(a + 7);

var fs = require("fs");

fs.readFile("./words.txt", function(err, data) {
	if(err) {
		console.log(err);
		return;
	}
	console.log(data.toString());

	fs.writeFile("lorem.txt", data, function(err) {
		if (err) {
		console.log(err); 
			return;
		}
		console.log("Done!");
	});
}); 

console.log("Reading Words!");

//write to standard out - console.log
//standard in (type into the terminal)

process.stdin.on('readable', function() {
	var input = process.stdin.read();
	if (input !== null) {
		console.log(input.toString().toUpperCase());
	}
});