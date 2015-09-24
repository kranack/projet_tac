var Handler = (function(CobraHandler, DOMHandler) {
	function Handler() {
		this.currentPage = "index";
		this.currentRoom = null;

		this.listenConnectButton();
	};

	Handler.prototype.change = function(page) {
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

		this.route();
	};

	Handler.prototype.route = function() {
		if (this.currentPage === "index") {
			//
		} else if (this.currentPage === "list") {
			//
		} else {
			return ;
		}
	};

	Handler.prototype.listenConnectButton = function() {

	};

	return Handler;
})(Update, DOMUpdate);