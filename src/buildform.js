
function SchemaFormBuilder (selector) {
    
    this.settings = {
        
        element: document.getElementById(selector)
        
    };
    
    this.templates = this.compileTemplates({
        
        text: '<div id="foo" class="field-wrapper" data-name="<%= name %>" data-type="text"><input type="text" class="field-label" /><input type="text" /></div>',
        select: '<div class="field-wrapper" data-name="<%= name %>" data-type="select"><input type="text" class="field-label" /><input type="text" /></div>',
        builder: '<div class="field-wrapper field-chooser"><select id="<%= id %>"><option value="none">Select the type of question to add</option><option disabled>-</option><option value="text">Open-ended question</option><option value="select">List of choices</option></select></div>'
        
    });
    
};

SchemaFormBuilder.prototype.generateObject = function () {
    
    var generatedObject = { fields: { } },
        elementChildren = this.settings.element.children;
    
    _.each(elementChildren, function (elementChild) {
        
        // no op on field chooser
        if (elementChild.classList.contains('field-chooser'))
            return;
        
        var labelElement = elementChild.getElementsByClassName('field-label')[0];
        
        // init an object for this field
        generatedObject.fields[elementChild.dataset.name] = new Object;
        
        // set object attributes
        generatedObject.fields[elementChild.dataset.name].type = elementChild.dataset.type;
        generatedObject.fields[elementChild.dataset.name].label = labelElement.value;
        
    });
    
    return generatedObject;
    
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
        
        // create a unique id for the select dropdown
        var fieldName = _.uniqueId('field_');
        
        var render = this.templates[selectedType.value];
        
        // add the builder for the selected field type
        this.settings.element.insertAdjacentHTML('beforeend', render({ name: fieldName }));
        
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
