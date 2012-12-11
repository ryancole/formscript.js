FormScript converts Javascript Objects into HTML forms.

## Example

```javascript
var form = new FormScript('form-wrapper', {

    text: document.getElementById('text-field-template').innerHTML

});

form.renderSchema({
    
    fields: {
        
        name: {
            type: 'text',
            label: 'What is your name?'
        },
        
        color: {
            type: 'select',
            label: 'What is your favorite color?',
            options: [
            
                { label: 'Red', value: 'r' },
                { label: 'Blue', value: 'b' },
                { label: 'Green', value: 'g' },
            
            ]
        }
        
    }
});
```

## Naming Convention

In order for `FormScript` to convert a Javascript Object into an HTML Form, the Object must follow a particular naming convention.

Using the example above, the Object must have a property named `fields`. `fields` must be an Object where each property specifies a desired HTML form field. The property name of each desired form field will be used within the generated HTML as the form field name.

All of the desired form field Objects *must* have the following properties: `type` and `label`. The `type` property should be a string containing the HTML form field type. These map to the [types specified by the HTML spec](https://developer.mozilla.org/en-US/docs/HTML/Element/Input#Attributes) itself: `text`, `textarea`, `file`, `select`, `radio`.

Additional optional properties are necessary, depending on which form field type is being used.

## Form Field Templates

Each form field type is converted to HTML using its own `underscore.js` template code. FormScript contains simple default templates, but they can be overridden on a one-by-one basis at initialzation time.

## API

### FormScript(element, [templates])

Initializes a FormScript object, which involves compiling templates.

* element: `required` An element identifier, without the `#` prefix, of the DOM element to put the generated form into.
* templates: An Object that maps the HTML form input field types to a string containing `underscore.js` template code for this field.

### renderSchema(schema, [values])

Inserts a new form into the DOM, based on the given schema Object. Optionally, the may be populated with default values by supplying a values mapping Object.

* schema: `required` An Object that follows the FormScript schema DSL.
* values: An Object that maps schema field names to their values.

## Dependencies

The only dependency is `underscore.js`.

## Why?!?

A particular project called for dynamic web forms that could also be queried on, once submitted, based on the given field names and values. Think about a ticket system in which the end users get to also specify the ticket's fields when then open a new ticket.