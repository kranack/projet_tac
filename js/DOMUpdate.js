/*Mise à jour de l'interface utilisateur*/

var DOMUpdate = (function() {
	function DOMUpdate() {
		this.container = document.getElementById('container');
	},

	DOMUpdate.prototype.update = function(div, data) {
		var element = this.find(div);
		element.innerHTML(data);
	}

	return DOMUpdate;
})();