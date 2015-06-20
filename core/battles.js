var battles = require('../data/battles.json');
var _ = require('lodash');

module.exports = {
	all: function() {
    	return battles;
    },
    get: function(id) {
    	return _.find(battles, function(battle) {
        	return battle.id === id;
        });
    }
};

























	