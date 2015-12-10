Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;
        }
    }
    return size;
};

var Model = (function() {
    function Model(attributes) {
        for (var i in attributes) {
            this[i] = attributes[i];
        }

        if (this.initialize !== undefined) {
            this.initialize();
        }
    };

    Model.prototype.get = function(attr) {
        return (this[attr] === undefined) ? null : this[attr];
    };

    Model.prototype.set = function(attr, value) {
        this[attr] = value;
    };

    return Model;
})();