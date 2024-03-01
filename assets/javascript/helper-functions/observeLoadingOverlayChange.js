/*
This function watches for the #looading-overlay to be hidden. Signalling that a waiting process has ended
props:
	change: (string) the change in the style, defaults to 'none'
	action: (function) the function to call when the change is observed
*/
function observeLoadingOverlayChange(props) {
	let {change = 'none', action = ()=>{console.log('no action specified for observeLoadingOverlayChange')}} = props,
		loadingOverlay = document.querySelector("#loading-overlay"),
		observer = new MutationObserver(function(mutationsList, observer) {
		for (const mutation of mutationsList){
			const {type, attributeName} = mutation;
			if (type == 'attributes' && attributeName == 'style') {
				let newDisplay = loadingOverlay.style.display;
				if (newDisplay == change) {
					observer.disconnect();
					action();
				}
			}
		}
	});
	observer.observe(loadingOverlay, { attributes: true});
}