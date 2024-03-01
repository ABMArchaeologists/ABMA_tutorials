/*function to check if text is entered into a input
	variables
		target: (node) is the target element to watch
		obs: (string) the query selector of the element to check the innerText - this may not exist yet
		text: (string) the text to check for
		success: (function) the function to run on success
	functions: N/A
	global objects:N/A
	returns: observer
*/
function checkInputText(props) {
	let successAlert = ()=>{ console.log('Error: no success function set') }, //alert message if no function is sent
		{target, obs, text, success = successAlert} = props,
		observer = new MutationObserver(function(mutations) {
			let observing = document.querySelector(obs);
			if ( observing != undefined && observing.innerText == text) {
				success();
				this.disconnect();//disconnect it after use to avoid infinity loop
			}					
		}),//create the observer
		config = { characterData: true, attributes: true, childList: false, subtree: true};//set the config for observer
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
}