/*function that moves to the next step when items on the contextMenu are clicked to create a new widget
uses: NA
returns: NA
*/
function advanceOnContextMenuCreateWidget(){
	let action = Shepherd.activeTour.next;
	tourOnContextMenuCreateWidget(action);
}

/*function that undertakes an action on the creationg of a widget
uses:
	action: (function) the function to call on the click
returns: action outputs
*/
function tourOnContextMenuCreateWidget(action){
	let ractiveInstance =  getMainRactiveInstance(),	
		observer = ractiveInstance.ractive.once('new-widget-initialized', (a,b,c) => { //target the creation of the new widget
			action();	
		});
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}