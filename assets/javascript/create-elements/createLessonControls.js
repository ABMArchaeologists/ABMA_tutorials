/*function to create tour lesson buttons to run the different lessons
props:
	options: (array) an array of objects with- text and value attributes
returns: N/A appended to DOM
*/
function createLessonControls(props) {
	let {options =[]} = props,
		tourOptions = createElement({
			type:'div',
			attributes:{
				className:'ABMAbttnHolderClass',
				id: 'ABMchapterOptions',	
			},
		});
		if (options !== undefined && options.length > 0) {
			options.map( (e, index)=> {
				let numbering = index+1,
					span = createElement({
						type:'span', 
						attributes:{
							className:'ABMAbttnSpanClass', 
							innerText: '\u2610 '+numbering+': '+e.text, 
						}
					}),
					button = createElement({
						type:'button', 
						attributes:{
							className:'ABMAbttnClass', 
							value:e.value, 
							onclick:runTour
						}
					});
					
				button.appendChild(span);
				tourOptions.append(button);
			});
		}
	return tourOptions;
}