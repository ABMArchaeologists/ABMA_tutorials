let visualiseSugarscape = [
	{
		text:'<h2>'
		+  'Welcome to visualizing your model\'s behavior'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we will build tools to help us visualize our sugarscape model.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>will learn how to incorporate some ways of visualising the environment.</li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  'As you probably noticed, at one point, all foragers will have 0 resources in their <code class="var">storage</code>. '
		+  'At this point in time, we want foragers to move away to a new patch. Open the code tab.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showCode'});  
		},
	},
	{
		text:'<p>'
		+  'Add a new procedure <code class="codeABMA">move</code>. Add it to the end of the ask foragers code block in the <code class="codeABMA">go</code> procedure. '
		+  'We will specify that foragers should move when they have depleted their <code class="var">resources</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to move\nend\n',
			codeExample: function() {
				addExampleCode({text:'\nto move\nend\n', insertAtText:'end', instance:3});
			},		
			fullCode:'breed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ eat gather ]\n  ask foragers [set label storage]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Inside the <code class="codeABMA">move</code> procedure, first specify an empty if statement code-block that checks whether the patch\'s <code class="var">resources</code> '
		+  'are less than the <code class="var">consumption-rate</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'\nto move\n  if [resources] of patch-here < consumption-rate[]\nend\n',
			codeExample: function() {
				addExampleCode({text:'  if [resources] of patch-here < consumption-rate[]\n', insertAtText:'to move'});
			},		
			fullCode:'breed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ eat gather ]\n  ask foragers [set label storage]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\nend\n\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Inside the if code block, specify a local variable <code class="newvar">p</code> storing patches that are empty (without other foragers!) and with '
		+  '<code class="var">resources</code> that exceed the <code class="var">consumption-rate</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'\nto move\n  if [resources] of patch-here < consumption-rate[\n    let p patches with [not any? foragers-here and resources >= consumption-rate]\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'  if [resources] of patch-here < consumption-rate[\n    let p patches with [not any? foragers-here and resources >= consumption-rate]\n  ]\nend\n', insertAtText:'if', instance:2, replace:true});
			},		
			fullCode: '\nbreed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ eat gather ]\n  ask foragers [set label storage]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate[]\nend\n\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Next, write: <code class="codeABMA"> if any? p [ move-to one-of p ]</code>'
		+'</p>'
		+'<p>'
		+  'If the agentset is not empty the forager will move to one of the patches in <code class="var">p</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to move\n  if [resources] of patch-here < consumption-rate[\n    let p patches with [not any? foragers-here and resources >= consumption-rate]\n    if any? p [ move-to one-of p ]\n  ]\nend\n\n',
			codeExample: function() {
				addExampleCode({text:'    if any? p [ move-to one-of p ]\n', insertAtText:'let p'});
			},		
			fullCode:'\nbreed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ eat gather ]\n  ask foragers [set label storage]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate[\n    let p patches with [not any? foragers-here and resources >= consumption-rate]\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Call <code class="codeABMA">move</code> inside the <code class="codeABMA">go</code> procedure, inside the ask-code-block, but after eat.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to go\n  ask foragers [ eat gather move ]\n  ask foragers [set label storage]\n  tick\nend\n',
			codeExample: function() {
				addExampleCode({text:' move', insertAtText:'gather', position:'at', startCh:27, ignoreDuplicate:true});
			},			
			fullCode:'\nbreed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ eat gather ]\n  ask foragers [set label storage]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate[\n    let p patches with [not any? foragers-here and resources >= consumption-rate]\n    if any? p [ move-to one-of p ]\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Lastly, let\'s add a more complex visualization to better understand the dynamics of the simulation. But first, comment out the lines asking foragers to set their label.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to go\n  ask foragers [ eat gather move ]\n  ;ask foragers [set label storage]\n  tick\nend\n\n',
			codeExample: function() {
				addExampleCode({text:';', insertAtText:'label', position:'at', startCh:2});
			},				
			fullCode:'\nbreed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ eat gather move ]\n  ask foragers [set label storage]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate[\n    let p patches with [not any? foragers-here and resources >= consumption-rate]\n    if any? p [ move-to one-of p ]\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Create a new procedure <code class="codeABMA">update-display</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'\nto update-display\nend\n',
			codeExample: function() {
				addExampleCode({text:'\nto update-display\nend\n', insertAtText:'end', instance:4});
			},					
			fullCode:'\nbreed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ eat gather move ]\n  ;ask foragers [set label storage]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate[\n    let p patches with [not any? foragers-here and resources >= consumption-rate]\n    if any? p [ move-to one-of p ]\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
		{
		text:'<p>'
		+  'Inside this procedure, first define a local variable <code class="newvar">max-color</code> storing the patches\' max <code class="var">resources</code>, '
		+  'using <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/max.html" target="_blank" rel="noopener noreferrer">max</a></code>.'
		+'</p>'
		+'<p>'
		+  'Then use this local variable in <a href="https://ccl.northwestern.edu/netlogo/docs/dict/scale-color.html" target="_blank" rel="noopener noreferrer">scale-color</a> '
		+  'to ask patches to set their color to an appropriate shade of green according to how many <code class="var">resources</code> are left on them, on a scale of 0 to '
		+  '<code class="var">max-color</code>.'
		+'</p>'
		+'<details>'
		+  '<summary>HINT 1</summary>'
		+  ' An example of how to use scale-color would be <code class="codeABMA">ask turtles [ set color scale-color red age 0 50 ]</code>, where 50 is the maximum.'
		+'</details>'
		+'<details>'
		+  '<summary>HINT 2</summary>'
		+  'Remember, patches don\'t have <code class="codeABMA">color</code> but they do have <code class="codeABMA">pcolor</code>'
		+'</details>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'\nto update-display\n  let max-color max [resources] of patches\n  ask patches [\n    set pcolor scale-color green resources 0 max-color\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'  let max-color max [resources] of patches\n  ask patches [\n    set pcolor scale-color green resources 0 max-color\n  ]\n', insertAtText:'update-display'});
			},					
			fullCode:'\nbreed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ eat gather move ]\n  ;ask foragers [set label storage]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate[\n    let p patches with [not any? foragers-here and resources >= consumption-rate]\n    if any? p [ move-to one-of p ]\n  ]\nend\n\nto update-display\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Next, ask foragers to set their color red if they have no resources in their storage, and blue if they do.'
		+'</p>'
		+'<details>'
		+'<summary>HINT 1</summary>'
		+' Use an if or ifelse statement.'
		+'</details>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to update-display\n  let max-color max [resources] of patches\n  ask foragers [\n    ifelse storage > 0 [set color blue][set color red]\n  ]\n  ask patches [\n    set pcolor scale-color green resources 0 max-color\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'  ask foragers [\n    ifelse storage > 0 [set color blue][set color red]\n  ]\n', insertAtText:'max-color'});
			},					
			fullCode:'\nbreed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ eat gather move ]\n  ;ask foragers [set label storage]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate[\n    let p patches with [not any? foragers-here and resources >= consumption-rate]\n    if any? p [ move-to one-of p ]\n  ]\nend\n\nto update-display\n  let max-color max [resources] of patches\n  ask patches [\n    set pcolor scale-color green resources 0 max-color\n  ]\nend\n',
		},	
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Lastly, call the <code class="codeABMA">update-display</code> procedure at the end of the <code class="codeABMA">go</code> procedure.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to go\n  ask foragers [ eat gather move ]\n  ;ask foragers [set label storage]\n  update-display\n  tick\nend\n\n',
			codeExample: function() {
				addExampleCode({text:'  update-display\n', insertAtText:'tick', instance:1, position:'at'});
			},				
			fullCode:'\nbreed [ foragers forager ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\nto setup\n  clear-all\n  ask patches [\n    set resources 10\n    set pcolor green\n  ]\n  create-foragers number-foragers [\n    set storage 0\n    set shape "house"\n    move-to one-of patches\n  ]\n  reset-ticks\nend\n\nto go\n  ask foragers [ eat gather move ]\n  ;ask foragers [set label storage]\n  tick\nend\n\nto gather\n  let current-gather [resources] of patch-here\n  if current-gather > gather-rate [\n    set current-gather gather-rate\n  ]\n  set storage storage + current-gather\n  ask patch-here [\n    set resources resources - current-gather\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate[\n    let p patches with [not any? foragers-here and resources >= consumption-rate]\n    if any? p [ move-to one-of p ]\n  ]\nend\n\nto update-display\n  let max-color max [resources] of patches\n  ask foragers [\n    ifelse storage > 0 [set color blue][set color red]\n  ]\n  ask patches [\n    set pcolor scale-color green resources 0 max-color\n  ]\nend\n',
		},	
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},

	{
		text:'<p>'
		+  'Try testing your model.'
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
						label:'Click go button.', 
						function:(action)=>{
							tourOnButtonClick({buttonSettings:{type:'button', source:'go', forever:true}, action:action});
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
		+  'Forager agents keep moving until all patches are below the <code class="var">consumption-rate</code>, at which point they will stop, and turn red.'
		+'</p>'
	},
	{
		text:'<p>'
		+  'In this lesson, we\'ve used syntax we\'ve learned before to have agents respond to the environment in more sophisticated ways.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>have learned how to incorporate some ways of visualising the environment.</li>'
		+'</ul>' 
		+'<p>'
		+  'So far, only our agents have agency. In the next lesson we are going to experiment with different ways of defining and regrowing patches\'s resources, '
		+  'to further investigate agent-environment interaction.'
		+'</p>',
	}
 ]
