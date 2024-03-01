/*
function to return a specific instance of a line with the search term i.e. return the 1st or 3rd instance
props:
	codeMirror: (object) the code mirroe instances
	searchTerm: (string) the term to search for
	instance: (number) if more than one instance, return a specific one.
returns:
	line (number) the line number that has that search term
*/
function getCMLineWith(props) {
	let {codeMirror, searchTerm, instance = 0} = props,
		results = returnCodeMirrorLines(props),
		line = results[instance];
	return line;
}