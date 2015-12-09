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
	};

	/**
	 * Function update
	 * @param {object} currentElement current element serialized to update
	 * @param {object} newElement new element serialized
	 */
	DOMHandler.prototype.update = function(currentElement, newElement) {
		var element = this.find(currentElement);
		var newElem = this.find(newElement);

		if (element !== undefined) {
			element.innerHTML(newElem.innerHTML);
		}
	};


	/**
	 * Function : find
	 * @param {DOMObject} obj serialize object to find
	 * @param {DOMElement} parent parent element
	 * @return {null|DOMElement}  DOMElement found in the container
	 */
	DOMHandler.prototype.find = function(obj, parent) {
		var referer = parent;

		if (obj === null || obj.element === null) {
			return null;
		}

		if (referer === null || referer === undefined) {
			referer = this.container;
		}

		return this.checkAttributes(referer, obj);
	};

	DOMHandler.prototype.checkAttributes = function(attribute1, attribute2) {
		var i, j;

		for (i=0; i<attribute1.children.length; i++) {
			if (attribute1.children[i].localName === attribute2.element) {
				if (attribute2.isNull()) {
					return attribute1.children[i];
				}
				var attr = attribute1.children[i].attributes;
				for (j=0; j<attr.length; j++) {
					if (attr[j].name === attribute2.attr.name
						&& attr[j].value === attribute2.attr.value) {
						return attribute1.children[i];
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
	};

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
	};

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
			return i>5 ? null : a[Math.floor(Math.random()*16)];
		}).join('');
	};

	return DOMHandler;
})(DOMObject);

var DOMHelper = new DOMHandler();
