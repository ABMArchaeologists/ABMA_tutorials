let introToABM = [
	{
		text:'<h2>Introduction to Agent-based Modelling</h2>'
		+'<p>'
		+  'In this tutorial, you will be shown around an agent-based model (or ABM) built in NetLogo. '
		+  'The model you\'ll be using throughout this tutorial is a replication of Young & Bettinger’s simulation '
		+  'of the first <b>Out of Africa</b> dispersal of Homo Sapiens.'
		+'<\p>'
		+'<p>'
		+  'This tutorial is for you if you are a complete beginner in ABM. '
		+  'If you are familiar with ABM but would like to learn NetLogo, please skip ahead to the next tutorial.'
		+'<\p>'
		+'<footer class="citation">'
		+  'Young, D.A. and Bettinger, R.L., 1995. Simulating the global human expansion in the Late Pleistocene. <i>Journal of Archaeological Science</i>, 22(1), pp.89-92.'
		+'</footer>',
	},
	{
		text: '<p>'
		+  'At the end of this tutorial you will:'
		+'<\p>'
		+'<ul>'
			+'<li>have learned what agent-based modelling is;</li>'
			+'<li>be familiar with the 5 most common components of an agent-based model;</li>'
			+'<li>have been introduced to some examples of ABM in archaeology.</li>'
		+'</ul>'
	},
	{
		text:'<h2>'
		+  'What is Agent-based Modelling?'
		+'</h2>'
		+'<p>'
		+  'Agent-based modeling (ABM) is a type of micro- or bottom-up simulation. '
		+  'This means that a phenomenon is modeled from the bottom up, by modeling its individual parts or \'agents\'. '
		+  'These agents interact with each other and/or the environment according to specified rules of behavior, '
		+  'giving rise to global patterns, oftentimes in surprising and hard-to-predict ways.'
		+'<\p>',
	},
	{
		text:'<p>'
		+  'Most ABMs have the following components:'
		+'</p>'
		+'<ul>'
			+'<li>Agents</li>'
			+'<li>Environment</li>'
			+'<li>Behavior</li>'
			+'<li>Time</li>'
			+'<li>Scenarios</li>'
		+'</ul>'
		+'<p>'
		+  'Let\'s look at them.'
		+'</p>'
		+createMoreInfoBox({content:'<p>A good general overview of ABM and their history can be found in the <a href="https://en.wikipedia.org/wiki/Agent-based_model" target="_blank" rel="noopener noreferrer">wikipedia article</a>. </p>'}),
	},
	{
		text: '<p>'
		+  'To start, click the  <code class="buttonName">setup</code> button to trigger the initialization phase.'
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
		text: '<p>'
		+  'As mentioned, this particular model is a replication of Young & Bettinger’s simulation of the first <b>Out of Africa</b> dispersal of Homo Sapiens. '
		+  'Clicking the <code class="buttonName">setup</code> button has triggered initialization and created the <b>environment</b> - the world two million years ago, with different sea levels. '
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'view'}); 
			},
		},
	},
	{
		text: '<h2>'
		+  'Agents'
		+'</h2>'
		+'<p>'
		+  'Agents - in NetLogo lingo, turtles - are individual units that operate autonomously according to well-defined rules of behaviour.'
		+'<\p>'
		+'<p>'
		+  'They can represent anything from atoms to countries; in Archaeology, they are often individuals or households. In this case, our agents represent Homo Sapiens.'
		+'<\p>'
		+'<p>'
		+  'Most importantly, Agents:'
		+'<\p>'
		+'<ul>'
			+'<li>have variables (characteristics), e.g., age, location, etc.;</li>'
			+'<li>are unique, because of these variables;</li>'
			+'<li>can act autonomously.</li>'
		+'</ul>'
		+'<p>'
		+  'if you look closely, you can see some <b>agents</b> - the some multi-colored flecks in Eastern Africa. ',
		attachTo:{
			on: 'right',
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
		text:'<h2>'
		+  'Environment'
		+'</h2>'
		+'<p>'
		+  '<b>The Environment</b> is the space in which agents live. '
		+  'The Environment is generally made up of a grid of cells, which in NetLogo are referred to as patches. '
		+  'A patch is a stationary agent, meaning that it can\'t move, but like agents, it can have all sorts of attributes as variables.'
		+'<\p>'
		+'<ul>'
			+'<li>each cell has variables (characteristics), e.g., elevation.</li>'
			+'<li>each space unit is unique as well.</li>'
		+'</ul>'
		+'<p>'
		+  'For example, in this case, the patches making up the environment have a color, denoting elevation.'
		+'<\p>',
		attachTo:{
			on: 'left',
			element: ()=> { 
				return getWidgetElement({type:'view'}); 
			},
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
		+  'The <code class="buttonName">setup</code> button has initialized the model, but it is still static.'
		+'</p>'
		+'<p>'
		+ 'Two other important components of ABMs are time and behavior. To see this ABM in action click the <code class="buttonName">go</code> button.'
		+'<\p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'button', source:'go'}); 
			},
		}, 
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'go'}); 
		},
	},
	{
		text:'<p>'
		+  'Clicking the <code class="buttonName">go</code> button has triggered the main simulation loop. Watch the agents move out of the Rift Valley. '
		+  'Normally, this loop would continue until you press the <code class="buttonName">go</code> button again, but we will stop the simulation shortly after it reaches a certain amount of time, '
		+  'in this case 75 steps or ticks.'
		+'</p>', 
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'view'}); 
			},
		}, 
		complexAdvanceOn: function() {
				stopAtTicks({ticks:75, activeButton:getWidgetElement({type:'button', source:'go'}), action:enableNextButton}); 
		},
		buttons: disabledNextButtons,
	},	
	{
		text: '<h2>'
		+  'Time'
		+'</h2>'
		+'<p>'
		+  'Time is extremely important in simulations because the goal is to understand dynamics that emerge from the interactions of agents.'
		+'</p>'
		+'<ul>'
			+'<li>The simulation goes through discrete time steps;</li>'
			+'<li>At each time step, every agent and every cell performs their actions, for example, to grow;</li>'
			+'<li>Depending on the model, a time step might represent a millisecond, hour, a thousand years, etc.</li>'
		+'</ul>'
		+'<p>'
		+  'In NetLogo each time step is referred to as a tick. When you create your own models you can have ticks represent different units of time e.g. mins, hours, years, etc.'
		+'<\p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-speed-slider',
		},
	}, 
	{ 
		text:'<h2>'
		+  'Behavior'
		+'</h2>'
		+'<p>'
		+  'Agent behavior in ABM is governed by a set of rules, defined by the modeler, that agents and spatial units execute each time step:'
		+'</p> '
		+'<ul>'
			+'<li>how these rules are followed, however, depends on the particular circumstances of each agent/cell;</li>'
			+'<li>agents operate within a local perspective – they may not have the full knowledge of the whole world and '
			+'they may not do the optimal action as a result. This is very different from other types of top-down computer simulations.</li>'
		+'</ul>',
	}, 
	{
		text:'<p>'
		+  'Lastly, ABMs allow us to study multiple <b>scenarios</b>.'
		+'<\p>'
		+'<p>'
		+  'For this model we can change the behavior of population growth with this slider. Change the slider and move it all the way to the right. The Next button will then become active.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'slider', source:'pop_growth'}); 
			},
		},
		complexAdvanceOn: function() {
				allowNextOnChange({type:'slider', source:'pop_growth'}); 
		},
		buttons: disabledNextButtons,
	},
	{
		text:'<p>'
		+  'Reset the environment by clicking the <code class="buttonName">setup</code> button.'
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
		+  'Run the simulation again by clicking <code class="buttonName">go</code>.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'button', source:'go'}); 
			},
		},
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'go'}); 
		},
	},
	{
		text: '<p>'
		+  'See how the humans expand at a different rate than before. The simulation will stop at 75 ticks.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'view'}); 
			},
		}, 
		complexAdvanceOn: function() {
				stopAtTicks({ticks:75, activeButton:getWidgetElement({type:'button', source:'go'}), action:enableNextButton}); 
		},
		buttons: disabledNextButtons,
	},
	{
		text: '<h2>'
		+  'Scenarios'
		+'</h2>'
		+'<p>'
		+  'Congrats, you have just run two scenarios, one with a low level of population growth, and one with a high level. Once the simulation is built, '
		+  'we can run different scenarios, or "alternative worlds":'
		+'</p>'
		+'<ul>'
			+'<li>in each scenario, the modeler gives agents and cells different rules of behavior and different parameter values; </li>'
			+'<li>in one scenario, agents may grow their population faster. Parameters determine the distribution of variables, e.g. growth rates;</li>'
			+'<li>at each time step, every agent and every cell performs their actions, in this model, growing.</li>'
		+'</ul>'
		+'<p>'
		+  'By running different scenarios we can explore how these different worlds would operate and what different population-level patterns they would generate.'
		+'</p>',
	}, 
	{
		text: '<h2>'
		+  'Resources'
		+'</h2>'
		+'<p>'
		+  'The range of applications of ABM is enormous and it has been used in almost all scientific disciplines. '
		+  'Its major strength is that it enables us to represent individual behaviors and interactions to draw conclusions about the complex dynamics that ' 
		+  'created the population-level patterns we record in the archaeological record. '
		+'</p>'
		+'<p>'
		+  'ABM has been used in many archaeological case studies.'
		+'</p>'
		+'<p>'
		+  'For example, archaeologists developed an ABM model to understand what happened to inhabitants of the Long House Valley in Arizona ' 
		+  'and why they may have left their lands. Others used ABM to investigate patterns of the first Out of Africa dispersal two million years ago '
		+  'with models like the one shown here. '
		+  'In more recent times, ABM is often used to model battlefield dynamics or pedestrian movements in ancient cities. Here are some examples '
		+  'of some models to give you an idea of what can be done with ABM:'
		+'</p>'
		+'<p>'
		+  'Romanowska, Iza, Colin D. Wren, and Stefani A. Crabtree. 2021. Agent-Based Modeling for Archaeology: Simulating the Complexity of Societies. '
		+  'Chapter 0. Santa Fe: SFI Press. <a href="https://www.sfipress.org/books/agent-based-modeling-archaeology" target="_blank" rel="noopener noreferrer">https://www.sfipress.org/books/agent-based-modeling-archaeology</a> </p>'
		+'<p>'
		+' Lewin, Roger. 2000. Complexity: Life at the Edge of Chaos. Chicago: University of Chicago Press. '
		+  '<a href="https://press.uchicago.edu/ucp/books/book/chicago/C/bo3632102.html" target="_blank" rel="noopener noreferrer">https://press.uchicago.edu/ucp/books/book/chicago/C/bo3632102.html</a></p>'
		+'<p>'
		+  'Mitchell, Melanie. 2009. Complexity. A Guided Tour. Oxford: Oxford University Press. '
		+  '<a href="https://global.oup.com/academic/product/complexity-9780195124415" target="_blank" rel="noopener noreferrer">https://global.oup.com/academic/product/complexity-9780195124415</a></p>'
		+'<p>'
		+  'Hartmann, Stephan. 1996. “The World as a Process. Simulations in the Natural and Social Sciences.” '
		+  'In Modelling and Simulation in the Social Sciences from the Philosophy of Science Point of View, '
		+  'edited by Rainer Hegselmann, Ulrich Mueller, and Klaus G. Troitzsch, 77–100. Dordrecht: Springer Netherlands. '
		+  '<a href="https://doi.org/10.1007/978-94-015-8686-3_5" target="_blank" rel="noopener noreferrer">https://doi.org/10.1007/978-94-015-8686-3_5</a>'
		+'</p>'
		+'<p>'
		+  'This is not an extensive list and there are many more resources out there.'
		+'</p>',
	}, 
	{
		text:'<p>'
		+  'This is the end of the tutorial. In it, you have:'
		+'<\p>' 
		+'<ul>'
			+'<li>learned what ABM is;</li>'
			+'<li>become familiar with ABM\'s main components (agents, environment, time, behavior and scenarios);</li>'
			+'<li>gotten an idea of the range of applications of ABM in archaeology.</li>'
		+'</ul>'
		+'<p>'
		+  'Hopefully, this tutorial has given you a basic idea of what ABM is, the variety of ways in which ABM can be used....and maybe even made you excited to make your own! '
		+  'In the next lesson, we are going to show you around another well-known ABM, Artificial Anasazi.'
		+'</p>',
	}, 
 ];
