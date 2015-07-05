var Dice = require('../widgets/dice.js');
var Fire = require('../core/fire.js');
var _ = require('lodash');
var log = require('../core/log.js');

var fire = {
	type: Fire.types[0],
    strength: Fire.sps[0],
    range: Fire.ranges[0],
    modifier: 0
}    

function create(battle) {
    function updateResults(dice) {
    	dice = dice || diceView.dice();
    	var result = Fire.resolve(dice[0].value, dice[1].value, fire.type, fire.strength, fire.range, fire.modifier);
        log.debug(result);
        textResult.set('text', result);
    }
    
	var composite = tabris.create("Composite", {
    	//background: "red",
    	layoutData: {left: 0, top: 10, right: 0},
        highlightOnTouch: true
	});

    var diceView = Dice.create([
    	{num: 1, low: 0, high: 9, color: 'red'},
    	{num: 1, low: 0, high: 9, color: 'white'}
    ], {left: 50, top: 2}, function(dice) {
    	log.debug('Fire!');
        updateResults(dice);
	}).appendTo(composite);
    
    /*var labelResult = tabris.create("TextView", {
    	text: "Result",
    	layoutData: {left: 5, top: [comboRange, 25]}
	}).appendTo(composite);*/
	    var textResult = tabris.create("TextView", {
	    	text: "",
	    	layoutData: {left: [diceView, 20], top: 15},
	        alignment: 'center',
	        font: 'bold 24px'
		}).appendTo(composite);
    
	var compositeFire = tabris.create("Composite", {
    	//background: "green",
    	layoutData: {left: 0, top: [diceView, 10], right: '45%'},
        highlightOnTouch: true
	});
    
	    var labelType = tabris.create("TextView", {
	    	text: "Type",
	    	layoutData: {left: 5, top: 5}
		}).appendTo(compositeFire);
		    var comboType = tabris.create("Picker", {
		    	layoutData: {left: [labelType, 20], height: 35, top: 0, right: '15%'},
		        items: Fire.types,
		        selection: fire.type
			}).on("change:selection", function(picker, item) {
		    	fire.type = item;
                log.debug('Selected ' + fire.type);
                updateResults();
			}).appendTo(compositeFire);    
	    
	    var labelSPs = tabris.create("TextView", {
	    	text: "SPs",
	    	layoutData: {left: 5, top: [comboType, 12]}
		}).appendTo(compositeFire);
		    var comboSPs = tabris.create("Picker", {
		    	layoutData: {left: [labelSPs, 20], height: 35, top: [comboType, 5], right: '15%'},
		        items: Fire.sps,
		        selection: fire.strength
			}).on("change:selection", function(picker, item) {
		    	fire.strength = item;
                log.debug('Selected ' + fire.strength);
                updateResults();
			}).appendTo(compositeFire);    
	    
	    var labelRange = tabris.create("TextView", {
	    	text: "Range",
	    	layoutData: {left: 5, top: [comboSPs, 12]}
		}).appendTo(compositeFire);
		    var comboRange = tabris.create("Picker", {
		    	layoutData: {left: [labelRange, 20], height: 35, top: [comboSPs, 5], right: '15%'},
		        items: Fire.ranges,
		        selection: fire.range
			}).on("change:selection", function(picker, item) {
		    	fire.range = item;
                log.debug('Selected ' + fire.range);
                updateResults();
			}).appendTo(compositeFire);
            
	compositeFire.appendTo(composite);
    
    var scrollModifiers = tabris.create("ScrollView", {
    	direction: 'vertical',
        //background: "red",
    	layoutData: {left: [compositeFire,0], top: [diceView, 10], right: 0, bottom: 0},
        highlightOnTouch: true
	});
    	var btn;
    	_.each(battle.modifiers.fire, function(modifier, i) {
            btn = tabris.create("CheckBox", {
            	layoutData: {left: 15, height: 55, top: i == 0 ? 0 : [btn,0], right: 0},
                text: modifier.name,
                selection: false
			}).on("change:selection", function(button, selection) {
            	log.debug('Fire Modifier ' + modifier.name + (selection ? '' : ' not') + ' selected');
                fire.modifier += (selection ? 1 : -1) * modifier.value;
            	log.debug('Fire DRM ' + fire.modifier);
                updateResults();
			}).appendTo(scrollModifiers);
        });
	scrollModifiers.appendTo(composite);
    
	return composite;
}


module.exports = {
	create: function(battle) {
    	log.debug('Creating Fire for ' + battle.name);
    	return create(battle);
    }
};
