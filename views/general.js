var Dice = require('../widgets/dice.js');
var config = require('../config.js');
var log = require('../core/log.js');

function create() {
    var diceView = Dice.create([
    	{num: 1, low: 0, high: 9, color: 'red'},
    	{num: 1, low: 0, high: 9, color: 'white'},
    	{num: 1, low: 0, high: 9, color: 'blue'}
    ], {left: 50, top: 2}, function(dice) {
    	log.debug('General dice roll');
	});
    return diceView;
}


module.exports = {
	create: function(battle) {
    	log.debug('Creating General for ' + battle.name);
    	return create();
    }
};
