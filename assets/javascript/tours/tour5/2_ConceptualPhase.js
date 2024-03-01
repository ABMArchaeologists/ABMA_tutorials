let conceptualPhase = [
	{
		text:'<h2>The Conceptual Phase</h2>'
		+'<p>'
		+  'As mentioned in the previous lesson, the modeling process consists of 3 phases.'
		+'</p>'
		+'<figure>'
		+  '<img src="assets/images/modelphases.png" height="300px">'
		+  '<figcaption>The Model Developement Process, adapted from Romanowska, 2015</figcaption>'
		+'</figure>' 
		+'<p>'
		+  'This lesson is about the first phase: The <b>Conceptual Phase</b>, where one frames the research questions, thinks about the most appropriate methodology and develops the ontology of the model.'
		+'</p>' 
		+'<p>'
		+  'In this lesson, you will learn :'
		+'</p>'
		+'<ul>'
		+'<li>what constitutes good and bad research questions for modelling;</li>'
		+'<li>how to pick the right modelling technique;</li>'
		+'<li>about the importance of properly conceptualizing your model.</li>'
		+'</ul>'
		+'<footer class="citation">'
		+  'Romanowska, Iza. "So you think you can model? A guide to building and evaluating archaeological simulation models of dispersals." <i>Human biology</i> 87, no. 3 (2015): 169-192.'
		+'</footer>',
	},
	{
		text:'<p>'
		+  'Any model is a simplified representation of reality. How you represent the piece of reality you are interested in, '
		+  'will depend on several factors that need to be carefully weighed, and multiple models of the same system are possible.'
		+'</p>'
		+'<p>'
		+  'As such, there is a lot of deep thinking involved in the conceptual phase and it often takes a surprisingly long time. '
		+  'However, a few general guidelines help to ensure that the design of the model is robust and that the modeler does not find '
		+  'themselves in a situation where the model architecture needs to change.'
		+'</p>'
		+'<p>'
		+  'The Conceptual Phase may be broken up into several different steps, and each will be discussed in turn.'
		+'</p>'
		+'<figure>'
		+  '<img src="assets/images/Conceptual_Phase.png" height="75x">'
		+  '<figcaption>The Conceptual Phase, adpated from Romanowska, 2015</figcaption>'
		+'</figure>' 
		+'<footer class="citation">'
		+  'Romanowska, Iza. "So you think you can model? A guide to building and evaluating archaeological simulation models of dispersals." <i>Human biology</i> 87, no. 3 (2015): 169-192.'
		+'</footer>'
	},
	{
		text:'<p>'
		+  '<b>Step 1: Carefully choose the research questions </b></p><p> The first step is not exclusive to modeling: choosing the research question(s)!'
		+'</p>'
		+'<p>'
		+  'For any research project, defining well-thought-through research questions is key! If you don’t know what you want to learn then it is unlikely you’ll be able to learn much. '
		+  'Modeling is a great technique to ask questions of the type “what if”, to test the plausibility of alternatives and to see what dynamical social processes could give rise to '
		+  'particular data patterns. But it is not magic, your simulation won’t be able to answer research questions that are too wide, too underspecified, or related to strictly factual knowledge.'
		+'</p>'
	},
	{
		text:'<p>'
		+  '<b>Step 1: Carefully choose the research questions </b></p><p> Here are some examples of poorly defined questions and their better versions that could drive a model.'
		+'</p>'
		+'<table>'
		+'    <tr>'
		+'        <th>Bad questions</th>'
		+'        <th>Why is it bad?</th>'
		+'        <th>Good questions</th>'
		+'    </tr>'
		+'    <tr>'
		+'        <td>How did the Roman economy work?</td>'
		+'        <td>The whole of it? What aspect of the economy are you interested in? </td>'
		+'        <td>Was the trade in Roman fine tableware dependent on harbours and their maritime connections?</td>'
		+'    </tr>'
		+'    <tr>'
		+'        <td>What culture influenced the origin of neolithisation in Europe? </td>'
		+'        <td>What do you mean by influence? Influence in what? Could multiple cultures be influencing it? </td>'
		+'        <td>Was the spread of the Neolithic a demic or cultural process?</td>'
		+'    </tr>'
		+'    <tr>'
		+'        <td>When did the first people reach the Americas?</td>'
		+'        <td>Simulation can tell you what might have happened under different circumstances, but not whether it happened. This is a data type of question that requires data collection.</td>'
		+'        <td>When was the most favourable time for expansion into Americas?</td>'
		+'    </tr>'
		+'</table>'
		+'<p>'
		+  'Some types of research questions lend themselves to the simulation methodology better than others.'
		+'</p>' 
	},
	{
		text:'<p>'
		+  '<b>Step 2: Choose the right method </b></p><p>After you\'ve determined your research question, it is time to choose your method.'
		+'</p>'
		+'<p>'
		+  'By now you may be convinced that ABM is a fantastic tool that can help us to unravel some of the most heatedly debated mysteries of the past. '
		+  'But is it the right method in all circumstances?'
		+'</p>'
		+'<p>'
		+  'Of course not!'
		+'</p>'
		+'<p>'
		+  'First of all, consider whether your research question concerns a dynamic social or socio-natural process. If not, a data analysis likely is enough to answer it. '
		+  'In most cases, questions that start with “what?”, “who?”, “where?” or “when?” are likely data questions and should be approached with appropriate data analysis techniques. '
		+  'Thus the first question you should ask yourself is: Should I be using modelling at all?'
		+'</p>'
	},
	{
		text:'<p>'
		+  '<b>Step 2: Choose the right method </b></p><p>Research questions that start with “why?” or “how” or that look for an explanation will require modeling work. '
		+  'However, there are many modeling techniques, each of which has particular strengths and weaknesses. The four most common modeling techniques used in archaeology are GIS modeling, '
		+  'ABM, Equation-based modeling, and Cellular Automata.'
		+'</p>'
		+'<img src="assets/images/model_methods.png" height="300px">'
	},
	{
		text:'<p>'
		+  '<b>Step 2: Choose the right method </b></p><p> Sometimes, ABM may not be the right modeling technique. In this case, these may be more appropriate:'
		+'</p>'
		+'<ul>'
		+  '<li><b>GIS modelling</b> is usually related to the spatial dimension. For example, techniques such as Least Cost Paths, Site Catchment Analysis, or Viewshed Analysis enable archaeologists to determine the most convenient movement models based on the topography of an area.  </li>'
		+  '<li><b>Equation-based models (EBMs)</b> are often used to simulate systems where the population can be regarded as broadly homogeneous concerning the modeled characteristics. A great example of an EBM that we all got to know very closely is the SIR (Susceptible-Infected-Recovered) model of disease spread that was widely used during the COVID-19 pandemic. The infection levels prognoses, probabilities of new outbreaks and waves, risk estimates, and policy recommendations were for the most part based on the broad family of SIR Equation-based models.</li>'
		+  '<li><b>Cellular Automata (CA)</b> has been for a long time the most popular simulation technique in many social sciences. The most famous example of it is the <a href = "https://www.youtube.com/watch?v=ouipbDkwHWA">Game of Life</a>. CAs consist of cells that are in one of a set of states. This could be dead/alive or represent, for instance, different landforms such as grass/shrubs/young forest. Cells can change their state based on predefined rules, for example, grassland may change into shrubs after a given number of years. CAs are often used to model spatial phenomena.</li>'
		+'</ul>'
		+'<p>'
		+  'To choose wisely the modeling technique, it is important to understand the differences between them. '
		+'</p>',
	},
	{
		text:'<p>'
		+  '<b>Step 2: Choose the right method </b></p><p> Ultimately, whether you decide to build a model and how will depend on what you want to learn.'
		+'</p>'
		+'<p>'
		+  'Let\’s consider this model here for a bit. AmphorABM was built to examine the switch from Etruscan to Greek wine amphorae in southern Gaul.'
		+'</p>'
		+'<p>'
		+  'Importantly, the research question is what may have caused this switch, so not whether it happens, but <b>why</b> and <b>how</b> it may have happened. '
		+  'Not just that, but this question relates to a socio-natural process: both interaction with the environment - the exploitation of the landscape - '
		+  'and the social interaction between agents - trade - are important and interconnected. The question is also explicitly related to change, '
		+  'namely the change from one amphorae type to another.</p> <p>These are all reasons why the author may have chosen ABM because it is a modeling technique '
		+  'particularly well-suited for examining dynamic socio-natural processes.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
	},
	{
		text:'<p>'
		+  '<b>Step 3: Decide on the scales and resolution </b></p><p> If ABM is a good fit for your research questions, it is time to start thinking about how to conceptualize the model itself.'
		+'</p>'
		+'<p>'
		+  'The first thing to consider is the scale and resolution of your model, and how to tailor these based on your research question and available data.'
		+'</p>'
		+'<p>'
		+  'Scale and resolution relate to not only what your patches represent, the size of your world, '
		+  'and what passage of time a tick equals but also who your agents are and the type of behavior they have.'
		+'</p>'
		+'<p>'
		+  'For example, there is a difference in how we model individual foragers traversing a landscape versus a population peopling a new land. '
		+  'The characteristics of agents, as well as the mechanisms guiding their behavior, will be different. While it is easy to assume that each agent should represent one individual, '
		+  'this is not necessary. For many archaeological research questions, it may be more appropriate to consider an agent to be a household, a band, or even a city.'
		+'</p>' 
	},
	{
		text:'<p>'
		+  '<b>Step 3: Decide on the scales and resolution </b></p><p>The general rule of thumb when deciding on the resolution of your simulation is to look at two things: '
		+  'the research questions and the resolution of the data you’ll be using.'
		+'</p>'
		+'<p>'
		+  'For example, if the research question asks about individual micromobility over a landscape then the scale of one agent-one individual and one tick-one hour is appropriate. '
		+  'But if you’re looking at the formation of first city-states then going down to hourly temporal resolution makes little sense. Similarly, if your dataset comprises a handful '
		+  'of sites spread over thousands of square kilometers (a common occurrence, for example, in Lower Palaeolithic studies) then there is very little point in modeling '
		+  'individual-level mobility, instead, one agent-one group and one tick-one generation resolution is probably the right one.'
		+'</p>'
		+'<p>'
		+  'For example, in AmphorABM, agents represent not individuals, but households as economic production units. '
		+  'This makes sense because individuals are difficult to detect in the archaeological record, but what they produce and consume – wine – can be detected through amphorae as proxy evidence. '
		+  'In addition, the data we are interested in spans several centuries (100 to 600 BC), so this more aggregative scale makes more sense.'
		+'</p>'  
		+'<p>',
	},
	{
		text:'<p>'
		+  '<b>Step 4: Ontology building</b></p><p> The last, and perhaps most crucial, step of the conceptual phase relates to ontology building. '
		+  'This is likely to be the most difficult step of the process.'
		+'</p>'
		+'<p>'
		+  'Ontology building consists of defining the entities in the simulation, their attributes, and their rules of interaction. '
		+  'In simple terms, the modeler needs to define the “artificial world” of the model.'
		+'</p>'
		+'<p>'
		+  'Every model is, by definition, a simplification of the real system that preserves only some aspects of reality. '
		+  'Therefore, building a model is the art of knowing what to keep and leave out.'
		+'</p>'
	},
	{
		text:'<p>'
		+  '<b>Step 4: Ontology building</b></p><p>It is necessary to think carefully about what should be considered a crucial element of the system and '
		+  'to what level of detail it needs to be represented in the model. Two general guidelines help in the process of developing the ontology.'
		+'</p>'
	},
	{
		text:'<p>'
		+  '<b>Step 4: Ontology building</b>'
		+'</p>'
		+'<p>'
		+  'First, the <b>parsimony rule</b> focuses on keeping the model as simple as possible and only adding elements if absolutely necessary. '
		+  'For example, if you’re modeling demography at generational scales perhaps it is unnecessary to model both parents - in many ecological models, only the female line is modeled.'
		+'</p>'
	},
	{
		text:'<p>'
		+  '<b>Step 4: Ontology building</b>'
		+'</p>'
		+'<p>'
		+  'Second, you should always consider your research questions. Research questions are like a knife used to cut the model to the right shape and size - '
		+  'anything that has no direct relevance to them should not find its way into the model. If you’re interested in, for instance, trade in luxury commodities between settlements, '
		+  'it may not be necessary to model the subsistence strategy or demography of the communities that were involved.'
		+'</p>'
	},
	{
		text:'<p>'
		+  '<b>Step 4: Ontology building</b></p><p> A simple starting point is to look for one of the “foundational” models, use it as the base of one’s model, '
		+  'and add the necessary elements that reflect the particular research questions. You’ll find many foundational models in social sciences, geography, economy, demography, '
		+  'and cultural evolution that can be readily applied to archaeological research questions. Some of them are part of the NetLogo Library and can be viewed '
		+  '<a href="https://www.netlogoweb.org/launch">here</a>.'
		+'</p>'
	},
	{
		text:'<p>'
		+  '<b>Step 4: Ontology building</b></p><p> To take the AmphorABM as an example again, in the accompanying publication, '
		+  'the author discusses some of the reasoning behind the chosen representation. For example, '
		+  'the model borrows assumptions from existing descriptive models where the Gaulish elite generate agricultural surplus and trade with settled merchants, importing wine, '
		+  'forming the inspiration for the main agent types. ' 
		+  'However, the author does not incorporate all known historical details or a realistic landscape. Instead, parsimony is used to "[reduce] the model to a few '
		+  'key parameters [...] to directly examine how a preference for one type of wine over the other might affect archaeological assemblages" (Crabtree, 2016, p.3). '
		+  'The ontology also draws on the foundational wolf-sheep predation ABM, which can be viewed '
		+  '<a href="https://www.netlogoweb.org/launch#https://www.netlogoweb.org/assets/modelslib/Sample%20Models/Biology/Wolf%20Sheep%20Predation.nlogo"> here</a>.'
		+'</p>'
		+'<p>'
		+  'The documentation of the model - the ODD, which\'s importance we will discuss in the next lessons - can be found in the supplementary material and goes more '
		+  'in-depth about conceptualization.'
		+'</p>'
		+'<footer class="citation">'
		+  'Crabtree, S.A., 2016. Simulating littoral trade: Modeling the trade of wine in the bronze to iron age transition in southern France. Land, 5(1)'
		+'</footer>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},	
	},
	{
		text:'<p>'
		+  'The Conceptual phase is arguably the most crucial and difficult part of the modeling process. In it, you frame the research question(s), '
		+  'choose the most appropriate methodology, and develop the ontology of the model.'
		+'</p>'
		+'<p>'
		+  'This is the end of this lesson. In it, you have:'
		+'</p>'
		+'<ul>'
			+'<li>learned what constitutes good and bad research questions for modelling;</li>'
			+'<li>learned how to pick the right modelling technique;</li>'
			+'<li>been learned about the importance of model conceptualization.</li>'
		+'</ul>'
		+'<p>'
		+  'Before you even start coding, you have to have a pretty good idea of what your model is going to look like. The model process as described here represents an ideal scenario, '
		+  'and you might end up having to revisit certain steps of it as you continue modeling. Even so, you should thoroughly conceptualize your model before you move on to the next phase: '
		+  'The Technical Phase. The next lesson discusses this phase and its place in the modeling process in further detail. To continue, click Next below.'
		+'</p>'
	},
 ];
