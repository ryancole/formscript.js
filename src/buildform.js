
function SchemaFormBuilder (selector) {
    
    this.settings = {
        
        element: document.getElementById(selector)
        
    };
    
    this.templates = this.compileTemplates({
        
        builder: '<div class="field-wrapper"><select id="<%= id %>"><option value="none">Select the type of question to add</option><option disabled>-</option><option value="text">Open-ended question</option><option value="select">List of choices</option></select></div>',
        text: '<div class="field-wrapper"><input type="text" /><input type="text" /></div>',
        select: '<div class="field-wrapper"><input type="text" /><input type="text" /></div>'
        
    });
    
};

SchemaFormBuilder.prototype.renderChooseFieldType = function () {
    
    // get the template function
    var render = this.templates.builder;
    
    // create a unique id for the select dropdown
    var uniqueId = _.uniqueId('schemaform_');
    
    // insert the builder markup
    this.settings.element.insertAdjacentHTML('beforeend', render({ id: uniqueId }));
    
    var element = document.getElementById(uniqueId);
    
    // attach select event handler
    element.addEventListener('change', function (event) {
        
        var selectedType = event.target.selectedOptions[0],
            supportedTypes = ['text', 'select'];
        
        // no op on unsupported field type
        if (supportedTypes.indexOf(selectedType.value) < 0)
            return;
        
        // remove the choose field element
        this.settings.element.removeChild(element.parentElement);
        
        var render = this.templates[selectedType.value];
        
        // add the builder for the selected field type
        this.settings.element.insertAdjacentHTML('beforeend', render());
        
        // also add a new field chooser for additional fields
        this.renderChooseFieldType();
        
    }.bind(this));
    
};

SchemaFormBuilder.prototype.compileTemplates = function (templates) {
    
    _.each(templates, function (template, key) {
        
        templates[key] = _.template(template);
        
    });
    
    return templates;
    
};
