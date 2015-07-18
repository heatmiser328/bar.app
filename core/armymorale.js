var config = require('../config.js');
var log = require('../core/log.js');

function find(levels, morale) {
	for (var i = 0; i<levels.length; i++) {
    	var l = levels[i];
    	if (morale >= l.low && morale <= l.high) {
        	return l;
        }
    }
	return {name: 'demoralized'};
}

module.exports = {
	maxMorale: function(levels) {
		for (var i = 0; i<levels.length; i++) {
	    	var l = levels[i];
	    	if (l.name == 'high') {
	        	return l.high;
	        }
	    }
		return 1;
    },
    
    status: function(levels, morale) {
    	var level = find(levels, morale);
        log.debug('Status: ' + level.name);
        if (level.name == 'high' || !level.name) {
        	log.debug('Status: normal color');
        	return {level: level.name, text: config.textColor, background: config.background};
        }
        if (level.name == 'wavering') {
        	log.debug('Status: yellow color');
        	return {level: level.name, text: 'black', background: 'yellow'};
        }
        if (level.name == 'fatigued') {
        	log.debug('Status: orange color');
        	return {level: level.name, text: 'black', background: '#FFA500'};//'orange'};
        }
        	log.debug('Status: red color');
        return {level: 'demoralized', text: 'white', background: 'red'};
    },

	initiativeModifier: function(levels, morale) {
    	var level = find(levels, morale);
        if (level.name == 'high') {
        	return 1;
        }
        if (level.name == 'wavering') {
        	return -1;
        }
        if (level.name == 'demoralized') {
        	return -2;
        }
        return 0;
    },
	moraleModifier: function(levels, morale) {
    	var level = find(levels, morale);
        if (level.name == 'fatigued') {
        	return -1;
        }
        if (level.name == 'wavering') {
        	return -2;
        }
        if (level.name == 'demoralized') {
        	return -3;
        }
        return 0;
    }
};