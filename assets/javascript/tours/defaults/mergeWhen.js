/*this function combines the functions found in two different when objects
props:
	when: (obj) the new settings
	whenDefault: (obj) the orgional when object
returns: newWhen (obj) the new combined when object
*/
function mergeWhen(props) {
	let { when, whenDefault } = props,
		newWhen = {...whenDefault}; 
	
	for (const event in when) {
		if (whenDefault?.[event] !== undefined ) {
			newWhen[event] = () => {
				whenDefault?.[event]();
				when[event]();
			}
			continue;
		}
		newWhen[event] = when[event];
	}	
	return newWhen
}