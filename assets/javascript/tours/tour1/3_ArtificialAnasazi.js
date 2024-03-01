let artificialAnasazi = [
	{
		text:'<h2>'
		+  'An Example of Archaeological ABM: Artificial Anasazi*'
		+'</h2>'
		+'<p>'
		+  'In the previous lessons, we introduced simulation and ABM to you. ABM is incredibly flexible and has been used in many archaeological case studies.'
		+'</p>'
		+'<p>'
		+  'One of the most well-known archaeological ABM is the model loaded here: Artificial Anasazi. '
		+  'This is a NetLogo reimplementation based on a replication by Janssen (2009) of a model originally built by Axtell et al. (2002).'
		+'</p>'
		+'<p>'
		+  'We will be examining this model in further detail to give you an idea of how ABM can help archaeologists in their work and research!'
		+'</p>'
		+'<p>'
		+  '<b>*</b> we use the term "Anasazi" because that is the name of the model. However, decendent communities prefer the term "Ancestral Pueblo". '
		+  'We use that term when describing the people.'
		+'</p>'
		+'<footer class="citation">'
		+  'Janssen, Marco A. "Understanding artificial anasazi." <i>Journal of Artificial Societies and Social Simulation</i> 12, no. 4 (2009): 13.'
		+'</footer>'
		+'<footer class="citation">'
		+  'Axtell, Robert L., Joshua M. Epstein, Jeffrey S. Dean, George J. Gumerman, Alan C. Swedlund, Jason Harburger, Shubha Chakravarty, Ross Hammond, '
		+  'Jon Parker, and Miles Parker. "Population growth and collapse in a multiagent model of the Kayenta Anasazi in Long House Valley." '
		+  '<i>Proceedings of the National Academy of Sciences </i>99, no. suppl_3 (2002): 7275-7279.'
		+'</footer>',
	},
	{
		text:'<p>'
		+  'Artificial Anasazi is a seminal model for archaeological ABM.'
		+'</p>'
		+'<p>'
		+  'Archaeologists have long debated what drove the population dynamics among the inhabitants of the Long House Valley in Arizona. '
		+  'Their demographics are well known, thanks to a detailed dendrochronological record of the area. '
		+  'This data shows several periods of growth and decline, as well as the eventual abandonment of the Valley around 1300 AD.'
		+'</p>'  
	},
	{
		text:'<p>'
		+  'To better understand the population dynamics of the Long House Valley, Axtell et al. (2002) created the Artificial Anasazi model.'
		+'</p>'
		+'<p>'
		+  'This model was built on a more abstract foundational model called SugarScape, which we will be building in tutorial 4. '
		+  'Here we have preloaded a replication of the model for you to explore.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
	},
	{
		text:'<p>'
		+  'Please click the <code class="buttonName">setup</code> button to initialize the model.'
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
		+  'Like in the previous lesson, you can see that the NetLogo world consists of a landscape of colorful patches and agents.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'view'}); 
			},
		},
	},
	{
		text:'<p>'
		+  'Let\'s first look at the landscape in a bit more detail.'
		+'</p>'
		+'<p>'
		+  'In the current view, each patch color represents a different landcover zone. Each zone has a different agricultural productivity associated with it, which changes every year. '
		+  'This potential yield is based on historical data.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'view'}); 
			},
		},
	},
	{
		text: '<p>'
		+  'This is just one visualization, and you can toggle between different ways of visualizing the patches with the <code class="sliderName">map-view</code> chooser.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: ()=> { 
				return getWidgetElement({type:'chooser', source:'map-view'}); 
			},
		},
	},
	{
		text:'<p>'
		+  'There are also some agents visible, in the shape of persons. In this model, each agent represents a 5-person household.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'view'}); 
			},
		},
		 when: { 
			show: function () {
				session.run('me',' watch one-of households'); 
			}, 
		} 
	},
	{
		text:'<p>'
		+  'This model aims to capture the most important socio-natural dynamics of the Ancestral Puebloan communities. '
		+  'To see this in action, click the <code class="buttonName">go</code> button.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'button', source:'go'}); 
			},
		}, 
		when: { 
			show: function () {
				session.run('me','reset-perspective'); 
			},
		}, 
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'go'}); 
		}, 
	},
	{
		text:'<p>'
		+  'Agents move freely over the landscape to choose the best place to locate their house. '
		+  'They cultivate and consume corn - the harvest of which depends on the current climatic conditions of the patch they are located on. '
		+  'New households are created as children grow up and leave their original families.'
		+'</p>'
		+'<p>'
		+  'You can see how households expand and disappear over time in the Valley. The plot at the bottom of the screen also keeps track of the population.'
		+'</p>'
		+'<p>'
		+  'The model will run for 550 ticks (years) but if you want to stop it sooner, click the <code class="buttonName">go</code> button again.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
				advanceWidgetRunningChange({type:'button', source:'go'}); 
		}, 
	},
	{
		text:'<p>'
		+  'To learn from models it is common practice to compare simulated outputs with archaeologically relevant patterns.'
		+'</p>'
		+'<p>'
		+  'For this model, we can see the match of the simulation with the empirical data in real time by checking the <code class="sliderName">historic-view? </code> '
		+  'and rerunning the simulation.'
		+'</p>'
		+'<p>'
		+  'Please:'
		+'</p>',
		when: { 
			show: function () {
				Ractive.getContext(getWidgetElement({type:'button', source:'go'})).set('widget.running', false),
				setTimeout (() => {
						   setTourState();
				}, 100);
			},
		},
		attachTo:{
			on: 'right',
			element: '.netlogo-widget-container',
		},
		multiStepAdvance: function () {
			let options = [
			{
						name:'actionSetHistoricView', 
						label:'Check historic-view?', 
						function:(action)=>{
							tourOnSwitchClick({type:'switch', source:'historic-view?', action:action});
						}
					},
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
			actionCheckList({options:options, actionOnComplete:actionOnComplete }); //commenting out until #64 is fixed
		}, 
	},
	{
		text:'<p>'
		+  'Besides the original agents, we now have some house-shaped agents representing known historical settlements. Their size is indicative of the estimated population numbers.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'view'}); 
			},
		},
		when: {  
			show: function () {
				session.run('me','watch one-of historical-settlements with [hidden? = false]'); 
				setTimeout (() => {
						   setTourState();
				}, 100);
			}, 
		} 
	},
	{
		text:'<p>'
		+  'In the plot you can see the simulated population numbers, in red, as compared with the estimated historical numbers, in blue.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'plot', source:'Population'}); 
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
		text: '<p>'
		+  'Let\'s watch the simulation run its course. It will stop at 550 "years". Occasionally, it will not stop correctly. If that is the case, please push go again.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
				advanceWidgetRunningChange({type:'button', source:'go'}); 
		},
	},
	{
		text:'<p>'
		+  'While the model is simple, it shows a remarkable fit to archaeological data with these parameter values - '
		+  'both the demographic data and the spatial distribution of human settlements on the landscape.'
		+'</p>'
		+'<p>'
		+  'This convincingly demonstrated that most of the population ebbs and flows can be explained by the environmental shifts that determined the corn yields '
		+  'and therefore the availability of food.'
		+'</p>'
	},
	{
		text:'<p>'
		+  'At the same time, there is still a mismatch between the simulation and the archaeological record. '
		+  'While the population numbers drastically go down near the end of the simulation, the drop is not as drastic as the one observed in the historical data. '
		+  'This is also a very valuable result, and the main conclusion of Axtell et al. 2002 is that environmental factors alone are not enough to explain the complete '
		+  'abandonment of the valley around 1300 AD.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'plot', source:'Population'}); 
			},
		},
	},
	{
		text: '<p>'
		+  'ABM is also useful because it can help us determine the plausibility of each scenario.'
		+'</p>'
		+'<p>'
		+  'For example, what happens if we change the parameters? The <code class="sliderName">death-age</code> slider determines the life expectancy of the agents. '
		+  'What happens when you increase it, what happens when you decrease it? Try doing so and running the model a couple of times. '
		+  'You will need to click <code class="buttonName">setup</code> each time you change the life expectancy to reset the model.'
		+  'You will need to click <code class="buttonName">go</code> to both start and stop these different scenarios.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
	},
	{
		text: '<p>'
		+  'If the death age is increased, the population peaks go even higher than before. '
		+  'But if decreased, the population never takes off and doesn’t look like the historical data at all...'
		+'</p>'
		+'<p>'
		+  'Congratulations, you have just run a simulation experiment!'
		+'</p>',	
	},
	{
		text:'<p>'
		+  'While this ABM application has not closed archaeological debates about Ancestral Puebloan history entirely, '
		+  'it has provided a strong explanation for the majority of the observed demographic fluctuations. '
		+  'As such, the Artificial Anasazi Model shows how by modeling an archaeological case study we can test alternative explanations and decide which one of them is the most plausible.'
		+'</p>'
		+'<p>'
		+  'Of course, this is but one of many applications of ABM in archaeology, so feel free to explore some other examples on your own.'
		+'</p>'
	},
];