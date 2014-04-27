var NumbersCollection = Backbone.Collection.extend({
	
	
//	url: "http://www.cyborgzombiedinosaurs.com/dev/japanese/get_numbers.php",
	url: "json/numbers.json",
	model: NumberItemModel
	
});