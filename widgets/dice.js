var Dice = require('../core/dice.js');
var _ = require('lodash');


function create(dieopts, layout, handler) {
	var dice = new Dice.Dice(dieopts);
    
	var composite = tabris.create("Composite", {
    	layoutData: layout,
    	//background: "white",
        highlightOnTouch: true
	});
    
    var btnRoll = tabris.create("Button", {
    	layoutData: {left: 0, centerY: 0},
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
	        image: 'images/dice/' + die.image() + '.png'
		})
        .on('tap', function(widget, opt) {
        	die.increment();
        	die.view.set('image', 'images/dice/' + die.image() + '.png');
            handler(dice.dice());
        })
        .appendTo(composite);
        
        leftOf = die.view;
    });
    
    return composite;
}


module.exports = {
	create: function(dieopts, layout, handler) {
    	return create(dieopts, layout, handler);
    }
};
