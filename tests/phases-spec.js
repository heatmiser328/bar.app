var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sandbox = require('sandboxed-module');
chai.use(require('sinon-chai'));


describe('Phases', function() {
	var env = {};
    beforeEach(function() {
    	env = {};
        env.log = require('./mocks/log.js')();
        
		env.Phases = sandbox.require('../core/phases.js', {
        	requires: {
            	'../core/log.js': env.log
            }
        });
    });
    
	describe('default', function() {
    	describe('length', function() {
	    	describe('american', function() {
		    	beforeEach(function() {
		        	env.length = env.Phases.length('American');
		        });
	            
	            it('should have 12 entries', function() {
	            	expect(env.length).to.equal(12);
	            });
	        });
            
	    	describe('british', function() {
		    	beforeEach(function() {
		        	env.length = env.Phases.length('British');
		        });
	            
	            it('should have 12 entries', function() {
	            	expect(env.length).to.equal(12);
	            });
	        });
        });
        
    	describe('all', function() {
	    	describe('american', function() {
		    	beforeEach(function() {
		        	env.phases = env.Phases.all('American');
		        });
	            
	            it('should have 12 entries', function() {
	            	expect(env.phases.length).to.equal(12);
	            	expect(env.phases).to.deep.equal([
						"Initiative", 
						"American. Movement", 
					    "American. Rally", 
						"British. Def Arty Fire", 
					    "American. Rifle Fire", 
					    "American. Close Combat",
					    "British. Movement",
						"British. Rally", 
						"American. Def Arty Fire", 
						"British. Rifle Fire", 
						"British. Close Combat",
						"End of Turn"
					]);
	            });
	        });
            
	    	describe('british', function() {
		    	beforeEach(function() {
		        	env.phases = env.Phases.all('British');
		        });
	            
	            it('should have 12 entries', function() {
	            	expect(env.phases.length).to.equal(12);
	            	expect(env.phases).to.deep.equal([
						"Initiative", 
					    "British. Movement",
						"British. Rally", 
						"American. Def Arty Fire", 
						"British. Rifle Fire", 
						"British. Close Combat",
						"American. Movement", 
					    "American. Rally", 
						"British. Def Arty Fire", 
					    "American. Rifle Fire", 
					    "American. Close Combat",
						"End of Turn"
					]);
	            });
	        });
        });
        
    	describe('get', function() {
	    	describe('american', function() {
		    	describe('first', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(0, 'American');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('Initiative');
		            });
	    	    });
                
		    	describe('third', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(2, 'American');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('American. Rally');
		            });
	    	    });
                
		    	describe('sixth', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(5, 'American');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('American. Close Combat');
		            });
	    	    });
                
		    	describe('seventh', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(6, 'American');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('British. Movement');
		            });
	    	    });
                
		    	describe('last', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(11, 'American');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('End of Turn');
		            });
	    	    });
	        });
            
	    	describe('british', function() {
		    	describe('first', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(0, 'British');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('Initiative');
		            });
	    	    });
                
		    	describe('third', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(2, 'British');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('British. Rally');
		            });
	    	    });
                
		    	describe('sixth', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(5, 'British');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('British. Close Combat');
		            });
	    	    });
                
		    	describe('seventh', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(6, 'British');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('American. Movement');
		            });
	    	    });
                
		    	describe('last', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(11, 'British');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('End of Turn');
		            });
	    	    });
	        });
        });
    });
    
	describe('battle', function() {
    	beforeEach(function() {
	        env.battle = {
		        "phases": [
					"Initiative", 
		            {
		            	"American": [
		                	"American. Movement", 
		                    "American. Rally", 
		                    "American. Rifle Fire", 
		                    "American. Close Combat"
						],
		            	"Indian": [
		                    "Indian. Standard Movement",
							"Indian. Activation Movement", 
							"Indian. Rally", 
							"American. Def Arty Fire", 
							"Indian. Rifle Fire", 
							"Indian. Close Combat", 
							"Indian. Final Movement", 
							"Indian. End"
						]
					},                                    
					"End of Turn"
		        ]
	        };
	        
        	env.Phases.init(env.battle);
        });
    
    	describe('length', function() {
	    	describe('american', function() {
		    	beforeEach(function() {
		        	env.length = env.Phases.length('American');
		        });
	            
	            it('should have 14 entries', function() {
	            	expect(env.length).to.equal(14);
	            });
	        });
            
	    	describe('british', function() {
		    	beforeEach(function() {
		        	env.length = env.Phases.length('British');
		        });
	            
	            it('should have 14 entries', function() {
	            	expect(env.length).to.equal(14);
	            });
	        });
        });
        
    	describe('all', function() {
	    	describe('american', function() {
		    	beforeEach(function() {
		        	env.phases = env.Phases.all('American');
		        });
	            
	            it('should have 14 entries', function() {
	            	expect(env.phases.length).to.equal(14);
	            	expect(env.phases).to.deep.equal([
						"Initiative", 
	                	"American. Movement", 
	                    "American. Rally", 
	                    "American. Rifle Fire", 
	                    "American. Close Combat",
	                    "Indian. Standard Movement",
						"Indian. Activation Movement", 
						"Indian. Rally", 
						"American. Def Arty Fire", 
						"Indian. Rifle Fire", 
						"Indian. Close Combat", 
						"Indian. Final Movement", 
						"Indian. End",
						"End of Turn"
					]);
	            });
	        });
            
	    	describe('indian', function() {
		    	beforeEach(function() {
		        	env.phases = env.Phases.all('Indian');
		        });
	            
	            it('should have 14 entries', function() {
	            	expect(env.phases.length).to.equal(14);
	            	expect(env.phases).to.deep.equal([
						"Initiative", 
	                    "Indian. Standard Movement",
						"Indian. Activation Movement", 
						"Indian. Rally", 
						"American. Def Arty Fire", 
						"Indian. Rifle Fire", 
						"Indian. Close Combat", 
						"Indian. Final Movement", 
						"Indian. End",
	                	"American. Movement", 
	                    "American. Rally", 
	                    "American. Rifle Fire", 
	                    "American. Close Combat",
						"End of Turn"
					]);
	            });
	        });
        });
        
    	describe('get', function() {
	    	describe('american', function() {
		    	describe('first', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(0, 'American');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('Initiative');
		            });
	    	    });
                
		    	describe('third', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(2, 'American');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('American. Rally');
		            });
	    	    });
                
		    	describe('sixth', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(5, 'American');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('Indian. Standard Movement');
		            });
	    	    });
                
		    	describe('seventh', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(6, 'American');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('Indian. Activation Movement');
		            });
	    	    });
                
		    	describe('last', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(13, 'American');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('End of Turn');
		            });
	    	    });
	        });
            
	    	describe('indian', function() {
		    	describe('first', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(0, 'Indian');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('Initiative');
		            });
	    	    });
                
		    	describe('third', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(2, 'Indian');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('Indian. Activation Movement');
		            });
	    	    });
                
		    	describe('sixth', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(5, 'Indian');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('Indian. Rifle Fire');
		            });
	    	    });
                
		    	describe('seventh', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(6, 'Indian');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('Indian. Close Combat');
		            });
	    	    });
                
		    	describe('twelvth', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(11, 'Indian');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('American. Rifle Fire');
		            });
	    	    });
                
		    	describe('last', function() {
			    	beforeEach(function() {
			        	env.phase = env.Phases.get(13, 'Indian');
			        });
		            
		            it('should get entry', function() {
		            	expect(env.phase).to.equal('End of Turn');
		            });
	    	    });
                
	        });
        });
    });
});