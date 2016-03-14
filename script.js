/* global $ */

var kopy = (function() {
    function observable(value) {

        var currentValue = value;
        var callbacks = [];

        function setValue(newValue) {
            callbacks.forEach(function(callback) {
                callback.call({}, currentValue, newValue);
            })

            currentValue = newValue;
        }

        function getValue() {
            return currentValue;
        }

        function observe(callback) {
            callbacks.push(callback);
        }

        return {
            setValue: setValue,
            getValue: getValue,
            observe: observe
        }
    }

    function applyBindings(viewModel) {
        $(document).ready(function() {

            function updateValue(element, observable) {
                element.html(observable.getValue());
            }

            $('[data-bind]').each(function() {
                var elem=$(this);

                var boundValues = elem.data("bind");
                var observable = viewModel[boundValues];

                elem.html(observable.getValue());

                observable.observe(function(currentValue, newValue) {
                    elem.html(newValue);
                });
            });
        });
    }

    return {
        observable: observable,
        applyBindings: applyBindings
    };
}());