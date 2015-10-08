/*Mise à jour de l'interface utilisateur*/
"use strict";

var DOMHandler = (function(DOMObject) {

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
	 * @param {DOMObject} obj serialize object to find
	 * @param {DOMElement} parent parent element
	 * @return {null|DOMElement}  DOMElement found in the container
	 */
	DOMHandler.prototype.find = function(obj, parent) {
		var i = 0,
			j = 0,
			referer = parent;

		if (obj === null || obj.element === null) {
			return null;
		}

		if (referer === null || referer === undefined) {
			referer = this.container;
		}

		for (i=0; i<referer.children.length; i++) {
			if (referer.children[i].localName == obj.element) {
				if (obj.isNull()) {
					return referer.children[i];
				}
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
	 * @return {DOMObject}  Serialized object containing the DOMElement data
	 */
	DOMHandler.prototype.serialize = function(string) {
		var obj = new DOMObject();

		var limiter = new RegExp("[#\.]", "g");
		var attributes = string.split(limiter);

		obj.element = attributes[0];
		if (attributes.length > 1) {
			obj.attr.name = this._attrs[string.match(limiter)[0]];
			obj.attr.value = attributes[1];
		}

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
			var elems = this.container.children;
			for (var i=0; i<elems.length; i++) {
				this.show(elems[i]);
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
			var elems = this.container.children;
			for (var i=0; i<elems.length; i++) {
				this.hide(elems[i]);
			}
		} else {
			element.style.display = "none";
		}
	}

	DOMHandler.prototype.require = function(element) {
		if (element === undefined) {
			return null;
		}
		if (element.value.trim() === "") {
			return false;
		}

		return true;
	};

	DOMHandler.prototype.getElement = function(element) {
		var object = this.serialize(element);
		object.getElement();

		return object;
	};

	DOMHandler.prototype.getRandomColor = function() {
		return '#'+'0123456789abcdef'.split('').map(function(v,i,a){
  					return i>5 ? null : a[Math.floor(Math.random()*16)] 
  				}).join('');

	}

	return DOMHandler;
})(DOMObject);

var DOMHelper = new DOMHandler();
