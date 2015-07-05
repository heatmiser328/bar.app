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
    get: function(idx) {
    	if (idx > -1 && idx < phases.length) {
        	return phases[idx];
        }
    }
};