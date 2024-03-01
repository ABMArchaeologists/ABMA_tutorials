let commonIssues = [
	{//When they have to move or use a interface element
		summary: 'Help, I can\'t find my slider/button/switch/etc.',
		details: '<p> If you don\'t see the interface element you created, scroll down! In some browsers, the button\'s are mistakenly put at the bottom of the interface. </p>'
		+'<p> If you want to move the interface element, please follow the following steps: </p>'
		+'<ol>'
		+'<li>Pause the tour. Note: this will make this window disappear, so please remember all the steps.</li>'
		+'<li>Go into Authoring Mode</li>'
		+'<li>Scroll down to your \'lost\' button</li>'
		+'<li>Move the button by left-cliking on it, holding that click and dragging it where you want it to go.</li>'
		+'<li>Go into Interactive mode</li>'
		+'<li>Resume the tour</li>'
		+'</ol>',
	},
	{//Steps when they have to Recompile
		summary: 'My Recompile button is greyed-out and nothing happens when I click it!',
		details: '<p>This happens when either no change to the code is detected by Netlogo, or the code has been prematurely recompiled. '
		+'To fix it, just add an white line at the bottom of the code. </p>',
	},
	{//When they start the lesson
		summary: 'My model was loaded from cache.',
		details: '<p>This message may occur if you refreshed the page, and it may mean that the base-model will be loaded incorrectly. Just refresh once more!  </p>',
	},
	{//When they are creating buttons and/or referencing procedures in the code (e.g. in 3.3 ask producers [trade]  of trade is misspelled
		summary: 'Nothing names [NAME] has been defined.',
		details: '<p> This error occurs when the commands that you\'ve entered for a button or refer in the code don\'t exist. '
		+'Probably, you either forget to define them or you made a spelling mistake somewhere. </p>',
	},
	{//When they add \'[variable] of turtles\' statements e.g. defining mean 
		summary: 'OF expected this input to be a reporter block, but got a number instead.',
		details: '<p> When using <code class="codeABMA">of</code> don\'t forget to enclose the turtles\'s variable in brackets <code class="codeABMA">[]</code>. '
		+'Check out common syntax errors <a href="https://ccl.northwestern.edu/netlogo/bind/article/common-netlogo-error-messages.html"> here </a> </p>',
	},
	
	{//When they have to puts stuff in multiple brackets 
		summary: 'Expected Command',
		details: '<p> Usually this error occurs when you\'ve accidentally added to many brackets. Check out common syntax errors '
		+'<a href="https://ccl.northwestern.edu/netlogo/bind/article/common-netlogo-error-messages.html"> here </a> </p>',
	},
	{//When they are asked to create a new procedure 
		summary: '\'END expected\' or \'Keyword expected\'.',
		details: '<p> Usually these errors happens when the procedure is not defined correctly and/or doesn\'t end with '
		+'<code class="codeABMA">end</code>. Check out common syntax errors <a href="https://ccl.northwestern.edu/netlogo/bind/article/common-netlogo-error-messages.html"> here </a> </p>', 
		
	},
	{//When they have to make a conditional with statement
		summary: 'WITH expected this input to be a TRUE/FALSE block, but got a number instead.',
		details: '<p> The primitive <code class="codeABMA">with</code> should always be followed by a statement enclose in brackets '
		+'<code class="codeABMA">[]</code>. Check out common syntax errors <a href="https://ccl.northwestern.edu/netlogo/bind/article/common-netlogo-error-messages.html"> here </a> </p>',
	},
	{//When they are asked to create a new procedure 
		summary: 'END expected.',
		details: '<p> Usually this error happens when the procedure is not defined correctly and doesn\'t end with <code class="codeABMA">END</code>. '
		+'Check out common syntax errors <a href="https://ccl.northwestern.edu/netlogo/bind/article/common-netlogo-error-messages.html"> here </a> </p>',		
	},
	{//When they are asked to create a new procedure 
		summary: 'The instructions are not attaching to anything and there is no room for action.',
		details: '<p> There can be problems with screens sizes. Trying zooming your browser screen out to see if the step then works.</p>',		
	},
];

/*function to create tutorial selector element
props:
	options: (array) an array of objects with- text and value attributes
	lessonLists: (object) containing arrays of objects with- text and value attributes
returns: N/A appended to DOM
*/
function createCommonIssuesDetails(props) {
	let {options} = props,
		detailsHolder = createElement({type:'div', attributes:{ className:'ABMAHelpInfoHolder'} });
		
		if (options !== undefined && options.length > 0) {
			options.map( (e, index)=> {
				const details = createElement({type:'details', attributes:{ className:'ABMADetails'} }),
					summary = createElement({type:'summary', attributes:{ className:'ABMASummary'} }),
					summaryText = document.createTextNode(e.summary);				
					
					summary.appendChild(summaryText);
					details.appendChild(summary);
					details.innerHTML += e.details;
					detailsHolder.appendChild(details);
			});
		}
	return detailsHolder;
}
