var Current = require('../core/current.js');
var Spinner = require('../widgets/spinner.js');
var Dice = require('../widgets/dice.js');
var Initiative = require('../core/initiative.js');
var increment = require('../core/increment.js');
var config = require('../config.js');
var log = require('../core/log.js');

function create(battle, callback) {
	var composite = tabris.create("Composite", {
    	layoutData: {centerX: 0, top: config.PAGE_MARGIN},
        background: config.background,
        textColor: config.textColor,
        highlightOnTouch: true
	});

    var diceView = Dice.create([
    	{num: 1, low: 0, high: 9, color: 'red'},
    	{num: 1, low: 0, high: 9, color: 'blue'}
    ], {left: 50, top: 2}, function(dice) {
    	log.debug('Determine initiative');
        var result = Initiative.calc(battle, dice[0].value, spinBritish.getValue(), dice[1].value, spinAmerican.getValue());
        //resultView.set('text', result)
        resultView.set('selection', result)
        Current.initiative(result);
        callback && callback(result);
	}).appendTo(composite);
    
    /*
    var resultView = tabris.create("TextView", {
    	text: Current.initiative() || '',
    	layoutData: {left: [diceView, 20], top: 15},
        background: config.background,
        textColor: config.textColor,
        font: 'bold 24px'
	}).appendTo(composite);
    */
    var resultView = tabris.create("Picker", {
    	layoutData: {left: [diceView, 20], top: 15},
        background: config.background,
        textColor: config.textColor,
        font: 'bold 24px',
        items: Initiative.nationalities(battle),
        selection: Current.initiative() || ''
	}).on("change:selection", function(picker, item) {
        log.debug('Initiative Selected ' + item);
        Current.initiative(item);
        callback && callback(item);
	}).appendTo(composite);    
 
    
    var labelView = tabris.create("TextView", {
    	text: "Momentum",
        background: config.background,
        textColor: config.textColor,
    	layoutData: {centerX: 20, top: [diceView, 10]}
	}).appendTo(composite);
    
    var spinBritish = Spinner.create({src: 'images/british-flag-sm.png'}, 0, true, {left: 0, right: [0,3], top: [labelView,5]}, function(valueView, incr) {
    	var british = increment(british, incr, 0, 5);
    	valueView.set("text", british);
	}).appendTo(composite);
    
    var spinAmerican = Spinner.create({src: 'images/american-flag-sm.png'}, 0, true, {left: 0, right: [0,3], top: [spinBritish,5]}, function(valueView, incr) {
    	var american = increment(american, incr, 0, 5);
    	valueView.set("text", american);
	}).appendTo(composite);
    
	return composite;
}


module.exports = {
	create: function(battle, callback) {
    	log.debug('Creating Initiative for ' + battle.name);
    	return create(battle, callback);
    }
};
