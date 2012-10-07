`schemaform.js` converts Javascript Objects into HTML forms.

# Example

Convert this ...

```javascript
{
    
    fields: {
        
        name: {
            type: 'text',
            label: 'What is your name?'
        },
        
        lipsum: {
            type: 'textarea',
            label: 'Great spot for some Lipsum:'
        },
        
        file: {
            type: 'file',
            label: 'Choose a file:'
        },
        
        color: {
            type: 'select',
            label: 'What is your favorite color?',
            options: [
            
                { label: 'red', value: 'red' },
                { label: 'green', value: 'green' },
                { label: 'blue', value: 'blue' }
            
            ]
        }
        
    }
}
```

into this ...
 
```html
<div id="form-wrapper"><div class="field-wrapper"><label for="name">What is your name?</label><input type="text" name="name"></div><div class="field-wrapper"><label for="lipsum">Great spot for some Lipsum:</label><textarea name="lipsum"></textarea></div><div class="field-wrapper"><label for="file">Choose a file:</label><input type="file" name="file"></div><div class="field-wrapper"><label for="color">What is your favorite color?</label><select name="color"><option value="red">red</option><option value="green">green</option><option value="blue">blue</option></select></div></div>
```

# Naming Convention

In order for `schemaform.js` to be able to convert an Object into a form, the Object must follow a particular naming convention.

Using the example above, the Object must have a property named `fields`. `fields` must be an embedded Object where each property specifies a desired HTML form field. The property name of each desired form field will be used within the generated HTML as the form field name.

The desired form field Objects *must* have the following properties: `type` and `label`. The `type` property should be a string containing the HTML form field type. These map to the [types specified by the HTML spec](https://developer.mozilla.org/en-US/docs/HTML/Element/Input#Attributes) itself.  

# Dependencies

`schemaform.js` requires `underscore.js`.