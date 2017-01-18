/* global $ */

const kopy = (function() {
    /***
    * Array with the known bindings (e g text, css, html)
    */
    const bindings = {
        text: {
            init(element, observable) {
                if(observable instanceof Observable) {
                    element.html(observable.getValue());

                    observable.observe((currentValue, newValue) => {
                        element.html(newValue);
                    });
                } else {
                    element.html(observable);
                }
            },

            update(element, observable) {
                element.html(observable.getValue());
            }
        }
    }

    /***
    * Dependency tracking, if this is defined (if (dependency) is true) then
    * when a binding does a get on the observable, the observable is added here.
    * This is then used to register an update callback.
    */
    let dependencies;

    /***
    * Acts as a constructor, holding the value in currentValue.
    * Should do prototype stuff on setValue, getValue
    */
    function Observable(value) {
        let currentValue = value;
        const callbacks = [];

        this.setValue = newValue => {
            const oldValue = currentValue;
            currentValue = newValue;
            callbacks.forEach(callback => callback(oldValue, newValue));
        }

        this.getValue = () => {
            if (dependencies) {
                dependencies.push(this);
            }
            return currentValue;
        }

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
                    const [bindingName, observableName] = bindingAndValue.split(":");
                    const observable = viewModel[observableName];

                    const binding = bindings[bindingName].init(element, observable);

                    dependencies = [];
                    dependencies.forEach(observable => observable.observe(() => binding.update(element, observable)));
                    delete dependencies;
                });
            });
        });
    }

    return {
        observable,
        applyBindings,
    };
}());
