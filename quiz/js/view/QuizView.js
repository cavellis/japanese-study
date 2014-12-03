var QuizView = Backbone.View.extend({

	el: $('#quiz-view'),
	
	events:
	{
			
	},
	initialize:function () 
	{

     	this.collection.on("reset", this.render);

    	},
    	render: function( event )
	{
		return this;
	}


});