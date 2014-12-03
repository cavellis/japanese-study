var QuizItemsCollection = Backbone.Collection.extend({
	
	
	url: "http://services.japanesequiz.com/get_wordlist.php",
	//url: "json/wordlist.json",
	model: QuizItemModel
	
});