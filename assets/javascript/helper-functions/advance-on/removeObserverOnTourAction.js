/*function that removes a Ractive observer to prevent side effects
this prevents a problem with the observer triggering multiple tours to occur
uses:
	observer: (object) the Ractive object for controlling any observers created by the call to observe
returns: NA
*/
function removeObserverOnTourAction(observer){
	function removeThisAction(event) {
		observer.cancel();
		window.removeEventListener("ABMAback", removeThisAction, { once: true }); 
	};
	
	['complete', 'cancel', 'show', 'hide'].forEach(event => Shepherd.once(event, () => {
		removeThisAction();
	}));

		
	window.addEventListener("ABMAback", removeThisAction, { once: true });
}