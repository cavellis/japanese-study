var ApplicationRouter = Backbone.Router.extend({
	routes: 
	{ 
		"":"showHome",
		"quiz/:id": "showQuiz" ,
		"flashcards":"showFlashcards"
	},
	trackPageView:function()
	{
		var url = Backbone.history.getFragment();
		// Add a slash if neccesary
		if (!/^\//.test(url)) url = '/' + url;
		console.log("url to track: " + url);


		// Record page view
		ga('send', 
		{
			'hitType': 'pageview',
			'page': url
		});

	},
	showHome:function()
	{
		this.trigger("showHome");
		this.trackPageView();
	},
	showQuiz:function(id)
	{
		console.log("ROUTER::showQuiz(" + id+")");
		this.trigger("showQuiz", id);
		this.trackPageView();
	},
	showFlashcards:function()
	{
		console.log("ROUTER::showFlashcards()");

		this.trigger("showFlashcards");
		this.trackPageView();
	}
});
