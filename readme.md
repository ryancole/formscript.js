`schemaform.js` converts Javascript Objects into HTML forms.

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

... into this ...
 
```html
<div id="schemaform"><div class="field-wrapper"><label for="name">What is your name?</label><input type="text" name="name"></div><div class="field-wrapper"><label for="lipsum">Great spot for some Lipsum:</label><textarea name="lipsum"></textarea></div><div class="field-wrapper"><label for="file">Choose a file:</label><input type="file" name="file"></div><div class="field-wrapper"><label for="color">What is your favorite color?</label><select name="color"> <option value="red">red</option>  <option value="green">green</option>  <option value="blue">blue</option> </select></div></div>
```

# Dependencies

`schemaform.js` requires `underscore.js`.