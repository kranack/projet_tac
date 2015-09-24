/*Mise à jour de l'interface utilisateur*/

var DOMUpdate = (function() {
	function DOMUpdate() {
		this.container = document.getElementById('container');
	};

	DOMUpdate.prototype.update = function(id, data) {
		var element = this.find(id);

		if (element !== undefined) {
			element.innerHTML(data);
		}
	};

	DOMUpdate.prototype.find = function(id) {
		return this.container.getElementById(id);
	}

	return DOMUpdate;
})();