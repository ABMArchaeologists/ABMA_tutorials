//test for function name in an array of functions
function testFunctionName (array, name) {
	for (let i = 0; i < array.length; i++) {
		if (typeof array[i] === 'function' && array[i].name == name) {
			return true;
		}
	}
	return false;
}