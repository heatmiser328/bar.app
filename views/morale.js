var Spinner = require('../widgets/spinner.js');
var Dice = require('../widgets/dice.js');
var ArmyMorale = require('../core/armymorale.js');
var Morale = require('../core/morale.js');
var Current = require('../core/current.js');
var increment = require('../core/increment.js');
var config = require('../config.js');
var log = require('../core/log.js');

var unit = 0;
var leader = 0;
var army = 'British';

function create(battle) {
	function checkMorale(dice) {
		log.debug('Check morale');
        var current = Current.get(battle);
        var armymorale = 0;
        if (army == 'British') {
        	armymorale = current.britishMorale;
        } else if (army == 'American') {
        	armymorale = current.americanMorale;
        } else {
        	armymorale = current.frenchMorale;
        }
        
        var armymod = ArmyMorale.moraleModifier(battle.moraleLevels, armymorale);
	    var result = Morale.check(dice[0].value, unit, armymod, leader);
	    resultView.set('text', result ? "Pass" : "Fail");
	}

	var composite = tabris.create("Composite", {
        background: config.background,
        textColor: config.textColor,
    	layoutData: {centerX: 0, top: config.PAGE_MARGIN},
        highlightOnTouch: true
	});

    var diceView = Dice.create([
    	{num: 1, low: 0, high: 9, color: 'white'}
    ], {left: 50, top: 2}, function(dice) {
    	checkMorale(dice);
	}).appendTo(composite);
	    var resultView = tabris.create("TextView", {
	    	text: "",
	        background: config.background,
	        textColor: config.textColor,
	    	layoutData: {left: [diceView, 20], top: 15},
	        font: 'bold 24px'
		}).appendTo(composite);
 
    
    var spinMorale = Spinner.create('Morale', unit, true, {left: 0, right: [0,3], top: [diceView,10]}, function(valueView, incr) {
    	unit = increment(unit, incr, -5, 5);
    	valueView.set("text", unit);
	}).appendTo(composite);
    
    var labelArmy = tabris.create("TextView", {
    	text: "Army",
        background: config.background,
        textColor: config.textColor,
    	layoutData: {left: 15, top: [spinMorale, 10]}
	}).appendTo(composite);
    	
        var radioBritish = tabris.create("RadioButton", {
        	layoutData: {left: [labelArmy, 40], top: [spinMorale, 10]},
	        background: config.background,
	        textColor: config.textColor,
            text: 'British',
            selection: true
		}).on("change:selection", function(widget, selection) {
        	if (selection) {
            	army = 'British';
			}
            checkMorale(diceView.dice());
		}).appendTo(composite);
    
        var radioAmerican = tabris.create("RadioButton", {
        	layoutData: {left: [labelArmy, 40], top: [radioBritish, 10]},
	        background: config.background,
	        textColor: config.textColor,
            text: 'American'
		}).on("change:selection", function(widget, selection) {
        	if (selection) {
            	army = 'American';
			}
            checkMorale(diceView.dice());
		}).appendTo(composite);
    
        var radioFrench = tabris.create("RadioButton", {
        	layoutData: {left: [labelArmy, 40], top: [radioAmerican, 10]},
	        background: config.background,
	        textColor: config.textColor,
            text: 'French'
		}).on("change:selection", function(widget, selection) {
        	if (selection) {
            	army = 'French';
			}
            checkMorale(diceView.dice());
		}).appendTo(composite);
    
    var spinLeader = Spinner.create('Leader', leader, true, {left: 0, right: [0,3], top: [radioFrench,10]}, function(valueView, incr) {
    	leader = increment(leader, incr, -5, 5);
    	valueView.set("text", leader);
	}).appendTo(composite);
    
    var armyMoraleView = createArmyMorale(battle, {centerX: 0, top: [spinLeader, 15]});
    armyMoraleView.appendTo(composite);
    composite.reset = armyMoraleView.reset;
    
	return composite;
}


function createArmyMorale(battle, layout) {
	var maxMorale = ArmyMorale.maxMorale(battle.moraleLevels);
	var current = Current.get(battle);
	var composite = tabris.create("Composite", {
    	id: 'armyView',
        background: config.background,
        textColor: config.textColor,
    	layoutData: layout,
        highlightOnTouch: true
	});
	    var labelView = tabris.create("TextView", {
	    	text: "Morale Levels",
	        background: config.background,
	        textColor: config.textColor,
	    	layoutData: {centerX: 20, top: config.PAGE_MARGIN}
		}).appendTo(composite);
	    
	    var spinBritish = Spinner.create('British', current.britishMorale, true, {left: 0, right: [0,3], top: [labelView,5]}, function(valueView, incr) {
	    	current = Current.get(battle);
	    	current.britishMorale = increment(current.britishMorale, incr, 0, maxMorale);
	    	valueView.set("text", current.britishMorale);
	        Current.save(current);
		}).appendTo(composite);
	    
	    var spinAmerican = Spinner.create('American', current.americanMorale, true, {left: 0, right: [0,3], top: [spinBritish,5]}, function(valueView, incr) {
	    	current = Current.get(battle);
	    	current.americanMorale = increment(current.americanMorale, incr, 0, maxMorale);
	    	valueView.set("text", current.americanMorale);
	        Current.save(current);
		}).appendTo(composite);
	    
	    var spinFrench = Spinner.create('French', current.frenchMorale, true, {left: 0, right: [0,3], top: [spinAmerican,5]}, function(valueView, incr) {
	    	current = Current.get(battle);
	    	current.frenchMorale = increment(current.frenchMorale, incr, 0, maxMorale);
	    	valueView.set("text", current.frenchMorale);
	        Current.save(current);
		}).appendTo(composite);
    
    composite.reset = function() {
    	current = Current.get(battle);
        spinBritish.setValue(current.britishMorale);
        spinAmerican.setValue(current.americanMorale);
        spinFrench.setValue(current.frenchMorale);
    }
    
	return composite;
}


module.exports = {
	create: function(battle) {
    	log.debug('Creating Morale for ' + battle.name);
    	return create(battle);
    }
};
