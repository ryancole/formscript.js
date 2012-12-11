
function FormScript (selector, templates) {
    
    this.settings = {
        
        element: document.getElementById(selector)
        
    };
    
    this.templates = this.compileTemplates(_.defaults(templates || {}, {
        
        file: '<div class="field-wrapper"><label for="<%= name %>"><%= label %></label><input type="file" name="<%= name %>" /></div>',
        textarea: '<div class="field-wrapper"><label for="<%= name %>"><%= label %></label><textarea name="<%= name %>"><%= value %></textarea></div>',
        text: '<div class="field-wrapper"><label for="<%= name %>"><%= label %></label><input type="text" name="<%= name %>" value="<%= value %>" /></div>',
        radio: '<div class="field-wrapper"><label for="<%= name %>"><%= label %></label><% _.each(options, function (option) { %> <input type="radio" name="<%= name %>" value="<%= option.value %>" <% if (option.value == value) print("checked") %>><%= option.label %></input> <% }); %></div>',
        select: '<div class="field-wrapper"><label for="<%= name %>"><%= label %></label><select name="<%= name %>"><% _.each(options, function (option) { %> <option value="<%= option.value %>" <% if (option.value == value) print("selected") %>><%= option.label %></option> <% }); %></select></div>'
        
    }));
    
};

FormScript.prototype.compileTemplates = function (templates) {
    
    // compile each given template string
    _.each(templates, function (template, key) {
        
        templates[key] = _.template(template);
        
    });
    
    // provide the collection of compiled templates
    return templates;
    
};

FormScript.prototype.renderField = function (name, field, value) {
    
    // get the field type's render template function
    var render = this.templates[field.type];
    
    // add name to template data
    field.name = name;
    field.value = value;
    
    // append the rendered field to the parent element
    this.settings.element.insertAdjacentHTML('beforeend', render(field));
    
};

FormScript.prototype.renderFields = function (fields, data) {
    
    // render each given field template
    _.each(fields, function (field, key) {
        
        this.renderField(key, field, data ? data[key] : null);
        
    }.bind(this));
    
};

FormScript.prototype.renderSchema = function (schema, data) {
    
    // render all fields in a given form schema
    this.renderFields(schema.fields, data);
    
};
