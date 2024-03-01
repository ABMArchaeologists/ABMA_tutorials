let simpleSugarscape = [
	{
		text:'<h2>'
		+  'Welcome to Simple Sugarscape'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we will build a simple and well-known subsistence model: the Sugarscape model, originally built by Joshua M. Epstein and Robert Axtell. '
		+  'This lessons builds on syntax from previous tutorials, but you will be applying this syntax to encorporate more complex agent-environment interaction.'
		+'<p>'
		+'<p>'
		+  'This lesson is for you if you have completed the first three sets of tutorials and would like to learn more complex NetLogo coding.'
		+'</p>'
		+'<p> In this lesson, you: </p>'
		+'<ul>'
		+  '<li>will learn how to incorporate more complex agent-environment interaction.</li>'
		+'</ul>' 
		+'<div class="abmMoreInfoHolder">'
		+  '<p>'
		+    '<b>Alert:</b> Continuing with the process set out in Tutorial 3, we will be providing less specific guidance to get you used to working on your own. '
		+    'If you get stuck, please check out the \’Common Issues\’ section, as well as the Netlogo Dictionary. '
		+  '</p>'
		+'</div>'
		+'<footer class="citation">'
		+  'Epstein, J.M. and Axtell, R., 1996. Growing artificial societies: social science from the bottom up. Brookings Institution Press.'
		+'</footer>',
	},
	{
		text:'<p>'
		+  'We will be creating a basic subsistence model. Agents in this model are semi-sedentary foragers. '
		+  'These agents will gather, store and consume resources, and move when resources grow sparse on their patch. Each time step or tick represents one month. '
		+  'In this first version, patches will not regrow their resources, but we will implement that in the next lesson.'
		+'</p>',
	},
	{
		text:'<p>'
		+  'Create <code class="buttonName">setup</code> and <code class="buttonName">go</code> (forever checked) buttons. '
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
	},
	{
		text:'<p>'
		+  'Next, create a button called <code class="buttonName">step</code> calling the <code class="codeABMA">go</code> procedure, but leave forever unchecked. '
		+  'Put <code class="codeABMA">step</code> in display-name, and <code class="codeABMA">go</code> in Commands.'
		+'</p>'
		+'<p>'
		+  'This button will allow us to move one tick at a time. Once you are done with that, open the code tab. '
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		modalOverlayOpeningPadding:5000,
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showCode'});  
		},
	},
	{
		text:'<p>'
		+  'Next, create place-holder <code class="codeABMA">setup</code> and <code class="codeABMA">go</code> procedures. '
		+  'Do you remember what basic things should go into these procedures?'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},

		advanceExampleCode: {
			solution:'to setup\n  clear-all\n  reset-ticks\nend\n\nto go\n  tick\nend',
			codeExample: function() {
				addExampleCode({text:'to setup\n  clear-all\n  reset-ticks\nend\n\nto go\n  tick\nend\n\n\n'});
			},
			fullCode:'',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Create a new agent-breed: foragers.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'breed [ foragers forager ]\n\nto setup\n  clear-all\n  reset-ticks\nend\n\nto go\n  tick\nend',
			codeExample: function() {
				addExampleCode({text:'breed [ foragers forager ]\n\n', insertAtText:'setup', position:'at'});
			},
			fullCode:'to setup\n  clear-all\n  reset-ticks\nend\n\nto go\n  tick\nend\n\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'On the interface put a new slider <code class="sliderName">number-foragers</code> which controls the number of forager agents which will be created, '
		+  'maximum 100, increment 10, default 10.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},	
	},
	{
		text: '<p>'
		+  'Inside the <code class="codeABMA">setup</code> procedure create the foragers (using <code class="var">number-foragers</code>). '
		+'</p>' 
		+'<p>'
		+  'Give the foragers a shape of choice and move them to a random patch.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n',
			codeExample: function() {
				addExampleCode({text:'  create-foragers number-foragers [\n    set shape "house"\n    move-to one-of patches\n  ]\n', insertAtText:'clear-all'});
			},
			fullCode:'breed [ foragers forager ]\n\nto setup\n  clear-all\n  reset-ticks\nend\n\nto go\n  tick\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Next, give each forager a new variable <code class="newvar">storage</code>, with 0 as starting value. '
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'breed [ foragers forager ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks',
			codeExample: function() {
				addExampleCode({text:'foragers-own [ storage ]\n', insertAtText:'breed'});
				addExampleCode({text:'    set storage 0\n', insertAtText:'create-foragers'});
			},
			fullCode:'breed [ foragers forager ]\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  tick\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text: '<p>'
		+  'Next, give each patch new variable <code class="newvar">resources</code>, and this time set 10 as the starting value. In addition, have patches set their color to green.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'breed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend',
			codeExample: function() {
				addExampleCode({text:'patches-own [ resources ]\n', insertAtText:'breed'});
				addExampleCode({text:'  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n', insertAtText:'clear-all'});
			},
			fullCode:'breed [ foragers forager ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  tick\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text: '<p>'
		+  'Let\'s start specifying agent behavior. Create a new procedure <code class="codeABMA">gather</code>, empty for now. In the <code class="codeABMA">go</code> procedure, '
		+  'ask foragers to <code class="codeABMA">gather</code>.'
		+'<p/>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to go\n  ask foragers [ gather ]\n  tick\nend\n\nto gather\nend',
			codeExample: function() {
				addExampleCode({text:'  ask foragers [ gather ]\n', insertAtText:'go'});
				addExampleCode({text:'\nto gather\nend\n', insertAtText:'end', instance:1});
			},
			fullCode:'breed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  tick\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text: '<p>'
		+  'Inside the <code class="codeABMA">gather</code> procedure, create a local variable <code class="newvar">current-gather</code>'
		+  ' which stores the amount the amount of <code class="var">resources</code> of the patch the agent is at.'
		+'</p>'
		+'<details>'
		+  '<summary>HINT 1:</summary>'
		+  'Do you remember <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/docs/dict/patch-here.html?">patch-here</a></code>?'
		+'</details>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to gather\n  let current-gather [resources] of patch-here\nend',
			codeExample: function() {
				addExampleCode({text:'  let current-gather [resources] of patch-here\n', insertAtText:'to gather'});
			},
			fullCode:'breed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ gather ]\n  tick\nend\n\nto gather\nend\n\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Next, decrease the patch\'s <code class="var">resources</code> by <code class="var">current-gather</code>, and increase the forager agent\'s '
		+  '<code class="var">storage</code> by <code class="var">current-gather</code>.'
		+'</p>'
		+'<p>'
		+  'The forager has now taken the resources from the patch and put them in their own storage.'
		+'</p>'
		+'<details>'
		+  '<summary>HINT 1:</summary>'
		+  '<p>'
		+    'We are asking foragers to gather in the go procedure, so you can simply use <code class="codeABMA">set storage storage + current-gather</code>'
		+  '</p>'
		+'</details>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to gather\n  let current-gather [resources] of patch-here\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\n',
			codeExample: function() {
				addExampleCode({text:'  set storage storage + current-gather\n', insertAtText:'current-gather'});
				addExampleCode({text:'  ask patch-here [\n    set resources resources - current-gather\n  ]\n', insertAtText:'current-gather'});
			},
			fullCode:'breed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ gather ]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\nend\n\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'If we were to run the model now, foragers would gather a lot - all their patch\'s resources - in the first month/tick.'
		+'</p>'
		+'<p>'
		+  'Realistically, we would expect foragers to not (be able to or want to) gather all available resources at once.'
		+'</p>'
		+'<p>'
		+  'Create a new slider <code class="sliderName">gather-rate</code> which determines how much (in absolute numbers) a forager can gather at once, maximum of 10, increment of 1, '
		+  'and default of 5.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		modalOverlayOpeningPadding:5000
	},
	{
		text:'<p>'
		+  'Modify the gather procedure so that foragers can only gather as much as the <code class="var">gather-rate</code> and as much as the current patch\'s <code class="var">resources</code>.'
		+'</p>'
		+'<p>'
		+  'In other words, if <code class="var">resources</code> are fewer than the <code class="buttonName">gather-rate</code>, all <code class="var">resources</code> will be gathered, '
		+  'while otherwise, only the <code class="buttonName">gather-rate</code> will be gathered.</code>'
		+'</p>'
		+'<details>'
		+  '<summary>HINT 1:</summary>'
		+  '<p>'
		+    'Try using an <code class="codeABMA">if</code> or <code class="codeABMA">ifelse</code> statement to modify <code class="var">current-gather</code>'
		+    'according to whether <code class="buttonName">gather-rate</code> exceeds the <code class="var">resources</code>. '
		+  '</p>'
		+'</details>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\n',
			codeExample: function() {
				addExampleCode({text:'  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n', insertAtText:'current-gather'});
			},
			fullCode: 'breed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ gather ]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Of course, foragers will not just gather, but also consume and deplete their storage. '
		+  'Create a new slider <code class="sliderName">consumption-rate</code>, which will determine how much (in absolute numbers) a forager will consume at each tick, '
		+  'maximum 10, an increment of 1, and a default of 4.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		modalOverlayOpeningPadding:5000
	},
	{
		text:'<p>'
		+  'Create a new procedure <code class="codeABMA">eat</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'\nto eat\nend\n',
			codeExample: function() {
				addExampleCode({text:'\nto eat\nend\n', insertAtText:'end', instance:2});
			},
		fullCode: 'breed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ gather ]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'In the go procedure, call the <code class="codeABMA">eat</code> procedure by adding it to the ask foragers code-block.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to go\n  ask foragers [ eat gather ]\n  tick\nend\n\n\n',
			codeExample: function() {
				addExampleCode({text:'eat ', insertAtText:'gather', position:'at', startCh:17});
			},
			fullCode:'breed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ gather ]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'In the <code class="codeABMA">eat</code> procedure, decrease <code class="var">storage</code> by <code class="var">consumption-rate</code>. '
		+  'However, make sure the <code class="var">storage</code> will never go below 0.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\n', insertAtText:'to eat'});
			},
			fullCode:'breed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ eat gather ]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\nend\n\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'If you were to run the model now, a lot would be happening, but you wouldn\'t be able to tell.'
		+'</p>'
		+'<p>'
		+  'In an appropriate place in the <code class="codeABMA">go</code> procedure, ask foragers to set their label to their <code class="var">storage</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to go\n  ask foragers [ eat gather ]\n  ask foragers [set label storage]\n  tick\nend\n\n',
			codeExample: function() {
				addExampleCode({text:'  ask foragers [set label storage]\n', insertAtText:'tick', instance:1, position:'at'});
			},
			fullCode:'breed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ eat gather ]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\n\n'
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
		
	},
	{
		text:'<p>'
		+  'Try testing your model by setting it up and clicking the step button a couple of times. Also, change the variables.'
		+'</p>', 
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  'In this lesson, we\'ve used syntax we\'ve learned before to have agents respond to the environment in more sophisticated ways.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>have learned how to incorporate more complex agent-environment interaction.</li>'
		+'</ul>',
	}
 ]