/*
function to make changes when the codeMirror instance content changes
props:
	cm: (object) the codeMirror instance
	change: (object) the change made
*/
function handleCodeMirrorChange (cm, change) {
	let from = {...change.from},										//create variable of the 'from' settings
		to = {...change.to},											//create variable of the 'to' settings
		marksNearBy = cm.findMarksAt({line:from.line, ch:from.ch+1});	//see if there are any marks near the start of the change

	if (change.origin !== undefined && change.origin == "+delete") {	// if the change is deleitng use 'to' to see if there are marks nearby
		marksNearBy = cm.findMarksAt({line:to.line, ch:to.ch+1}); 		
	}
	//catch the 'style' changes for netlogo, which involves some auto indenting, and stop it so it does not mess things up 
	if (change.origin == "+input" && change.text !== undefined && ( change.text[0] == "       " || change.text[0] == "  " ) ) {
		change.cancel();
		return; 
	}
	//if there is no origin, this is not a keyboard change, stop, and end. Same if not marks nearby or right type of marks
	if (change.origin == undefined || marksNearBy == undefined || marksNearBy.length == 0 || !containsMarks({marks:marksNearBy, matches:['codeExample','incorrectCode']}) ) { 
		return;
	}
	//for deleteing find the example code character and replace the text with it, then mark as example code
	if (change.origin == "+delete") {		
		let codeText = cm.findMarks(from,to),
			replaceText;
		//the marks we have placed, contained an attribute of the correct text that they are supposed to be, find these attributes and get that value	
		codeText.forEach((c)=> {
			 if ( c?.['attributes']?.['data-correct-text']?.[0] !== undefined) {
				 replaceText = c['attributes']['data-correct-text'][0];
			 }
		});
		//cancel this change
		change.cancel();
		//if going back a line, stop this
		if ( to.ch == 0 ) {		
			cm.setCursor(from);
			return;
		}

		//now replace the text being 'deleted' with the 'correct' example code and mark it
		cm.replaceRange(replaceText, from, to, 'deleteEx');		 
		cm.markText( from, to, {className:'codeExample', inclusiveLeft: false, inclusiveRight:false} );
		cm.setCursor(from);
	}
	//for input, create an overiding affect by replacing the example code with the input
	if (change.origin == "+input") {	
		let currentLine = cm.getLine(from.line),									//get the current locations
			currentCh = currentLine.substring(to.ch, to.ch + change.text.length);
		//modify the 'to' to be the length of the changing text		
		to.ch = change.to.ch + change.text.length;	
		//cancel this change so we can use replace Range
		change.cancel(); 					
		//replace the range, use the 'markHolder' as the orgin setting, does nothing current but ensures this won't keep looping with changes.
		cm.replaceRange(change.text, from, to, 'markHolder');		
		//if the text that is being input does not match the example code, mark it with an 'incorrectCode'
		if (change.text[0] !== currentCh) {
			cm.markText( from, to, {attributes:{'data-correct-text':currentCh}, className:'incorrectCode', inclusiveLeft: false, inclusiveRight:false} );
			return;
		}
		//default is to mark the code as correct, including the 'data-correct-text' attribute to be used in deleting changes (see above)
		cm.markText( from, to, { attributes:{'data-correct-text':currentCh}, inclusiveLeft: false, inclusiveRight:false} );
	}
};