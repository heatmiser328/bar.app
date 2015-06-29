var types = ['Rifle v Other','Rifle v Arty','Arty v All'];
var sps = ['1','2','3-5','6-9','10+'];
var ranges = ['Adjacent', '2-3 hexes'];
var modifiers = [
	{
    	name: 'Forest / Lt Forest',
        value: -1
    },
	{
    	name: 'Orchard',
        value: -1
    },
	{
    	name: 'Blackjack',
        value: -1
    },
	{
    	name: 'Lt Infantry',
        value: -1
    },
	{
    	name: 'Arty / Dragoons',
        value: 1
    },
	{
    	name: 'First Volley',
        value: 1
    },
	{
    	name: "Ferguson's Rifles",
        value: 1
    },
	{
    	name: 'Fieldworks',
        value: -1
    },
	{
    	name: 'Meeting House',
        value: -2
    },
	{
    	name: 'Guilford CH',
        value: -1
    },
	{
    	name: 'McCuiston PH',
        value: -1
    },
	{
    	name: 'Wantoot PH',
        value: -2
    },
	{
    	name: 'Santee River',
        value: 1
    }
];

var tohit = {
	'Adjacent': {
    	'1': 7,
        '2': 6,
        '3-5': 4,
        '6-9': 2,
        '10+': 1
    },
    '2-3 hexes': {
    	'1': 9,
        '2': 8,
        '3-5': 7,
        '6-9': 6,
        '10+': 5
    }
};

var results = {
	'Rifle v Other': [
    	{
        	low: 0,
            high: 3,
            result: 'AM'
        },
    	{
        	low: 4,
            high: 6,
            result: 'R'
        },
    	{
        	low: 7,
            high: 8,
            result: 'D'
        },
    	{
        	low: 9,
            high: 99,
            result: '1*'
        }
    ],
    'Rifle v Arty': [
    	{
        	low: 0,
            high: 3,
            result: 'R'
        },
    	{
        	low: 4,
            high: 6,
            result: 'D'
        },
    	{
        	low: 7,
            high: 8,
            result: '1'
        },
    	{
        	low: 9,
            high: 99,
            result: '1*'
        }
    ],
    'Arty v All': [
    	{
        	low: 0,
            high: 3,
            result: 'R'
        },
    	{
        	low: 4,
            high: 6,
            result: 'D'
        },
    	{
        	low: 7,
            high: 8,
            result: '1'
        },
    	{
        	low: 9,
            high: 99,
            result: '1*'
        }
    ]
};

module.exports = {
	types: types,
    sps: sps,
    ranges: ranges,
    modifiers: modifiers,
    modifier: function(name) {
    	for (var i=0;i<modifiers.length; i++) {
        	if (name == modifiers[i].name) {
            	return modifiers[i].value;
            }
        }
    	return 0;
    },
    resolve: function(hitdie, damagedie, type, sps, range, drm) {
    	if ((hitdie+drm) >= tohit[range][sps]) {
        	var rt = results[type];
            for (var i=0; i<rt.length; i++) {
            	var r = rt[i];
            	if (damagedie >= r.low && damagedie <= r.high) {
                	return r.result;
                }
            }
        }
        return 'Miss';
    }
};
