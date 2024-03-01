/*
function to determine if a bit of text is marked in Code Mirror
props:
	marks: (array) the list of marks to check
	matchs: (string or array) the mark(s) name(s) to compare against
returns:
	(bool) if the element contains the listed marks
*/
function containsMarks(props) {
	let {marks, matches} = props
		outcome = false;
	
	if ( marks == undefined ) {		//if no marks are defined, exit
		return outcome;
	}
	
	marks.forEach((mark)=> {		//loop through each mark
		if (typeof matches === 'string' || matches instanceof String) { //check if the match is a single string, if so, compare
			if (mark.className == matches) {
				outcome = true;
			}
		}
		if ( Array.isArray(matches) ) {		//if matches are an array, loop through them and compare
			matches.forEach((match)=> {
				if (mark.className == match) {
					outcome = true;
				}
			});
		}
	})
	return outcome;
}