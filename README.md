# MVVC-very-light
Test run of how I think knockout.js does it.

Connecting a view to its model via finding all data-bind attributes on the page. 
Then find the matching data attribute on the model and set the html on the found tag.
If its a primitive - leave it like that. And if it's an observable, register ourselves as a listener 
on that observable and render updates as they happen.

[script.js](../blob/master/script.js) contains the ko(py) object that does the bindings and contains observables.
[index.html](../blob/master/index.html) is the poor view displaying all the profanities.

# Running it
```
npm install
npm start
```

Surf to http://localhost:8100/ and watch the magic happen.
