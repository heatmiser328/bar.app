var Current = require('../core/current.js');
var Phases = require('../core/phases.js');
var Spinner = require('../widgets/spinner.js');
var config = require('../views/config.js');
var log = require('../core/log.js');

function create(battle) {
    var composite = tabris.create("Composite", {
    	//background: "white",
        //textColor: 'white',
        highlightOnTouch: true
	});
    
    // header
    var imageView = tabris.create("ImageView", {
    	layoutData: {left: config.PAGE_MARGIN, top: config.PAGE_MARGIN/2, width: 96, height: 144},
        image: 'images/' + battle.image
	}).appendTo(composite);
    
    var nameView = tabris.create("TextView", {
    	text: battle.desc,
    	layoutData: {left: [imageView, config.PAGE_MARGIN], top: config.PAGE_MARGIN},
        background: "rgba(0, 0, 0, 0.1)"
	}).appendTo(composite);
    
    tabris.create("Action", {
    	image: "images/refresh.png"
	}).on("select", function() {
    	log.debug('Reset ' + battle.name);
    	Current.reset(battle);
    	spinTurn.setValue(Current.turn());
    	spinPhase.setValue(Current.phase());
        tabs.forEach(function(tab) {
        	if (tab.reset && typeof tab.reset == 'function') {
            	tab.reset();
            }
        });
	});
    
    // current
    var compositeTurn = tabris.create("Composite", {
    	layoutData: {left: [imageView, config.PAGE_MARGIN], top: [nameView, 10]},
    	//background: "white",
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

	return composite;
}
    
    
module.exports = {
	create: function(battle) {
    	log.debug('Creating Turn for ' + battle.name);
    	return create(battle);
    }
};
