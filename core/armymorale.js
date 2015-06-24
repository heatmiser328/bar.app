function find(levels, morale) {
	for (var i = 0; i<levels.length; i++) {
    	var l = levels[i];
    	if (morale >= l.low && morale <= l.high) {
        	return l;
        }
    }
	return {};
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

	initiativeModifier: function(levels, morale) {
    	var level = find(levels, morale);
        if (level.name == 'high') {
        	return 1;
        }
        if (level.name == 'wavering') {
        	return -1;
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
        return 0;
    }
};