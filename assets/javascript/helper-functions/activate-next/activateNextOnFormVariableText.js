/*function that will remove the disabled tag from the next button when certain text is typed into a form input that is a variable. Not all inputs are for variables - so code version
uses:
	formID: (string) the id of the edit form
	text: (string) the text that needs to be entered in
returns: NA
*/
function activateNextOnFormVariableText(props){
	
	let { formID, text } = props;
	
	checkFormVairableText({formID:formID, success:enableNextButton, text:text});
}
/*function that checks the text of a variable input. When it matches it runs the success function
uses:
	formID: (string) the id of the edit form
	text: (string) the text that needs to be entered in
	success: (function) the function to run when the input matches the text
returns: 
*/
function checkFormVairableText(props){
	let { formID, success, text } = props,
		formInstance = Ractive.getContext(formID),
		formVariable = formInstance.findComponent('formVariable'),//get the variable input
		watching = formVariable.observe( 'value', function ( value ) {
			if(value == text) {
				success();
				watching.cancel(); //stop observing
			}
		});
		
	['complete', 'cancel', 'show'].forEach(event => Shepherd.on(event, () => {
		watching.cancel();
	}));
}

