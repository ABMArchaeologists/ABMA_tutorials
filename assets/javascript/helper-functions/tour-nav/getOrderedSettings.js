/*function that returns the tourstate settings in order. Object does not guerentee order
props:
	toOrder : (object) the setting that is being ordered
returns:
	(array) of ordered settings
*/
function getOrderedSettings(toOrder) {
	return Object.keys(toOrder).sort(function(a,b){return a-b;});
}