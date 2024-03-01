/*function that will remove the disabled tag from the next button when certain text is typed into a form input, which has a code componet. Not all inputs do.
uses:
	formID: (string) the id of the edit form
	name: (string) name of the input that you want to check 
	text: (string) the text that needs to be entered in
returns: NA
*/
function activateNextOnFormCodeText(props){
	let { formID, name, text } = props;
	checkFormCodeText({formID:formID, name:name, success:enableNextButton, text:text});
}

/*function that checks the text of a code input. When it matches it runs the success function
uses:
	formID: (string) the id of the edit form
	name: (string) name of the input
	text: (string) the text that needs to be entered in
	success: (function) the function to run when the input matches the text
returns: 
*/
function checkFormCodeText(props){
	let { formID, name, success, text } = props,
		formInstance = Ractive.getContext(formID),//get the instance of this form
		formCodes = formInstance.findAllComponents('formCode'),//get the formCode component
		formCode = getFormByName({ formCodes:formCodes, name:name }); //get the right input

	//observe the codeContainer text
	let codeContainer = formCode.findComponent('codeContainer'),//get the codeContainer component
		watching = codeContainer.observe( 'code', function ( value ) {
			//check if the vaule of the input matches the text
			if(value == text) {
				success();
				watching.cancel(); //stop observing
			}
		});
}
/*function that loops through the different form elements and finds the one that has the 'name' provided
uses:
	formCodes: (array) an array of the inputs
	name: (string) name of the input
returns: (object) the selected component
*/
function getFormByName(props){
	let { formCodes, name } = props,
		i = 0;
	while (i < formCodes.length) {
		let settings = formCodes[i].get();
		if (settings.name == name) {
			return formCodes[i];
		}
		i++;
	}
}

