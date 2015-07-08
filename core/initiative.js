var Current = require('../core/current.js');
var ArmyMorale = require('../core/armymorale.js');
var log = require('../core/log.js');

module.exports = {
	nationalities: function(battle) {
    	return ['British', 'American'];
    },
    noninitiative: function(nationality) {
    	if (nationality == 'British') {
	    	return 'American';
        }
    	return 'British';
    },
	calc: function(battle, britdie, britmomentum, amerdie, amermomentum) {
    	var current = Current.get(battle);
        var britInitMod = ArmyMorale.initiativeModifier(battle.moraleLevels, current.britishMorale);
        var amerInitMod = ArmyMorale.initiativeModifier(battle.moraleLevels, current.americanMorale);
        
        var britdrm = britInitMod + (2 * britmomentum);
        var amerdrm = amerInitMod + (2 * amermomentum);
		var result = (britdie + britdrm)  - (amerdie + amerdrm);
        
		// initiative
		if (result > 0) {
        	return "British";
		}            
		else if (result < 0) {
        	return "American";
        }
        return "Tie: Re-roll";
    }
};