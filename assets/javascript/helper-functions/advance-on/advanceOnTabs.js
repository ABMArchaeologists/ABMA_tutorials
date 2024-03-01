/*function that moves to the next step on a showing or hiding a tab menu
each widget has an edit form so need to set the widget to get that form for
uses:
	tab: (string) the name of the keypath to monitor - showConsole, showCode, or showInfo
returns: NA
*/
function advanceOnTabs(props){
	let ractiveInstance =  getMainRactiveInstance(),
		{ tab } = props,
		observer = ractiveInstance.ractive.observeOnce( tab, function ( value ) {
			Shepherd.activeTour.next();	
		});
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}