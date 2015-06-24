var Current = require('../core/current.js');
var ArmyMorale = require('../core/armymorale.js');
var Spinner = require('../widgets/spinner.js');
var config = require('../views/config.js');
var log = require('../core/log.js');

function increment(v, i, max) {
	v += i;
    if (v < 1) {
    	v = 1;
    }
    else if (v > max) {
    	v = max;
    }
    return v;
}

function create(battle) {
	var maxMorale = ArmyMorale.maxMorale(battle.moraleLevels);
	var current = Current.get(battle);
	var composite = tabris.create("Composite", {
    	id: 'armyView',
    	//background: "white",
    	layoutData: {centerX: 0, top: config.PAGE_MARGIN},
        highlightOnTouch: true
	});

    var labelView = tabris.create("TextView", {
    	text: "Morale Levels",
    	layoutData: {centerX: 20, top: config.PAGE_MARGIN}
	}).appendTo(composite);
    
    var spinBritish = Spinner.create('British', current.britishMorale, true, {left: 0, right: [0,3], top: [labelView,5]}, function(valueView, incr) {
    	current = Current.get(battle);
    	current.britishMorale = increment(current.britishMorale, incr, maxMorale);
    	valueView.set("text", current.britishMorale);
        Current.save(current);
	}).appendTo(composite);
    
    var spinAmerican = Spinner.create('American', current.americanMorale, true, {left: 0, right: [0,3], top: [spinBritish,5]}, function(valueView, incr) {
    	current = Current.get(battle);
    	current.americanMorale = increment(current.americanMorale, incr, maxMorale);
    	valueView.set("text", current.americanMorale);
        Current.save(current);
	}).appendTo(composite);
    
    var spinFrench = Spinner.create('French', current.frenchMorale, true, {left: 0, right: [0,3], top: [spinAmerican,5]}, function(valueView, incr) {
    	current = Current.get(battle);
    	current.frenchMorale = increment(current.frenchMorale, incr, maxMorale);
    	valueView.set("text", current.frenchMorale);
        Current.save(current);
	}).appendTo(composite);
    
    composite.reset = function() {
    	current = Current.get(battle);
        spinBritish.setValue(current.britishMorale);
        spinAmerican.setValue(current.americanMorale);
        spinFrench.setValue(current.frenchMorale);
    }
    
	return composite;
}

module.exports = {
	create: function(battle) {
    	log.debug('Creating Army for ' + battle.name);
    	return create(battle);
    }
};
