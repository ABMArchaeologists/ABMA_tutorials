/*
function to highlight multiple lines in codeMirror
props:
	searchTerm: (strine) the text to search for to find the line to add this too 
	instance: (interger) for the above searching which instace of the search term to use
	additionalLines: (interger) how many lines from that starting point to highlight
*/
function highlightLines(props={}) {
	let {
		searchTerm, 
		instance=0,
		additionalLines = 0,
	} = props,
	codeTab = Ractive.getContext('#netlogo-code-tab'),
	codeMirror = codeTab.findComponent('codeEditor').getEditor(),									//get the code editor out of the code tab
	startLine = getCMLineWith({codeMirror:codeMirror, searchTerm:searchTerm, instance:instance});	//Get the line of the provided text	
	codeMirror.on('update', checkLineChange);														//add a 'update' watch to see when the class has been added to the line, then trigger checkLineChange()
		
	codeMirror.addLineClass(startLine, "wrap", "ABMAstartOfHighlight");								//add a class to the first line - helps us find it
	codeMirror.addLineClass(startLine+additionalLines, "wrap", "ABMAendOfHighlight");				//add a class to the last line - helps us find it
	
	['complete', 'cancel', 'show', 'hide'].forEach(event => Shepherd.once(event, (e) => {
		console.log(e);
		console.log('test');
		document.getElementById('ABMAlineHighlightDiv')?.remove();								//remove the highlight area
		codeMirror.removeLineClass(startLine, "wrap", "ABMAstartOfHighlight");					//remove the class from the codeMirror line
		codeMirror.removeLineClass(startLine+additionalLines, "wrap", "ABMAendOfHighlight");	//remove the class from the codeMirror line
	}));
}
/*
function to check if the end class has been added to the codeMirror line, if so, call setHighlightArea()
props:
	cm: (object) the codeMirror instance
*/
function checkLineChange (cm) {
	if (document.getElementsByClassName("ABMAendOfHighlight").length > 0) {
		cm.off('update', checkLineChange);		//turn this off
		setHighlightArea();
	}
}
/*
function to add the overlay div. pointer-events allows the mouse clicks to pass through this highlight overlay div
props:
	none
*/
function setHighlightArea() {
	let startEl = document.getElementsByClassName("ABMAstartOfHighlight")[0],	//get the start line
		endEl = document.getElementsByClassName("ABMAendOfHighlight")[0],		//get the last line, might be the same as the start
		codeHolder = document.getElementsByClassName('CodeMirror-scroll')[0];
	//if needed scroll this item up	
	codeHolder.scrollTop = startEl.offsetTop+20;
	//after scrolling then set the overlay element.	
	let	startCor = startEl.getBoundingClientRect(),								//get the coordinates from the start line
		endCor = endEl.getBoundingClientRect(),									//get the coordinates from the last line
		highlightDiv = createElement({											//create the highlight div
			type:'div',
			attributes: {
				id:'ABMAlineHighlightDiv',
			}
		});
		
	//set the style of the highlight div. Place it over the start and end lines, and all lines inbetween. 
	highlightDiv.style['pointer-events'] = 'none';	
	highlightDiv.style.width = startCor.width+'px';
	highlightDiv.style.position = 'absolute';
	highlightDiv.style.left = startCor.x+document.body.scrollLeft;
	highlightDiv.style.top = startCor.y+document.body.scrollTop;
	highlightDiv.style.height = (endCor.bottom+document.body.scrollTop)-(startCor.top+document.body.scrollTop)+'px';
	document.body.prepend(highlightDiv);
}