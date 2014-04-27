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
	 	// load the quiz questions
	 	quizItemsCollection.fetch(

	 		{
	 			reset:true,
	 			success : function(collection, response, options) 
	 			{
	 				$("#quiz-preloader").hide();
	 			},
	 			error : function(collection, response, options) 
	 			{
	 				console.log("error");
	 				$("#quiz-preloader-text").html("Error loading. Please refresh and try again");
	 			},
	 			timeout: 5000

	 		}
 		);

	 	this.collections.quizItemsCollection = quizItemsCollection;
	 	this.views.quizView = quizView;

	 	
	}
}
