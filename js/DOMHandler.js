/*Mise à jour de l'interface utilisateur*/
"use strict";

var DOMHandler = (function() {

	/**
	 * Function DOMHandler
	 * @constructor
	 */
	function DOMHandler() {
		this.container = document.getElementById('container');
		this._attrs = {
			"#": "id",
			".": "class"
		};
	}

	/**
	 * Function update
	 * @param {object} currentElement current element serialized to update
	 * @param {object} newElement new element serialized
	 */
	DOMHandler.prototype.update = function(currentElement, newElement) {
		var element = this.find(currentElement);

		if (element !== undefined) {
			element.innerHTML(data);
		}
	}


	/**
	 * Function : find
	 * @param {object} obj serialize object to find
	 * @param {DOMElement} parent parent element
	 * @return {null|DOMElement}  DOMElement found in the container
	 */
	DOMHandler.prototype.find = function(obj, parent) {
		var i = 0,
				j = 0,
				referer = parent;

		if (obj === null || obj.element === null || obj.attr === null) {
			return null;
		}
		if (referer === null || referer === undefined) {
			referer = this.container;
		}

		for (i=0; i<referer.children.length; i++) {
			if (referer.children[i].localName == obj.element) {
				var attr = referer.children[i].attributes;
				for (j=0; j<attr.length; j++) {
					if (attr[j].name == obj.attr.name
							&& attr[j].value == obj.attr.value) {
						return referer.children[i];
					}
				}
			}
		}

		return null;
	};

	/**
	 * Function : serialize
	 * @param {string} string string defining the DOMElement
	 * @return {object}  Serialized object containing the DOMElement data
	 */
	DOMHandler.prototype.serialize = function(string) {
		var obj = {element: "", attr: {name: "", value: ""}};

		var limiter = new RegExp("[#\.]", "g");
		var attributes = string.split(limiter);

		obj.element = attributes[0];
		obj.attr.name = this._attrs[string.match(limiter)[0]];
		obj.attr.value = attributes[1];

		return obj;
	};

	/**
	 * Function : on
	 * @param {string} action string defining the action to bind
	 * @param {element} DOMElement element to bind action
	 * @param {function} callback function to execute when the action will be triggered
	 */
	DOMHandler.prototype.on = function(action, element, callback) {
		var completeAction = "on" + action;

		if (element.completeAction === null) {
			return null;
		}

		element[completeAction] = callback;
	};

	/**
	 * Function : show
	 * @param {DOMElement} element element to show
	 */
	DOMHandler.prototype.show = function(element) {
		if (element === undefined) {
			var elems = DOMHelper.container.children;
			for (var i=0; i<elems.length; i++) {
				DOMHelper.show(elems[i]);
			}
		} else {
			element.style.display = "block";
		}
	}

	/**
	 * Function : hide
	 * @param {DOMElement} element element to hide
	 */
	DOMHandler.prototype.hide = function(element) {
		if (element === undefined) {
			var elems = DOMHelper.container.children;
			for (var i=0; i<elems.length; i++) {
				DOMHelper.hide(elems[i]);
			}
		} else {
			element.style.display = "none";
		}
	}

	return DOMHandler;
})();

var DOMHelper = new DOMHandler();
