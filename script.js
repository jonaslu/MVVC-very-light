/* global $ */

var kopy = (function() {
    function Observable(value) {

        var currentValue = value;
        var callbacks = [];

        this.setValue = function(newValue) {
            callbacks.forEach(function(callback) {
                callback(currentValue, newValue);
            });

            currentValue = newValue;
        }

        this.getValue = function () {
            return currentValue;
        }

        this.observe = function(callback) {
            callbacks.push(callback);
        }
    }

    function observable(value) {
        return new Observable(value);
    }

    function applyBindings(viewModel) {
        $(document).ready(function() {

            $('[data-bind]').each(function() {
                var elem=$(this);

                var boundValues = elem.data("bind");
                var modelValue = viewModel[boundValues];

                if(modelValue instanceof Observable) {
                    elem.html(modelValue.getValue());

                    modelValue.observe(function(currentValue, newValue) {
                        elem.html(newValue);
                    });
                } else {
                    elem.html(modelValue);
                }
            });
        });
    }

    return {
        observable: observable,
        applyBindings: applyBindings
    };
}());