
function FormScriptBuilder (selector) {
    
    this.settings = {
        
        element: document.getElementById(selector)
        
    };
    
    this.templates = this.compileTemplates({
        
        text: '<div class="field-wrapper" data-name="<%= name %>" data-type="text" id="<%= id %>"><input type="text" class="field-label" /></div>',
        select: '<div class="field-wrapper" data-name="<%= name %>" data-type="select" id="<%= id %>"><input type="text" class="field-label" /></div>',
        builder: '<div class="field-wrapper field-chooser"><select id="<%= id %>"><option value="none">Select the type of question to add</option><option disabled>-</option><option value="text">Open-ended question</option><option value="select">List of choices</option></select></div>'
        
    });
    
    this.postProcessingMethods = {
        
        text: this.postProcessTextField,
        select: this.postProcessSelectField
        
    };
    
};

FormScriptBuilder.prototype.generateObject = function () {
    
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

FormScriptBuilder.prototype.renderChooseFieldType = function () {
    
    // get the template function
    var render = this.templates.builder;
    
    // create a unique id for the select dropdown
    var uniqueId = _.uniqueId('formscript_');
    
    // insert the builder markup
    this.settings.element.insertAdjacentHTML('beforeend', render({ id: uniqueId }));
    
    var builderElement = document.getElementById(uniqueId);
    
    // attach select event handler
    builderElement.addEventListener('change', function (event) {
        
        var selectedType = event.target.selectedOptions[0],
            supportedTypes = ['text', 'select'];
        
        // no op on unsupported field type
        if (supportedTypes.indexOf(selectedType.value) < 0)
            return;
        
        // remove the choose field element
        this.settings.element.removeChild(builderElement.parentElement);
        
        // create form field name and element id
        var uniqueId = _.uniqueId('formscript_'),
            fieldName = _.uniqueId('field_');

        // get the render template method for this field type
        var render = this.templates[selectedType.value];
        
        // render the template and insert into the dom for the selected field type
        this.settings.element.insertAdjacentHTML('beforeend', render({ id: uniqueId, name: fieldName }));
        
        var fieldElement = document.getElementById(uniqueId);
        
        // pass element off to post processing function
        this.postProcessingMethods[selectedType.value](fieldElement);
        
        // finally, add a new field chooser for additional fields
        this.renderChooseFieldType();
        
    }.bind(this));
    
};

FormScriptBuilder.prototype.compileTemplates = function (templates) {
    
    _.each(templates, function (template, key) {
        
        templates[key] = _.template(template);
        
    });
    
    return templates;
    
};

FormScriptBuilder.prototype.postProcessTextField = function (element) {
    
    console.log(element);
    
};

FormScriptBuilder.prototype.postProcessSelectField = function (element) {
    
    console.log(element);
    
};
