/*function that advances to the next tour step on a click of the authoring lock
uses: NA

returns: NA
*/
function advanceOnAuthoringLock(){
	let element = Ractive.getContext('#authoring-lock'),
	observer = element.ractive.once('toggle-interface-lock', (a,b,c) => {
		Shepherd.activeTour.next();	
	});
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}