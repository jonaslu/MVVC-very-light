/* global $ */

const kopy = (function() {
    /***
    * Array with the known bindings (e g text, css, html)
    */
    const bindings = {
        text: {
            init: function(element, observable) {
                if(observable instanceof Observable) {
                    element.html(observable.getValue());

                    observable.observe((currentValue, newValue) => {
                        element.html(newValue);
                    });
                } else {
                    element.html(observable);
                }
            }
        }
    }

    /***
    * Acts as a constructor, holding the value in currentValue.
    * Should do prototype stuff on setValue, getValue
    */
    function Observable(value) {
        let currentValue = value;
        const callbacks = [];

        this.setValue = newValue => {
            callbacks.forEach(function(callback) {
                callback(currentValue, newValue);
            });

            currentValue = newValue;
        }

        this.getValue = () => currentValue;
        this.observe = callback => callbacks.push(callback);
    }

    /***
    * Convenience function that creates the observable (so the user doesn't have to
    * type new Observable()
    */
    function observable(value) {
        return new Observable(value);
    }

    function applyBindings(viewModel) {
        $(document).ready(function() {

            $('[data-bind]').each((index, elem) => {
                const element = $(elem);
                const boundValues = element.data("bind").replace(" ","");

                boundValues.split(",").forEach(bindingAndValue => {
                    const [binding, observableName] = bindingAndValue.split(":");

                    const observable = viewModel[observableName];
                    bindings[binding].init(element, observable);
                });
            });
        });
    }

    return {
        observable,
        applyBindings,
    };
}());
