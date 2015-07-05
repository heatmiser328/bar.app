var select = require('./views/select.js');
var Battle = require('./views/battle.js');
var Current = require('./core/current.js');
var config = require('./config.js');
var log = require('./core/log.js');

module.exports = {
	run: function() {
    	var page = tabris.create("Page", {
        	title: "Battles of the American Revolution Assistant",
            image: "images/bar.png",
            background: config.background,
            textColor: config.textColor,
            topLevel: true
		});
        tabris.create("TextView", {
        	text: "Welcome to the Battles of the American Revolution Assistant!",
        	font: "24px",
            background: config.background,
            textColor: config.textColor,
            layoutData: {left: 15, top: 20}
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
