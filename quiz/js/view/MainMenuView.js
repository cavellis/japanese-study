var MainMenuView = Backbone.View.extend({
	el: $('#quiz-menu'),
	
	events:
	{
			
	},
	initialize:function () 
	{
     	this.collection.on("reset", this.render);
    	},
    	render: function( event )
	{

		var tmplMarkup = $('#tmpl-menu').html();
		var links_arr = this.models;
		// ...tell Underscore to render the template...
		var compiledTmpl = _.template(tmplMarkup, { links : links_arr });
		// ...and update part of your page:
		$('#quiz-menu').html(compiledTmpl);

		$("#quiz-preloader").hide();
     	return this;
	}
});