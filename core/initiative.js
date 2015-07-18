var ArmyMorale = require('../core/armymorale.js');
var log = require('../core/log.js');

module.exports = {
	nationalities: function(battle) {
    	var l = (battle.nationalities || ['British', 'American']).concat(['Tie: Re-roll']);
        log.debug('Nationalities ' + l);
        return l;
    },
	calc: function(battle, current, britdie, britmomentum, amerdie, amermomentum) {
    	var nationalities = this.nationalities(battle);
        var britInitMod = ArmyMorale.initiativeModifier(battle.moraleLevels, current.britishMorale);
        var amerInitMod = ArmyMorale.initiativeModifier(battle.moraleLevels, current.americanMorale);
        
        var britdrm = britInitMod + (2 * britmomentum);
        var amerdrm = amerInitMod + (2 * amermomentum);
		var result = (britdie + britdrm)  - (amerdie + amerdrm);
        
		// initiative
		if (result > 0) {
        	return nationalities[0];
		}            
		else if (result < 0) {
        	return nationalities[1];
        }
        return nationalities[2];
    }
};