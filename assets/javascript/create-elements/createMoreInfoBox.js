/*function to create a more info box i.e. details html elemeny
props:
	summary: (mixed - text or html) the title
	content: (mixed - text or html) the title
returns: (string) html details element as a string
*/
function createMoreInfoBox(props) {
	let {summary = 'More Information:',  content = 'add content'} = props,
		detailsEl =  createElement({
			type:'details',
			attributes:{
				className:'abmMoreInfoHolder',
				innerHTML:content
			},
		}),
		summaryEl =  createElement({
			type:'summary',
			attributes:{
				className:'abmMoreInfoSummary',
				innerHTML:summary	
			},
		});
			
	detailsEl.prepend(summaryEl);
	
	return detailsEl.outerHTML;
}