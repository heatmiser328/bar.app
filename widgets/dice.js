var Dice = require('../core/dice.js');
var config = require('../config.js');
var _ = require('lodash');


function create(dieopts, layout, handler) {
	var dice = new Dice.Dice(dieopts);
    
	var composite = tabris.create("Composite", {
    	layoutData: layout,
        background: config.background,
        textColor: config.textColor,
        highlightOnTouch: true
	});
	    var btnRoll = tabris.create("Button", {
	    	layoutData: {left: 0, centerY: 0},
	        //background: config.background,
	        //textColor: config.textColor,
	    	text: "Roll",
	        image: 'images/dice/droll.png'
		}).on("select", function() {
	    	dice.roll();
	        // update the dice images
	        dice.each(function(die, i) {
	        	die.view.set('image', 'images/dice/' + die.image() + '.png');
	        });
	    	handler(dice.dice());
	    }).appendTo(composite);
	    
	    var leftOf = btnRoll;
	    dice.each(function(die, i) {
	    	die.view = tabris.create("ImageView", {
		    	layoutData: {left: [leftOf, 5], top: 2, width: 40, height: 56},
		        background: config.background,
		        textColor: config.textColor,
		        image: 'images/dice/' + die.image() + '.png'
			})
	        .on('tap', function(widget, opt) {
	        	die.increment(true);
	        	die.view.set('image', 'images/dice/' + die.image() + '.png');
	            handler(dice.dice());
	        })
	        .appendTo(composite);
	        
	        leftOf = die.view;
	    });
    
    composite.dice = function() {
    	return dice.dice();
    }
    
    return composite;
}


module.exports = {
	create: function(dieopts, layout, handler) {
    	return create(dieopts, layout, handler);
    }
};
