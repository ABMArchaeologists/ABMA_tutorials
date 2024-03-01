/*
function to set the codeMirror options for our needs
props:
	codeMirror: (object) the codeMirror instance
*/
function setCodeMirrorOptions(props) {
	let { codeMirror } = props;
	
	//change ENTER from creating a new line to moving to the next line when it is next to marked text
	codeMirror.setOption("extraKeys", {
		Enter: function(cm) {
			let loc = cm.getCursor(),
				marksNext = cm.findMarksAt({line:loc.line+1, ch:0}), //check if the next line has marks
				marksHere = cm.findMarksAt(loc); //check if this line has marks
				
			if( (marksNext !== undefined && marksNext.length > 0 && containsMarks({marks:marksNext, matches:['codeExample','incorrectCode']}) ) || ( marksHere !== undefined && marksHere.length > 0 && containsMarks({marks:marksHere, matches:['codeExample','incorrectCode']}) ) ) {
				pos = loc.line+1;
				cm.setCursor({line: pos, ch: -1});
			} else {
				return  CodeMirror.Pass;
			}
		},
		Tab: function(cm) {
			//let spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
			//cm.replaceSelection(spaces);
			alert('Tab is currently disabled for this turtorial due to a bug, we hope to fix this soon.');
		}
	});
}