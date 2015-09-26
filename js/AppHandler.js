"use strict";

var AppHandler = (function(CobraHandler, DOMHelper) {
	
	function AppHandler() {
		this.currentPage = "index";
		this.currentRoom = null;

		this.listenConnectButton();
	}

	AppHandler.prototype.change = function(page) {
		switch(page) {
			case 'list':
					// Go to list
					this.currentPage = "list";
				break;
			case 'index':
			default:
					// Return to index
					this.currentPage = "index";
				break;
		}

		AppHandler.prototype.route.call(this);
	}

	AppHandler.prototype.route = function() {
		if (this.currentPage === "index") {
			//
			console.log('goto index page');
		} else if (this.currentPage === "list") {
			//
			console.log('goto list page');
		} else {
			return ;
		}
	}

	AppHandler.prototype.listenConnectButton = function() {
		var element = DOMHelper.find(DOMHelper.serialize("button#connectButton"));

		(function(self) {
			DOMHelper.on('click', element, function() {
				AppHandler.prototype.change.call(self, 'list');
			});
		})(this);
	};

	return AppHandler;
})(CobraHandler, DOMHelper);
