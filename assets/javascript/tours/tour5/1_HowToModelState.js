const howToModelState = `globals [
  grass
  earth-patches
  water-patches
  littoral-patches
  mine-patches
  total-harvest
  total-amphora
]

breed [
  lineageA lineageAs;; Gaulish agents
]

breed [
  lineageAminers lineageAminer ;; mining families, not used in today's demo
]

breed [
  lineageB1 lineageB1s;; Etruscan Colonist agents
]

breed [
  lineageB2 lineageB2s;; Greek colonist agents
]

turtles-own [
  birth-tick
  a  ;; used to record your x coordinate
  b  ;; used to record your y coordinate
  trading-costs
  thisDistance
  energy
  storage
  GreekWine
  EtruscanWine
  metal
  WinePurchase
  MetalPurchase
  GrainPurchase
  amphoraeAssemblage ;; Etruscan amphorae--default
  GreekAmphoraeAssemblage ;; Greek amphorae
  wealth ;; money--trade grain for this
  trade-partners

]

lineageA-own [
  myFarm
]

lineageAminers-own [
  myMine
]

lineageB1-own [
  myVineyard
]

lineageB2-own [
  myVineyard
]

patches-own [
  owned?
  countdown
]


to setup
  ca
  reset-ticks

  ;; here I'm setting the world. Water isn't necessary, but it's aesthetically pleasing
  ;; so I'm arbitrarily making the southern quadrant water

  set water-patches patches with [ pycor <= -10 ]
  ask water-patches [set pcolor blue]


  ;;littoral patches are necessary, as it's where wine can be grown. Here I'm making a thin
  ;; band of coast where Etruscans and Greeks can settle

  set littoral-patches patches with [pycor >= -10 and pycor <= -6 ]
  ask littoral-patches [set pcolor lime]

  ;;the rest of the landscape is regular 'land', so here I'm coloring these patches. This is
  ;;where the Gaulish farmers can live.

  set earth-patches patches with [ pycor > -6 ]
  ask earth-patches [ set pcolor one-of [ green green brown ] ]
 ; ask earth-patches [ ifelse random-float 0.5 [set pcolor green][ set pcolor brown] ]
  ask earth-patches [ set countdown random grass-regrowth-time ] ;;a slider that says how many ticks a patch will be productive. The lower it is, the more frequently farmed fields decay

  ;; don't worry about metals for today, but there's archaeological evidence that metal was mined
  ;; and traded for wine.

  if metals? [
    set mine-patches patches with [ pycor > 24 ]
    ask mine-patches [
      ;; I'm sure now that there's a much more elegant way to do this
      ;; but when I wrote this code my coding skills weren't the *best*
      ;; so what this does is for every 15 green patches there is 1 grey patch

      set pcolor one-of [green green green green green green green green green green green green green green green grey] ] ]

  create-lineageA number-Gauls
  [
    set birth-tick ticks
    set shape "person"
    set size 1
    setxy random-xcor random-ycor
    ;;set label lineageA
    set energy 20

    ;;agents consume energy in this model so they need to be instantiated with some amount of energy, so they don't die
    ;;20 is fairly arbitrary. It depletes quickly, but is essential for model instantiation.
    ;; importantly, it's below the reproduction threshold, so agents don't show up and have babies right away.
    ;; they have to farm/trade before they can reproduce.

    set color red
    move-to one-of earth-patches
    set owned? true
    ;;    set trading-costs 1
  ]

  if metals? [
    create-lineageAminers number-mining-Gauls [
      set birth-tick ticks
      set shape "person"
      set size 1
      setxy random-xcor random-ycor
      set energy 20
      set color black
      move-to one-of mine-patches with [ pcolor = grey ]
    ] ]


end

to go

  ;;we don't want the model to keep going if all our agents are dead
  if not any? turtles [ stop ]

  ;;final timestep basically corresponds to the beginning of the Roman period, but is somewhat arbitrary. Can be changed.
  if ticks = 500 [ stop ]
  check-ownership

  ask lineageA [
    reproduceGauls
    make-my-farm
    plant
    harvest
    eat-grain
    store-grain
    buystuff
    ;;  more-farms
    moveCloser
    consumeGreekWine
    consumeEtruscanWine
    decayMetals
    death
  ]

  ask lineageAminers [
    eat-grain
    extractMinerals
    ;   TradeMetal
    reproduceMiners
    consumeGreekWine
    consumeEtruscanWine
    decayMetals
    death
  ]

  if ticks = Etruscan-arrival [
    create-lineageB1 1 [
      set birth-tick ticks
      set shape "plant"
      set size 1
      ;;set label lineageA
      set energy 55
      set EtruscanWine 20
      set color blue
      move-to one-of littoral-patches with [pcolor = lime ]
      set owned? true
      landing-Etruscan-colonists

    ]
  ]

  if two-colonist-populations? [
    if ticks = Greek-arrival [
      create-lineageB2 1 [
        set birth-tick ticks
        set shape "plant"
        set size 1
        ;;set label lineageA
        set energy 55
        set GreekWine 20
        set color orange
        move-to one-of littoral-patches  with [pcolor = lime ]
        set owned? true
        landing-Greek-colonists
      ] ] ]


  ask lineageB1 [
    TradeWineEtruscans
    reproduceColonists
    consumeEtruscanWine
    decayMetals
    eat-grain
    plantVineyard
    harvestWineEtruscans
    death
  ]

  ask lineageB2 [
    TradeWineGreeks
    reproduceColonists
    consumeGreekWine
    decayMetals
    eat-grain
    plantVineyard
    harvestWineGreeks
    death
  ]

  ;; we don't want agents to live forever, so here we initiate a death condition (aside from running out of energy).
  ;; the life-expectancy mark is set on the slider, and defaults to 33--the age I was when I finished my PhD.
  ;; This, however, may be a little low (even if finishing a PhD feels like death) so it's best to set it around 50.
  ;; How this works is that when an agent reaches one more than the number of ticks set by the life expectancy slider
  ;; they choose a random number between 0 and 100, and if the number is less than 50, they die.

  ask turtles [
    if ticks - birth-tick > life-expectancy [
      if random-float 100 < 50 [
        die ]
    ] ]



  ;; catch to keep carrying capacity low. The model almost never reaches these issues now, but it's just a catch.
  ask lineageA [
    if count lineageA > 1000 [
      if birth-tick > life-expectancy [die]
    ]
  ]

  ask lineageAminers [
    if count lineageAminers > 600 [
      if birth-tick > life-expectancy [die]
    ]
  ]

  ask lineageB1 [
    if count lineageB1 > 600 [
      if birth-tick > life-expectancy [die]
    ]
  ]

  ask lineageB2 [
    if count lineageB2 > 600 [
      if birth-tick > life-expectancy [die]
    ]
  ]

  ask patches [grow-grass]
  ask patches [patch-degrade]


  tick

end

to reproduceGauls  ;; agents procedure
  if ticks - birth-tick >= 10 [
    if storage >= 50 [
      if random-float 100 < reproduction [  ;; throw "dice" to see if you will reproduce
        set energy (storage / 2)   ;; divide energy between parent and offspring
        hatch 1  [ rt random-float 360 fd 1 ] ]

      set birth-tick ticks


    ] ]


end


;;if Gaulish agents are spending too much to get wine they adjust their location
to moveCloser
  ask lineageA [
    if pcolor = brown [
      if trading-costs > 10 [
        move-to one-of patches with [pycor >= -10 and pycor <= -6  ] ]
      if trading-costs < 10 [
        move-to one-of patches with [pcolor = green ] ]
      set storage storage - 2 ]
  ]
end

to regrow
  ;; a simple way to enable the world to go back to it's basic state. Since we track if the patches are farmed based on color
  ask patches [ if pcolor = brown [
    ifelse countdown <= 0
      [ set pcolor green
        set countdown grass-regrowth-time ]
      [ set countdown countdown - 1 ]
  ] ]
  ;;an agent could plant but not harvest, and then die, and if we don't have this catch the patches will be 'unusable' for future agents
  ;;so in the event an agent dies before harvest (brown) the world can regrow at the end of every tick

  ask patches [ if pcolor = red
    [set pcolor lime ] ]

  ask patches [ if pcolor = cyan
    [set pcolor green ]
  ]
end

to reproduceMiners  ;; agents procedure
  if ticks - birth-tick  >= 10 [
    if energy >= 40 [
      if random-float 100 < reproduction [  ;; throw "dice" to see if you will reproduce
        set energy (energy / 2)   ;; divide energy between parent and offspring
        hatch 1  [ rt random-float 360 fd 1 ] ]
      ;;   move-to one-of mine-patches with [not any? turtles-here] ]
      set birth-tick ticks
      ;;    move-to one-of mine-patches with [ pcolor = grey ]
      ;;     if owned? = true [
      ;;    move-to one-of patches with [owned? = false ] ]
      ;;    set owned? true
    ] ]


end

to reproduceColonists
  if ticks - birth-tick  >= 10 [
    if energy >= 60 [
      if random-float 100 < reproduction [  ;; throw "dice" to see if you will reproduce
        set energy (energy / 2)   ;; divide energy between parent and offspring
        hatch 1 [ rt random-float 360 fd 1 ]
        ;;   move-to one-of littoral-patches with [not any? turtles-here]  ]
        set birth-tick ticks
        if pcolor = blue [ move-to one-of littoral-patches with [ pcolor = lime ]
          ;;   if owned? = true [
          ;;    move-to one-of littoral-patches with [owned? = false ] ]
          ;;   set owned? true
        ] ] ] ]


end
;; I would like to only have 1 turtle per patch! So this makes turtles wander till they find an empty patch.
to go-until-empty-here  ;; turtle procedure
  ask turtles [
    fd 1
    while [any? other turtles-here]
      [ fd 1 ]
  ]
  tick
end

to grow-grass  ;; patch procedure
               ;; countdown on brown patches: if reach 0, grow some grass
  if pcolor = brown [
    ifelse countdown <= 0
      [ set pcolor green
        set countdown grass-regrowth-time ]
      [ set countdown countdown - 1 ]
  ]
end

to patch-degrade  ;; patch procedure
  if pcolor = cyan [
    ifelse countdown <= 0
    [  set pcolor brown
      set countdown 5 ]
    [  set countdown countdown - 1 ]
  ]
end

to extractMinerals
  if  pcolor = grey [
    set metal metal + 5
    set energy energy + 1 ]
  if  pcolor = green  [
    set energy energy + 10 ]
end

to death  ;; turtle procedure
          ;  when energy dips below zero, die
  if energy + storage < 0 [ die ]

end


to TradeWineEtruscans
  ;   if random-float 100 < 5 [
  ask lineageB1 [
    if energy < 20 [
      if random-float 100 < 25 [
        if EtruscanWine >= 10 [
          ask one-of lineageA [
            set a xcor
            set b ycor
            if  storage > 60 [
              set storage storage - GrainTradeRate
              set EtruscanWine EtruscanWine + 10    ] ]
          set thisDistance distancexy a b
          set energy energy + GrainTradeRate
          set EtruscanWine EtruscanWine - 10
          set energy energy -  thisDistance * 0.25 ]

      ]
    ] ] ;]
        ;;   if ticks > Greek-arrival]
end

to TradeWineGreeks
  ;  if random-float 100 < 5 [
  ask lineageB2 [
    if energy < 20 [
      if random-float 100 < 25 [
        if GreekWine >= 10 [
          ask one-of turtles [
            set a xcor
            set b ycor
            if storage > 60 [
              if breed != lineageB1 [
                set energy energy - GrainTradeRate
                set GreekWine GreekWine + 10  ]
              set thisDistance distancexy a b
              set energy energy + GrainTradeRate
              set GreekWine GreekWine - 10
              set energy energy -  thisDistance * 0.25
              set trading-costs thisDistance  ]]

        ]
      ] ] ] ; ]
end


to buystuff

  ;; this is the way that Gauls initiate trade, and is a central part of this model
  ;; what this does is when a Gaul has lots of grain they can trade it in for 'wealth' (leaving room for barter for prices later on)
  ;; Gauls will prefer to trade with those colonists that are within their buying radius, as wine isn't a necessary good
  ;; When both Etruscans and Greeks are on the landscape, Gauls will draw a random number and compare that number to the weighted trade choice number
  ;; which weights the preference for different types of wine

  if random-float 100 < 1 [
    if ticks > Etruscan-arrival [
      if ticks <= Greek-arrival [
        if count lineageB1 > 1 [
          ask lineageA [
            if storage >= 60 [
              ask one-of lineageB1  [
                set a xcor
                set b ycor
                if EtruscanWine > 10 [
                  set energy energy + GrainTradeRate
                  set EtruscanWine EtruscanWine - 10 ] ]
              set thisDistance  distancexy a b
              set storage storage - GrainTradeRate
              set EtruscanWine EtruscanWine + 10
              set storage storage -  thisDistance * 0.5 ]
          ] ] ]

      if ticks > Greek-arrival [
        let chance random 100
        if chance < weighted-trade-choice [

          ;;The preference slider only influences who Gauls initiate trade with.
          ;;The closer the slider is to 0 the more it favors Etruscan wine, while the closer it is to 100 the more it favors Greek wine.
          ;; Note that even with the slider all the way at 0 Greek colonists can still attempt to purchase grain from Gauls, so this doesn’t completely shut out trade.

          ask lineageA [
            if storage >= 60 [
              if count lineageB2 > 1 [
                ask one-of lineageB2 [
                  set a xcor
                  set b ycor
                  if GreekWine >= 10 [
                    set energy energy + GrainTradeRate
                    set GreekWine GreekWine - 10 ] ]
                set thisDistance  distancexy a b
                set storage storage - GrainTradeRate
                set GreekWine GreekWine + 10
                set storage storage -  thisDistance * 0.25 ]
            ] ] ]

        if chance > weighted-trade-choice [

          ;;The preference slider only influences who Gauls initiate trade with.
          ;;The closer the slider is to 0 the more it favors Etruscan wine, while the closer it is to 100 the more it favors Greek wine.
          ;; Note that even with the slider all the way at 0 Greek colonists can still attempt to purchase grain from Gauls, so this doesn’t completely shut out trade.


          ask lineageA [
            if storage >= 60 [
              if count lineageB1 > 1 [
                ask one-of lineageB1 [
                  set a xcor
                  set b ycor
                  if EtruscanWine >= 10 [
                    set energy energy + GrainTradeRate
                    set EtruscanWine EtruscanWine - 10 ] ]
                set thisDistance  distancexy a b
                set storage storage - GrainTradeRate
                set EtruscanWine EtruscanWine + 10
                set storage storage -  thisDistance * 0.25 ]
            ]
          ]
        ]
      ]
    ]
  ]

end

to consumeGreekWine
  if GreekWine > 1 [
    set GreekWine GreekWine - 1
  ]
end


to consumeEtruscanWine
  if EtruscanWine > 1 [
    set EtruscanWine EtruscanWine - 1
  ]
end

to decayMetals
  if metal > 1 [
    set metal metal - 1
  ]
end

;; each tick Gaulish agents take fallow fields and plant them. They gain a certain amount of energy from fields and can only extract
;; more energy if they plant more
to make-my-farm
  if pcolor != brown [
    set pcolor cyan ;;
  ]
end

to plant
  ;;ethnographically, people use beer parties to help with planting costs, so here wine makes planting easier!
  if pcolor != brown [
    set pcolor cyan ;; this way we can differentiate between unfarmed patches, dead patches, and farmed patches
    set energy energy - planting-calories  ;; agents expend energy by planting
    if (EtruscanWine > 1) or (GreekWine > 1)
    [ set energy energy + 1 ]
    death
  ]
end

to harvest
  if pcolor = cyan [ ;;again, only those patches with the pcolor cyan can be harvested as a field
    set energy energy + harvest-amount   ;; harvest amount is how much agents get from each farm patch
    set energy energy - harvest-calories  ;; it costs calories to harvest grain
    set total-harvest total-harvest + harvest-amount
    if metal  >= 1 [
      set energy energy + 1
    ]
    death
  ]
end

to eat-grain
  set energy energy - 1 ;; agents basic metabolic needs, they need to eat 1 each year to survive
end

to  store-grain
  set storage storage + energy
  set energy energy - energy
  death

end

;; what I need to do: agents look at how much they're charged for planting, keep that in their regular storage, then make an outside storage
;; any extra grain they have can go in those coffers
;; so I need to transfer immediate energy to stored energy
;; and they only reproduce when their *stored* energy is high

to check-ownership
  ask patches [
    if count turtles-here > 0
    [ set owned? true ] ]
end

to landing-Greek-colonists
  hatch number-Colonists [ rt random-float 360 fd 1 ]
  set energy 39
  set GreekWine 20

  ;; we create here the number of colonists from the slider minus 1; since we start with 1 colonist at a random tick, simulating the "boat" landing
  ;; we need to then spawn the number of colonists we want - 1 so that we start with the number we think we do
end

to landing-Etruscan-colonists
  hatch number-Colonists [ rt random-float 360 fd 1 ]
  set energy 39
  set EtruscanWine 20

  ;; we create here the number of colonists from the slider minus 1; since we start with 1 colonist at a random tick, simulating the "boat" landing
  ;; we need to then spawn the number of colonists we want - 1 so that we start with the number we think we do
end

to plantVineyard
  if pcolor != blue [
    set pcolor red
    set energy energy - planting-calories ;; agents are charged the same to plant wine as they are to plant grain
    death ]
end

to harvestWineEtruscans
  if pcolor = red [
    set pcolor lime
    set EtruscanWine EtruscanWine + 10
    set total-amphora total-amphora + 10
    if metal  >= 1 [
      set energy energy + 1
    ]
    set energy energy - harvest-calories * 2
    death
  ]
end

to harvestWineGreeks
  if pcolor = red [
    set pcolor lime
    set GreekWine GreekWine + 10
    set total-amphora total-amphora + 10
    if metal  >= 1 [
      set energy energy + 1
    ]
    set energy energy - harvest-calories * 2
    death
  ]
end

to more-farms
  death

end

to-report Etruscan-wine-wealth
  report [EtruscanWine] of turtles
end
@#$#@#$#@
GRAPHICS-WINDOW
488
10
1549
1072
-1
-1
5
1
10
1
1
1
0
0
0
1
-40
40
-40
40
0
0
1
ticks
30

BUTTON
18
17
84
50
NIL
setup
NIL
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

SLIDER
259
726
431
759
number-Gauls
number-gauls
0
200
150
1
1
NIL
HORIZONTAL

SLIDER
247
60
419
93
reproduction
reproduction
0
20
3
1
1
%
HORIZONTAL

BUTTON
100
19
163
52
NIL
go
T
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

SLIDER
259
684
431
717
number-Colonists
number-colonists
0
100
100
1
1
NIL
HORIZONTAL

SLIDER
256
808
428
841
harvest-amount
harvest-amount
0
50
20
1
1
NIL
HORIZONTAL

SLIDER
31
655
203
688
Etruscan-arrival
etruscan-arrival
0
100
34
1
1
NIL
HORIZONTAL

BUTTON
176
18
239
51
step
go
NIL
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

SLIDER
29
729
201
762
planting-calories
planting-calories
0
10
4
1
1
NIL
HORIZONTAL

SWITCH
249
16
352
49
metals?
metals?
0
1
-1000

SLIDER
256
767
449
800
number-mining-Gauls
number-mining-gauls
0
20
19
1
1
NIL
HORIZONTAL

SWITCH
15
61
236
94
two-colonist-populations?
two-colonist-populations?
0
1
-1000

PLOT
15
396
401
602
Population
NIL
NIL
0
10
0
10
true
true
"" ""
PENS
"Gauls" 1 0 -5298144 true "" "plot count lineageA"
"miners" 1 0 -16383231 true "" "plot count lineageAminers"
"Etruscans" 1 0 -14454117 true "" "plot count lineageB1"
"Greeks" 1 0 -955883 true "" "plot count lineageB2"

SLIDER
15
99
187
132
life-expectancy
life-expectancy
1
80
50
1
1
NIL
HORIZONTAL

SLIDER
29
767
201
800
harvest-calories
harvest-calories
0
10
4
1
1
NIL
HORIZONTAL

PLOT
15
137
401
392
Wine
NIL
NIL
0
500
0
20
true
true
"" ""
PENS
"Etruscan" 1 0 -13791810 true "" "if ticks > Etruscan-arrival [plotxy ticks mean [EtruscanWine] of lineageA]"
"Greek" 1 0 -955883 true "" "if ticks > Greek-arrival [plotxy ticks mean [GreekWine] of lineageA]"

PLOT
13
834
213
984
Total Agent Population
NIL
NIL
0
10
0
10
true
false
"" ""
PENS
"default" 1 0 -16777216 true "" "plot count turtles"

SLIDER
30
618
202
651
Greek-arrival
greek-arrival
150
500
100
10
1
NIL
HORIZONTAL

SLIDER
198
99
393
132
weighted-trade-choice
weighted-trade-choice
0
100
50
10
1
NIL
HORIZONTAL

SLIDER
31
692
203
725
buying-radius
buying-radius
0
20
10
1
1
NIL
HORIZONTAL

SLIDER
260
606
432
639
GrainTradeRate
graintraderate
0
40
20
1
1
NIL
HORIZONTAL

SLIDER
260
645
445
678
grass-regrowth-time
grass-regrowth-time
0
20
1
1
1
NIL
HORIZONTAL
@#$#@#$#@
## WHAT IS IT?

This model examines the archaeological phenomenon of the transition between Etruscan-produced wine and Greek-produced wine in southern France. In the Bronze Age to Iron Age Etruscan Merchants arrived in France and introduced wine to France. Wine was rapidly adopted (locals likely drank beer before wine so it was easily incorporated into life) and Gauls most likely traded farmed products, such as grain, for wine. 

A few hundred years later, Greek merchants arrive bringing wine, and Greek amphorae rapidly replace Etruscan amphorae, suggesting of course that Greek wine replaced Etruscan wine. Yet Etruscans likely remained and maintained a trading presence with Gauls. How and why did Etruscan (Italian) wine get replaced by Greek wine? 

This stylized and simple model looks at how preference for one type of wine over another can lead to the distinctive artifact curves as reported by Py (1990). 

This model was published open access here: http://www.mdpi.com/2073-445X/5/1/5

It should be cited as follows:

Crabtree, Stefani A. 2016. "Simulating Littoral Trade: Modeling the Trade of Wine in the Bronze to Iron Age Transition in Southern France." Land 2016, 5(1), 5; doi:10.3390/land5010005

This is an example model used in chapter 9 of Romanowska, I., Wren, C., Crabtree, S. 2021. Agent-Based Modeling for Archaeology: Simulating the Complexity of Societies. Santa Fe, NM: SFI Press.

Code blocks: 9.5 and all examples using BehaviorSpace.

## HOW IT WORKS

The base of this model allows Gaulish agents to extract resources from the earth (they farm). Agents need farmed products to be able to survive and reproduce. 

At a time specified by the slider "Etruscan arrival" Etruscan agents will show up and establish a colony along the littoral. They arrive with enough calories to survive for a few years, but have to trade wine for calories--they are dependent on Gauls for survival.

Then, at a time specified by the slider "Greek arrival" Greek agents show up and establish their own colony along the littoral. Just like with Etruscans, Greeks are dependent on Gauls for their survival and have to trade wine for calories. 

Both Gauls and Colonists initiate trade each year--Gauls when they determine they have enough grain to buy wine, while Colonists (both Greek and Etruscan) attempt to trade for grain every year (to survive). The preference slider only influences who Gauls initiate trade with. The closer the slider is to 0 the more it favors Etruscan wine, while the closer it is to 100 the more it favors Greek wine. Note that even with the slider all the way at 0 Greek colonists can still attempt to purchase grain from Gauls, so this doesn't completely shut out trade.


## THINGS TO TRY

First, use the "weighted-trade-choice" slider to look at how this effects survivability of the different colonist populations. 

All the other sliders can be used too; look at how different arrival dates for Etruscans and Greeks will change model results, or how trade rates change them as well.

## HOW TO USE IT

(how to use the model, including a description of each of the items in the Interface tab)

## THINGS TO NOTICE

(suggested things for the user to notice while running the model)

## EXTENDING THE MODEL

(suggested things to add or change in the Code tab to make the model more complicated, detailed, accurate, etc.)

## NETLOGO FEATURES

(interesting or unusual features of NetLogo that the model uses, particularly in the Code tab; or where workarounds were needed for missing features)

## RELATED MODELS

(models in the NetLogo Models Library and elsewhere which are of related interest)

## CREDITS AND REFERENCES

(a reference to the model's URL on the web if it has one, as well as any other necessary credits, citations, and links)
@#$#@#$#@
default
true
0
Polygon -7500403 true true 150 5 40 250 150 205 260 250

airplane
true
0
Polygon -7500403 true true 150 0 135 15 120 60 120 105 15 165 15 195 120 180 135 240 105 270 120 285 150 270 180 285 210 270 165 240 180 180 285 195 285 165 180 105 180 60 165 15

arrow
true
0
Polygon -7500403 true true 150 0 0 150 105 150 105 293 195 293 195 150 300 150

box
false
0
Polygon -7500403 true true 150 285 285 225 285 75 150 135
Polygon -7500403 true true 150 135 15 75 150 15 285 75
Polygon -7500403 true true 15 75 15 225 150 285 150 135
Line -16777216 false 150 285 150 135
Line -16777216 false 150 135 15 75
Line -16777216 false 150 135 285 75

bug
true
0
Circle -7500403 true true 96 182 108
Circle -7500403 true true 110 127 80
Circle -7500403 true true 110 75 80
Line -7500403 true 150 100 80 30
Line -7500403 true 150 100 220 30

butterfly
true
0
Polygon -7500403 true true 150 165 209 199 225 225 225 255 195 270 165 255 150 240
Polygon -7500403 true true 150 165 89 198 75 225 75 255 105 270 135 255 150 240
Polygon -7500403 true true 139 148 100 105 55 90 25 90 10 105 10 135 25 180 40 195 85 194 139 163
Polygon -7500403 true true 162 150 200 105 245 90 275 90 290 105 290 135 275 180 260 195 215 195 162 165
Polygon -16777216 true false 150 255 135 225 120 150 135 120 150 105 165 120 180 150 165 225
Circle -16777216 true false 135 90 30
Line -16777216 false 150 105 195 60
Line -16777216 false 150 105 105 60

car
false
0
Polygon -7500403 true true 300 180 279 164 261 144 240 135 226 132 213 106 203 84 185 63 159 50 135 50 75 60 0 150 0 165 0 225 300 225 300 180
Circle -16777216 true false 180 180 90
Circle -16777216 true false 30 180 90
Polygon -16777216 true false 162 80 132 78 134 135 209 135 194 105 189 96 180 89
Circle -7500403 true true 47 195 58
Circle -7500403 true true 195 195 58

circle
false
0
Circle -7500403 true true 0 0 300

circle 2
false
0
Circle -7500403 true true 0 0 300
Circle -16777216 true false 30 30 240

cow
false
0
Polygon -7500403 true true 200 193 197 249 179 249 177 196 166 187 140 189 93 191 78 179 72 211 49 209 48 181 37 149 25 120 25 89 45 72 103 84 179 75 198 76 252 64 272 81 293 103 285 121 255 121 242 118 224 167
Polygon -7500403 true true 73 210 86 251 62 249 48 208
Polygon -7500403 true true 25 114 16 195 9 204 23 213 25 200 39 123

cylinder
false
0
Circle -7500403 true true 0 0 300

dot
false
0
Circle -7500403 true true 90 90 120

face happy
false
0
Circle -7500403 true true 8 8 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Polygon -16777216 true false 150 255 90 239 62 213 47 191 67 179 90 203 109 218 150 225 192 218 210 203 227 181 251 194 236 217 212 240

face neutral
false
0
Circle -7500403 true true 8 7 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Rectangle -16777216 true false 60 195 240 225

face sad
false
0
Circle -7500403 true true 8 8 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Polygon -16777216 true false 150 168 90 184 62 210 47 232 67 244 90 220 109 205 150 198 192 205 210 220 227 242 251 229 236 206 212 183

fish
false
0
Polygon -1 true false 44 131 21 87 15 86 0 120 15 150 0 180 13 214 20 212 45 166
Polygon -1 true false 135 195 119 235 95 218 76 210 46 204 60 165
Polygon -1 true false 75 45 83 77 71 103 86 114 166 78 135 60
Polygon -7500403 true true 30 136 151 77 226 81 280 119 292 146 292 160 287 170 270 195 195 210 151 212 30 166
Circle -16777216 true false 215 106 30

flag
false
0
Rectangle -7500403 true true 60 15 75 300
Polygon -7500403 true true 90 150 270 90 90 30
Line -7500403 true 75 135 90 135
Line -7500403 true 75 45 90 45

flower
false
0
Polygon -10899396 true false 135 120 165 165 180 210 180 240 150 300 165 300 195 240 195 195 165 135
Circle -7500403 true true 85 132 38
Circle -7500403 true true 130 147 38
Circle -7500403 true true 192 85 38
Circle -7500403 true true 85 40 38
Circle -7500403 true true 177 40 38
Circle -7500403 true true 177 132 38
Circle -7500403 true true 70 85 38
Circle -7500403 true true 130 25 38
Circle -7500403 true true 96 51 108
Circle -16777216 true false 113 68 74
Polygon -10899396 true false 189 233 219 188 249 173 279 188 234 218
Polygon -10899396 true false 180 255 150 210 105 210 75 240 135 240

house
false
0
Rectangle -7500403 true true 45 120 255 285
Rectangle -16777216 true false 120 210 180 285
Polygon -7500403 true true 15 120 150 15 285 120
Line -16777216 false 30 120 270 120

leaf
false
0
Polygon -7500403 true true 150 210 135 195 120 210 60 210 30 195 60 180 60 165 15 135 30 120 15 105 40 104 45 90 60 90 90 105 105 120 120 120 105 60 120 60 135 30 150 15 165 30 180 60 195 60 180 120 195 120 210 105 240 90 255 90 263 104 285 105 270 120 285 135 240 165 240 180 270 195 240 210 180 210 165 195
Polygon -7500403 true true 135 195 135 240 120 255 105 255 105 285 135 285 165 240 165 195

line
true
0
Line -7500403 true 150 0 150 300

line half
true
0
Line -7500403 true 150 0 150 150

pentagon
false
0
Polygon -7500403 true true 150 15 15 120 60 285 240 285 285 120

person
false
0
Circle -7500403 true true 110 5 80
Polygon -7500403 true true 105 90 120 195 90 285 105 300 135 300 150 225 165 300 195 300 210 285 180 195 195 90
Rectangle -7500403 true true 127 79 172 94
Polygon -7500403 true true 195 90 240 150 225 180 165 105
Polygon -7500403 true true 105 90 60 150 75 180 135 105

plant
false
0
Rectangle -7500403 true true 135 90 165 300
Polygon -7500403 true true 135 255 90 210 45 195 75 255 135 285
Polygon -7500403 true true 165 255 210 210 255 195 225 255 165 285
Polygon -7500403 true true 135 180 90 135 45 120 75 180 135 210
Polygon -7500403 true true 165 180 165 210 225 180 255 120 210 135
Polygon -7500403 true true 135 105 90 60 45 45 75 105 135 135
Polygon -7500403 true true 165 105 165 135 225 105 255 45 210 60
Polygon -7500403 true true 135 90 120 45 150 15 180 45 165 90

sheep
false
15
Circle -1 true true 203 65 88
Circle -1 true true 70 65 162
Circle -1 true true 150 105 120
Polygon -7500403 true false 218 120 240 165 255 165 278 120
Circle -7500403 true false 214 72 67
Rectangle -1 true true 164 223 179 298
Polygon -1 true true 45 285 30 285 30 240 15 195 45 210
Circle -1 true true 3 83 150
Rectangle -1 true true 65 221 80 296
Polygon -1 true true 195 285 210 285 210 240 240 210 195 210
Polygon -7500403 true false 276 85 285 105 302 99 294 83
Polygon -7500403 true false 219 85 210 105 193 99 201 83

square
false
0
Rectangle -7500403 true true 30 30 270 270

square 2
false
0
Rectangle -7500403 true true 30 30 270 270
Rectangle -16777216 true false 60 60 240 240

star
false
0
Polygon -7500403 true true 151 1 185 108 298 108 207 175 242 282 151 216 59 282 94 175 3 108 116 108

target
false
0
Circle -7500403 true true 0 0 300
Circle -16777216 true false 30 30 240
Circle -7500403 true true 60 60 180
Circle -16777216 true false 90 90 120
Circle -7500403 true true 120 120 60

tree
false
0
Circle -7500403 true true 118 3 94
Rectangle -6459832 true false 120 195 180 300
Circle -7500403 true true 65 21 108
Circle -7500403 true true 116 41 127
Circle -7500403 true true 45 90 120
Circle -7500403 true true 104 74 152

triangle
false
0
Polygon -7500403 true true 150 30 15 255 285 255

triangle 2
false
0
Polygon -7500403 true true 150 30 15 255 285 255
Polygon -16777216 true false 151 99 225 223 75 224

truck
false
0
Rectangle -7500403 true true 4 45 195 187
Polygon -7500403 true true 296 193 296 150 259 134 244 104 208 104 207 194
Rectangle -1 true false 195 60 195 105
Polygon -16777216 true false 238 112 252 141 219 141 218 112
Circle -16777216 true false 234 174 42
Rectangle -7500403 true true 181 185 214 194
Circle -16777216 true false 144 174 42
Circle -16777216 true false 24 174 42
Circle -7500403 false true 24 174 42
Circle -7500403 false true 144 174 42
Circle -7500403 false true 234 174 42

turtle
true
0
Polygon -10899396 true false 215 204 240 233 246 254 228 266 215 252 193 210
Polygon -10899396 true false 195 90 225 75 245 75 260 89 269 108 261 124 240 105 225 105 210 105
Polygon -10899396 true false 105 90 75 75 55 75 40 89 31 108 39 124 60 105 75 105 90 105
Polygon -10899396 true false 132 85 134 64 107 51 108 17 150 2 192 18 192 52 169 65 172 87
Polygon -10899396 true false 85 204 60 233 54 254 72 266 85 252 107 210
Polygon -7500403 true true 119 75 179 75 209 101 224 135 220 225 175 261 128 261 81 224 74 135 88 99

wheel
false
0
Circle -7500403 true true 3 3 294
Circle -16777216 true false 30 30 240
Line -7500403 true 150 285 150 15
Line -7500403 true 15 150 285 150
Circle -7500403 true true 120 120 60
Line -7500403 true 216 40 79 269
Line -7500403 true 40 84 269 221
Line -7500403 true 40 216 269 79
Line -7500403 true 84 40 221 269

wolf
false
0
Polygon -16777216 true false 253 133 245 131 245 133
Polygon -7500403 true true 2 194 13 197 30 191 38 193 38 205 20 226 20 257 27 265 38 266 40 260 31 253 31 230 60 206 68 198 75 209 66 228 65 243 82 261 84 268 100 267 103 261 77 239 79 231 100 207 98 196 119 201 143 202 160 195 166 210 172 213 173 238 167 251 160 248 154 265 169 264 178 247 186 240 198 260 200 271 217 271 219 262 207 258 195 230 192 198 210 184 227 164 242 144 259 145 284 151 277 141 293 140 299 134 297 127 273 119 270 105
Polygon -7500403 true true -1 195 14 180 36 166 40 153 53 140 82 131 134 133 159 126 188 115 227 108 236 102 238 98 268 86 269 92 281 87 269 103 269 113

x
false
0
Polygon -7500403 true true 270 75 225 30 30 225 75 270
Polygon -7500403 true true 30 75 75 30 270 225 225 270
@#$#@#$#@
NetLogo 6.2.2
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
default
0
-0.2 0 0 1
0 1 1 0
0.2 0 0 1
link direction
true
0
Line -7500403 true 150 150 90 180
Line -7500403 true 150 150 210 180
@#$#@#$#@

@#$#@#$#@
`
