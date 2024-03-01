/*
function to test if the html element that the tour is going to attach too exists. If not repeat checking for an amount of time, in case element does not exist yet, then alert.
props:
	resolve: (function) this will be triggered in the beforeShowPromise, so it needs to resolve to let the step go ahead
	element: (mixed) the element to be searched for
	time: (number) how many miliseconds between checks
	timeout: (number) how many attempts before giving up on checking and sending alert
 */
function testForElement(props) {
	let {resolve, element, time=100, timeout=40} = props,
		tryCount = 0;
		
	function showAgain() {
		let check = checkAndGetElement(element);
		
		if (tryCount == timeout) {										//if this has been called too many times, stop it and give an alert
			alert('Error: the element for this step was not found.');	//alert that it has not been found
			return resolve();
		}
		
		if (  check == undefined || check == null ) {	// check if the element exists, if not reset the check 
			setTimeout(showAgain, time);				// set the timeout to check again in x
			tryCount++;									// increment up the count
			return;
		}
		
		return resolve(); //if element exists, resolve
	};
    showAgain();   
};

/*
Checks if an `HTMLElement`.
value The param to check if it is an HTMLElement
 */
function isHTMLElement(value) {
	return value instanceof HTMLElement;
}
/*
Checks if a `Function` 
value The param to check if it is a function
 */
function isFunction(value) {
	return typeof value === 'function';
}
/*
Checks if is string
value The param to check if it is a string
 */
function isString(value) {
	return typeof value === 'string';
}
/*
parse and element depending on if it is an element, function or string
	element: (mixed) what is being checked
 */
function checkAndGetElement(element) {
	
	if (isFunction(element)) {						//check if function, if so, call the function and text the results again.
		let result = element();
		return checkAndGetElement(result); 
	}
	
	if(isString(element)) {							//check if string, if so, call attempt to find the element.
		return document.querySelector(element);
    } 
	
	if(isHTMLElement(element)) {					//check if element, if so, check if it is in the document.
		return document.body.contains(element);
    }
	return undefined;								//if none of the above, return undefined
}