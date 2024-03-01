/*function that moves to the next step on a showing or hiding of the contextMenu
uses: NA
returns: NA
*/
function advanceOnContextMenu(){
	let action = Shepherd.activeTour.next;
	tourOnContextMenu(action);
}

/*function that undertakes an action on the context menu click
uses:
	action: (function) the function to call on the click
returns: action outputs
*/
function tourOnContextMenu(action){
	let ractiveInstance =  getMainRactiveInstance(),
		contextMenu = ractiveInstance.findComponent('contextMenu'),
		observer = contextMenu.observeOnce( 'visible', function ( value ) {
				action();	
		});
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}