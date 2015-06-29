var odds = ['1-3','1-2','1-1','3-2','2-1','3-1','4-1'];
var nationalities = ['British', 'American', 'French'];
var attackmodifiers = [
	{
    	name: 'Defender Rifle',
        value: 1
    },
	{
    	name: 'Defender Disrupted/Shattered',
        value: 1
    },
	{
    	name: 'Dragoon vs Disrupted/Shattered',
        value: 1
    },
	{
    	name: 'Defenders all Amer Militia/Brit Aux',
        value: 1
    },
	{
    	name: 'Defender Surrounded',
        value: 1
    },
	{
    	name: "Defender Nelson's Ferry",
        value: 1
    }
];
var defendmodifiers = [
	{
    	name: 'Attacker Rifle',
        value: -1
    },
	{
    	name: 'Attackers All Amer Militia',
        value: -1
    },
	{
    	name: 'Up Slope, Run',
        value: -1
    },
	{
    	name: 'Ravine',
        value: -2
    },
	{
    	name: 'Fieldworks',
        value: -1
    },
	{
    	name: 'Blackjack Oak',
        value: -2
    },
	{
    	name: 'Attackers any non-ford Brandywine Creek',
        value: -1
    },
	{
    	name: 'Attackers all non-ford Brandywine Creek',
        value: -1
    },
	{
    	name: 'Meeting House',
        value: -1
    },
	{
    	name: 'Guilford CH, McCuiston PH, Wantoot PH',
        value: -1
    },
	{
    	name: 'Town',
        value: -1
    },
	{
    	name: 'Swamp Fox in swamp',
        value: -1
    },
	{
    	name: 'Attacker Surrounded',
        value: -1
    }
];

var results = {
	'1-3': ['2/- (D Momentum)','AC/- (D Momentum)','1*/-','1/-','1/-','D/-','D/-','R/-','PIN','R/R','-/R','-/R','-/D (A Momentum)','-/D (A Momentum)'],
    '1-2': ['AC/- (D Momentum)','1*/- (D Momentum)','1/-','D/-','D/-','D/-','R/-','PIN','R/R','-/R','-/R','-/D','-/D (A Momentum)','-/1* (A Momentum)'],
    '1-1': ['AC/- (D Momentum)','1*/- (D Momentum)','1/-','D/-','D/-','R/-','R/-','PIN','R/R','-/R','-/D','-/D','-/1 (A Momentum)','-/1* (A Momentum)'],
    '3-2': ['AC/- (D Momentum)','1*/- (D Momentum)','1/-','D/-','D/-','R/-','PIN','R/R','-/R','-/D','-/D','-/1','-/1* (A Momentum)','-/DC (A Momentum)'],
    '2-1': ['AC/- (D Momentum)','1*/- (D Momentum)','1/-','D/-','R/-','PIN','R/R','-/R','-/R','-/D','-/D','-/1','-/1* (A Momentum)','-/AC (A Momentum)'],
    '3-1': ['1*/- (D Momentum)','D/- (D Momentum)','D/-','R/-','R/-','PIN','R/R','-/R','-/D','-/D','-/1','-/1*','-/DC (A Momentum)','-/AC (A Momentum)'],
    '4-1': ['D/- (D Momentum)','D/- (D Momentum)','R/-','R/-','PIN','R/R','-/R','-/D','-/D','-/1','-/1*','-/DC','-/AC (A Momentum)','-/2 (A Momentum)']
};

function tacticalDrm(tacticaldie, attacktacticaldrm, defendtacticaldrm) {
	var adrm = attacktacticaldrm ?  1 : 0;
	var ddrm = defendtacticaldrm ? -1 : 0;
	
	var d = tacticaldie + adrm + ddrm;
	if (d < 1) {return -2;}
	if (d < 3) {return -1;}
	if (d < 7) {return 0;}
	if (d < 9) {return 1;}
	return 2;
}


module.exports = {
	odds: odds,
    nationalities: nationalities,
    attackmodifiers: attackmodifiers,
    defendmodifiers: defendmodifiers,
    resolve: function(combatdie, tacticaldie, odds, 
    					attackmorale, attackarmymorale, attackleader, attacktacticaldrm, attackdiversion, attackdrm, 
                        defendmorale, defendarmymorale, defendleader, defendtacticaldrm, defenddrm) {
		var index = combatdie 
					+ tacticalDrm(tacticaldie, attacktacticaldrm, defendtacticaldrm) 
					+ attackmorale + attackleader + attackdrm
					+ (attackdiversion ? -1 : 0)
					- defendmorale - defendleader + defenddrm;
		var rt = results[odds];
					
		index += 2; // index-ize the die roll
		if (index < 0) index = 0;
		else if (index > rt.length-1) index = rt.length - 1;
		
        return rt[index];
	}
};