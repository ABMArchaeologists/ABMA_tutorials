let furtherABMBuilding = [
	{
		text:'<h2>'
		+  'Welcome to Mastering the Basics!'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we will be building the initialization phase of a simple model of trade. '
		+  'We will mostly use syntax that you should already be familiar with by completing the previous tutorials and practice the NetLogo basics by applying them to a new topic: Roman Trade. '
		+  'As such, this lesson is for you if you completed the previous tutorials and/or are familiar with basic NetLogo syntax.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you will:'
		+'</p>'
		+'<ul>'
		+  '<li>practice the NetLogo basics.</li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  'As opposed to the first set of tutorials, the lessons in this tutorial provide less specific guidance. We will give you instructions in chunks, '
		+  'sometimes to complete multiple actions in a single step, instead of highlighting exactly what you need to do. '
		+  'This is deliberate: an important part of coding is learning how to use documentation to solve any problems that you may run into independently. '
		+  'If you get stuck, please check out the \’FAQ\’ section, as well as the '
		+  '<a href="https://ccl.northwestern.edu/netlogo/5.0/docs/dictionary.html" target="_blank" rel="noopener noreferrer">Netlogo Dictionary</a>.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.ABMAFAQHolderClass',
		},
	},
	{
		text:'<p>'
		+  'We often model to understand observed data patterns in the archaeological record. '
		+   'When it comes to trade, a general archaeological observation is that when looking at the frequency of artifact types over time, different sites often show different frequency curves.'
		+'</p>'
		+'<p>'
		+  'Take for example Roman amphoras. A Dressel 20 amphora may \'arrive\' relatively early at one site but then decrease quickly, '
		+  'while at another site, it arrives later, but maintains steady popularity.'
		+'</p>'
		+'<p>'
		+  'Why might this be? Differences in frequency curves of artifact types are often hypothesized to be caused by price, '
		+  'accessibility, functionality, popularity, or a combination thereof.'
		+'</p>'
		+'<p>'
		+  'Investigating all these factors all at once is complex, so we\'ll start simple: in this chapter we\'ll '
		+  'build a simple model of trade which is meant to investigate the impact of accessibility on the distribution of goods as a baseline scenario.'
		+'</p>'
		+'<p>'
		+  '<img src="assets/images/Frequencies.png" height="500px"/>'
		+'</p>',
	},
	{
		text:'<p>'
		+  'To do so, we\'ll create a world where one production center (the house-shaped agent) is surrounded by multiple vendors, representing markets (the person-shaped agents), some close by, '
		+  'some farther away. Production and trade will use simple rules. As vendors are located at different distances from the producer, '
		+  'some have direct access and contact with the producer, while others are dependent on trade with other vendors.'
		+'</p>'
		+'<p>'
		+  '<img src="assets/images/Trade_Distance_Setup.png" height="400px"/>'
		+'</p>',
	},
	openCodeTab,
	{
		text:'<p>'
		+  'Let\'s start off by creating a basic <code class="codeABMA">setup</code> procedure, which:'
		+'</p>'
		+'<ol>'
		+  '<li>clears the model;</li>'
		+  '<li>resets the ticks counter.</li>'
		+'</ol>'
		+'<p>'
		+  'Make sure to check your code by recompiling at the end. '
		+  'We\'ll expect you to recompile the code every time you make a significant code change, as you normally would, to check that no errors occur.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'to setup\n  clear-all\n  reset-ticks\nend', });
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Next, create an accompanying <code class="buttonName">setup</code> button. If you remember from the earlier tutorials, you need to go into Authoring mode to create a button.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
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
		+  'Remember from the previous tutorials to put the procedure name, <code class="codeABMA">setup</code>, in the Commands box.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {element} = getActiveEditForm();
				return element;
			},
		},

	},
	{
		basicStep: ConfirmByClickingOK ,
	},
	moveAndResize,
	{
		text:'<p>'
		+  'In the <code class="codeABMA">setup</code> procedure, create one turtle, set its <code class="var">color</code> to <code class="codeABMA">red</code> '
		+  'and its <code class="var">shape</code> to <code class="codeABMA">"house"</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'  create-turtles 1 [\n    set color red\n    set shape "house"\n  ] \n', insertAtText:'clear-all'});
		},
	},
	{
		text:'<p>'
		+  'Check your change by recompiling and setting up your model i.e. click <code class="buttonName">setup</code>. Don\'t forget to change back to interactive mode before clicking the button.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: ()=>{return document.querySelector('.netlogo-display-horizontal')},
		},
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'setup'});
		},
	},
	{
		text:'<p>'
		+  'Because the origin (0,0) is at the center of the world in this view,'
		+  ' and turtles are created at the origin by default, the house should be exactly in the center. '
		+  'If you don\'t see the house - check that you recompiled the code and then click setup again. '
		+  'If the code is not recompiled then setup button won\'t know to run it.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=> {
				return getWidgetElement({type:'view'});
			},
		},
		when: { 
			show: function () {
				session.run('me','watch turtle 0'); 
				setTimeout (() => {
						   setTourState();
				}, 100);
			},
		}
	},
	{
		text:'<p>'
		+  'Next we want to create the layered diamond of vendor agents.'
		+'</p>'
		+'<p>'
		+  '<img src="assets/images/Trade_Distance_Setup.png" height="200px"/>'
		+'</p>'
		+'<p>'
		+  'We are going to start to introduce you to pseudocode code. This will be important in the next lessons so pay attention to how we convert the pseudocode to real code.'
		+'</p>'
		+'<div class="abmMoreInfoHolder">'
		+'     <h3>Pseudocode</h3>'
		+'     <p>to populate</p>'
		+'     <p>hatch agents at neighboring cells</p>'
		+'</div>'
		+'<p>'
		+  'To create this diamond shape, we\'ll ask all existing turtles to <code class="codeABMA">hatch</code> new turtles in the four neighboring patches (<code class="codeABMA">neighbors4</code>). '
		+  'To achieve this, let\'s  first create a new empty procedure <code class="codeABMA">populate</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'\n\nto populate\nend\n\n', insertAtText:'end' });
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
		when: { 
			show: function () {
				session.run('me','reset-perspective'); 
				setTimeout (() => {
						   setTourState();
				}, 100);
			},
		}
	},
	{
		text: '<p>'
		+  'Inside this new <code class="codeABMA">populate</code> procedure, we\'ll ask turtles to identify patches that are not occupied.'
		+'</p>'
		+'<p>'
		+  'Ask turtles to create a local variable <code class="newvar">not-occupied</code> storing the agentset consisting of the four surrounding patches with no turtles on them, '
		+  'like so: <code class="codeABMA">let not-occupied neighbors4 with [not any? turtles-here]</code> or so'
		+  '<code class="codeABMA">let not-occupied neighbors with [count turtles-here = 0]</code>'
		+'</p>'
		+'<div class="abmMoreInfoHolder">'
		+  '<p>'
		+    '<b>Local variable:</b> are defined with <code class="codeABMA">let</code> instead of <code class="codeABMA">set</code> and can only be used and '
		+    'accessed inside the code block they are defined in. </a>'
		+'</p>'
		+'</div>'
		+'<p>'
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/neighbors4.html" +target="_blank" rel="noopener noreferrer">neighbors4</a></code> is used to '
		+  'only consider the patches west, south, east, and north of the turtle\'s current patch.'
		+'</p>'
		+'<p>'
		+  'By using the conditional <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/with.html" target="_blank" rel="noopener noreferrer">with</a></code> '
		+  'we tell turtles to only include <code class="codeABMA">neighbors4</code> with no turtles on them yet.'
		+'</p>', 
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'  ask turtles [\n    let not-occupied neighbors4 with [not any? turtles-here]\n  ]\n', insertAtText:'to populate' });
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Next, we want turtles to <code class="codeABMA">hatch</code> the number of turtles required to fill up the unoccupied patches. '
		+  'We\'ll use <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/count.html" target="_blank" rel="noopener noreferrer">count</a></code> '
		+  'to count the number of patches in the <code class="var">not-occupied</code> agentset as an argument for the hatch primitive.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'    hatch count not-occupied\n', insertAtText:'    let not-occupied neighbors4'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text: '<p>'
		+  'We\'ll supplement <code class="codeABMA">hatch</code> with a code block where we ask the new turtles to:'
		+'</p>'
		+'<ul>'
		+  '<li> decrease their (from their parent inherited) color by 10;</li>'
		+  '<li> set their shape to person;</li>'
		+  '<li> move to a neighboring patch (<code class="codeABMA">neighbors4</code>) with no turtles on it.</li>'
		+'</ul>'
		+'<p>'
		+  'While you may be tempted to write <code class="codeABMA">move-to one-of not-occupied</code> here, this would not give the desired diamond shape. Why do you think this is? '
		+  'Instead, to make the hatched turtles move to an empty patch use: <code class="codeABMA">move-to one-of neighbors4 with [not any? turtles-here]</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:' [\n      set color color - 10\n      set shape "person"\n      move-to one-of neighbors4 with [not any? turtles-here]\n    ]\n', insertAtText:' hatch count not-occupied', position:'at', startCh:28});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Lastly, we need to call the <code class="codeABMA">populate</code> procedure in the <code class="codeABMA">setup</code> procedure so that it\'ll execute '
		+  'when we press the button! Make sure to put it before  <code class="codeABMA">reset-ticks</code>, but after the first turtle has been created. (Otherwise, '
		+  'there are no turtles we can ask to <code class="codeABMA">populate</code>!)'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'  populate\n', insertAtText:']'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'To check whether your code works correctly, click <code class="buttonName">setup</code>.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: ()=>{return document.querySelector('.netlogo-display-horizontal')},
		},
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'setup'});
		},
	},
	{
		text: '<p>'
		+  'Your view should now look like this:'
		+'</p>'
		+'<p>'
		+  '<img src="assets/images/Trade_Distance_First_Setup.png" height="200px"/>'
		+'</p>'
		+'<p>'
		+  'A good start!'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=> {
				return getWidgetElement({type:'view'});
			},
		},
	},
	{
		text:'<p>'
		+  'Let\'s change the model slightly so that the diamond can have multiple layers. '
		+  'We will introduce a new slider <code class="sliderName">level</code> that controls how many layers of agents are created. Please create this slider. '
		+  'Don\'t forget to go into authoring mode, right click on the green area and then select the slider.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: ()=>{return document.querySelector('.netlogo-display-horizontal')},
		},
		complexAdvanceOn: function() {
			advanceOnCreateWidgetWithContextMenuWait();
		},
	},
	{
		text:'<p>'
		+  'Have the slider refer to the new global variable <b>level</b>, give it a maximum of 6, an increment of 1, and a default value of 6. When you are done, remember to click Ok.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {element} = getActiveEditForm();
				return element;
			},
		},
		complexAdvanceOn: function() {
			advanceOnEditForm();
		},
	},
	moveAndResize,
	{
		text:'<p>'
		+  'Next, in the <code class="codeABMA">setup</code> procedure, enclose the line calling the <code class="codeABMA">populate</code> procedure by '
		+  '<code class="codeABMA">[]</code> brackets, and in front of it, write <code class="codeABMA">repeat level</code>.'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/repeat.html" target="_blank" rel="noopener noreferrer">repeat</a></code> '
		+  'is used to execute commands multiple times. For example, if we want <code class="codeABMA">populate</code> to run 3 times when <code class="codeABMA">setup</code> is called, '
		+  'instead of writing  <code class="codeABMA">populate populate populate</code>, we can simply write  <code class="codeABMA">repeat 3 [populate]</code>'
		+'</p>'
		+'<p>'
		+  'Not only does this make your code much more concise, but it is also great when you want to have more flexibility in controlling the number of repetitions '
		+  'like we are doing by using the <code class="var">level</code> variable as argument here.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'  repeat level [ populate ] ', insertAtText:'  populate', replace:true});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Try changing the <code class="sliderName">level</code> slider and clicking <code class="buttonName">setup</code> a couple of times. '
		+  'The world should look a bit different every time! Remember to be in interactive mode.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: ()=>{return document.querySelector('.netlogo-display-horizontal')},
		},
	},
	{
		text:'<p>'
		+  'This model uses much of the same syntax as the previous Out-of-Africa model, but the representation is very different. '
		+  'Simple syntax is super versatile, and mastering the basics builds a strong foundation for moving forward.'
		+'</p>'
		+'<p>'
		+  'By completing this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>have practiced the NetLogo basics by setting up a simple trade model.</li>'
		+'</ul>'
		+'<p>'
		+  'The next lesson will introduce some new syntax and help you complete this simple trade model.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=> {
				return getWidgetElement({type:'view'});
			},
		},
	},
];
