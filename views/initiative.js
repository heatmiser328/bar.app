var Spinner = require('../widgets/spinner.js');
var Dice = require('../widgets/dice.js');
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

function createSpinner(label, value, edit, relatives, handler) {
	relatives = relatives || {};
    var composite = tabris.create("Composite", {
    	layoutData: {left: (relatives.left || 0), right: [0,3], top: (relatives.top || 0)},
    	//background: "white",
        highlightOnTouch: true
    });
    	var labelView = label ? tabris.create("TextView", {
		    	text: label,
	    		layoutData: {left: config.PAGE_MARGIN, centerY: 0},
			}).appendTo(composite)
            : null;
    
	    var prevBtn = tabris.create("Button", {
	    	layoutData: {left: (labelView ? "15%" : 0), top: 0},
	        text: "<"
		}).on("select", function() {
        	handler(valueView, -1);
        }).appendTo(composite);
	    
	    var compositeValueView = tabris.create("Composite", {
        	layoutData: {left: [prevBtn,2], right: [20,0], centerY: 0},
	    	//background: "gray",
	        highlightOnTouch: true
	    });
		    var valueView = edit 
	            ? tabris.create("TextInput", {
		    		layoutData: {centerX: 0, centerY: 0},
			    	text: value,
                    editable: true,
                    alignment: 'center',
                    keyboard: 'decimal'
				}).on("input", function(widget, text, options) {
                	handler(valueView, parseInt(text, 10));
                })
	            
	            : tabris.create("TextView", {
			    	text: value,
		    		layoutData: {centerX: 0, centerY: 0},
				});
            valueView.appendTo(compositeValueView);
		compositeValueView.appendTo(composite);
	    
	    var nextBtn = tabris.create("Button", {
	    	layoutData: {left: [compositeValueView,0], top: 0},
	        text: ">"
		}).on("select", function() {
        	handler(valueView, 1);
        }).appendTo(composite);
	
    composite.setValue = function(value) {
    	valueView.set('text', value);
    }
    
    return composite;
}

function create(battle) {
	var composite = tabris.create("Composite", {
    	//background: "white",
    	layoutData: {centerX: 0, top: config.PAGE_MARGIN},
        highlightOnTouch: true
	});

    var labelView = tabris.create("TextView", {
    	text: "Momentum",
    	layoutData: {centerX: 20, top: config.PAGE_MARGIN}
	}).appendTo(composite);
    
    var spinBritish = createSpinner('British', british, true, {top: [labelView,5]}, function(valueView, incr) {
    	british = increment(british, incr);
    	valueView.set("text", british);
	}).appendTo(composite);
    
    var spinAmerican = createSpinner('American', american, true, {top: [spinBritish,5]}, function(valueView, incr) {
    	american = increment(american, incr);
    	valueView.set("text", american);
	}).appendTo(composite);
    
    var diceView = Dice.create([
    	{num: 1, low: 0, high: 9, color: 'red'},
    	{num: 1, low: 0, high: 9, color: 'white'}
    ], {left: 50, top: [spinAmerican, 10]}, function(dice) {
    	log.debug('Roll!');
        
        resultView.set('text', 'Stuff happened!')
        
        
	}).appendTo(composite);
    
    var resultView = tabris.create("TextView", {
    	text: "",
    	layoutData: {left: [diceView, 20], top: [spinAmerican, 20]}
	}).appendTo(composite);
 
	return composite;
}


module.exports = {
	create: function(battle) {
    	log.debug('Creating Initiative for ' + battle.name);
    	return create(battle);
    }
};
