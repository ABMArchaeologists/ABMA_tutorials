const theSetupProcedure = [
	{
		text:'<h2>'
		+  'The Setup Procedure'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we will begin building and setting up a simple agent-based model, which simulates the spread of agents over an abstract landscape.'
		+'</p>'
		+'<p>'
		+  'This lesson is for you if you are looking to build your first model with no prior experience, '
		+  'or if you want to strengthen your NetLogo basics before moving on to more complex models. '
		+  'In this lesson some of NetLogo\'s most common '
		+  '<a href="https://ccl.northwestern.edu/netlogo/bind/article/what-is-a-primitive.html" target="_blank" rel="noopener noreferrer">primitives</a> - '
		+  'pieces of code that are NetLogo\'s building blocks - will be explained.'
		+'</p>'
		+'<p>'
		+  'Before you start, make sure you know:'
		+'</p>'
		+'<ul>'
		+  '<li>what is agent-based modelling (tutorial 1);</li>'
		+  '<li>optionally, if you would like a brief overview of the NetLogo Interface before starting see lesson 1.4: Basics of the NetLogo Interface.</li>'
		+'</ul>'
		+'<p>'
		+  'If you have some prior experience with NetLogo, or you enjoy a challenge and don\'t mind consulting documentation as you go along, '
		+  'feel free to skip ahead.'
		+'</p>',
	},
	{
		text:'<p>'
		+  'In this tutorial we will help you set up your first model and explain some of NetLogo\'s key concepts as we go along.'
		+'</p>'
		+'<p>'
		+  'At the end of this tutorial you will have:'
		+'</p>'
		+'<ul>'
			+'<li>gained basic proficiency in using the NetLogo Interface;</li>'
			+'<li>gained familiarity with some primitives commonly used in NetLogo;</li>'
			+'<li>built the initialization phase of a simple ABM.</li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  'Let\'s get started!'
		+'</p>'
		+'<p>' 
		+  'All ABMs consist of two phases: initialization and the main simulation loop. First, we want to define an initialization phase in which the world is set up.'
		+'</p>'
		+'<p>'
		+  'In this case we want to create a starting population of agents and an abstract environment.'
		+  'To do so we will create a new procedure: the  <code class="codeABMA">setup</code> procedure. Our <code class="codeABMA">setup</code> '
		+  'procedure will contain all the instructions for setting up the model.'
		+'</p>'
		+createMoreInfoBox({content:'<p>'
		+  '<b>Procedure:</b> A procedure is a block of code consisting of a string of actions or commands and can be called by its name, '
		+  'through the use of a button, the command center, or by referring to it in the code. '
		+  'You can think of procedures as labeled boxes with instructions that NetLogo can open when prompted. If you have previous coding experience, procedure = function.'
		+'</p>'}),
	},
	{
		text:'<p>'
		+  'First, let\’s create a <code class="buttonName">setup</code> button on the interface. This button will allow us to easily call the setup procedure to initialize the world by clicking it.'
		+'</p>'
		+'<p>'
		+  'To do this, we first need to put the interface into "Authoring mode" so that we can edit it. Click on the lock icon.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '#authoring-lock',
		},
		complexAdvanceOn: function() {
			advanceOnAuthoringLock();
		},
	},
	{
		basicStep: righClickGreenSpace,
	},
	{
		basicStep: createButtonContextMenu ,
	},
	{
		text:'<p>'
		+  'A new window appeared - here we define what procedure should be called by this button.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {element} = getActiveEditForm();
				return element;
			},
		},
		when: {
			show: function() {

				let elem = document.querySelectorAll('.widget-edit-form-button-container .widget-edit-text'),
				disabledElm = Array.from(elem).map((e)=>{
					e.disabled = true;
				});
				setTimeout (() => {
						   setTourState();
				}, 100);
			},
			hide: function() {
				let elem = document.querySelectorAll('.widget-edit-form-button-container .widget-edit-text'),
				enabledElm = Array.from(elem).map((e)=>{
					e.disabled = false;
				});
			},
		}
	},
	{
		text:'<p>'
		+  'In the Commands box type: <code class="codeABMA">setup</code>. The next button will activate once you do that.'
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
				activateNextOnFormCodeText( {formID:'#'+settings.id, name:'source', text:'setup'} );
				setTimeout (() => {
						   setTourState();
				}, 100);
			},
		},
		buttons: disabledNextButtons,
	},
	{
		basicStep: ConfirmByClickingOK ,
	},
	{
		text:'<p>'
		+  'A button has now appeared on the screen! (you may need to scroll down to see it) Unfortunately, it has some red text in it, which indicates an error.'
		+'</p>'
		+'<p>'
		+  'We are next going to look at that error but first, if you want, you can move or resize the button to make it easier to work with. '
		+  'To move it, left-click on the center of it, keep holding that click, and drag it where you want it to go. To resize, drag the squares around the edge.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		modalOverlayOpeningPadding:5000,
	},
	{
		text:'<p>'
		+  'To view the error - click to change from authoring mode to display mode.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '#authoring-lock',
		},
		complexAdvanceOn: function() {
			advanceOnAuthoringLock();
		},
	},
	{
		text:'<p>'
		+  'Left click the <style="buttonName">setup</style> button.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return getWidgetElement({type:'button', source:'setup'})},
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,
	},
	{
		text:'<p>'
		+  'A text box appears saying that the "Button failed to compile with...".'
		+'</p>'
		+'<p>'
		+  'It may look alarming but there\'s nothing to worry about - we haven\’t actually defined our setup procedure in the code yet, '
		+  'so the button has nothing it can refer to. We will repair it straight away. </p><p>Click the dismiss button on this alert.'
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
	openCodeTab,
	{
		text:'<p>'
		+  'This is the NetLogo Code tab, where the action happens! It is where you\'ll be writing your instructions for NetLogo, the code.'
		+'</p>'
		+'<p>'
		+  'Let\'s create the  <code class="codeABMA">setup</code> procedure and fix the error. Every procedure starts with the '
		+  '<a href="https://ccl.northwestern.edu/netlogo/bind/primitive/to.html" target="_blank" rel="noopener noreferrer">\'to\'</a> '
		+  'followed by the procedure\'s name, and ends with <a href="https://ccl.northwestern.edu/netlogo/bind/primitive/end.html" target="_blank" rel="noopener noreferrer">\'end\'</a>.'
		+'</p>'
		+'<p>'
		+  'In between <code class="codeABMA">to setup</code> and <code class="codeABMA">end</code>, we will be defining the things that happen, in order, when the setup procedure is called.'
		+'</p>'
		+'<p>'
		+  '<b>Important Learning Actions:</b> We have prepopulated the code area with the code you will need - it is the bold text with a light background. You will type over this code. '
		+  'Click the demo button to see how to type over it. Please replace the demo code with your own typed code. '
		+  'You will need to do this throughout the tutorials, type over the code we provide you with, it will give you valuable practice. '
		+  'A skill you will need to create your own models. Eventually we no longer will give you these prepopulated code pieces but for now you need to type over the code to advance to the next step.'
		+'</p>'
		+'<p>'
		+  '<b>Trouble shooting:</b> For the next few code examples you will need to type over the code to enable the next button. '
		+  'This includes spaces, if you find that it is not advancing make sure that you have typed over all the spaces.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'to setup\nend\n', insertAtText:'PROCEDURE' });
		},
		buttons: [
			backButton,
			pauseButton,
			disabledNext,
			{
				action() {
					demoCode({text:'to setup\nend'});
				},
				text:  '<span class="ABMAbttnSpanClass">Demo</span>',
				classes:'ABMAsecondaryBttn',
			},
		],
		when: {
			show: function() {
				allowNextOnCodeTypeover();
			},
		},
	},
	{
		text:'<p>'
		+  'Every time you want a code change to take effect, you have to recompile the code.  To do this, click on the <b>Recompile Code</b> button.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-recompilation-button')},
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Now, the <code class="buttonName">setup</code> button is no longer red! Even if you click on it, there will be no error. Please click it.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return getWidgetElement({type:'button', source:'setup'})},
		},
		complexAdvanceOn: function() {
			advanceOnButtonClick({type:'button', source:'setup'});
		},
	},
	{
		text:'<p>'
		+  'No error appears!'
		+'</p>'
		+'<p>'
		+  '....Unfortunately, nothing happens either, the view stays black. '
		+  'That\'s because the procedure is empty in the NetLogo Code tab; '
		+  'NetLogo knows there\'s a \'setup\', but it\'s still empty. Let\’s fix that.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return getWidgetElement({type:'view'})},
		},
	},
	{
		text:'<p>'
		+  'It\'s time to put something inside the <code class="codeABMA">setup</code> procedure.'
		+'</p>'
		+'<p>'
		+  'Let\'s start creating some agents. We want this action to happen when the <code class="codeABMA">setup</code> procedure is called, '
		+  'so it will go between <code class="codeABMA">to setup</code> and <code class="codeABMA">end</code>. We will do that in very next step.'
		+'</p>'
		+'<p>'
		+  'In NetLogo lingo, agents are referred to as "turtles". To create some turtles we will be using the '
		+'<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/create-turtles.html" target="_blank" rel="noopener noreferrer">create-turtles</a></code> primitive. '
		+createMoreInfoBox({content:'<p>'
		+  '<b>Primitive: </b>A primitive is a built-in, to NetLogo, piece of code whose meaning or behavior is pre-defined. Primitives can be actions, reporters or built-in values. '
		+  'They are the simplest and smallest pieces of pre-defined NetLogo keywords that can be used to build agent-based models. '
		+'</p>'}),
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
				highlightLines({searchTerm:'to setup',additionalLines:1});				//add the highlight element
			})
		},
	},
	{
		text:'<p>'
		+  'We will use the <code class="codeABMA">create-turtles</code> primitive.Because <code class="codeABMA">create-turtles</code> is a primitive, '
		+  'we don\'t need to tell NetLogo what it means to \'create-turtles\', it already knows! '
		+  '<code class="codeABMA">create-turtles</code> is an action primitive, '
		+  'which is recognizable by its blue color.'
		+'</p>'
		+'<p>'
		+  'In this case we will also pass an argument, a value, to the primitive -<code class="codeABMA">create-turtles 20</code>: the number 20, so that NetLogo knows to make 20 new agents. '
		+  'Values will automatically turn orange. Please type over the highlighted code. Remember to include spaces to enable the next button.'
		+'</p>'
		+createMoreInfoBox({content:'<p>'
		+  '<b>Code Colors:</b> Think of color coding in NetLogo as a form of spelling check: if you misspell a primitive\'s name, '
		+  'it won\'t turn blue.  You can learn more about color codes in '
		+  'NetLogo <a href="https://ccl.northwestern.edu/netlogo/bind/article/code-colors-in-netlogo.html" target="_blank" rel="noopener noreferrer">here</a>. '
		+'</p>'}),
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  create-turtles 20\n', insertAtText:'to setup'});
		},
		when: {
			show: function() {
				allowNextOnCodeTypeover();
			},
		},
		buttons: disabledNextButtons,
	},
	{
		basicStep: clickRecompileCode,
	},
	{
		basicStep: clickSetUpButton,
	},
	{
		text:'<p>'
		+  'Clicking the button has called the  <code class="codeABMA">setup</code> procedure, and you have now made some agents! '
		+  'There are twenty of them, but they are still a bit small, and hard to see. Let\'s go back to the code and fix that.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return getWidgetElement({type:'view'})}
		},
	},
	{
		text:'<p>'
		+  'When creating turtle agents, we can immediately specify some of their features, by adding brackets <code class="codeABMA">[ ]</code> '
		+  'after the <a href="https://ccl.northwestern.edu/netlogo/bind/primitive/create-turtles.html" target="_blank" rel="noopener noreferrer"><code class="codeABMA">create-turtles</code></a> '
		+  'to add features to the agents. '
		+'</p>'
		+'<p>'
		+  'By default, every agent has a couple of built-in agent characteristics as primitives, such as shape and size. '
		+  'You can recognize these primitives by their purple color.'
		+'</p>'
		+'<p>'
		+  'Between the brackets, type: '
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/set.html" target="_blank" rel="noopener noreferrer">set</a> size 2</code> - '
		+  'this sets the size of the agents to 2, which equals 2 patches.'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/set.html" target="_blank" rel="noopener noreferrer">set</a> shape \"turtle\"</code>  '
		+  '- this sets the shape of the agents to a cute turtle. Please type over the highlighted code. Remember to include spaces to enable the next button.'
		+'</p>'
		+createMoreInfoBox({content:'<p>'
		+  '<b>Shapes: </b>More information about available shapes and editing them can be found '
		+  '<a href ="http://ccl.northwestern.edu/netlogo/docs/shapes.html" target="_blank" rel="noopener noreferrer">here</a>'
		+'</p>'}),
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			let text = ' [\n    set size 2\n    set shape "turtle"\n  ]\n';
			addExampleCode({text:text, insertAtText:'create-turtles 20', position:'at', startCh:24});
		},
		when: {
			show: function() {
				allowNextOnCodeTypeover();
			},
		},
		buttons: disabledNextButtons,
	},
	{
		text:'<p>'
		+  'Recompile the code and click the <code class="buttonName">setup</code> button.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
		multiStepAdvance: function () {
			let options = [
					{
						name:'actionSetRecompile',
						label:'Click recompile',
						function:(action)=>{
							tourOnRecompile(action);
						}
					},
					{
						name:'actionSetSetup',
						label:'Click setup',
						function:(action)=>{
							tourOnButtonClick({buttonSettings:{type:'button', source:'setup'}, action:action});
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
		+  'The size and shape of the turtles have changed, but they still appear as a big blob. '
		+'</p>'
		+'<p>'
		+  'To understand why this happens, let\'s talk a bit about how space works in NetLogo. '
		+  'As mentioned before, the world in NetLogo is actually made up of patches, forming a grid of cells.'
		+'</p>'
		+'<p>'
		+  'Each patch is a stationary agent. It can\'t move, but like turtles, it can have all sorts of attributes as variables.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return getWidgetElement({type:'view'})}
		},
	},
	{
		text:'<p>'
		+  'The patches were a bit difficult to see because by default they are black. '
		+  'However, if we give them alternating colors (<a href="https://ccl.northwestern.edu/netlogo/bind/primitive/pcolor.html" target="_blank" rel="noopener noreferrer"><code class="codeABMA">pcolor</code></a>), '
		+  'they are much easier to differentiate!'
		+'</p>'
		+'<p>'
		+  'Each of the cells in this checkerboard pattern is a patch with a unique coordinate assigned to it (pxcor, pycor).'
		+'</p>'
		+'<p>'
		+  'By default, turtles will be created at the origin: the patch (0,0), which is at the center here. '
		+  'This is why right now, the turtles are hard to see: they are stacked on top of each other!'
		+'</p>'
		+'<p>'
		+  'Let\'s fix that by making them all appear at slightly different locations.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return getWidgetElement({type:'view'})}
		},
		when: {
			show: function () {
				session.run('me','ask patches with [(remainder pxcor 2 = 0 and remainder pycor 2 = 0) or (remainder pxcor 2 != 0 and remainder pycor 2 != 0)][set pcolor 2]'); //LvdK: changed it cause headache inducing
				setTimeout (() => {
						   setTourState();
				}, 100);
			},
		},

	},
	{
		text:'<p>'
		+  'Let\'s add a new feature to the turtles when creating them: their location.'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">setxy random 5 random 5</code> - '
		+  'This line uses the <a href="https://ccl.northwestern.edu/netlogo/bind/primitive/setxy.html" target="_blank" rel="noopener noreferrer"><code class="codeABMA">setxy</code></a> '
		+  'primitive, which needs an x and an y-coordinate (<code class="codeABMA"> x y</code>). It also uses the <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/random.html" target="_blank" rel="noopener noreferrer">random</a></code> '
		+  'primitive, which reports (generates) a random number between 0 and n, in this case, 5.'
		+'</p>'
		+'<p>'
		+  'Taken together, this line of code sets the turtle\'s location within a random 5 patches of the center patch (0,0).'
		+'</p>'
		+'<p>'
		+  'PS: we have changed all patches back to black.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'    setxy random 5 random 5\n', insertAtText:'set shape'});
		},
		when:{
			show: () => {
				session.run('me','Ask patches [set pcolor black]');
				setTimeout (() => {
						   setTourState();
				}, 100);
			},
		},
	},
	{
		text:'<p>'
		+  'Recompile the code and click the <code class="buttonName">setup</code> button, twice. </p><p>The turtles are more scattered and much easier to see, '
		+  'but there\'s more than twenty now. Each time you click <code class="buttonName">setup</code> more will appear, try it! '
		+  'This is because we are not wiping our model clean every time we initialise it.</p> <p>Let\'s fix that.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
		multiStepAdvance: function () {
			let options = [
					{
						name:'actionSetRecompile',
						label:'Click recompile',
						function:(action)=>{
							tourOnRecompile(action);
						}
					},
					{
						name:'actionSetSetup',
						label:'Click setup',
						function:(action)=>{
							tourOnButtonClick({buttonSettings:{type:'button', source:'setup'}, action:action});
						}
					},
				],
				actionOnComplete = ()=> {
					enableNextButton();
				}
			actionCheckList({options:options, actionOnComplete:actionOnComplete });
		},
		buttons: disabledNextButtons,
	},
	{
		text:'<p>'
		+  'First, underneath to  <code class="codeABMA">setup</code> insert a new line of code: '
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">clear-all</code>'
		+'</p>'
		+'<p>'
		+  'The <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/clear-all.html" target="_blank" rel="noopener noreferrer">clear-all</a></code> '
		+  'primitive resets the model to a blank state, and usually is put at the very beginning of the procedure.'
		+'</p> '
		+'<p>'
		+  'Then, insert a new line at the end of the procedure - before end:'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">reset-ticks</code>'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/reset-ticks.html" target="_blank" rel="noopener noreferrer">reset-ticks</a></code> '
		+  'goes at the end of the setup procedure. '
		+  'We haven\'t introduced the dimension of time to our model yet, but we will later on, so it is important to also reset the time during initialization.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			let text = '  clear-all\n',
				text2 = '  reset-ticks\n';

			addExampleCode({text:text, insertAtText:'to setup'});
			addExampleCode({text:text2, insertAtText:']'});
		},
	},
	{
		text:'<p>'
		+  'Recompile the code and click the <code class="buttonName">setup</code> button. '
		+  'Because the model is wiped clean at the start of the setup procedure, the number of turtles after setup will always be 20. '
		+  'Click <code class="buttonName">setup</code> button several times to see this.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
		multiStepAdvance: function () {
			let options = [
					{
						name:'actionSetRecompile',
						label:'Click recompile',
						function:(action)=>{
							tourOnRecompile(action);
						}
					},
					{
						name:'actionSetSetup',
						label:'Click setup',
						function:(action)=>{
							tourOnButtonClick({buttonSettings:{type:'button', source:'setup'}, action:action});
						}
					},
				],
				actionOnComplete = ()=> {
					enableNextButton();
				}
			actionCheckList({options:options, actionOnComplete:actionOnComplete });
		},
		buttons: disabledNextButtons,
	},
	{
		text:'<p>'
		+  'Congratulations, this is the end of the tutorial. In it, you have built the setup of a simple agent-based model, '
		+  'by situating a population of agents in an abstract landscape.'
		+'</p>'
		+'<p>'
		+  'Through completing this tutorial, you have: '
		+'</p>'
		+'<ul>'
			+'<li>gained basic proficiency in using the NetLogo Interface (creating buttons);</li>'
			+'<li>built the initialization phase of a simple ABM (the <code class="codeABMA">setup</code> procedure);</li>'
			+'<li>gained familiarity with some primitives commonly used in setup procedures (<code class="codeABMA">create-turtles</code>, <code class="codeABMA">set</code>, <code class="codeABMA">setxy</code>, etc.).</li>'
		+'</ul>'
	},
];
