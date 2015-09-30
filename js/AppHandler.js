"use strict";

var AppHandler = (function(CobraHandler, DOMHelper) {

	function AppHandler() {
		this.init();

		/* Setup application */
		this.listenConnectButton();
		this.listenBreadcrumb();

		/* Setup Cobra */
		CobraHandler.connection();
		//CobraHandler.joinRoom('test');
	};

	AppHandler.prototype.init = function() {
		/* Init vars */
		this.currentPage = "index";
		this.currentRoom = null;
		this.user = null;
		this.room = null;
		/* Init DOM */
		this.breadcrumb = DOMHelper.find(DOMHelper.serialize('div#breadcrumb'));
		this.index = DOMHelper.find(DOMHelper.serialize('div#index'));
		this.list = DOMHelper.find(DOMHelper.serialize('div#list'));
		this.connectButton = DOMHelper.find(DOMHelper.serialize("button#connectButton"), this.index);
	};

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
		DOMHelper.hide();

		if (this.currentPage === "index") {
			DOMHelper.show(this.index);
		} else if (this.currentPage === "list") {
			DOMHelper.show(this.list);
			DOMHelper.show(this.breadcrumb);
		} else {
			return ;
		}
	}

	AppHandler.prototype.listenConnectButton = function() {
		(function(self) {
			DOMHelper.on('click', self.connectButton, function() {
				AppHandler.prototype.change.call(self, 'list');
			});
		})(this);
	};

	AppHandler.prototype.listenBreadcrumb = function() {
		(function(self) {
			DOMHelper.on('click', self.breadcrumb, function() {
				AppHandler.prototype.change.call(self, 'index');
			});
		})(this);
	}

	return AppHandler;
})(CobraHelper, DOMHelper);