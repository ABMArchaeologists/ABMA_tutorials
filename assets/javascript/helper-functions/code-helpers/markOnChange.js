/*
function to mark example code with css classes, triggered by codeMirror change event
props:
	cm: (object) the codeMirror instance
	change: (object) the change made
*/
function markOnChange (cm, change) {
	let from = {...change.from};		//create variable of the 'from' settings
	cm.off('change', markOnChange);		//turn this off to avoid extra marking

	if ( change.origin == "ABMaddingExample" || change.origin == "ABMaddingExampleReplace" ) {	
		let ch = from.ch;
		//to avoid an error with marking if we try to add to a end line that does not exist, 
		//code mirror starts the replace on the last line, this will mess up the marking count, resent it to be the last line
		if (cm.lastLine() < change.from.line) {
			from.line = cm.lastLine();
		}

		change.text.map((e , index)=> {		//loop through each added text to add the marks
			let line = from.line+index;
			if (index > 0) {				//if we have moved beyond the first line, reset the first ch to zero
				ch = 0;
			}
			
			for (let i = ch; i < e.length+ch; i++) {		//loop through each character to mark them. This fixes some bugs when overtyping was not from the first ch, it didn't work
				if (e.length == 0) {					//dont mark any empty entries - sometimes there is an empty last entry sent
					continue;
				}
				let endCH = i+1,
					obj = cm.markText( {line:line, ch:i}, {line:line, ch:endCH}, {className:'codeExample', attributes:{'data-correct-text':e[i]}, inclusiveLeft: false, inclusiveRight:false} );
			} 
		});		
	}
}