var select = require('../views/select.js');
var Battle = require('../views/battle.js');
var Current = require('../core/current.js');
var config = require('../config.js');
var log = require('../core/log.js');

module.exports = {
	run: function() {
    	var page = tabris.create("Page", {
        	title: "Battles of the American Revolution Assistant",
            image: "images/bar.png",
            topLevel: true
		});
        var labelHeader = tabris.create("TextView", {
        	text: "Welcome! Please select a battle to get started.",
        	font: "24px",
            layoutData: {left: 15, top: 20}
		}).appendTo(page);
        
        tabris.create("ImageView", {
        	layoutData: {left: 0, right: 0, top: [labelHeader,0], bottom: 0},
            image: 'images/fifeanddrum.jpg',
            scaleMode: "fit"
		}).appendTo(page);
        
		select.init();
        page.open();
        
        var current = Current.get();
        if (current != null) {
        	log.debug('Loading current ' + current.battle);
        	Battle.show(current.battle);
        }
    }
};
