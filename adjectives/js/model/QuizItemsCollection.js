var QuizItemsCollection = Backbone.Collection.extend({
	
	
//	url: "http://www.cyborgzombiedinosaurs.com/dev/japanese/get_wordlist.php",
	url: "json/wordlist.json",
	model: QuizItemModel
	
});