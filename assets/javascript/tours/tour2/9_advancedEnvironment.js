const advancedEnvironment = [
	{
		text:'<h2>'
		+  'Advanced Environment: Ifelse, Die'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we will be expanding a simple agent-based model to replicate the SteppingOut model, as implemented by Highes et al. (2007). '
		+  'SteppingOut explores the impact of the biomes on the spread of the Homo Ergaster out of Africa, by connecting different biomes to different extinction probabilities.'
		+'</p>'
		+'<p>'
		+  'If you are a beginner in NetLogo, we advise you to first check out the previous lessons. '
		+  'In those lessons, you will learn the basics of ABM in NetLogo by building a simple agent-based model simulating the spread of agents over an abstract landscape, '
		+  'of which this lesson is a more complex version.'
		+'</p>'
		+'<p>'
		+  'This lesson is for you if you have done the earlier lessons and are looking to expand your NetLogo skills and learn to add external data to your model.'
		+'</p>'
		+'<p>'
		+  'This lesson is also for you if you have built a simple abstract NetLogo model before, '
		+  'but would like to learn how to add empirical data and more complex agent-environment interaction to your model.'
		+'</p>'
		+'<footer class="citation">'
		+  'Hughes, John K., Alan Haywood, Steven J. Mithen, Bruce W. Sellwood, and Paul J. Valdes. '
		+  '"Investigating early hominin dispersal patterns: developing a framework for climate data integration." <i>Journal of human evolution </i> 53, no. 5 (2007): 465-474.'
		+'</footer>',
	},
	{
		text:'<p>'
		+  'In this lesson you will learn how to:'
		+'</p>'
		+'<ul>'
		+  '<li>create custom agent variables;</li>'
		+  '<li>use more complex if-else statements and conditionals;</li>'
		+  '<li>add more complex agent-environment interaction.</li>'
		+'</ul>',
	},
	openCodeTab,
	{
		text:'<p>'
		+  'Let\'s get started!'
		+'</p>'
		+'<p>'
		+  'First, we want to change the map so that it shows the different biomes. We\'ll be using the fetch extension in combination with  <code class="codeABMA">import-a:pcolors</code>'
		+'</p>'
		+'<p>'
		+  'Switch out the link in the  <code class="codeABMA">setup</code> procedure for <code class="codeABMA">"https://raw.githubusercontent.com/SantaFeInstitute/ABMA/master/ch4/ch4_veg.png"</code>'
		+'</p>'
		+'<p>'
		+  'Recompile the code when you are ready.'
		+'</p> ',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  import-a:pcolors fetch:url (word "https://raw.githubusercontent.com/SantaFeInstitute/ABMA/master/ch4/ch4_veg.png")', insertAtText:'import-a:pcolors',replace:true});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Click the <code class="buttonName">setup</code> button to see the map.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'button', source:'setup'}); 
			},
		}, 
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'setup'}); 
		},
	},
	{
		text:'<p>'
		+  'This map is a slightly different size, so now the world and the agents\' location are a bit off. '
		+  'Let\'s fix that by first editing the view in authoring mode.'
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
		text:'<p>'
		+  'Right-click the view.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{
				return getWidgetElement({type:'view'});
			},
		},
		complexAdvanceOn: function() {
			advanceOnContextMenu();
		},
	},
	{
		text:'<p>'
		+  'Then click ‘Edit’.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.getElementById('netlogo-widget-context-menu')},
		},
		complexAdvanceOn: function() {
			advanceOnContextMenu();
		},
	},	
	{
		text: '<p>'
		+  'Change the size of the world so that the maximum x is 359, and the maximum y is 180. Set the patch size to 1. Confirm your change by pressing Ok.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.querySelector('#view-edit-window')},
		},
		complexAdvanceOn: function() {
			advanceOnEditForm();
		},
	},
	{
		text:'<p>'
		+  'The map is a bit small, so if you want adjust the size.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		when:{//TODO when NetLogo web is updated to fix this problem this can be removed.
			show: () => {
				world.resize( 0, 359, 0, 180, true, true);
				world.setPatchSize(1);	
			}
		},
	},
	{
		basicStep: goIntoInteractiveMode,
	},
	{
		text:'<p>'
		+  'Test the new size of the world by setting up the model again.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'button', source:'setup'}); 
			},
		}, 
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'setup'}); 
		},
	},
	{
		text:'<p>'
		+  'The map fits the world much better, but the turtles still appear in the wrong spot. Let\'s fix that!'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=> {
				return getWidgetElement({type:'view'});
			},
		},
		when: { 
			show: function () {
				session.run('me',' watch one-of turtles'); 
			}, 
		} 
	},
	{
		text:'<p>'
		+  'With this new map, turtles should appear at roughly (215, 94) instead of (350, 160) as they are now.'
		+'</p>'
		+'<p>'
		+ 'Replace the relevant line of code and recompile.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'    setxy (215 + random 5) (94 + random 5)      ', insertAtText:'setxy', replace:true});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
		when: { 
			show: function () {
				session.run('me','reset-perspective'); 
			},
		}, 
	},
	{
		text:'<p>' 
		+  'Try to see if the turtles are at the right location now i.e. reset the model.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-display-horizontal',
		},
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'setup'}); 
		},
	},
	{
		text:'<p>'
		+  'Looks good! Next, we want the patches to be recognizable as belonging to different biomes with different changes of extinction.'
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
		+  'Start by giving patches a new variable, <code class="newvar">p_ext</code>, so that they are recognizable as biomes with different extinction probabilities.'
		+'</p>'
		+'<p>'
		+  'Unlike global variables (like  <code class="var">pop_growth</code> here), we want this variable to be <i>unique</i> rather than the same for all patches. '
		+  'To define agent-specific variables, we need to use  <code class="codeABMA">'
		+  '<a href = "http://ccl.northwestern.edu/netlogo/docs/dict/turtles-own.html" target="_blank" rel="noopener noreferrer"> turtles-own</a></code>, '
		+  '<code class="codeABMA">patches-own</code>, etc., at the top of the code. These  <code class="codeABMA">-own</code> '
		+  'primitives are followed by brackets enclosing the name of the variables.'
		+'</p>'
		+'<p>'
		+  'Add a line of code at the top to define a new variable of patches, <code class="codeABMA">patches-own [p_ext]</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text: 'patches-own [p_ext]\n', insertAtText:'SETUP PROCEDURE' });
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
		text:'<p>'
		+  'Let\'s use this new variable  <code class="var">p_ext</code> to give each biome a different extinction probability. '
		+  'In the setup, we will ask patches to set a  <code class="var">p_ext</code> value and a new color depending on their original color. '
		+'</p>'
		+'<p>'
		+  'Agents will always go extinct in the boreal forest  (pcolor  44.7), tundra ( pcolor, 18.6) and land ice (pcolor 9.4), so they\'ll be given a value of 1. '
		+  'Desert patches - with pcolor 27.5 - have a high extinction probability of 0.07. '
		+  'All other patches are more agent-friendly and have therefore an extinction probability of 0.01.'
		+'</p>'
		+'<p>'
		+  'In the code, after the import-a statement, write:'
		+'</p>'
		+  '<pre class = codeblockABMA>  ask patches [\n'
		+'    ifelse pcolor = white [\n'
		+'      set p_ext 0\n'
		+'    ]\n'
		+'    [\n'
		+'      if pcolor = 44.7 or pcolor = 18.6 or pcolor = 9.4 [\n'
		+'        set p_ext 1\n'
		+'        set pcolor brown\n'
		+'      ]\n'
		+'      if pcolor = 27.5 [ \n'
		+'        set p_ext 0.07\n'
		+'        set pcolor yellow\n'
		+'      ]\n'
		+'      if pcolor != brown and pcolor != yellow [\n'
		+'        set p_ext 0.01\n'
		+'        set pcolor green\n'
		+'      ]\n'
		+'    ]\n'
		+'  ]\n</pre>'
		+'<p>'
		+  'This code first checks if a patch is white, and if not, assigns a <code class="var">p_ext</code> and <code class="var">pcolor</code> on the basis of the original color.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			let text = '  ask patches [\n'
				+'    ifelse pcolor = white [\n'
				+'      set p_ext 0\n'
				+'    ]\n'
				+'    [\n'
				+'      if pcolor = 44.7 or pcolor = 18.6 or pcolor = 9.4 [\n'
				+'        set p_ext 1\n'
				+'        set pcolor brown\n'
				+'      ]\n'
				+'      if pcolor = 27.5 [ \n'
				+'        set p_ext 0.07\n'
				+'        set pcolor yellow\n'
				+'      ]\n'
				+'      if pcolor != brown and pcolor != yellow [\n'
				+'        set p_ext 0.01\n'
				+'        set pcolor green\n'
				+'      ]\n'
				+'    ]\n'
				+'  ]\n';
			addExampleCode({text:text, insertAtText:'import-a:pcolors'});
		},
	},
	{
	text:'<p>'
		+  'Next, we need to code in the probability of turtles going extinct depending on the patch they\'re located on. '
		+  'In the  <code class="codeABMA">go</code> procedure, before  <code class="codeABMA">reproduce</code>, ask turtles to '
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/die.html" target="_blank" rel="noopener' 
		+  'noreferrer">die</a></code> if the  <code class="var">p_ext</code> probability is exceeded.'
		+'</p>'
		+'<p>'
		+  'This is short-hand for <code class="codeABMA">if random-float 1 <= [p_ext] of patch-here</code>. '
		+  'Because  <code class="var">p_ext</code> is a variable of patches, but we are asking a turtle to check this condition, '
		+  'NetLogo will correctly assume that <code class="var">p_ext</code> refers to the <code class="var">p_ext</code> of the patch the turtle is located on: '
		+  'remember, agents act on the basis of their locality.'
		+'</p>'
		+'<p>'
		+  'Recompile the code when you are ready.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'    if random-float 1 <= p_ext [die]\n', insertAtText:'if random-float 1'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{ 
		text: '<p> Re-run your simulation. First press setup, then go.</p>', 
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
		+  'Do you notice any differences with the implementation without extinction? Does the pattern differ from the previous implementation and if so, how?'
		+'</p>'
		+'<p>'
		+  'Click the <code class="buttonName">go</code> button again to stop the model.'
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
		+  'So far, agents\' movement is entirely determined by chance. '
		+  'However, we know that human movement is dictated by a much more complex process of decision-making and often acts in response to external factors such as '
		+  '(the perception of) the environment.'
		+'</p>'
		+'<p>'
		+  'This is a common strategy in model making - '
		+  'we start with the simplest possible implementation and then add new factors, one at a time thus testing their impact on the results.'
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
		+  'Let\'s put this idea into practice, by adjusting the <code class="codeABMA">reproduce</code> procedure so that new agents consider their probability '
		+  'of going extinct on a patch to which they move. '
		+  'Instead of using the primitive <code class="var">one-of</code>, we will deploy the primitive <code class="codeABMA">min-one-of</code> '
		+  'to find the patch with the smallest <code class="var">p_ext</code> value and move to it.'
		+'</p>'
		+'<p>'
		+  'Recompile the code when you are ready.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'      move-to min-one-of empty-patches [p_ext]', insertAtText:'move-to one-of empty-patches', replace: true});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{ 
		text: '<p>'
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
		+  'Does it look different? You have probably noticed that it is increasingly difficult to assess the results visually, i.e., '
		+  'by looking at the simulation. The next lesson will look at that.'
		+'</p>'
		+'<p>'
		+  'Click the <code class="buttonName">go</code> button again to stop the model.'
		+'<p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.querySelector('.netlogo-display-vertical')},
		},
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'go'}); 
		},
	},
	{
		text:'<p>'
		+  'This is the end of this lesson. '
		+  'In it, we expanded a simple agent-based model to replicate the SteppingOut model to explore the impact of the biomes on the spread of the Homo Ergaster.'
		+'</p>'
		+'<p>'
		+  'Through this lesson you have learned how to:'
		+'</p>'
		+'<ul>'
		+  '<li>create custom agent variables (patches-own, turtles-own);</li>'
		+  '<li>use more complex if-else statements and conditionals;</li>'
		+  '<li>implement more complex agent-environment interaction.</li>'
		+'</ul>'
		+'<p>'
		+  'If you would like to learn how to more thoroughly compare multiple simulation scenarios, please go to the next lesson by clicking the Next button below. '
		+  'In this lesson, you will learn how to create plots to monitor your simulations.'
		+'</p>'
	},
];
