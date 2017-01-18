# MVVC-very-light
Test run of how I think knockout.js does it.

# data-bind="" attribute
Scans the html for a data-bind="" attribute. If found, get the element
and parse the text inside the data-bind="" value (and white-wash it
for whitespace).

Split the text on : looking for the binding on the left
side and the observable/primitive value on the right.

Find the binding and call init() on it...

# Bindings
Are added in an object with bindings at the top of the file.
This array (which could be exposed outwards) connects a
data-bind="text: " <= that directive to an object with that
name on the bindings object.

The bindings has two (one obligatory - init, and one semi-obligatory
update (if the init contains any observables)) which has
an element and the bound observable
(data-bind="text: observable" <= that value) as the callback.

# Dependency tracking
Done via having a dependencies array, so when the init()
function of a binding runs - that array (which is only defined
when the bindings are applied the first time) is populated
if a value is get during the init() run.

Then, if any observables are pushed to that array a callback
calling the update() function of that binding is set up.

[script.js](../blob/master/script.js) contains the ko(py) object that does the bindings and contains observables.
[index.html](../blob/master/index.html) is the poor view displaying all the profanities.

# Running it
```
npm install
npm start
```

Surf to http://localhost:8100/ and watch the magic happen.
