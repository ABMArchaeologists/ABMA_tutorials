const createVariable = [
 	{
		text:'<h2>'
		+  'Creating Custom Variables'
		+'</h2>'
		+'<p>'
		+  'In the past lessons, we created a custom procedure and in this lesson we will create your own custom variables.'
		+'</p>'
		+'<p>'
		+  'This lesson is for you if you can read and make simple NetLogo models using basic primitives, '
		+  'but would like to learn how to create custom variables.'
		+'</p>'
		+'<p>'
		+  'At the end of this lesson, you will have:'
		+'</p>'
		+'<ul>'
		+  '<li>expanded your repertoire of NetLogo primitives - built-in procedures;</li>'
		+  '<li>learned how to customize your model with custom global variables and interface elements.</li>'
		+'</ul>' ,
	},
	openCodeTab,
	{ 
		text:'<p>'
		+  'We want to use a custom variable <code class="newvar">pop_growth</code>, in combination with  <code class="codeABMA">random-float</code>. '
		+'</p>'
		+'<p>'
		+  'In the <a href="https://ccl.northwestern.edu/netlogo/bind/primitive/ask.html" target="_blank" rel="noopener noreferrer">ask</a> command, write '
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">if random-float 1 <= pop_growth [reproduce]</code>'
		+'</p>' 
		+'<p>'
		+  'As in the previous lesson, we draw a random number between 0 and 1  ( <code class="codeABMA">random-float 1</code>) '
		+  'and if it is lower than the value of population growth the code block enclosed in <code class="codeABMA">[]</code>, '
		+  'the <code class="codeABMA">reproduce</code> procedure will run. '
		+  'For example, if <code class="var">pop_growth</code> is 0.2, there is a  probability of 20% that turtles reproduce.'
		+'</p>'
		+'<p>'
		+  'When you are ready, recompile the code.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'    if random-float 1 <= pop_growth [reproduce]', insertAtText:'reproduce', replace:true});
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,
	},
	{
		text:'<p>'
		+  'Oh no, an error! NetLogo doesn\'t recognise our <code class="var">pop_growth</code>!'
		+'</p>'
		+'<p>'
		+  'This is because we need to define this variable first. Because we want <code class="var">pop_growth</code> to be available to, '
		+  'but the same for, all agents, it will be a global variable.'
		+'</p>'
		+createMoreInfoBox({content:'<p>'
		+  '<b>Global variables:</b> are accessible to all agents and the same across all procedures. They can be defined with the use of an '
		+  '<a href="https://ccl.northwestern.edu/netlogo/docs/interfacetab.html#chart-interface-toolbar" target="_blank" rel="noopener noreferrer"> interface element</a> '
		+  '(a switch, slider, input) or by writing <a href = "https://ccl.northwestern.edu/netlogo/bind/primitive/globals.html" target="_blank" rel="noopener noreferrer"><code class="codeABMA">globals</code></a> '
		+  'followed by brackets <code class="codeABMA">[]</code> at the top of the code (e.g. <code class="codeABMA">globals[pop_growth]</code>).'
		+'</p>'})
		+'<p>'
		+  'We want to easily change the value of the pop_growth global, so let\'s use a slider. Dismiss the error.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#alert-dialog')},
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,
	},
	{
		basicStep: goIntoAuthoringMode,
	},
	{
		basicStep: righClickGreenSpace,
	},
	{
		text:'<p>'
		+  'Then click ‘Create Slider’ from the dropdown menu.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				for (const a of document.querySelectorAll(".netlogo-widget-editor-menu-items .context-menu-item")) {
					if (a.textContent.includes("Create Slider")) {
						return a
					}
				}
			},
		},
		complexAdvanceOn: function() {
			advanceOnContextMenuCreateWidget();
		},
	},
	{
		text:'<p>'
		+  'A new window appeared - here we define the variable settings.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {settings} = getActiveEditForm(),
					target = document.querySelector('#'+settings.id);
				return target;
			},
		},
	},
	{
		text:'<p>'
		+  'In the Global variable box type  <code class="codeABMA">pop_growth</code>'
		+'</p>', 
		attachTo:{
			on: 'right',
			element: ()=>{
				let {settings} = getActiveEditForm(),
					target = document.querySelector('#'+settings.id+'-varname');
				return target;
			},
		},
	}, 
	{
		text:'<p>'
		+  'Now let\'s specify its value range. Since it\'s a probability that needs to fall between 0.1 and 1, set the Minimum to 0.1, the Maximum to 1, and Increment to 0.01.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.querySelectorAll('.widget-edit-form .flex-row')[0]},
		},
	},
	{
		text:'<p>'
		+  'Set the Default value to 0.20.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {settings} = getActiveEditForm(),
					target = document.querySelector('#'+settings.id+'-value');
				return target;
			},
		},
	},
	{
		basicStep: ConfirmByClickingOK ,
	},
	moveAndResize,
	{
		basicStep: goIntoInteractiveMode,
	},
	{ 
		text:'<p>'
		+  'Re-run your simulation. First press <code class="buttonName">setup</code>, then <code class="buttonName">go</code>.'
		+'</p>', 
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
			
		multiStepAdvance: function () {
			let options = [
					{
						name:'actionSetSetup', 
						label:'Click setup button', 
						function:(action)=>{
							tourOnButtonClick({buttonSettings:{type:'button', source:'setup'}, action:action});
						}
					},
					{
						name:'actionSetGo', 
						label:'Click go button', 
						function:(action)=>{
							tourOnButtonClick({buttonSettings:{type:'button', source:'go'}, action:action});
						}
					},
				],
				actionOnComplete = ()=> {
					Shepherd.activeTour.next();
				}
			actionCheckList({options:options, actionOnComplete:actionOnComplete });
		},
		buttons: actionButtons,
	},
	{
		text:'<p>'
		+  'Again, we will stop the simulation after 10 ticks, but it looks much better!'
		+'</p>'
		+'<p>'
		+  'Let\'s only allow agents to reproduce if there are empty patches close by that can be populated.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
				stopAtTicks({ticks:10, activeButton:getWidgetElement({type:'button', source:'go'}), action:enableNextButton}); 
		},
		buttons: disabledNextButtons,
	},
	{
		text:'<p>'
		+  'First, let\’s \'comment out\' the codes relating to turtle movement by putting a ; in front of each line.'
		+'</p>'
		+'<p>'
		+  'The semi-colon  <code class="codeABMA">;</code> tells NetLogo to skip over any text that comes after it.'
		+'</p>'
		+'<p>'
		+  'This is very handy because it let\'s you put comments with your code explaining how it works.'
		+  ' This is especially important when using custom variables and procedures like here!'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() { //TODO ignore duplicates
			addExampleCode({text:';', insertAtText:'right random 360',  position:'at', startCh:4, ignoreDuplicate:true});
			addExampleCode({text:';', insertAtText:'forward 1', position:'at', startCh:4, ignoreDuplicate:true});
		},
	},
	{  
		text:'<p>'
		+  'Second, let’s identify the empty patches to which agents can spread. '
		+'</p>'
		+'<p>'
		+  'Because this is part of what it means to reproduce, it will go inside, you guessed it, the <code class="codeABMA">reproduce</code> procedure. Type '
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">let empty-patches neighbors with [count turtles-here = 0]</code>'
		+  '</p>'
		+'<p>'
		+  'at the top of your <code class="codeABMA">reproduce</code> procedure.'
		+'</p>'
		+'<p>'
		+  'This is quite a complex piece of code, so let\'s go through it word by word.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  let empty-patches neighbors with [count turtles-here = 0]\n', insertAtText:'to reproduce'});
		},
	},
	{
		text:'<p>'
		+  'First, we use the  <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/let.html" target="_blank" rel="noopener noreferrer">let</a></code> '
		+  'primitive to create a local variable  <code class="newvar">empty-patches</code>. This variable can only be used in the procedure or code block (between the nearest  '
		+  '<code class="codeABMA">[]</code> brackets) it is defined in. So, we are asking turtles to create this new variable, its value unique to them, '
		+  'but they will forget it as soon as they reach the end of the code block, in this case, the <code class="codeABMA">reproduce</code> procedure.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{
				return document.getElementById('ABMAlineHighlightDiv');
			},
		},
		beforeShowPromise: function() {
			return new Promise(function(resolve) {
				let observer = new MutationObserver(function(mutations) {				//create the observer of changes to the document
					if ( document.getElementById('ABMAlineHighlightDiv') !== null ) {	//if the div highlight exists, end observe and resolve the promise
						resolve();
						this.disconnect();												//disconnect it after use to avoid infinity loop
					}
				}),
				config = { childList: true, subtree: false };							//set the config for observer	
				observer.observe(document.body, config); 								// pass in the target node, as well as the observer options					
				highlightLines({searchTerm:'let empty-patches neighbors with [count turtles-here = 0]'});				//add the highlight element
			})
		},
	},
	{
		text:'<p>'
		+  'The  <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/neighbors.html" target="_blank" rel="noopener noreferrer">neighbors</a></code> '
		+  'primitive returns the 8 patch agents that surround the patch the turtle is located on.'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/with.html" target="_blank" rel="noopener noreferrer">with</a></code> '
		+  'is used to further specify which agents should or shouldn\'t be considered on the basis of conditional statements. '
		+  'In this case, only neighbors that have no turtles on them ( <code class="codeABMA">with ['
		+  '<a href="https://ccl.northwestern.edu/netlogo/bind/primitive/count.html" target="_blank" rel="noopener noreferrer">count</a> '
		+  '<a href="https://ccl.northwestern.edu/netlogo/bind/primitive/turtles-here.html" target="_blank" rel="noopener noreferrer">turtles-here</a> = 0] </code>) are considered.'
		+'</p>'
		+'<p>'
		+  'The variable <code class="var">empty-patches</code> will now contain a turtle-set consisting of the neighbouring patches that have no agents on them.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		attachTo:{
			on: 'left',
			element: ()=>{
				return document.getElementById('ABMAlineHighlightDiv');
			},
		},
		beforeShowPromise: function() {
			return new Promise(function(resolve) {
				let observer = new MutationObserver(function(mutations) {				//create the observer of changes to the document
					if ( document.getElementById('ABMAlineHighlightDiv') !== null ) {	//if the div highlight exists, end observe and resolve the promise
						resolve();
						this.disconnect();												//disconnect it after use to avoid infinity loop
					}
				}),
				config = { childList: true, subtree: false };							//set the config for observer	
				observer.observe(document.body, config); 								// pass in the target node, as well as the observer options					
				highlightLines({searchTerm:'let empty-patches neighbors with [count turtles-here = 0]'});				//add the highlight element
			})
		},
	},
	{
		text:'<p>'
		+  'Next, we will tell the agents to only reproduce if they have  <code class="var">empty-patches</code> available to them. '
		+'</p>'
		+'<p>'
		+  'Again, we\'ll use the <a href="https://ccl.northwestern.edu/netlogo/bind/primitive/if.html" target="_blank" rel="noopener noreferrer">if</a> statement from before, '
		+  'like so <code class="codeABMA"> if any? empty-patches []</code>.'
		+'</p>'
		+'<p>'
		+  'Here  <code class="codeABMA">any?</code> will return  <code class="codeABMA">true</code> if the agent-set variable is not empty, and  <code class="codeABMA">false</code> if it is.'
		+'</p>'
		+'<p>'
		+  'Note that, the '
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">[count turtles-here = 0]</code>'
		+'</p>'
		+'<p>'
		+  'of the previous step could be rewritten as '
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">[not any? turtles-here]</code>'
		+'</p>'
		+'<p>'
		+  'In this case, if there are any  <code class="var">empty-patches</code> (the condition is true), the code inside the brackets will be run: a new agent is hatched.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  if any? empty-patches [\n'
				+'    hatch 1 [\n'
				+'      set color color + 0.1\n'
				+'    ]\n'
				+'  ]\n'
				+'end\n', 
				insertAtText:'hatch 1',
				replace: true,
			}); 
		},
	},
	{
		text:'<p>'
		+  'Once born, the hatched agent should move to one of the empty patches. '
		+  'Write  <code class="codeABMA"> move-to one-of empty-patches</code> inside your hatch code block.'
		+'</p>'
		+'<p>'
		+  'The <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/move-to.html" target="_blank" rel="noopener noreferrer">move-to</a></code> primitive '
		+  'allows us to move a turtle to a given patch without it having to take individual steps.'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/one-of.html" target="_blank" rel="noopener noreferrer">One-of</a></code> '
		+  'is a reporter primitive that returns one random member from a list or turtle-set.'
		+'</p>'
		+'<p>'
		+  'When you are ready, recompile the code and we will see what this does.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'      move-to one-of empty-patches\n', insertAtText:'set color'});
	
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{ 
		text: '<p>'
		+  'Try re-running your simulation.'
		+'</p>', 
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		multiStepAdvance: function () {
			let options = [
					{
						name:'actionSetSetup', 
						label:'Click setup button', 
						function:(action)=>{
							tourOnButtonClick({buttonSettings:{type:'button', source:'setup'}, action:action});
						}
					},
					{
						name:'actionSetGo', 
						label:'Click go button.', 
						function:(action)=>{
							tourOnButtonClick({buttonSettings:{type:'button', source:'go'}, action:action});
						}
					},
				],
				actionOnComplete = ()=> {
					Shepherd.activeTour.next();
				}
			actionCheckList({options:options, actionOnComplete:actionOnComplete });
		},
		buttons: actionButtons,
	},
	{
		text:'<p>'
		+  'Congratulations! You\'ve customized the model to create a demographically driven dispersal wave. What patterns do you see? Remember to stop the model.'
		+'</p>', 
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
			advanceOnButtonClick({type:'button', source:'go'});
		},
	},
	{
		text:'<p>'
		+  'This is the end of the lesson. In it, you: '
		+'</p>'
		+ '<ul>'
		+ 	'<li> expanded your repertoire of primitives;</li>'
		+ 	'<li> learned how to customize your model with custom global variables and interface elements (sliders).</li>'
		+'</ul>'
		+'<p>'
		+  'If you would like to learn how to incorporate empirical data to make the environment more realistic, please go to the next lesson.'
		+'</p>',
	},
];
