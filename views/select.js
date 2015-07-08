var Battles = require("../core/battles.js");
var Battle = require("../views/battle.js");
var moment = require("moment");
var config = require("../config.js");
var drawer;

function createSelections() {
	drawer = tabris.create("Drawer").append(createBattlesList(Battles.all()));
}

function createBattlesList(items) {
	return tabris.create("CollectionView", {
    	layoutData: {left: 0, right: 0, top: 0, bottom: 0},
	        itemHeight: 72,
            items: items,
            initializeCell: function(cell) {
            	var imageView = tabris.create("ImageView", {
                	layoutData: {left: config.PAGE_MARGIN, centerY: 0, width: 32, height: 48},
                    scaleMode: "fit"
                    }).appendTo(cell);
				var titleTextView = tabris.create("TextView", {
                	layoutData: {left: 64, right: config.PAGE_MARGIN, top: config.PAGE_MARGIN},
                    markupEnabled: true,
                    //textColor: "#4a4a4a"
                    textColor: config.textColor
				}).appendTo(cell);
                var subtitleTextView = tabris.create("TextView", {
                	layoutData: {left: 64, right: config.PAGE_MARGIN, top: [titleTextView, 4]},
                    textColor: "#7b7b7b"
				}).appendTo(cell);
                cell.on("change:item", function(widget, battle) {
	                imageView.set("image", "images/" + battle.image);
                    titleTextView.set("text", battle.name);
                    subtitleTextView.set("text", battle.desc);
				});
			}
		}).on("select", function(target, battle) {
        	Battle.show(battle.id);
            drawer.close();
	});
}

module.exports = {
	init: function() {
    	createSelections();
    },
    show: function() {
    	drawer.open();
    }
}