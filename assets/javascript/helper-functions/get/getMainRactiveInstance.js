/*function that returns a ractive instance of the main model
uses: N/A
returns: Ractive instance
*/
function getMainRactiveInstance() {
	let firstTry = Ractive.getContext('#netlogo-model-container'),
		secondTry = document.querySelector('.netlogo-model');
	
	if (  firstTry !== undefined) {
		return firstTry;
	}
	return Ractive.getContext(secondTry);
}