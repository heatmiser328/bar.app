var Battles = require('../core/battles.js');
var Phases = require('../core/phases.js');
var moment = require('moment');
var log = require('../core/log.js');
var KEY = 'bar.app.current';
var TURN_MINS = 60;

function load() {
	var d = localStorage.getItem(KEY);
    if (d) {
		return JSON.parse(d);
    }
}

function save(current) {
	localStorage.setItem(KEY, JSON.stringify(current));
}

function reset(battle) {
	var current = {};
    current.battle = battle.id;
    current.turn = 1;
    current.phase = 0;
    current.initiative = null;
    current.britishMorale = battle.startBritishMorale;
    current.americanMorale = battle.startAmericanMorale;
    current.frenchMorale = battle.startFrenchMorale;
    current.britishVP = 0;
    current.americanVP = 0;
    save(current);
    return current;
}

function maxTurns(current) {
	var battle = Battles.get(current.battle);
    return battle.turns;
}


module.exports = {
	get: function(battle) {
    	var current = load();
        if (!current && battle) {
        	current = reset(battle);
        }
        return current;
    },
	save: function(current) {
    	save(current);
    },
    reset: function(battle) {
        reset(battle);
    	return load();
    },
    phase: function(current) {
    	current = current || load();
        log.debug('phase: ' + current.phase);
        return Phases.get(current.phase, current.initiative);
    },
    prevPhase: function(current) {
    	current = current || load();
        if (--current.phase < 0) {
        	current.phase = Phases.length - 1;
            this.prevTurn(current);
        }
        save(current);
        return this.phase(current);
    },
    nextPhase: function(current) {
    	current = current || load();
        if (++current.phase >= Phases.length) {
        	current.phase = 0;
            this.nextTurn(current);
        }
        save(current);
        return this.phase(current);
    },
    turn: function(current) {
    	current = current || load();
    	var battle = Battles.get(current.battle);
        var dt = moment(battle.startDateTime);
        var o = (current.turn - 1) * TURN_MINS;
        dt.add(o, 'minutes');
        return dt;
    },
    prevTurn: function(current) {
    	var dosave = !current;
    	current = current || load();
		log.debug('prev turn: ' + current.turn);
        if (--current.turn < 1) {
        	current.turn = 1;
        }
        if (dosave) {
        	save(current);
        }
        return this.turn(current);
    },
    nextTurn: function(current) {
    	var dosave = !current;
    	current = current || load();
		log.debug('next turn: ' + current.turn);
        
        var maxturns = maxTurns(current);
		log.debug('max turns: ' + maxturns);        
        if (++current.turn >= maxturns) {
        	current.turn = maxturns;
        }
        if (dosave) {
        	save(current);
        }
        return this.turn(current);
    },
    initiative: function(v) {
    	var current = load();
    	if (typeof v != 'undefined') {
        	current.initiative = v;
        	save(current);
		}            
		log.debug('initiative: ' + current.initiative);
        return current.initiative;
    }
}