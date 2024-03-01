/*
function to loop through each line of a codeMirror instance and check in the text is in it. If it is, return an array of the lines that have it
props:
	codeMirror: (object) the code mirror instances
	searchTerm: (string) the term to search for
returns:
	matches (array) an array of the line numbers that contain the search term;
*/
function returnCodeMirrorLines(props) {
	let {codeMirror, searchTerm} = props,
		linePos = 0,
		matches = [];
	//line is a LineHandle which is an object. The most important bit is the 'text' in the object which contains the lines contents
	codeMirror.eachLine((line) => {
		let result = line.text.includes(searchTerm);
		if (result){
			matches.push(linePos);
		}
		linePos++;
	});
	return matches;
}