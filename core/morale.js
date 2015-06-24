
module.exports = {
	check: function(die, unitmorale, armymorale, leader) {
    	return (die + unitmorale + armymorale + leader >= 5);
    }
};