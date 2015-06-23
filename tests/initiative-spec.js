var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sandbox = require('sandboxed-module');
chai.use(require('sinon-chai'));

describe('Initiative', function() {
	var env = {};
    beforeEach(function() {
    	env = {};
        env.log = require('./mocks/log.js')();
        
        env.current = {
        	britishMorale: 14,
            americanMorale: 14,
            frenchMorale: 14
        };
        env.Current = {
        	get: sinon.stub().returns(env.current)
        };
        env.battle = {
        	moraleLevels: [
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
	        ]
        };
        
        try {
		env.Initiative = sandbox.require('../core/initiative.js', {
        	requires: {
            	'../core/current.js': env.Current,
            	'../core/log.js': env.log
            }
        });
        } catch(e) {
        	console.error(e);
            throw e;
        }
        
    });
    
	describe('calc', function() {
    	describe('both high morale, brit momentum', function() {
	    	beforeEach(function() {
	        	env.init = env.Initiative.calc(env.battle, 2, 1, 3, 0);
	        });
            it('should retrieve current', function() {
            	expect(env.Current.get).to.have.been.calledOnce;
            });
            
            it('should give brit initiaative', function() {
            	expect(env.init).to.equal('British');
            });
		});
    });
});
