var Spinner = require('../widgets/spinner.js');
var Dice = require('../widgets/dice.js');
var Melee = require('../core/melee.js');
var increment = require('../core/increment.js');
var config = require('../config.js');
var _ = require('lodash');
var log = require('../core/log.js');

var odds = Melee.odds[2];
var attack = {
	nationality: Melee.nationalities[0],
    morale: 0,
    leader: 0,
    tacticalldr: false,
    modifier: 0
};
var defend = {
	nationality: Melee.nationalities[1],
    morale: 0,
    leader: 0,
    tacticalldr: false,
    modifier: 0
};


function create(battle) {
    function updateResults(dice) {
    	dice = dice || diceView.dice();
    	var result = Melee.resolve(dice[0].value, dice[1].value, odds,
        							attack.morale, attack.nationality, attack.leader, attack.tacticalldr, attack.modifier,
        							defend.morale, defend.nationality, defend.leader, defend.tacticalldr, defend.modifier);
        log.debug(result);
        textResult.set('text', result);
    }
    
    attack.modifiers = [{name: 'Tactical Leader', value: 0}, {name: 'Diversion', value: 0}].concat(battle.modifiers.melee.attack);
    defend.modifiers = [{name: 'Tactical Leader', value: 0}].concat(battle.modifiers.melee.defend);
    
	var composite = tabris.create("Composite", {
    	layoutData: {left: 0, top: 10, right: 0},
        highlightOnTouch: true
	});

    var diceView = Dice.create([
    	{num: 1, low: 0, high: 9, color: 'red'},
    	{num: 1, low: 0, high: 9, color: 'white'}
    ], {left: 50, top: 2}, function(dice) {
    	log.debug('Melee!');
        updateResults(dice);
	}).appendTo(composite);
    /*var labelResult = tabris.create("TextView", {
    	text: "Result",
    	layoutData: {left: 5, top: [diceView, 25]}
	}).appendTo(composite);*/
	    var textResult = tabris.create("TextView", {
	    	text: "",
	    	layoutData: {left: [diceView, 20], top: 15},
	        alignment: 'center',
	        font: 'bold 24px'
		}).appendTo(composite);
    
    var labelOdds = tabris.create("TextView", {
    	text: "Odds",
        font: 'bold 24px',
    	layoutData: {left: '40%', top: [diceView,10]}
	}).appendTo(composite);
	    var comboOdds = tabris.create("Picker", {
	    	layoutData: {left: [labelOdds, 5], top: [diceView,14], right: '15%'},
	        font: '20px',
	        items: Melee.odds,
	        selection: odds
		}).on("change:selection", function(picker, item) {
	    	odds = item;
            log.debug('Odds Selected ' + odds);
            updateResults();
		}).appendTo(composite);    
    
    var detailAttack = createDetail(battle, 'Attack', {left: 0, top: [labelOdds,10], right: '51%', bottom: 0}, attack, updateResults).appendTo(composite);
	var compositeDivider = tabris.create("Composite", {
    	layoutData: {left: [detailAttack,0], top: [labelOdds,10], width: 2, bottom: 0},
        background: config.dividerColor
	}).appendTo(composite);
    createDetail(battle, 'Defend', {left: [compositeDivider,0], top: [labelOdds,10], right: 0, bottom: 0}, defend, updateResults).appendTo(composite);
    
	return composite;
}

function createDetail(battle, label, layout, model, updateResults) {
	var compositeDetail = tabris.create("Composite", {
    	layoutData: layout,
        highlightOnTouch: true
	});
	    var labelDetail = tabris.create("TextView", {
	    	text: label,
	    	layoutData: {centerX: 0, top: 0},
	        font: 'bold 20px'
		}).appendTo(compositeDetail);
    
    	function select(nationality) {
        	radioBritish.set('selection', nationality == 'British');
            radioAmerican.set('selection', nationality == 'American');
            if (radioFrench) {
            	radioFrench.set('selection', nationality == 'French');
			}                
        }
    
        var radioBritish = tabris.create("RadioButton", {
        	layoutData: {left: 2, top: [labelDetail, 10]},
            //text: 'British',
            selection: true
		}).on("change:selection", function(widget, selection) {
        	if (selection) {
            	model.nationality = 'British';
                updateResults();
			}
		}).appendTo(compositeDetail);
		    var imageBritish = tabris.create("ImageView", {
		    	layoutData: {left: [radioBritish, 5], top: [labelDetail, 10]},
		        image: 'images/british-flag-sm.png'
			}).on('tap', function(widget, opt) {
            	select('British');
			}).appendTo(compositeDetail);
        	
    
        var radioAmerican = tabris.create("RadioButton", {
        	layoutData: {left: [imageBritish, 5], top: [labelDetail, 10]}
            //,text: 'American'
		}).on("change:selection", function(widget, selection) {
        	if (selection) {
            	model.nationality = 'American';
                updateResults();
			}
		}).appendTo(compositeDetail);
		    var imageAmerican = tabris.create("ImageView", {
		    	layoutData: {left: [radioAmerican, 5], top: [labelDetail, 10]},
		        image: 'images/american-flag-sm.png'
			}).on('tap', function(widget, opt) {
            	select('American');
			}).appendTo(compositeDetail);
    
        var radioFrench;
    	if (battle.hasOwnProperty('startFrenchMorale')) {
	        radioFrench = tabris.create("RadioButton", {
	        	layoutData: {left: [imageAmerican, 5], top: [labelDetail, 10]}
	            //,text: 'French'
			}).on("change:selection", function(widget, selection) {
	        	if (selection) {
	            	model.nationality = 'French';
	                updateResults();
				}
			}).appendTo(compositeDetail);
			    tabris.create("ImageView", {
			    	layoutData: {left: [radioFrench, 5], top: [labelDetail, 10]},
			        image: 'images/french-flag-sm.png'
				}).on('tap', function(widget, opt) {
	            	select('French');
				}).appendTo(compositeDetail);
		}                
        
        
                    
	    var spinDetailMorale = Spinner.create('Morale', model.morale, true, {left: 0, right: [0,3], top: [imageBritish,10]}, function(valueView, incr) {
	    	model.morale = increment(model.morale, incr, -5, 5);
	    	valueView.set("text", model.morale);
		}).appendTo(compositeDetail);
             
	    var spinDetailLeader = Spinner.create('Leader', model.leader, true, {left: 0, right: [0,3], top: [spinDetailMorale,5]}, function(valueView, incr) {
	    	model.leader = increment(model.leader, incr, -5, 5);
	    	valueView.set("text", model.leader);
		}).appendTo(compositeDetail);
        
        var scrollDetailModifiers = tabris.create("ScrollView", {
        	direction: 'vertical',
        	layoutData: {left: 0, top: [spinDetailLeader, 5], right: 0, bottom: 0}
		});
        	var btn;
        	_.each(model.modifiers, function(modifier, i) {
                btn = tabris.create("CheckBox", {
                	layoutData: {left: 25, height: 55, top: i == 0 ? 0 : [btn,0], right: 0},
                    text: modifier.name,
                    selection: false
				}).on("change:selection", function(button, selection) {
                	log.debug(label + ' Modifier ' + modifier.name + (selection ? '' : ' not') + ' selected');
                    if (modifier.name == 'Tactical Leader') {
                    	model.tacticalldr = (selection) ? true : false;
                        log.debug(label + ' Tactical Leader ' + model.tacticalldr);
                    }
                    else {
                    	model.modifier += (selection ? 1 : -1) * modifier.value;
                    }
                	log.debug(label + ' Modifier ' + model.modifier);
                    updateResults();
				}).appendTo(scrollDetailModifiers);
            });
		scrollDetailModifiers.appendTo(compositeDetail);
        
	return compositeDetail;
}


module.exports = {
	create: function(battle) {
    	log.debug('Creating Melee for ' + battle.name);
    	return create(battle);
    }
};
