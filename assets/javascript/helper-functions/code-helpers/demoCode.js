/*
function to give an example of typing out the code
props:
	text: (string) the code to add
	startLine: (number) the line to start on, defaults to 1
	startCh: (number) the character to start on, defaults to 0
	timings: (number) the mil seconds to wait before adding, defaults to 500
uses:
	global objects:
		Ractive
*/
function demoCode(props){
	let {
			startLine = 1, 
			text, 
			startCh = 0,
			timings = 500,
		} = props,
		codeTab = Ractive.getContext('#netlogo-code-tab'),
		codeMirror = codeTab.findComponent('codeEditor').getEditor(),
		pos = { 
			line: startLine,
			ch: -1, 
		};
		textAsArray = [...text],
		length = textAsArray.length,
		i = 0;
		
	codeMirror.on('changes', function( cm, change ) {
		let next = i+1,
			e = textAsArray[i];

		if( textAsArray[i] == '\\' && textAsArray[next] !== undefined && textAsArray[next] == 'n') { //if we hit and end, adjust so the text is \n
			i++;
			e = '\n';
		}
		pos.ch = pos.ch+1;
		
		if ( i < length) {												//make sure this stops at the end of the text
			handleIteration( {pos:pos, textToAdd:e, codeMirror:cm} );
		}
	
		if(e == '\n') {				//if we hit the end of the line, move it to the next line
			pos.ch = -1;
			pos.line = pos.line+1;
		}
		i++;
	});
	
	setTimeout(function () { 	//trigger the demo after half a second or whatever the setting of 'timings' is
		pos.ch = pos.ch+1;
		handleIteration( {pos:pos, textToAdd:textAsArray[i], codeMirror:codeMirror} );
		i++;
	}, timings);
}

/*
function to add code, one character at a time
props:
	pos: (object) the position of where to add the ch
	textToAdd: (string) the text to add
	codeMirror: (class) the codeMirror instance
	timings: (number) the mil seconds to wait before adding, defaults to 400
*/
function handleIteration(props){
	let {
			pos, 
			textToAdd, 
			codeMirror,
			timings = 400,
		} = props,
		afterPos = {...pos};
		afterPos.ch = afterPos.ch + textToAdd.length;		//set the end ch to be the length of the text
	
	setTimeout(function () {  
		codeMirror.replaceRange(textToAdd, pos, afterPos); 	//add the text
		codeMirror.focus();									//re focus the interphase
		codeMirror.setCursor(pos);							//set the curser
	}, timings);
}

