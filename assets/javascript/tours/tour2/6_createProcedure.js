const createProcedure = [
 	{
		text:'<h2>'
		+  'Creating Custom Procedures'
		+'</h2>'
		+'<p>'
		+  'In the past lessons, we created a simple ABM using only primitives, predefined pieces of code: '
		+  'built-in agent characteristics - such as <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/shape.html" target="_blank" rel="noopener noreferrer">shape</a></code> '
		+  'and <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/size.html" target="_blank" rel="noopener noreferrer">size</a></code> - '
		+  'and action primitives - like <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/create-turtles.html" target="_blank" rel="noopener noreferrer">create-turtles</a></code> '
		+  'and <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/forward.html" target="_blank" rel="noopener noreferrer">forward</a></code>.'
		+'</p>'
		+ '<p>'
		+  'However, you can also use NetLogo to create your own variables and procedures. '
		+  'For example, your turtle may have not just a shape and size, but also an age, gender, favourite color etc. '
		+  'Similarly, there are built-in actions such as <code class="codeABMA">forward</code> or <code class="codeABMA">die</code>, but maybe your turtles also eat or (spoiler!) reproduce.'
		+'</p>',
	},
	{
		text: '<p>'
		+  'This lesson is for you if you can read and make simple NetLogo models using basic primitives, '
		+  'but would like to learn how to create custom procedures.'
		+'</p>'
		+'<p>'
		+  'At the end of this lesson, you will have: '
		+'</p>'
		+'<ul>'
		+  '<li>expanded your repertoire of NetLogo primitives - built-in procedures;</li>'
		+  '<li>learned how to customize your model with procedures;</li>'
		+  '<li>learned how to make simple if-statements.</li>'
		+'</ul>',
	},
	{ 
		text:'<p>'
		+  'Let\’s get started!'
		+'</p>'
		+'<p>'
		+  'So far our turtles are able to move, but because there are only twenty of them, '
		+  'they can\'t really cover the entire landscape in a true wave of dispersal.'
		+'</p>'
		+'<p>'
		+  'Let\'s change the model so that reproduction is also a driver behind the dispersal.'
		+'</p>'
		+'<img src="assets/images/turtlesInVoid.png" height="200px"/>'
	},
	openCodeTab,
	{
		text: '<p>'
		+  'Because we want turtles to reproduce every time step, we want to add code in the <code class="codeABMA">go</code> '
		+  'procedure we defined previously so that turtles will first move and then reproduce.'
		+'<\p>'
		+'<p>'
		+  'Add a new line: <code class="codeABMA">reproduce</code>'
		+'</p>'
		+'<p>'
		+  'Afterwards, click recompile.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'    reproduce\n', insertAtText:'forward 1'});
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,
	},
	{
		text: '<p>'
		+  'This error is actually similar to the one from the first lesson when we tried to use the <code class="buttonName">setup</code> button.'
		+'</p>'
		+'<p>'
		+  'While the <code class="codeABMA">setup</code> and <code class="codeABMA">go</code> procedure are used in most NetLogo models, they are custom procedures and not primitives, '
		+  'because their behavior is different for each model. So actually, you have already built a custom procedure before!'
		+'</p>'
		+'<p>'
		+  'Like <code class="codeABMA">setup</code>, <code class="codeABMA">reproduce</code> is not a primitive, so we have to define it as a new procedure in our code.'
		+'</p>'
		+'<p>'
		+  'Dismiss the error.'
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
		text: '<p>'
		+  'At the bottom of the code, add a new procedure called reproduce. Recompile!'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
		codeExample: function() {
			addExampleCode({text:'\nto reproduce\nend\n\n', insertAtText:'end', instance:1});
		},
	},
	{ 
		text:'<p>'
		+  'If you\'ve defined your procedure correctly, no error should appear anymore but your procedure is still empty, so let\'s define what it means for turtles to reproduce. '
		+  'Previously, we used the <a href="https://ccl.northwestern.edu/netlogo/bind/primitive/create-turtles.html" target="_blank" rel="noopener noreferrer">'
		+  '<code class="codeABMA">create-turtles</code></a> primitive to make new agents. '
		+  'Try using  <code class="codeABMA">create-turtles</code> to make one new turtle, '
		+  'and recompile the code.'
		+'</p>' ,
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  create-turtles 1\n', insertAtText:'to reproduce'});
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,
	},
	{
		text:'<p>'
		+  'A new error! This error says that we are trying to use an observer primitive in a turtle context. '
		+  'One NetLogo \'agent\' we haven\'t talked about is the observer. You can think of the observer as the \'god\' of the world; '
		+  'it looks over the world and the agents in it.'
		+'</p>'
		+'<p>'
		+  'The observer doesn\'t just observe passively, it gives instructions to the agents.'
		+'</p>'  
		+'<p>'
		+  'Some primitives can only be used by the observer, some by patches, some by agents.'
		+'</p>'
		+'<img src="assets/images/netlogoDic.png" height="200px"/>'
		+'<p>'
		+  'To see which primitive can be used by who, you can check out the '
		+  '<a href ="https://ccl.northwestern.edu/netlogo/docs/dictionary.html" target="_blank" rel="noopener noreferrer">NetLogo Dictionary.</a>'
		+'</p>'
		+'<p>'
		+  'Here, this error appears because we are asking a turtle to perform an action that can only be done by the observer. '
		+  'Click the dismiss button on this alert.'
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
		text:'<p>'
		+  'Luckily, there\'s a different primitive that turtles can use: the '
		+  '<code class="codeABMA"><a href = "https://ccl.northwestern.edu/netlogo/bind/primitive/hatch.html#" target="_blank" rel="noopener noreferrer">hatch</a></code>\ primitive.'
		+'</p>'
		+createMoreInfoBox({content:'<p>'
		+'When asking patches to create a turtle, '
		+'<a href = "https://ccl.northwestern.edu/netlogo/bind/primitive/sprout.html#" target="_blank" rel="noopener noreferrer"> <code class="codeABMA">sprout</code></a>'
		+' is used instead.'
		+'</p>'}),
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  hatch 1\n', insertAtText:'create-turtles 1', replace:true});
		},
	},
	{
		text:'<p>'
		+  '<code class="codeABMA">hatch</code> behaves very similarly to create-turtles. However, a hatched turtle is a clone of its parent, '
		+  'and so will inherit all of its parent\’s characteristics like color, size and shape.'
		+'</p>'
		+'<p>'
		+  'Just like with <code class="codeABMA">create-turtles</code>, we can specify the new turtle\'s features by adding code inside the brackets.'
		+'</p>'
		+'<p>'
		+  'Here we will make the child turtles a slightly different color from their parents.'
		+'</p>'
		+'<p>'
		+  'We will do so by increasing the number that specifies their color. Write <code class="codeABMA">set color color + 0.1</code>'
		+'</p>'
		+ '<p> Recompile the code. </p>'
		+createMoreInfoBox({content:'<p>'
		+'Each color in NetLogo has a number associated with it, ranging from 0 to 140. Red, for example, is the number 15. '
		+'To learn more have a look at '
		+'<a href = "http://www.netlogoweb.org/launch#http://ccl.northwestern.edu/netlogo/models/models/Code%20Examples/Color%20Chart%20Example.nlogo" target="_blank" rel="noopener noreferrer">this NetLogo web model</a> '
		+'and the <a href = "https://ccl.northwestern.edu/netlogo/bind/article/shapes-and-colors-in-netlogo.html" target="_blank" rel="noopener noreferrer"> dictionary</a>'
		+'</p>'}),
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:' [\n    set color color + 0.1\n  ]\n', insertAtText:'hatch 1', position:'at', startCh:10});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{ 
		text: '<p>'
		+  'Try running your simulation. First press <code class="buttonName">setup</code>, then <code class="buttonName">go</code>.'
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
		text: '<p>'
		+  'We will automatically stop the simulation for you after 5 ticks, to avoid NetLogo Web freezing. '
		+  'As you can see the turtles have already multiplied rapidly, slowing down the model.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
				stopAtTicks({ticks:5, activeButton:getWidgetElement({type:'button', source:'go'}), action:enableNextButton}); 
		},
		buttons: disabledNextButtons,
	},
	{ 
		text:'<p>'
		+  'We know that people do not reproduce all the time so we will give agents a small probability of having a child at every time step.'
		+'</p>'
		+'<p>'
		+  'To achieve this, we will be using an if-statement, which has the structure of '
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">if condition [ command(s) ]</code>'
		+'</p>'
		+'<p>'
		+'the commands will only run if the condition is met.'
		+'</p>'
		+'<p>'
		+  'In this case, the commands we want to run are the <code class="codeABMA">reproduce</code> procedure, so that\'ll go between the brackets.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'    if condition [reproduce]', insertAtText:'reproduce', replace:true});
		},
	},
	{ 
		text:'<p>'
		+  'To define this condition, we want to use <code class="codeABMA">random-float</code>. '
		+  'The primitive <a href="https://ccl.northwestern.edu/netlogo/bind/primitive/random-float.html" target="_blank" rel="noopener noreferrer"> <code class="codeABMA">random-float</code></a>  '
		+  'selects a random decimal number, and it is commonly used for incorporating probability.'
		+'</p>'
		+'<p>'
		+  'In the <a href="https://ccl.northwestern.edu/netlogo/bind/primitive/ask.html" target="_blank" rel="noopener noreferrer">ask</a> command, write '
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">if random-float 1 <= 0.2 [reproduce]</code>'
		+'</p>' 
		+'<p>'
		+  'Here we draw a random number between 0 and 1  ( <code class="codeABMA">random-float 1</code>) and '
		+  'if it is lower than the value of population growth the code block enclosed in  <code class="codeABMA">[]</code>, '
		+  'the reproduce procedure will run. '
		+  'For example, if the condition is 0.2, there is a probability of 20% that turtles reproduce.'
		+'</p>'
		+'<p>'
		+  'When you are ready, recompile the code.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'    if random-float 1 <= 0.2 [reproduce]', insertAtText:'reproduce', replace:true});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
		alertTrue:true,
	},
	{ 
		text: '<p>'
		+  'Try running your simulation. First press <code class="buttonName">setup</code>, then <code class="buttonName">go</code>.'
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
		text: '<p>'
		+  'We will automatically stop the simulation for you after 15 ticks. '
		+  'Congratulations! You\'ve customized the model to create a demographically driven dispersal wave.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
				stopAtTicks({ticks:15, activeButton:getWidgetElement({type:'button', source:'go'}), action:enableNextButton}); 
		},
		buttons: disabledNextButtons,
	},
	{
		text:'<p>'
		+  'This is the end of the lesson. In it, you: '
		+'</p>'
		+'<ul>'
		+  '<li> expanded your repertoire of primitives (random, hatch);</li>'
		+  '<li> learned how to customize your model with procedures;</li>'
		+  '<li> learned how to make simple if-statements (if).</li>'
		+'</ul>'
		+'<p>'
		+  'In the next lesson, you will learn how to customize your model further with the use of custom variables.'
		+'</p>',
	},
];
