/*function that moves to the next step on a showing or hiding of the editing menu
each widget has an edit form so need to set the widget to get that form for
uses:
returns: NA
*/
function advanceOnEditForm(props = {}){
	let { action = Shepherd.activeTour.next } = props;
		ActiveEditForm = getActiveEditForm(),
		{ instance } = ActiveEditForm,
		observer = instance.observeOnce( 'visible', function ( value ) {
			action();	
		});
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}

/*function that moves to the next step when undertaking the full steps of bringing up a context menu and then creating an element and then the edit form
uses:
returns: NA
*/
function fullProcessOnEditForm(props = {}){
	let { action = Shepherd.activeTour.next } = props;
	tourOnContextMenu(()=> {
		 tourOnContextMenuCreateWidget(action);
	});
}