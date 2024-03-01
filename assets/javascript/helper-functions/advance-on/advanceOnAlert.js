/*function that moves to the next step on a showing the alert
uses:
returns: NA
*/
function advanceOnAlert(){
	let alert = Ractive.getContext('#alert-container'),
		observer = alert.observeOnce( 'isActive', function ( value ) {
			Shepherd.activeTour.next();	
		});

	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}