
var schema = {
    
    fields: {
        
        foo: {
            
            type: 'text',
            label: 'What is your name?'
            
        },
        
        bar: {
            
            type: 'textarea',
            label: 'Great spot for some Lipsum:'
            
        },
        
        baz: {
            
            type: 'file',
            label: 'Choose a file:'
            
        },
        
        bop: {
            
            type: 'select',
            label: 'What is your favorite color?',
            options: [
            
                { label: 'red', value: 'red' },
                { label: 'green', value: 'green' },
                { label: 'blue', value: 'blue' }
            
            ]
            
        }
        
    }
    
};

function SchemaForm (selector) {
    
    this.settings = {
        
        element: document.getElementById(selector)
        
    };
    
    this.templates = this.compileTemplates({
        
        text: '<div class="field-wrapper"><label for="<%= name %>"><%= label %></label><input type="text" name="<%= name %>" /></div>',
        file: '<div class="field-wrapper"><label for="<%= name %>"><%= label %></label><input type="file" name="<%= name %>" /></div>',
        textarea: '<div class="field-wrapper"><label for="<%= name %>"><%= label %></label><textarea name="<%= name %>"></textarea></div>',
        select: '<div class="field-wrapper"><label for="<%= name %>"><%= label %></label><select name="<%= name %>"><% _.each(options, function (option) { %> <option value="<%= option.value %>"><%= option.label %></option> <% }); %></select></div>'
        
    });
    
};

SchemaForm.prototype.compileTemplates = function (templates) {
    
    _.each(templates, function (template, key) {
        
        templates[key] = _.template(template);
        
    });
    
    return templates;
    
};

SchemaForm.prototype.renderField = function (name, field) {
    
    // get the field type's render function
    var render = this.templates[field.type];
    
    // add name to template data
    field.name = name;
    
    // append the rendered field to the parent element
    this.settings.element.insertAdjacentHTML('beforeend', render(field));
    
};

SchemaForm.prototype.renderFields = function (fields) {
    
    _.each(fields, function (field, key) {
        
        this.renderField(key, field);
        
    }.bind(this));
    
};

SchemaForm.prototype.renderSchema = function (schema) {
    
    this.renderFields(schema.fields);
    
};
