var Initiative = require('../core/initiative.js');

var phases = [
	"Initiative", 
	"1. Movement", 
	"1. Rally", 
	"1. Def Arty Fire", 
	"1. Rifle Fire", 
	"1. Close Combat", 
	"2. Movement", 
	"2. Rally", 
	"2. Def Arty Fire", 
	"2. Rifle Fire", 
	"2. Close Combat", 
	"End of Turn"
];

module.exports = {
	length: phases.length,
	all: function() {
    	return phases;
    },
    get: function(idx, nationality) {
    	if (idx > -1 && idx < phases.length) {
        	var phase = phases[idx];
            if (nationality) {
            	phase = phase.replace(/^1\./, nationality + ':');
            	phase = phase.replace(/^2\./, Initiative.noninitiative(nationality) + ':');
            }
            return phase;
        }
    }
};