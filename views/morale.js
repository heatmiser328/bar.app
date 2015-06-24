var Spinner = require('../widgets/spinner.js');
var Dice = require('../widgets/dice.js');
var ArmyMorale = require('../core/armymorale.js');
var Morale = require('../core/morale.js');
var Current = require('../core/current.js');
var config = require('../views/config.js');
var log = require('../core/log.js');

function increment(v, i) {
	v += i;
    if (v < -5) {
    	v = -5;
    }
    else if (v > 5) {
    	v = 5;
    }
    return v;
}

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
    	//background: "white",
    	layoutData: {centerX: 0, top: config.PAGE_MARGIN},
        highlightOnTouch: true
	});

    var spinMorale = Spinner.create('Morale', unit, true, {left: 0, right: [0,3], top: 0}, function(valueView, incr) {
    	unit = increment(unit, incr);
    	valueView.set("text", unit);
	}).appendTo(composite);
    
    var labelArmy = tabris.create("TextView", {
    	text: "Army",
    	layoutData: {left: 15, top: [spinMorale, 10]}
	}).appendTo(composite);
    	
        var radioBritish = tabris.create("RadioButton", {
        	layoutData: {left: [labelArmy, 40], top: [spinMorale, 10]},
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
            text: 'American'
		}).on("change:selection", function(widget, selection) {
        	if (selection) {
            	army = 'American';
			}
            checkMorale(diceView.dice());
		}).appendTo(composite);
    
        var radioFrench = tabris.create("RadioButton", {
        	layoutData: {left: [labelArmy, 40], top: [radioAmerican, 10]},
            text: 'French'
		}).on("change:selection", function(widget, selection) {
        	if (selection) {
            	army = 'French';
			}
            checkMorale(diceView.dice());
		}).appendTo(composite);
    
    var spinLeader = Spinner.create('Leader', leader, true, {left: 0, right: [0,3], top: [radioFrench,10]}, function(valueView, incr) {
    	leader = increment(leader, incr);
    	valueView.set("text", leader);
	}).appendTo(composite);
    
    var diceView = Dice.create([
    	{num: 1, low: 0, high: 9, color: 'white'}
    ], {left: 50, top: [spinLeader, 10]}, function(dice) {
    	checkMorale(dice);
	}).appendTo(composite);
    
    var resultView = tabris.create("TextView", {
    	text: "",
    	layoutData: {left: [diceView, 20], top: [spinLeader, 25]},
        font: 'bold 24px'
	}).appendTo(composite);
 
	return composite;
}


module.exports = {
	create: function(battle) {
    	log.debug('Creating Morale for ' + battle.name);
    	return create(battle);
    }
};
