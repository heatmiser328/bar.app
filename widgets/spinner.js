
function create(relatives, text, handler) {
	relatives = relatives || {};
    var composite = tabris.create("Composite", {
    	layoutData: {left: (relatives.left || 0), right: [0,3], top: (relatives.top || 0)},
    	//background: "white",
        highlightOnTouch: true
    });
	    var prevBtn = tabris.create("Button", {
	    	layoutData: {left: 0, top: 0},
	        text: "<"
		}).on("select", function() {
        	handler(labelView, -1);
        }).appendTo(composite);
	    
	    var compositeLabelView = tabris.create("Composite", {
        	layoutData: {left: [prevBtn,2], right: [20,0], centerY: 0},
	    	//background: "green",
	        highlightOnTouch: true
	    });
		    var labelView = tabris.create("TextView", {
		    	text: text,
	    		layoutData: {centerX: 0, centerY: 0},
			}).appendTo(compositeLabelView);
		compositeLabelView.appendTo(composite);
	    
	    var nextBtn = tabris.create("Button", {
	    	layoutData: {left: [compositeLabelView,0], top: 0},
	        text: ">"
		}).on("select", function() {
        	handler(labelView, 1);
        }).appendTo(composite);
	
    composite.setLabel = function(text) {
    	labelView.set('text', text);
    }
    
    return composite;
}

module.exports = {
	create: function(relatives, text, handler) {
    	return create(relatives, text, handler);
    }
};
