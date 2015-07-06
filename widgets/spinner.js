var config = require('../config.js');

function create(label, value, edit, layoutData, handler) {
	layoutData = layoutData || {left: 0, right: [0,3], top: 0};
    var composite = tabris.create("Composite", {
    	layoutData: layoutData,
        background: config.background,
        textColor: config.textColor,
        highlightOnTouch: true
    });
    	var labelView;
        if (label && typeof label == 'string') {
        	labelView = tabris.create("TextView", {
		    	text: label,
		        background: config.background,
		        textColor: config.textColor,
	    		layoutData: {left: config.PAGE_MARGIN, centerY: 0},
			}).appendTo(composite);
        }
        else if (label && label.src) {
		    labelView = tabris.create("ImageView", {
	    		layoutData: {left: config.PAGE_MARGIN, centerY: 0},
		        background: config.background,
		        textColor: config.textColor,
		        image: label.src
			}).appendTo(composite);
        }
    
	    var prevBtn = tabris.create("Button", {
	    	layoutData: {left: (labelView ? 100 : 0), width: 75, top: 0},
	        //background: config.background,
	        //textColor: config.textColor,
	        text: "<"
		}).on("select", function() {
        	handler(valueView, -1);
        }).appendTo(composite);
	    
	    var compositeValueView = tabris.create("Composite", {
        	layoutData: {left: [prevBtn,2], right: [20,0], centerY: 0},
	        background: config.background,
	        textColor: config.textColor,
	        highlightOnTouch: true
	    });
		    var valueView = edit 
	            ? tabris.create("TextInput", {
		    		layoutData: {centerX: 0, centerY: 0},
			        background: config.background,
			        textColor: config.textColor,
			    	text: value,
                    editable: true,
                    alignment: 'center',
                    keyboard: 'decimal'
				}).on("input", function(widget, text, options) {
                	handler(valueView, parseInt(text, 10));
                })
	            
	            : tabris.create("TextView", {
			    	text: value,
			        background: config.background,
			        textColor: config.textColor,
		    		layoutData: {centerX: 0, centerY: 0},
				});
            valueView.appendTo(compositeValueView);
		compositeValueView.appendTo(composite);
	    
	    var nextBtn = tabris.create("Button", {
	    	layoutData: {left: [compositeValueView,0], width: 75, top: 0},
	        //background: config.background,
	        //textColor: config.textColor,
	        text: ">"
		}).on("select", function() {
        	handler(valueView, 1);
        }).appendTo(composite);
	
    composite.setValue = function(value) {
    	valueView.set('text', value);
    }
    composite.getValue = function() {
    	var value = valueView.get('text');
        return parseInt(value, 10);
    }
    
    return composite;
}

module.exports = {
	create: function(label, value, edit, layoutData, handler) {
    	return create(label, value, edit, layoutData, handler);
    }
};
