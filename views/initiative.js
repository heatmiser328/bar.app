var Spinner = require('../widgets/spinner.js');
var Dice = require('../widgets/dice.js');
var Initiative = require('../core/initiative.js');
var config = require('../views/config.js');
var log = require('../core/log.js');

var british = 0;
var american = 0;

function increment(v, i) {
	v += i;
    if (v < 0) {
    	v = 0;
    }
    else if (v > 5) {
    	v = 5;
    }
    return v;
}

function create(battle) {
	var composite = tabris.create("Composite", {
    	//background: "white",
    	layoutData: {centerX: 0, top: config.PAGE_MARGIN},
        highlightOnTouch: true
	});

    var diceView = Dice.create([
    	{num: 1, low: 0, high: 9, color: 'red'},
    	{num: 1, low: 0, high: 9, color: 'blue'}
    ], {left: 50, top: 2}, function(dice) {
    	log.debug('Determine initiative');
        var result = Initiative.calc(battle, dice[0].value, spinBritish.getValue(), dice[1].value, spinAmerican.getValue());
        resultView.set('text', result)
	}).appendTo(composite);
    
    var resultView = tabris.create("TextView", {
    	text: "",
    	layoutData: {left: [diceView, 20], top: 15},
        font: 'bold 24px'
	}).appendTo(composite);
 
    
    var labelView = tabris.create("TextView", {
    	text: "Momentum",
    	layoutData: {centerX: 20, top: [diceView, 10]}
	}).appendTo(composite);
    
    var spinBritish = Spinner.create('British', british, true, {left: 0, right: [0,3], top: [labelView,5]}, function(valueView, incr) {
    	british = increment(british, incr);
    	valueView.set("text", british);
	}).appendTo(composite);
    
    var spinAmerican = Spinner.create('American', american, true, {left: 0, right: [0,3], top: [spinBritish,5]}, function(valueView, incr) {
    	american = increment(american, incr);
    	valueView.set("text", american);
	}).appendTo(composite);
    
	return composite;
}


module.exports = {
	create: function(battle) {
    	log.debug('Creating Initiative for ' + battle.name);
    	return create(battle);
    }
};
