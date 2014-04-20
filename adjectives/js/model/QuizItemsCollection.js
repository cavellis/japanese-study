var QuizItemsCollection = Backbone.Collection.extend({
	
	
	//url: "http://www.cyborgzombiedinosaurs.com/games/adj/wordlist.json",
	url: "json/wordlist.json",
	model: QuizItemModel
	
});