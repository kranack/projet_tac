var Handler = (function() {
	function Handler() {
		this.currentPage = "index";
	}

	Handler.prototype.change = function(page) {

		switch(page) {
			case 'list':
					// Go to list
					this.currentPage = "list";
				break;
			case 'index':
			case default:
					// Return to index
					this.currentPage = "index";
				break;
		}

		this.route();
	}

	Handler.prototype.route = function() {
		if (this.currentPage === "index") {
			
		} else if (this.currentPage === "list") {

		} else {
			return ;
		}
	}

	return Handler;
})();