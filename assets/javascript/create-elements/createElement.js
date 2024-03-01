/*function to create an html element with attributes
props:
	type: (string) name of the type of element to create i.e. button, div, etc.
	attributes: (object) the attributes of the element 
returns: (html element)
*/
function createElement(props) {
    const { type, attributes } = props,
			createdElement = document.createElement(type);
	Object.assign(createdElement, attributes);
	return createdElement;
}