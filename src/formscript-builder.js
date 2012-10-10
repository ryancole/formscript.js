
var FormField = Backbone.Model.extend({
    
    
    
});

var FormFields = Backbone.Collection.extend({
    
    model: FormField
    
});

var BuilderView = Backbone.View.extend({
    
    events: {
        
        'click #simple-text-response': 'insertTextField',
        'click #multi-choice-response': 'insertSelectField',
        'click #large-text-response': 'insertTextAreaField'
        
    },
    
    initialize: function (options) {
        
        this.options.collection.bind('add', this.displayFieldEditor, this);
        
    },
    
    displayFieldEditor: function (field) {
        
        console.log(field);
        
    },
    
    insertNewField: function (type) {
        
        console.log('whaaaat');
        
        var foo = this.options.collection.create({ type: type });
        
    },
    
    insertTextField: function () {
        
        return this.insertNewField('text');
        
    },
    
    insertSelectField: function () {
        
        return this.insertNewField('select');
        
    },
    
    insertTextAreaField: function () {
        
        return this.insertNewField('textarea');
        
    }
    
});
