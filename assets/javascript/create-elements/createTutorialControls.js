/*function to create tutorial selector element
props:
	options: (array) an array of objects with- text and value attributes
	lessonLists: (object) containing arrays of objects with- text and value attributes
returns: N/A appended to DOM
*/
function createTutorialControls(props) {
	let {options, lessonLists} = props,
		change = (e)=>{
			let tourOptions = createLessonControls({options:lessonLists[e.target.value]}),
				el = document.getElementById("ABMchapterOptions");
			selectedTutorial = e.target.value;
			el.replaceWith(tourOptions);
		},
		selectEl = createElement({type:'select', attributes:{ onchange:change, className:'ABMASelectClass'} });
		
		if (options !== undefined && options.length > 0) {
			options.map( (e, index)=> {
				let numbering = index+1,
					optionEl,
					selected = '';
				
				if (e.value == selectedTutorial) {
					selected = true;
				}
				
				optionEl = createElement({
					type:'option', 
					attributes:{
						text: numbering+': '+e.text, 
						value:e.value, 
						selected:selected,
					}
				});
				selectEl.appendChild(optionEl);
			});
		}
	return selectEl;
}