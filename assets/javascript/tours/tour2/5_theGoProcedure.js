const theGoProcedure = [
	{
		text:'<h2>'
		+  'Adding Time: The Go Procedure'
		+'</h2>'
		+'<p>'
		+  'This lesson is part of a tutorial in which we build a simple agent-based modeling simulating the spread of agents over an abstract landscape.'
		+'</p>' 
		+'<p>'
		+  'The structure of most ABM consists of two steps: the initialization of the world and the main simulation loop:'
		+'</p>'
		+'<img src="assets/images/intro_netlogo_structure.png" height="775px">' 
		+'<p>'
		+  'The Setup lesson teaches you how to build the initialization phase, '
		+  'while this lesson helps you introduce a simulation loop. In this lesson, you will add time and agent behavior to a simple ABM.'
		+'</p>',
	},
	{
		text:'<p>'
		+  'At the end of this lesson, you will have:'
		+'</p>'
		+'<ul>'
			+'<li>gained additional proficiency in using the NetLogo Interface;</li>'
			+'<li>gained  familiarity with some primitives commonly used in NetLogo to specify agent behavior;</li>'
			+'<li>added time, by creating a simulation loop with simple agent behavior (the <code class="codeABMA">go</code> procedure).</li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  'In NetLogo, the main simulation loop is usually defined in the <code class="codeABMA">go</code> procedure. '
		+  'Like with the <code class="codeABMA">setup</code> procedure, we want to be able to call this procedure through a button on the interface, to start the simulation.'
		+'</p>'
		+'<p>'
		+  'Let\'s start by creating a new button.'
		+'</p>'
	},
	{
		basicStep: goIntoAuthoringMode,
	},
	{
		basicStep: righClickGreenSpace,
	},
	{
		basicStep: createButtonContextMenu ,
	},
	{
		text:'<p>'
		+  'We want this button to call the <code class="codeABMA">go</code> procedure, so this time type <code class="codeABMA">go</code> in the Commands box.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {settings} = getActiveEditForm(),
					target = document.querySelector('#'+settings.id+'-source');
				return target;
			},
		},
		when: {
			show: function() {
				let {settings} = getActiveEditForm();
				activateNextOnFormCodeText( {formID:'#'+settings.id, name:'source', text:'go'} );	
			}, 
		},
		buttons: disabledNextButtons,
	}, 
	{
		text:'<p>'
		+  'One major difference with the <code class="buttonName">setup</code> button, is that this time we want to click the Forever box. '
		+  'Ticking Forever means that this procedure will repeat until the simulation ends or the user clicks the button again to toggle it off. Please click it.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.getElementById('netlogo-button-2-edit-window-forever-checkbox')},
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
		+  'The button is red, can you guess why? '
		+  'Yes, just like with the <code class="codeABMA">setup</code> procedure, it is because we haven\'t written the <code class="codeABMA">go</code> procedure yet, '
		+  'so NetLogo doesn\'t know what this button refers to. Let’s fix that.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return getWidgetElement({type:'button', source:'go'}); },
		},
	},
	openCodeTab,
	{
		text:'<p>'
		+  'Create a new empty <code class="codeABMA">go</code> procedure, underneath (the last line of) the setup procedure. Inside the procedure write- '
		+'</p>'
		+'<p>'
		+'<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/tick.html" target="_blank" rel="noopener noreferrer">tick</a></code>'
		+'</p>'
		+'<p>'
		+  'Tick is used to advance the time counter, and is usually put at the end of the <code class="codeABMA">go</code> procedure.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'\nto go\n  tick\nend\n', insertAtText:'end'});
		},
	},
	{
		basicStep: clickRecompileCode,
	},
	{
		text:'<p>'
		+  'The button is now black, indicating no error. Click the button.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return getWidgetElement({type:'button', source:'go'}); },
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,
	},
	{
		text:'<p>'
		+  'Oh no, another error! This error appears because  <code class="codeABMA">reset-ticks</code> is in our <code class="codeABMA">setup</code> procedure, '
		+  'and we forgot to press the setup button.'
		+'</p>'
		+'<p>'
		+  'Dismiss the alert.',		
		attachTo:{
			on: 'top',
			element: ()=>{return document.querySelector('#alert-dialog')},
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,
	},
	{
		text:'<p>'
		+  'Re-run the setup and go.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
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
		buttons: disabledNextButtons,
	},
	{
		text:'<p>'
		+  'If you look up at the tick counter, you can see that it\'s going up rapidly. Try adjusting the slider so that time slows down a bit (hint, slide it to the left).'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-speed-slider',
		},
		complexAdvanceOn: function() {
				tourOnSpeedChange(enableNextButton); 
		},
		buttons: disabledNextButtons,
	},
	{
		text: '<p>'
		+  'Unfortunately, while time is passing, there\'s not much else happening. That is because, besides the tick command, our <code class="codeABMA">go</code> procedure is still empty.'
		+'</p>'
		+'<p>'
		+  'Let\'s go fix that! But first, because Forever is checked, you need to press the <code class="buttonName">go</code> button again to stop the simulation.'
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
		+  'Let\'s develop some agent behaviour!'
		+'</p>'
		+'<p>'
		+  'All commands we give agents in NetLogo are initiated by the keyword: '
		+  ' <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/ask.html" target="_blank" rel="noopener noreferrer">ask</a></code>, '
		+  'followed by the entity that is to perform the tasks - turtles, patches (grid cells), or links. '
		+  'The code block that defines these tasks is enclosed in square brackets  <code class="codeABMA">[ ]</code>.'
		+'<p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  ask turtles [\n  ]\n', insertAtText:' tick'});
		},
	},
	{
		text:'<p>'
		+  'To start off, we want turtles to move forward randomly with every tick.'
		+'</p>' 
		+'<p>'
		+  'To achieve this, inside the code-block, we\'ll first ask turtles to set their direction, and then move forward one step.'
		+'</p>'
		+'<p>'
		+  'Between the brackets, type: '
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">right '
		+  '<a href="https://ccl.northwestern.edu/netlogo/bind/primitive/random.html" target="_blank" rel="noopener noreferrer">random</a> 360 </code> - '
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/right.html" target="_blank" rel="noopener noreferrer">right</a></code> '
		+  'is a primitive that tells the turtle to turn by a given number of degrees. We used the <code class="codeABMA">random</code> primitive last lesson, '
		+  'but this time it is generating a number between 0 and 360.'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/forward.html" target="_blank" rel="noopener noreferrer">forward</a> 1 </code>'
		+  '- <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/forward.html" target="_blank" rel="noopener noreferrer">forward</a></code> '
		+  'is used to move the turtle forward by a given number of steps, in this case 1. It can be shortened to fd.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'    right random 360\n    forward 1\n', insertAtText:'ask turtles'});
		},
	},
	{
		basicStep: clickRecompileCode,
	},
	{
		text:'<p>'
		+  'Now click the <code class="buttonName">go</code> button. Click again to stop the model.'
		+'</p>'
		+'<p>'
		+  'You will see the turtles are now moving!'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
			},
	},
	{ 
		text:'<p>'
		+  'This is the end of the lesson. You have now built a simple, but complete, agent-based model simulating the spread of agents over an abstract landscape!'
		+'</p>' 
		+'<p>'
		+  'Through completing this lesson, you have:'
		+'</p>'
		+'<ul>'
		+  '<li>gained additional proficiency in using the NetLogo Interface (forever buttons, tick slider);</li>'
		+  '<li>gained familiarity with some primitives commonly used for specifying agent behavior (ask, forward);</li>'
		+  '<li>created time with a simulation loop and simple agent behavior (the <code class="codeABMA">go</code> procedure).</li>'
		+'</ul>'
		+'<p>'
		+  'While the random movement across an abstract landscape may seem simple, '
		+  'both randomness (or stochasticity) and abstractness are powerful concepts in simulation and ABM specifically.'
		+'</p>'
		+'<p>'
		+  'If you would like to learn how to customize this simple model, please click the Next button below.'
		+'</p>'
	},
];