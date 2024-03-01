/*function that returns the last entry in an array. Makes a copy of the array so as to not mutate the orgional
props:
	orderedSettings: (array) the array to get the info from
returns:
	(mixed) the last item in the array
*/
function getLastEntry(orderedSettings) {
	return [...orderedSettings].pop();
}