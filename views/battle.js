var Battles = require('../core/battles.js');
var Phases = require('../core/phases.js');
var Current = require('../core/current.js');
var config = require('../views/config.js');
var Spinner = require('../widgets/spinner.js');
var Army = require('../views/army.js');
var Initiative = require('../views/initiative.js');
var Fire = require('../views/fire.js');
//var Melee = require('../views/melee.js');
var Morale = require('../views/morale.js');
var Victory = require('../views/victory.js');
var log = require('../core/log.js');

function createTab(title, image, tabcontent) {
	var tab = tabris.create("Tab", {
    	layoutData: {left: 0, right: 0, top: 0, bottom: 0},
    	title: title, // converted to upper-case on Android
        image: {src: image, scale: 2} // image only used by iOS
	});
    tabcontent = tabcontent || tabris.create("TextView", {
    	layoutData: {centerX: 0, centerY: 0},
        text: "Content of Tab " + title
	});
    tabcontent.appendTo(tab);
    tab.reset = tabcontent.reset || function() {};
    return tab;
}


function show(battle, current) {
	var tabs = [];
	var page = tabris.create("Page", {
    	title: battle.name
	});
    
    var composite = tabris.create("Composite", {
    	background: "white",
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
    	background: "white",
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
    
    composite.appendTo(page);
    
    // tabs
    var folder = tabris.create("TabFolder", {
		layoutData: {left: 0, top: [composite, 10], right: 0, bottom: 0},
	    paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
	});
    
    //tabs.push(createTab('Melee', 'images/melee.png', Melee.create(battle)).appendTo(folder));
    
    tabs.push(createTab('Initiative', 'images/dice.png', Initiative.create(battle)).appendTo(folder));
    tabs.push(createTab('Fire', 'images/fire.png', Fire.create(battle)).appendTo(folder));
    tabs.push(createTab('Melee', 'images/melee.png'));
    tabs.push(createTab('Morale', 'images/morale.png', Morale.create(battle)).appendTo(folder));
    tabs.push(createTab('Army', 'images/army.png', Army.create(battle)).appendTo(folder));
    tabs.push(createTab('Victory', 'images/victory.png', Victory.create(battle)).appendTo(folder));
    folder.appendTo(page);
    
    page.open();
}    


module.exports = {
	show: function(id) {
    	var battle = Battles.get(id);
    	log.debug('Showing ' + battle.name);
        var current = Current.get(battle);
    	show(battle, current);
    }
};