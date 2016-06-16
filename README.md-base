# DozeJS

### Description

DozeJS is a Typescript library that uses jQuery's AJAX and DOM selection to simplify the AJAX process for RESTful resources.

### Installation
To install, navigate to the root directory (where 'package.json' is located) and run 'npm install'.

### Usage

First, DozeJS must be included from your HTML.

```
    <script src="node_modules/systemjs/dist/system.js"></script>
    <script src="node_modules/typescript/lib/typescript.js"></script>
    <script>
        System.config({
            transpiler: 'typescript',
            packages: {
                src: {
                    defaultExtension: 'ts'
                }
            }
        });
        System
                .import('src/doze/listener.ts')
                .then(null, console.error.bind(console));
    </script>
```

Next, in your HTML, you need to set the base url for the RESTful web service. This is accomplished using a <meta> tag.

```
	<meta name="site_url" content="http://somedomain/api/v1/" />
```

Finally, add a resource element to your DOM. (More about resources can be found in the **Resources** section below.)

```
    <div class="dz-resource" data-resource="some_resource" data-id="2" parent_id="1">
        <div class="dz-target_view"></div>
        <div class="dz-target_edit"></div>

        <a href="#" class="dz-show">view</a>
        <a href="#" class="dz-new">new</a>
        <a href="#" class="dz-edit">edit</a>
        <a href="#" class="dz-cancel">cancel</a>
        <a href="#" class="dz-delete">delete</a>
    </div> <!-- container -->
```

## Resources
A resource is, as it sounds, a DOM representation of some RESTful resource.
You can make any RESTful call to a resource usting the **Actions** listed below.

A resouce is represented in the DOM with an element with a class of **dz-resource**.

A **dz-resource** element requires two data attributes:

1. **data-resource** (The name of the RESTful resource.)
2. **data-id**	(The id of the RESTful resource.)

A third, optional data attribute can be included to reference a parent resource.

- **data-parent_id**

A **dz-resource** element must have two children elements.

One of the children elements must have a class of **dz-target_view**.

The other child element must have a class of **dz-target_edit**.

### Actions

DozeJS listens for various DOM events (click/submit) on any DOM element with a valid action class (as listed below).

For instance, if a link with a class 'dz-edit' is clicked, using the data-id attribute on the parent **dz-resource** element, will call '{id}/edit' on the RESTful API. Then, DozeJS will render the response to the **dz-target_edit** child of that **dz-resource**.

**dz-show (GET: /show/{id})**

Show will render the contents of a resource response to the first child of the **dz-resource** element which has a  **dz-target_view** class.

*Show will also hide the **dz-target_edit**element.

**dz-new (POST: /new)**

New will render the contents of the '/new' resource response to the **dz-target_edit** element.

*New will also hide the **dz-target_view** element, allowing us to reveal it in the event of a 'cancel' action.

**dz-edit (PUT: /{id}/edit)**

Edit will render the contents of the '/{id}/edit' resource response to the **dz-target_edit** element.

*Edit will also hide the **dz-target_view** element, allowing us to reveal it in the event of a 'cancel' action.

**dz-cancel (GET: /show/{id?})**

Cancel is a convenience method for 'show', returning back to a resource's view instead of completing a 'new' or 'edit' action.

**dz-delete (DELETE: /{id}/delete)**

Delete, after calling DELETE on the current resource, will remove the entire **dz-resource** element from the DOM.