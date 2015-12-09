"use strict";

var AppHandler = (function(CobraHandler, DOMHelper) {

	function AppHandler() {
		this.init();

		/* Setup application */
		this.listenConnectButton();
		this.listenBreadcrumb();
		this.listenSendButton();
        this.listenListeCourse();

		/* Setup Cobra */
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
        this.lists = DOMHelper.find(DOMHelper.serialize('div#lists'));

		this.connectButton = DOMHelper.find(DOMHelper.serialize("button#connectButton"), this.index);
		this.submitEntree = DOMHelper.find(DOMHelper.serialize("button#submitEntree"), DOMHelper.find(DOMHelper.serialize("div#insertingAnEntry"), this.list));
        this.listLink = DOMHelper.find(DOMHelper.serialize("a"), DOMHelper.find(DOMHelper.serialize("div#linkListCourses"), this.index));
	};

	AppHandler.prototype.change = function(page, args) {
		switch(page) {
			case 'list':
					// Go to list
					this.currentPage = "list";
				break;
            case 'lists':
                    // Go to lists
                    this.currentPage = "lists";
                break;
			case 'index':
			default:
					// Return to index
					this.currentPage = "index";
				break;
		}

		AppHandler.prototype.route.call(this, args);
	};

	AppHandler.prototype.route = function(args) {
		DOMHelper.hide();

		if (this.currentPage === "index") {
			DOMHelper.show(this.index);
		} else if (this.currentPage === "list") {
			DOMHelper.show(this.list);
			DOMHelper.show(this.breadcrumb);

			this.user = args.username;
			CobraHandler.connection(this.user, args.room);
		} else if (this.currentPage === "lists") {
            DOMHelper.show(this.lists);
            DOMHelper.show(this.breadcrumb);

            CobraHandler.getLists();
        } else {
			return ;
		}
	};

	AppHandler.prototype.sendAnEntry = function(message){
		CobraHelper.sendAnEntry(message);
	};

    AppHandler.prototype.listenListeCourse = function() {
        (function(self) {
            DOMHelper.on('click', self.listLink, function() {
                AppHandler.prototype.change.call(self, 'lists');
            });
        })(this);
    };

	AppHandler.prototype.listenConnectButton = function() {
		var username = DOMHelper.find(DOMHelper.serialize("input#nickName_input"), DOMHelper.find(DOMHelper.serialize("p"), DOMHelper.find(DOMHelper.serialize("div#nick"), this.index)));
		var list = DOMHelper.find(DOMHelper.serialize("input#listName_input"), DOMHelper.find(DOMHelper.serialize("p"), DOMHelper.find(DOMHelper.serialize("div#search"), this.index)));

		(function(self) {
			// J'écoute le clique sur le bouton de connection
			DOMHelper.on('click', self.connectButton, function() {
				AppHandler.prototype.connectionHandler.call(self, username, list);
			});
			// J'écoute la touche entrée
            DOMHelper.on('keyup', username, function(event) {
                if (event.keyCode === 13) {
                    AppHandler.prototype.connectionHandler.call(self, username, list);
                }
            });
            DOMHelper.on('keyup', list, function(event) {
                if (event.keyCode === 13) {
                    AppHandler.prototype.connectionHandler.call(self, username, list);
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
        var message = DOMHelper.find(DOMHelper.serialize("input#entree"), DOMHelper.find(DOMHelper.serialize("div#insertingAnEntry"), this.list));
		(function(self) {
			DOMHelper.on('click', self.submitEntree,function(){
				self.sendAnEntry(message.value);
                message.value = "";
			});
            DOMHelper.on('keyup', message, function(event) {
                if (event.keyCode === 13) {
                    self.sendAnEntry(message.value);
                    message.value = "";
                }
            });
		})(this);
	};

	AppHandler.prototype.connectionHandler = function(username, list) {
		DOMHelper.hide(DOMHelper.find(DOMHelper.serialize("div#connectError"), this.index));
		if (DOMHelper.require(username) && DOMHelper.require(list)) {
			this.change('list', {username: username.value, room: list.value});
		} else {
			DOMHelper.show(DOMHelper.find(DOMHelper.serialize("div#connectError"), this.index));
		}
	};

	return AppHandler;
})(CobraHelper, DOMHelper);
