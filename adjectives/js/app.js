/**
 * The main application.
**/
var App = function()
{

}
App.prototype = 
{
	views: {},
	collections: {},
	models: {},
	dispatcher:{},

	initialize:function()
	{

	 	// movie details
	 	var quizItemsCollection = new QuizItemsCollection();
	 	var quizView = new QuizView({collection: quizItemsCollection});

	 	quizItemsCollection.fetch({reset:true});

	 	this.models.quizItemsCollection = quizItemsCollection;
	 	this.views.quizView = quizView;

	 	
	}
}
