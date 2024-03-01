/*
function to add code to the Code tab, highlighting the code and allow overtyping
props:
	text: (string) the code to add
	startLine: (number) the line to start on
	startCh: (number) the character to start on
	replace: (bool) if it should replace what is at the startline
	position: (string) after or before, where to insert the text
	insertAtText: (string) text to search for to find the place to insert at
*/
function addExampleCode(props) {
	let {
			text, 
			startCh=0, 
			startLine=1, 
			replace=false, 
			position='after', 
			insertAtText, 
			instance=0, 
			markExample=true,
			ignoreDuplicate=false,
		} = props,
		codeTab = Ractive.getContext('#netlogo-code-tab'),
		codeMirror = codeTab.findComponent('codeEditor').getEditor(),											//get the code editor out of the code tab
		newStartLine = 1,
		pos = { // create a new object to avoid mutation of the original selection
			line: startLine,
			ch: startCh, 
		},
		currentText = codeMirror.getValue(),
		checkForDuplicate = currentText.includes(text);
	//if there is insert text then get its line
	if(insertAtText !== undefined) {
		newStartLine = getCMLineWith({codeMirror:codeMirror, searchTerm:insertAtText, instance:instance})	
	}
	//check if this has already been added - can occur with the 'back' button, code is added twice
	if (checkForDuplicate && !ignoreDuplicate) {
		console.log('duplicate code example has been found');
		return;
	}	
	if (newStartLine === undefined || newStartLine.length == 0) {	//if we can't find the search for text, bail out 
		alert('There was an error and the example code "'+text+'" was not added. This usually results from the previous code not being correct.');
	}
	if (replace) {						//if we are replacing keep the same line
		position = 'at';
	}
	if ( position == 'after') {
		startLine = newStartLine+1;		//update the startline with the newlline
	}
	if ( position == 'before') {
		startLine = newStartLine-1;		//update the startline with the newlline
	}
	if ( position == 'at') {
		startLine = newStartLine;		//update the startline with the newlline
	}
	pos.line = startLine;//update the pos with the newline
	
	setCodeMirrorOptions({codeMirror:codeMirror});
	
	setTimeout (() => {
		codeMirror.focus();
		codeMirror.setCursor(pos);
   }, 500);

	//needed to check if the 'handleCodeMirrorChange' function has been registered already, if not, add it.
	if ( codeMirror._handlers.beforeChange == undefined || !testFunctionName (codeMirror._handlers.beforeChange, 'handleCodeMirrorChange') ){
		codeMirror.on("beforeChange", handleCodeMirrorChange);
	}
	
	codeMirror.on('change', markOnChange);
	
	let origin = 'ABMaddingExample';
	if (!markExample) {
		origin = undefined;
	}
		
	//add in this example text
	if (replace) {
		let lineArray = text.split("\n"),					//split the text into an array by '\n' line in codeMirror
			end = { 										// create a new object to avoid mutation of the original selection
				line: startLine + lineArray.length -1,
				ch: lineArray[lineArray.length - 1].length, 
			};
			
		origin = 'ABMaddingExampleReplace';
		codeMirror.replaceRange(text, pos, end, origin);
		return;
	}
	codeMirror.replaceRange(text, pos, null, origin);
}