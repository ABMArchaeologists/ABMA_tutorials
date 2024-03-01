/*function dispatches a backEvent, this triggers the removal of on's/observers to prevent errors
uses:
returns: NA
*/
function dispacthBackEvent(){
	//dispacth an event to cancel the on's and observers to prevent errors
	const backEvent = new CustomEvent("ABMAback", {
		bubbles: true,
		cancelable: true,
		composed: false,
	});
	window.dispatchEvent(backEvent);
}