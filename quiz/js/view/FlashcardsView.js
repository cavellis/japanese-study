var FlashcardsView = Backbone.View.extend({
	el: $('#flashcards'),
	
	events:
	{
			
	},
	initialize:function () 
	{
     	this.collection.on("reset", this.render);
    	},
    	render: function( event )
	{

		var tmplMarkup = $('#tmpl-flashcards').html();
		var cards_arr = this.models;
		// ...tell Underscore to render the template...
		var compiledTmpl = _.template(tmplMarkup, { cards : cards_arr });
		// ...and update part of your page:
		$('#flashcards').html(compiledTmpl);
		console.log("FlashcardsView.render()");
		
		$('.bxslider').bxSlider({ minSlides: 1, maxSlides:4, slideWidth:212});
		
		$('.quickflip-wrapper').quickFlip();
     	
     	return this;
	}
});