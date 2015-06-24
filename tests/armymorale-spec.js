var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sandbox = require('sandboxed-module');
chai.use(require('sinon-chai'));

describe('Army Morale', function() {
	var env = {};
    beforeEach(function() {
    	env = {};
        env.log = require('./mocks/log.js')();
        
        env.moraleLevels = [
            {
            	name: "high",
                high: 15,
            	low: 11
            },
            {
            	name: "fatigued",
                high: 10,
            	low: 5
            },
            {
            	name: "wavering",
                high: 4,
            	low: 1
            }
        ];
        
		env.ArmyMorale = sandbox.require('../core/armymorale.js', {
        	requires: {
            	'../core/log.js': env.log
            }
        });
    });
    
	describe('maxMorale', function() {
    	beforeEach(function() {
        	env.max = env.ArmyMorale.maxMorale(env.moraleLevels);
        });
        it('should retrieve max morale', function() {
        	expect(env.max).to.equal(15);
        });
    });
    
	describe('initiativeModifier', function() {
    	describe('high morale', function() {
	    	beforeEach(function() {
	        	env.max = env.ArmyMorale.initiativeModifier(env.moraleLevels, 12);
	        });
	        it('should retrieve modifier', function() {
	        	expect(env.max).to.equal(1);
	        });
        });
        
    	describe('fatigued morale', function() {
	    	beforeEach(function() {
	        	env.max = env.ArmyMorale.initiativeModifier(env.moraleLevels, 9);
	        });
	        it('should retrieve modifier', function() {
	        	expect(env.max).to.equal(0);
	        });
        });
        
    	describe('wavering morale', function() {
	    	beforeEach(function() {
	        	env.max = env.ArmyMorale.initiativeModifier(env.moraleLevels, 4);
	        });
	        it('should retrieve modifier', function() {
	        	expect(env.max).to.equal(-1);
	        });
        });
    });
    
	describe('moraleModifier', function() {
    	describe('high morale', function() {
	    	beforeEach(function() {
	        	env.max = env.ArmyMorale.moraleModifier(env.moraleLevels, 12);
	        });
	        it('should retrieve modifier', function() {
	        	expect(env.max).to.equal(0);
	        });
        });
        
    	describe('fatigued morale', function() {
	    	beforeEach(function() {
	        	env.max = env.ArmyMorale.moraleModifier(env.moraleLevels, 9);
	        });
	        it('should retrieve modifier', function() {
	        	expect(env.max).to.equal(-1);
	        });
        });
        
    	describe('wavering morale', function() {
	    	beforeEach(function() {
	        	env.max = env.ArmyMorale.moraleModifier(env.moraleLevels, 4);
	        });
	        it('should retrieve modifier', function() {
	        	expect(env.max).to.equal(-2);
	        });
        });
    });
    
});
