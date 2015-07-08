var Current = require('../core/current.js');
var Phases = require('../core/phases.js');
var Spinner = require('../widgets/spinner.js');
var config = require('../config.js');
var log = require('../core/log.js');

function create(battle) {
    var composite = tabris.create("Composite", {
        background: config.background,
        textColor: config.textColor,
        highlightOnTouch: true
	});
    
    // header
    var imageView = tabris.create("ImageView", {
    	layoutData: {left: config.PAGE_MARGIN, top: config.PAGE_MARGIN/2, width: 96, height: 144},
        background: config.background,
        textColor: config.textColor,
        image: 'images/' + battle.image
	}).appendTo(composite);
    
    var nameView = tabris.create("TextView", {
    	text: battle.desc,
    	layoutData: {left: [imageView, config.PAGE_MARGIN], top: config.PAGE_MARGIN},
        background: config.background,
        textColor: config.textColor
        //background: "rgba(0, 0, 0, 0.1)"
	}).appendTo(composite);
    
    // current
    var compositeTurn = tabris.create("Composite", {
    	layoutData: {left: [imageView, config.PAGE_MARGIN], top: [nameView, 10]},
        background: config.background,
        textColor: config.textColor,
        highlightOnTouch: true
    });
    // date/time
    var spinTurn = Spinner.create(null, Current.turn(), false, {left: 0, right: [0,3], top: 0}, function(valueView, incr) {
		var turn = (incr > 0) ? Current.nextTurn() : Current.prevTurn();
    	valueView.set("text", turn);
	}).appendTo(compositeTurn);
    // phase
    var spinPhase = Spinner.create(null, Current.phase(), false, {left: 0, right: [0,3], top: [spinTurn,0]}, function(valueView, incr) {
		var phase = (incr > 0) ? Current.nextPhase() : Current.prevPhase();
    	valueView.set("text", phase);
        spinTurn.setValue(Current.turn());
	}).appendTo(compositeTurn);
    compositeTurn.appendTo(composite);

    composite.initiativeHandler = function() {
    	spinPhase.setValue(Current.phase())
    }
    
    composite.reset = function() {
    	spinTurn.setValue(Current.turn());
    	spinPhase.setValue(Current.phase());
    }
    
	return composite;
}
    
    
module.exports = {
	create: function(battle) {
    	log.debug('Creating Turn for ' + battle.name);
    	return create(battle);
    }
};
