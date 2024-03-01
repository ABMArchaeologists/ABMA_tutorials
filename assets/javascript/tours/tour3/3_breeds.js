let breeds = [
	{
		text:'<h2>'
		+  'Welcome to Agent Breeds!'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we will finish building a simple trade model by introducing a simple simulation loop. '
		+  'We will mostly use syntax that you should already be familiar with by completing the previous tutorials, but will also introduce new syntax related to Agent breeds.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you will:'
		+'</p>'
		+'<ul>'
		+  '<li>practice the NetLogo basics further;</li>'
		+  '<li>learn about breeds and how use them.</li>'
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
	openCodeTab,
	{
		text:'<p>'
		+  'First, let\'s make an important change to our setup procedure which will come in handy when defining the simulation loop in a bit.'
		+'</p>'
		+'<p>'
		+  'At the top of your code write:'
		+'<\p>'
		+'<p>'
		+  '<code class="codeABMA">breed [ producers producer ]<br>breed [ vendors vendor ]</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'breed [ producers producer ]\nbreed [ vendors vendor ]\n', insertAtText:'to setup', position:'at'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Simple ABMs - like the one we showed in the previous tutorial - may have only used the two built-in agent types - turtles and patches.'
		+'</p>'
		+'<p>'
		+  'However, for more complex ABMs, it may be wise to define custom agent '
		+  '<a href="https://ccl.northwestern.edu/netlogo/bind/primitive/breed.html" target="_blank" rel="noopener noreferrer">breeds</a>, each with their distinct characteristics and variables.'
		+'</p>'
		+'<p>'
		+  'This can be especially useful when different types of agents act in different ways, as we will implement later in this tutorial.'
		+'</p>'
		+'<p>'
		+  'Like custom variables, custom breeds need to be defined at the top of the code.'
		+'</p>'
		+'<p>'
		+  'In this case, the two lines on top let NetLogo know that we have two additional distinct agent types: producers and vendors.'
		+'</p>'
		+'<p>'
		+  '<img src="assets/images/turtles.png" height="250px"/>'
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
				highlightLines({searchTerm:'breed [ producers producer ]', additionalLines:1});				//add the highlight element
			})
		},
	},
	{
		text:'<p>'
		+  'Let\'s rewrite our existing code a bit to account for this change.'
		+'</p>'
		+'<p>'
		+  'First, in the <code class="codeABMA">setup</code> procedure, instead of using <code class="codeABMA">create-turtles</code>, we will use <code class="codeABMA">create-producers</code>. '
		+  '<code class="codeABMA">create-&lt;breed&gt;</code>, where <code class="codeABMA">&lt;breed&gt;</code> is replaced with the plural breed name, '
		+  'works the exact same as <code class="codeABMA">create-turtles</code>, except that it lets NetLogo know that the agents created are a distinct category.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'  create-producers 1 [', insertAtText:'  create-turtles ', replace:true});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'In the <code class="codeABMA">populate</code> procedure we still want all agents - so producers as well as vendors - to hatch new turtles, '
		+  'so we can keep using  <code class="codeABMA">ask turtles</code>.'
		+'</p>'
		+'<p>'
		+  'However, we <b>do</b> want the created turtles to be <b>vendors</b>, rather than producers. '
		+  'Because we are using <code class="codeABMA">hatch</code> - which creates a copy of the existing turtle - '
		+  'we need to explicitly set the hatched turtle\'s breed (or it will be a producer agent!).'
		+'</p>'
		+'<p>'
		+  'At the beginning of the <code class="codeABMA">hatch</code> code block, add the line:'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">set breed vendors </code>'
		+'</p>'
		+'<p>'
		+  'You can change the breed of the agent by using <code class="codeABMA">set breed</code> and the plural of the breed like we are doing here.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'      set breed vendors\n', insertAtText:'      set color color - 10', position:'at'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Lastly, we want to give both producers and vendors a custom variable <code class="newvar">goods</code>, which keeps track of how many goods they own during the simulation run.'
		+'</p>'
		+'<p>'
		+  'First, define the new variable at the top of your code, using <code class="codeABMA">'
		+  '<a href="https://ccl.northwestern.edu/netlogo/docs/dict/turtles-own.html" target="_blank" rel="noopener noreferrer">&lt;breed&gt;-own</a></code>.'
		+'</p>'
		+'<p>'
		+  'Second, make sure that each agent starts with 0 goods when it is created (the producer, in <code class="codeABMA">setup</code>) or hatched (the vendors, in '
		+  '<code class="codeABMA">populate</code>).'
		+'</p>'
		+'<div class="abmMoreInfoHolder">'
		+  '<p>'
		+    '<b>Note: </b>The default of variables is 0, but writting it out explicitely is good practice</a>.'
		+  '</p>'
		+'</div>'
		+'<p>'
		+  'Giving agents the new custom goods variable can be achieved either by using <code class="codeABMA">producers-own [goods]</code> and '
		+  '<code class="codeABMA">vendors-own [goods]</code> or <code class="codeABMA">turtles-own [goods]</code>, as both producers and vendors are turtles.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'turtles-own [ goods ]\n\n', insertAtText:'to setup', position:'at'});
			addExampleCode({text:'    set goods 0\n', insertAtText:'set shape "house"'});
			addExampleCode({text:'      set goods 0\n', insertAtText:'set shape "person"'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Now, it\'s time to specify our main simulation loop. Let\'s first create a new basic <code class="codeABMA">go</code> procedure which only advances the ticks.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'\nto go\n  tick\nend\n', insertAtText:'end', instance: 3});
		},
	},
	{
		text:'<p>'
		+  'Create an accompanying <code class="buttonName">go</code> button with \'Forever\' checked. Check that there\'s no error when clicking it. '
		+  'Remember to start by going into author mode.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
			advanceOnCreateWidgetWithContextMenuWait();
		},
	},
	{
		text:'<p>'
		+  'Enter <b>go</b> as \'Commands\' and check "Forever". When you are done, remember to click ok.'
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
		+  'We want the simulation loop to consist of four phases:'
		+'</p>'
		+'<ol>'
		+  '<li>Producers produce new goods</li>'
		+  '<li>Producers trade goods with close vendors </li>'
		+  '<li>Vendors trade goods with other close vendors </li>'
		+  '<li>Vendors lose a set number of goods as risk of the trade</li>'
		+'</ol>'
		+'<div class="abmMoreInfoHolder">'
		+  '<h3>Pseudocode</h3>'
		+   '<p>to go</p>'
		+   '<p>ask producers -> produce goods</p>'
		+   '<p>ask producers -> distribute goods (trade)</p>'
		+   '<p>ask vendors -> distribute goods (trade)</p>'
		+   '<p>ask vendors -> consume one item of its good </p>'
		+'</div>'
	},
	{
		text:'<p>'
		+  'First, for production, let\'s create a new global variable with a new <code class="sliderName">production-level</code> slider on the interface. '
		+  'This slider will determine how many goods will be produced by the producer at each time step. Give it a maximum of 50 and an increment and default of choice.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
			advanceOnCreateWidgetWithContextMenuWait();
		},
	},
	{
		text:'<p>'
		+  'Specify <b>production-level</b> as Global variable, with a maximum of 50 and an increment and default of choice. When you are done, remember to click ok.'
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
		text: '<p>'
		+  'In the <code class="codeABMA">go</code> procedure, ask producers to set their <code class="var">goods</code> to the <code class="var">production-level</var>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'  ask producers [set goods production-level]\n', insertAtText:'to go'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text: '<p>'
		+  'Second, we want both producers and vendors to be able to trade goods.'
		+'</p>'
		+'<p>'
		+  'Create an empty <code class="codeABMA">trade</code> procedure. In the go procedure, ask both producers and vendors to <code class="codeABMA">trade</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'\nto trade\nend\n\n', insertAtText:'end', instance:4});
			addExampleCode({text:'\  ask turtles [ trade ]\n', insertAtText:'  ask producers'});
			//addExampleCode({text:'ask turtles [ trade ]\n', insertAtText:'production-level]'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'In this first <code class="codeABMA">trade</code> procedure version, we\'ll keep it simple and have agents trade according to probability. '
		+  'In the next tour, we are going to introduce more intelligent behavior.'
		+'</p>'
		+'<div class="abmMoreInfoHolder">'
		+'    <h3>Pseudocode</h3>'
		+    '<p>    to trade</p>'
		+    '<p>    for every good in storage</p>'
		+    '<p>    if random number exceeds trade-probability</p>'
		+    '<p>    give an item to one of the neighbors</p>'
		+    '<p>    remove one item from own storage</p>'
		+'</div>'
		+'<p>'
		+  'Add a slider <code class="sliderName">trade-probability</code>, with a maximum of 1, and an interval and default of choice. '
		+  'This slider will control the probability that a given good will be traded (e.g. if <code class="var">trade-probability</code> is 0.5, there is a 50% chance)'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		}
	},
	{
		text:'<p>'
		+  'Next, in the <code class="codeABMA">trade</code> procedure, we want each asked agent to go through their <code class="var">goods</code> '
		+  'and decide - based on randomness - if they <code class="codeABMA">trade</code> a good to their neighboring agent.'
		+'</p>'
		+'<div class="abmMoreInfoHolder">'
		+  '<h3>Pseudocode</h3>'
		+  '<p>    to trade</p>'
		+  '<p>    for every good in storage</p>'
		+  '<p>    if random number exceeds trade-probability</p>'
		+  '<p>    give an item to one of the neighbors</p>'
		+  '<p>    remove one item from own storage</p>'
		+'</div>'
		+'<p>'
		+  'First, write <code class="codeABMA">repeat goods []</code>'
		+'</p>'
		+'<p>'
		+  'If an agent has 5 goods, it will repeat the action inside the brackets - which we will define next - 5 times: for every one of the five <code class="var">goods</code>, '
		+  'there\'s a chance it will be traded. '
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'  repeat goods []\n', insertAtText:'to trade'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Second, inside the brackets, write an if statement:'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">if random-float 1 < trade-probability []</code>'
		+'</p>'
		+'<p>'
		+  'The action (<code class="codeABMA">trade</code>) between the brackets will only happen if <code class="var">trade-probability</code> is exceeded by the random decimal number.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'\n    if random-float 1 < trade-probability []\n  ', insertAtText:'repeat goods', position:'at', startCh:16}); 
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'When trade occurs (<code class="codeABMA">random-float 1 < trade-probability</code> is true), '
		+  'we want the goods of the initiating agent to decrease, and the goods of one other close-by vendor to increase.'
		+'</p>'
		+'<p>'
		+  'First, ask the turtle performing the action to decrease its <code class="var">goods</code> by 1. '
		+  'Remember, we are asking every turtle to perform this action by having written <code class="codeABMA">ask turtles [trade]</code> in the go procedure).'
		+'</p>'
		+'<p>'
		+  'Second, write <code class="codeABMA">ask one-of vendors-on neighbors4 [set goods goods + 1]</code>. '
		+  'This increases the number of <code class="var">goods</code> of one close-by (on neighboring patches) agent.'
		+'</p>'
		+'<p>'
		+  'Effectively, the two turtles have now traded one good!'
		+'<\p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		//addExampleCode({text:'\n    if random-float 1 < trade-probability []\n', insertAtText:'repeat goods', position:'at', startCh:16}); 
		codeExample: function() {
			addExampleCode({text:'\n      set goods goods - 1\n      ask one-of vendors-on neighbors4 [set goods goods + 1]\n    ', insertAtText:'if random-float 1 < trade-probability', position:'at', startCh:43});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Lastly, we want some goods to break/be consumed at each time step. '
		+  'To do so, in the <code class="codeABMA">go</code> procedure, ask all vendors that have more than zero <code class="var">goods</code>, '
		+  'to decrease their <code class="var">goods</code> by 1.'
		+'</p>',
		codeExample: function() {
			addExampleCode({text:'\  ask vendors with [goods > 0][set goods goods - 1]\n', insertAtText:'trade'});
		},
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
	},
	{
		text:'<p>'
		+  'If we were to run the simulation now, a lot would happen, but we wouldn\'t be able to see anything because agents don\'t actually move.'
		+'</p>'
		+'<p>'
		+  'As a simple way to show what\'s going on, we\'ll ask all vendors to set their <code class="codeABMA">'
		+  '<a href="https://ccl.northwestern.edu/netlogo/docs/dict/label.html" target="_blank" rel="noopener noreferrer">label</a></code> to their number of '
		+  '<code class="var">goods</code> at the end of the <code class="codeABMA">go</code> procedure:  <code class="codeABMA">set label goods</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-code-container')},
		},
		codeExample: function() {
			addExampleCode({text:'\  ask vendors [ set label goods]\n', insertAtText:'ask vendors'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Try slowing down the tick counter and rerunning the simulation. What do you notice?'
		+'</p>'
		+'<p>'
		+  'If you look at the turtles\' labels you will notice that near the production center, the number of <code class="var">goods</code> is high, but the farther away you get, '
		+  'the lower this number gets. This type of distance decay is common for many distribution patterns.'
		+'</p>'
		+'<p>'
		+  'If you pay close attention during the first couple of ticks, you will also notice that there is a delay when any goods reach vendors at different distance levels.'
		+'</p>'
		+'<p>'
		+  'In lesson 5, we\'ll be looking at ways to better visualize these patterns to make comparison with real data patterns easier.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		}
	},
	{
		text:'<p>'
		+  'The possibility to introduce heteorogeneity to your agents with the use of breeds and different behavior is one of the major strength of ABM!'
		+'</p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>have practiced the NetLogo basics by building a simple trade model;</li>'
		+  '<li>have learned about breeds, how  and why to use them.</li>'
		+'</ul>'
		+'<p>'
		+  'If you want, check out <a href = "https://ccl.northwestern.edu/netlogo/bind/primitive/breed.html">the entry of breeds in the Netlogo Interactive Dictionary</a>, '
		+  'and some of the examples linked at the bottom of the page.'
		+'</p>'
		+'<p>'
		+  'In the next lesson, we are going to introduce more intelligent agent behavior to our model with the use of loops. To continue, click \'Next\' below.'
		+'</p>'
	},
];
