"use strict";

var AppHandler = (function(CobraHandler, DOMHelper) {

	function AppHandler() {
		this.init();

		/* Setup application */
		this.listenConnectButton();
		this.listenBreadcrumb();
		this.listenSendButton();

		/* Setup Cobra */
		//CobraHandler.connection();
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
		this.submitEntree = DOMHelper.find(DOMHelper.serialize("button#submitEntree"), DOMHelper.find(DOMHelper.serialize("div#insertingAnEntry"), this.list));
		console.log(this.submitEntree);
	};

	AppHandler.prototype.change = function(page, args) {
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

		AppHandler.prototype.route.call(this, args);
	}

	AppHandler.prototype.route = function(args) {
		DOMHelper.hide();

		if (this.currentPage === "index") {
			DOMHelper.show(this.index);
		} else if (this.currentPage === "list") {
			DOMHelper.show(this.list);
			DOMHelper.show(this.breadcrumb);
			CobraHandler.connection(args.room);
		} else {
			return ;
		}
	};

	AppHandler.prototype.sendAnEntry = function(){
		var message = DOMHelper.find(DOMHelper.serialize("input#entree"), DOMHelper.find(DOMHelper.serialize("div#insertingAnEntry"), this.list));
		console.log(message);
		CobraHelper.sendAnEntry(message.value);
	};

	AppHandler.prototype.listenConnectButton = function() {
		var username = DOMHelper.find(DOMHelper.serialize("input#nickName_input"), DOMHelper.find(DOMHelper.serialize("p"), DOMHelper.find(DOMHelper.serialize("div#nick"), this.index)));
		var list = DOMHelper.find(DOMHelper.serialize("input#listName_input"), DOMHelper.find(DOMHelper.serialize("p"), DOMHelper.find(DOMHelper.serialize("div#search"), this.index)));

		(function(self) {
			DOMHelper.on('click', self.connectButton, function() {
				if (DOMHelper.require(username) && DOMHelper.require(list)) {
					AppHandler.prototype.change.call(self, 'list', {username: username.value, room: list.value});
				} else {
					console.log('error! REQUIRE username && list');
				}
			});
		})(this);
	};

	AppHandler.prototype.listenBreadcrumb = function() {
		(function(self) {
			DOMHelper.on('click', self.breadcrumb, function() {
				AppHandler.prototype.change.call(self, 'index');
			});
		})(this);
	};

	AppHandler.prototype.listenSendButton = function() {
		(function(self) {
			DOMHelper.on('click', self.submitEntree,function(){
				self.sendAnEntry();
			});
		})(this);
	};

	return AppHandler;
})(CobraHelper, DOMHelper);
