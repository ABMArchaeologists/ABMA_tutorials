let complexPlots = [
	{
		text:'<h2>'
		+  'Welcome to monitoring and extending plots'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we will be examining plotting and monitoring. You will learn how to:'
		+'</p>'
		+'<ul>'
		+  '<li>make and use monitors;</li>'
		+  '<li>make plots more flexible.</li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  'Simulation is a form of experimentation. When the phenomenon we are interested in can\'t be easily manipulated or even observed - '
		+  'i.e. \'real\' experimentation is not possible - we can turn to simulation to help us.'
		+'</p>' 
		+'<p>'
		+  'Like any well-designed experiment, an experiment conducted with the use of ABM has several features.'
		+'</p>'
	},
	{
		text:'<p>'
		+  'Firstly, you can only test one factor at a time per experiment.'
		+'</p>'
		+'<p>'
		+  'For example, you may switch between different scenarios, like in this model, between a landscape with hills and a plain one.'
		+'</p>'
		+'<p>'
		+  'For the continuous parameters such as <code class="var">growth-rate</code>, <code class="var">max-plants</code> etc., only one value per time can be tested. '
		+  'In this case, you do what is known as a parameter sweep, repeating the simulation with different parameter values (e.g. a growth-rate of 1, 5, 10).'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  'Another feature of a well-thought experiment is that it uses the right output measures.'
		+'</p>'
		+'<p>'
		+  'It is critical to have one or a few measures that allow us to compare simulation runs. '
		+  'Which output measure will be appropriate depends on the goal of the model and the research questions. For example, '
		+  'if the model is aiming to capture the resilience of a human group, then recording the number of agents is a good output measure.'
		+'</p>'
		+'<p>'
		+  'In our case, we are interested in the distribution of resources - do all agents have more or less the same amount of sugar? '
		+  'Or maybe some have way more than others? So, we will collect and examine the amount of resources per agent at each tick.'
		+'</p>',
	},
	{
		text:'<p>'
		+  'We\'ll create a few monitors and a plot to examine the distribution of sugar amongst agents.'
		+'</p>',
	},
	{
		text:'<p>'
		+  'First, add a monitor to the interface. Name it <code class="codeABMBA">mean</code> and have it display the <code class="codeABMA">'
		+  '<a href="https://ccl.northwestern.edu/netlogo/bind/primitive/mean.html" target="_blank" rel="noopener noreferrer">mean</a></code> storage of all foragers.'
		+'</p>'
		+'<details>'
		+  '<summary>SOLUTION</summary>'
		+  '<pre class = codeblockABMA>mean [storage] of foragers</pre>'
		+'</details>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
		modalOverlayOpeningPadding:5000
	},
	{
		text:'<p>'
		+  'Add a second monitor, this time for the <a href="https://ccl.northwestern.edu/netlogo/docs/dict/standard-deviation.html" target="_blank" rel="noopener noreferrer">standard deviation</a> of the storage of all foragers.'
		+'</p>'
		+'<details>'
		+  '<summary>SOLUTION</summary>' 
		+  '<pre class = codeblockABMA>standard-deviation [storage] of foragers</pre>'
		+'</details>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
		modalOverlayOpeningPadding:5000,
	},
	{
		text:'<p>'
		+  'Next, create a plot and title the plot <code class="codeABMA">sugar distribution</code> or something similar. '
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
		modalOverlayOpeningPadding:5000,
		complexAdvanceOn: function() {
			fullProcessOnEditForm();
		},
	},
	{
		text:'<p>'
		+  'Add a plot pen and change the mode from \'Line\' to \'Bar\'.'
		+'</p>' ,
		attachTo:{
			on: 'right',
			element: ()=>{
				let {settings} = getActiveEditForm(),
					target = document.querySelector('#'+settings.id);
				return target;
			},
		},
		modalOverlayOpeningPadding:5000
	},
	{
		text:'<p>'
		+  'In the plot pens update commands write <code class="codeABMA">histogram [storage] of foragers</code> in the plot pen update. Click Ok.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {settings} = getActiveEditForm(),
					target = document.querySelector('#'+settings.id);
				return target;
			},
		},
		complexAdvanceOn: function() {
			advanceOnEditForm();
		},
	},
	{
		text:'<p>'
		+  'If you run the model now, depending on your parameter settings, the plot might flash a couple of bars, or stay empty.'
		+'</p>'
		+'<p>'
		+  'Set the <code class="var">gather-rate</code> higher than the <code class="var">consumption-rate</code> and run the model again.'
		+'</p>'
		+'<p>'
		+  'Looking at the monitors, can you figure out what\'s going wrong with the plot?'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  'At one point the mean storage of foragers exceeds the maximum value of the plot\'s  x-axis.'
		+'</p>'
		+'<p>'
		+  'Let\'s adjust the plot pen\'s update commands so our x-axis is adjusted at every tick. Go into the plot edit form.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  'Add a new line at the beginning of the update commands: <code class="codeABMA">set-plot-x-range (min [storage] of foragers - 1) (max [storage] of foragers + 1)</code>'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">set-plot-x-range</code> take two arguments, a minimum and maximum for the x-axis. '
		+  'In this case, we\'ll put the minimum to lowest storage value minus 1, and the maximum to the highest storage value plus 1.'
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
		+  'Try rerunning your model to check that everything works. As you can see, the plot updates dynamically at each tick!'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  'Simulation is a form of experimentation and it is essential to take steps to ensure that we learn what we want from it.'
		+'</p>' 
		+'<p>'
		+  'In this lesson, you have learned how to:'
		+'</p>'
		+'<ul>'
		+  '<li>add output measures to compare simulation results with the archeological record;</li>'
		+  '<li>make plots more flexible.</li>'
		+'</ul>'
	},
 ]
