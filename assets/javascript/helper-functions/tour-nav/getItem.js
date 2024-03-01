/*function that gets an item x locations forward or backward from another time in the object. Needed because order in objects can be random.
props:
	obj: (object) the ojbect to be searched in
	key: (number) the key that is being searched for
	movement: (number, can be negative) the distance from the key to get get the item form i.e. 1(next) or -1(previous)
returns:
	item in object or null
*/
function getItem(props) {
	let {obj, key, movement} = props,
		keys = Object.keys(obj),
		sortedKeys = keys.sort(function(a,b){ a.localeCompare(b, undefined, { numeric: true })}), //because we can't ensure order without this
		index = sortedKeys.indexOf(key.toString()),
		location = index + movement;
	
	if (obj[sortedKeys[location]] !== undefined) { 		//if the item exists, return it
		 return obj[sortedKeys[location]];
	}
	
	return null;										//it not item exists, return null
}