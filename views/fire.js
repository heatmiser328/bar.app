var Spinner = require('../widgets/spinner.js');
var Dice = require('../widgets/dice.js');
var Fire = require('../core/fire.js');
var Current = require('../core/current.js');
var config = require('../views/config.js');
var log = require('../core/log.js');

function increment(v, i) {
	v += i;
    if (v < 1) {
    	v = 1;
    }
    return v;
}

var firetype = Fire.types[0];
var firesps = Fire.sps[0];
var firerange = Fire.ranges[0];
var modifier = 0;

function create(battle) {
    function updateResults(dice) {
    	dice = dice || diceView.dice();
    	var result = Fire.resolve(dice[0].value, dice[1].value, firetype, firesps, firerange, modifier);
        log.debug(result);
        textResult.set('text', result);
    }
    
	var composite = tabris.create("Composite", {
    	//background: "red",
    	layoutData: {left: 0, top: 10, right: 0},
        highlightOnTouch: true
	});

	var compositeFire = tabris.create("Composite", {
    	//background: "green",
    	layoutData: {left: 0, top: 0, right: '45%'},
        highlightOnTouch: true
	});
    
	    var labelType = tabris.create("TextView", {
	    	text: "Type",
	    	layoutData: {left: 5, top: 2}
		}).appendTo(compositeFire);
		    var comboType = tabris.create("Picker", {
		    	layoutData: {left: [labelType, 20], top: 0, right: 1},
		        items: Fire.types,
		        selection: firetype
			}).on("change:selection", function(picker, item) {
		    	firetype = item;
                log.debug('Selected ' + firetype);
                updateResults();
			}).appendTo(compositeFire);    
	    
	    var labelSPs = tabris.create("TextView", {
	    	text: "SPs",
	    	layoutData: {left: 5, top: [comboType, 7]}
		}).appendTo(compositeFire);
		    var comboSPs = tabris.create("Picker", {
		    	layoutData: {left: [labelSPs, 20], top: [comboType, 5], right: 1},
		        items: Fire.sps,
		        selection: firesps
			}).on("change:selection", function(picker, item) {
		    	firesps = item;
                log.debug('Selected ' + firesps);
                updateResults();
			}).appendTo(compositeFire);    
	    
	    var labelRange = tabris.create("TextView", {
	    	text: "Range",
	    	layoutData: {left: 5, top: [comboSPs, 7]}
		}).appendTo(compositeFire);
		    var comboRange = tabris.create("Picker", {
		    	layoutData: {left: [labelRange, 20], top: [comboSPs, 5], right: 1},
		        items: Fire.ranges,
		        selection: firerange
			}).on("change:selection", function(picker, item) {
		    	firerange = item;
                log.debug('Selected ' + firerange);
                updateResults();
			}).appendTo(compositeFire);
            
	compositeFire.appendTo(composite);
    
	var compositeModifiers = tabris.create("Composite", {
    	//background: "blue",
    	layoutData: {left: [compositeFire,0], top: 0, right: 0, bottom: '15%'},
        highlightOnTouch: true
	});
    	tabris.create("CollectionView", {
        	layoutData: {left: 0, top: 0, right: 0, bottom: 0},
            items: Fire.modifiers,
            itemHeight: 35,
            initializeCell: function(cell) {
            	var toggleModifier = tabris.create("ToggleButton", {
                	layoutData: {left: 0, top: 0, right: 0},
                    text: "",
                    selection: false
				}).on("change:selection", function(button, selection) {
                	var name = button.get('text');
                	log.debug('Modifier ' + name + (selection ? '' : ' not') + ' selected');
                    modifier += (selection ? 1 : -1) * Fire.modifier(name);
                    updateResults();
				}).appendTo(cell);
                cell.on("change:item", function(widget, mod) {
                    toggleModifier.set("text", mod.name);
				});
			}
		}).appendTo(compositeModifiers);
	compositeModifiers.appendTo(composite);
    
    var diceView = Dice.create([
    	{num: 1, low: 0, high: 9, color: 'red'},
    	{num: 1, low: 0, high: 9, color: 'white'}
    ], {left: 50, top: [compositeModifiers, 0]}, function(dice) {
    	log.debug('Fire!');
        updateResults(dice);
	}).appendTo(composite);
    
    /*var labelResult = tabris.create("TextView", {
    	text: "Result",
    	layoutData: {left: 5, top: [comboRange, 25]}
	}).appendTo(composite);*/
	    var textResult = tabris.create("TextView", {
	    	text: "",
	    	layoutData: {left: [diceView, 20], top: [compositeModifiers, 15]},
	        alignment: 'center',
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
