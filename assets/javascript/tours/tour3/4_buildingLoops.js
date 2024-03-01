let buildingLoops= [
	{
		text:'<h2>'
		+  'Welcome to Building Loops!'
		+'</h2>'
		+'<p>'
		+  'In this tutorial we will be introducing more intelligent behavior to a simple trade model through the use of loops.'
		+'<p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>will learn how to make and use loops </li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  '<b>Advancing your skills:</b> In this tutorial and in future ones we are going to remove most of the detailed instructions for creating buttons, sliders, etc. '
		+  'If you have gone through the tutorials you will have lots of expereince in creating the interphase elements. '
		+  'If you get stuck, please check out the \’FAQ\’ section, as well as the '
		+  '<a href="https://ccl.northwestern.edu/netlogo/5.0/docs/dictionary.html" target="_blank" rel="noopener noreferrer">Netlogo Dictionary</a>.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.ABMAFAQHolderClass',
		},
	},
	{
		text: '<p>'
		+  'As is, this model simulates trade based on very simple assumptions.'
		+'</p>'
		+'<p>'
		+  'Agents will trade indiscriminately with neighbors, and trade is based on chance.'
		+'</p>'
		+'<p>'
		+  'We are going to adjust the model so that agents are a bit more intelligent:'
		+'</p>'
		+'<ul>'
		+  '<li> Vendors will only trade with neighboring vendors further away from the production center;</li>'
		+  '<li> Vendors will trade on the basis of their storage capacity i.e. vendors with limited goods in storage will want to acquire and hold onto more goods.</li>'
		+  '</ul>'
		+'<p>'
		+  'Open the code tab to start.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area',
		},
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showCode'});  
		},
	},
	{
		text:'<p>'
		+  'We\'ve already commented out the contents of the <code class="codeABMA">trade</code> procedure and the <code class="sliderName">trade-probability</code> slider has been removed.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{
				return document.getElementById('ABMAlineHighlightDiv');
			},
		},
		beforeShowPromise: function() {
			return new Promise(function(resolve) {	
					//need to make sure the code tab is open first
					let observer1 = new Promise(function(resolve) {
						return testForElement({resolve: resolve, element: '#netlogo-code-tab-editor'});
					}).then(()=> {
							highlightLines({searchTerm:'to trade', additionalLines:7});				//add the highlight element
					}),
					observer = new MutationObserver(function(mutations) {				//create the observer of changes to the document
						if ( document.getElementById('ABMAlineHighlightDiv') !== null ) {	//if the div highlight exists, end observe and resolve the promise
							resolve();
							this.disconnect();												//disconnect it after use to avoid infinity loop
						}
					}),
					config = { childList: true, subtree: false };							//set the config for observer	

				observer.observe(document.body, config); 													
			})
		},
	},
	{
		text:'<p>'
		+  'First, create a new slider  <code class="sliderName">storage</code>, with a maximum of 100 and a default and increment of 5.'
		+'</p>'
		+'<p>'
		+  'In this case, we\'ll keep it simple and give every vendor the same storage capacity, so we can use a global variable.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		modalOverlayOpeningPadding:5000
	},
	{
		text:'<p>'
		+  'Now, create another slider <code class="sliderName">storage-threshold</code>. Give it a maximum of 0.5, an increment of 0.01 and a default of choice.'
		+'</p>'
		+'<p>'
		+  'This number represents the number of goods a vendor is willing to trade: '
		+  'for example, if <code class="codeABMA">storage-threshold = 0.35</code> and <code class="codeABMA">storage = 100</code>, '
		+  'agents are willing to trade until 35% of their storage capacity remains, in this case 35 goods.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		modalOverlayOpeningPadding:5000
	},
	{
		text:'<p>'
		+  'We want vendors to trade with not just anyone, but vendors that are further away from the production center.'
		+'</p>'
		+'<p>'
		+  'In this model, agents don\'t move, so instead of checking for distance during the simulation loop, '
		+  'it will be more efficient to give agents a custom variable with the distance from the production center during setup.'
		+'</p>'
		+'<p>'
		+  'Firstly, define a new custom variable for all turtles called <code class="newvar">distance-level</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:' distance-level', insertAtText:'turtles-own', position:'at', startCh:18});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'In the <code class="codeABMA">setup</code> procedure, assign the producer the <code class="var">distance-level</code> of 0.'
		+'</p>'
		+'<div class="abmMoreInfoHolder">'
		+  '<p>'
		+    '<b>Note: </b>The default of variables is 0, but writting it out explicitely is good practice</a>.'
		+  '</p>'
		+'</div>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'    set distance-level 0\n', insertAtText:'create-producers'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'In the populate procedure, have hatched turtles increase their (from their parents\' inherited) <code class="var">distance-level</code> by 1.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'      set distance-level distance-level + 1\n', insertAtText:'hatch'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
		
	},
	{
		text:'<p>'
		+  'By providing turtles with this new <code class="var">distance-level</code> variable, it will be easier for vendors to identify potential partners for trade.'
		+'</p>'
		+'<p>'
		+  'Go down to the <code class="codeABMA">trade</code> procedure.'
		+'</p>'
		+'<p>'
		+  'Create a new local variable <code class="newvar">next-tier-neighbors</code> that stores all vendors on the four neighboring patches (<code class="codeABMA">neighbors4</code>).'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  let next-tier-neighbors vendors-on neighbors4\n', insertAtText:'to trade'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'We want potential trading partners to be located on the four neighboring patches (<code class="codeABMA">neighbors4</code>) like before, '
		+  'but this time we want them to also be further away from the production center.'
		+'</p>'
		+'<p>'
		+  'Replace the previous definition of <code class="var">next-tier-neighbors</code> with :  '
		+  '<code class="codeABMA">(vendors-on neighbors4) with [distance-level = [distance-level + 1] of myself]</code>'
		+'</p>'
		+'<div class="abmMoreInfoHolder">'
		+  '<p>'
		+    '<b>Note: </b>Writing <code class="codeABMA">vendors-on neighbors4 with [distance-level = [distance-level + 1] of myself]</code> </a>, without the () brackets will '
		+    'cause NetLogo to throw an error, because it will interpret <code class="var">distance-level</code> as belonging to '
		+    '<code class="codeABMA">neighbors4</code> instead of <code class="codeABMA">vendors\n'
		+  '</p>'
		+'</div>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  let next-tier-neighbors (vendors-on neighbors4) with [distance-level = [distance-level + 1] of myself]', insertAtText:'next-tier-neighbors', position:'at', replace:true});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Let\'s look at this code in a bit more detail. Most of it you should recognize, but <code class="codeABMA">myself</code> is new. '
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/myself.html" target="_blank" rel="noopener noreferrer">myself</a></code> '
		+  'is a primitive that might be a bit difficult to wrap your head around at first, but it\'s very useful!'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">myself</code> is a companion to <code class="codeABMA">self</code>. '
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/myself.html" target="_blank" rel="noopener noreferrer">self</a></code> '
		+  'refers simply to the agent which is performing the action.'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">myself</code> is used in a situation where one agent is asking another agent something, and refers to the first agent.'
		+'</p>'
		+'<p>'
		+  'For example, in the below code snippet:'
		+'</p>'
		+'<pre class="codeblockABMA"> ask turtle 1 [ \n'
		+  '    ask turtle 2 [ \n'
		+  '       set color [color] of myself \n'
		+  '   ]\n'
		+  ']\n'
		+'</pre>'
		+'<p>'
		+  '<code class="codeABMA">myself</code> points to turtle 1, and turtle 2 will change its color to that of turtle 1.'
		+'</p>'
		+'<p>'
		+  'In our trade procedure, the inclusion of the with-statement makes it so that e.g. a vendor with <code class="codeABMA">distance-level = 3</code>, '
		+  'will only consider neighbors with <code class="codeABMA">distance-level = 4</code>, its own <code class="var">distance-level</code> plus 1.'
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
				highlightLines({searchTerm:'let next-tier-neighbors (vendors-on neighbors4) with [distance-level'});				//add the highlight element
			})
		},
	},
	{
		text:'<p>'
		+  'We want vendors to <code class="codeABMA">trade</code> as often as is needed to get rid of their surplus <code class="var">goods</code> '
		+  '(the number of goods over <code class="codeABMA">storage * storage-threshold</code>)'
		+'</p>'
		+'<p>'
		+  'To achieve this we\'ll be using a <code class="codeABMA">while</code>-loop.'
		+'</p>'
		+'<p>'
		+  'Below the line defining <code class="var">next-tier-neighbors</code> write:'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">while [goods > storage * storage-threshold][]</code>'
		+'</p>'
		+'<p>'
		+  'A <code class="codeABMA">while</code> loop will repeat the commands inside the second pair of brackets as long as the condition in the first pair of brackets is true.'
		+'</p>'
		+'<p>'
		+  'In this case, it will continue indefinitely or until there are fewer <code class="var">goods</code> than <code class="codeABMA">storage * threshold</code>, '
		+  'repeating the commands we will specify in the next step.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  while [goods > storage * storage-threshold][]\n', insertAtText:'next-tier-neighbors'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
		//TO-DO: explanation of while a bit more thorough
	},
	{
		text:'<p>'
		+  'Next inside the second pair of brackets:'
		+'</p>'
		+'<ol>'
		+  '<li> decrease <code class="var">goods</code> by one</li>'
		+  '<li> ask one of the <code class="var">next-tier-neighbors</code> to increase their <code class="var">goods</code> by one </li>'
		+'</ol>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'\n    set goods goods - 1\n    ask one-of next-tier-neighbors [\n      set goods goods + 1\n    ]\n  ', insertAtText:'storage-threshold', position:'at', startCh:46});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'The <code class="codeABMA">trade</code> procedure now specifies that while the vendor has any surplus <code class="var">goods</code>, '
		+  'they will continue trading with neighbors further away from the production center.'
		+ '<p> However, we only want neighbors that have storage space ( fewer <code class="var">goods</code> than <code class="var">storage</code>) to be interested in trade.'
		+'<\p>'
		+'<p>'
		+  'Change the code so that it specifies that only <code class="var">next-tier-neighbors</code> with fewer <code class="var">goods</code> than '
		+  '<code class="var">storage</code> will be asked to trade (want to obtain goods). Use a <code class="codeABMA">with</code> conditional.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:' with [goods < storage]', insertAtText:'ask one-of next-tier-neighbors', position:'at', startCh:34});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Try running the simulation!'
		+'</p>'
		+'<p>'
		+  'Depending on your settings, the simulation might run without issue.'
		+'</p>'
		+'<p>'
		+  'Try decreasing <code class="sliderName">storage</code> slider to 5 and rerunning the simulation.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,
	},
	{
		text:'<p>'
		+  'A new error! This time it reads \'ASK expected input to be an agent or agentset but got NOBODY instead.\'. Dismiss the error.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: ()=>{return document.querySelector('#alert-dialog')},
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
			checkCodeTabOpen();
		},
		alertTrue:true,
	},
	{
		text:'<p>'
		+  'Look at the <code class="codeABMA">trade</code> procedure: can you figure out why NetLogo throws this error?'
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
				highlightLines({searchTerm:'to trade', additionalLines:7});				//add the highlight element
			})
		},
	},
	{
		text:'<p>'
		+  'With the way the <code class="codeABMA">trade</code> procedure is written, vendors will continue to trade with their <code class="var">next-tier-neighbors</code> '
		+  'until they run out of surplus <code class="var">goods</code>.'
		+'</p>'
		+'<p>'
		+  'But what happens when there are still <code class="var">goods</code> left (the loop continues), '
		+  'but there are no <code class="var">next-tier-neighbors</code> with <code class="var">goods</code> fewer than their <code class="var">storage</code>?'
		+'</p>'
		+'<p>'
		+  'This is the moment NetLogo throws the previous error because there is NOBODY to perform to ASK action.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{
				return document.getElementById('ABMAlineHighlightDiv');
			},
		},
		beforeShowPromise: function() {
			return new Promise(function(resolve) {
					
				highlightLines({searchTerm:'to trade', additionalLines:7, });				//add the highlight element
				setTimeout(resolve,250);
			})
		},
	},
	{
		text:'<p>'
		+  'To fix this, we are going to add a new condition to our <code class="codeABMA">while</code> loop, so that it will only continue when there are neighbors interested in trading.'
		+'</p>'
		+'<p>'
		+  'Inside the first set of <code class="codeABMA">while</code> brackets, add on  <code class="codeABMA"> and any? next-tier-neighbors with [ goods < storage ]</code>'
		+'</p>'
		+'<p>'
		+  'Now there are two conditions that need to be met for the <code class="codeABMA">while</code> loop to continue.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
			},
		codeExample: function() {
			addExampleCode({text:' and any? next-tier-neighbors with [ goods < storage ]', insertAtText:'storage-threshold', position:'at', startCh:44});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text: 'Try rerunning the simulation to check if everything works!</p>',
	attachTo:{
			on: 'top',
			element: '.netlogo-display-vertical',
		},
	},
	{
		text:'<p>'
		+  'Congrats! You have successfully used a loop to give your agents more intelligent behavior.'
		+'</p>'
		+'<p>'
		+  'Loops are very important in most coding languages, and you will encounter them in a lot of NetLogo models. '
		+  'They are also sometimes combined with <code class="codeABMA">ifelse</code> and <code class="codeABMA">stop</code>.'
		+'</p>'
		+'<p>'
		+  'For example, the <code class="codeABMA">trade</code> procedure could be rewritten as:'
		+'</p>'
		+'<pre class="codeblockABMA">'
		+  'to trade\n'
		+  '  let next-tier-neighbors (vendors-on neighbors4) with [ distance-level = [ distance-level + 1 ] of myself ]\n' 
		+  '  while [goods > storage * storage-threshold] [\n'                                                              
		+  '    ifelse any? next-tier-neighbors with [ goods < storage ] [\n'                                               
		+  '      ask one-of next-tier-neighbors with [ goods < storage ] [\n'                                              
		+  '        set goods goods + 1\n'
		+  '      ]\n'
		+  '      set goods goods - 1\n'
		+  '    ]\n'
		+  '    [stop]'
		+'</pre>'
	},
	{
		text:'<p>'
		+  'Loops are sometimes also handled by creating a local variable which keeps track of how many loops there have been, often <code class="newvar">i</code>'
		+'</p>'
		+'<p>'
		+  'So, for example, <code class="codeABMA">repeat level [populate]</code> could be rewritten as:'
		+'</p>'
		+'<pre class = codeblockABMA>let i 0 \n '
		+  'while [i < level][\n '
		+  ' populate\n '
		+  ' set i i + 1 \n '
		+  ']'
		+'</pre>'
		+'<p>'
		+  'Go on, try it out!'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-display-horizontal',
		},
	},
	{
		text:'<p>'
		+  'Loops are a very common element of most models, ABM included. While they may be a bit difficult to wrap your head around at first, '
		+  'mastering them will take you far! By completing this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>have learned how to make and use loops (while) </li>'
		+'</ul>' 
		+'<p>'
		+  'Check out the <a href="https://ccl.northwestern.edu/netlogo/bind/primitive/while.html" target="_blank" rel="noopener noreferrer">Beginner\'s Interactive NetLogo Dictionary\'s '
		+  'entry on the while loop </a> and some of the models linked at the bottom to see some examples.'
		+'</p>'
		+'<p>'
		+  'In the next lesson we are going to use reporters to create a graph, so that we can better judge the patterns our model is creating. To continue, click Next.'
		+'</p>'
	}
];
