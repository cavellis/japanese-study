var NumbersCollection = Backbone.Collection.extend({
	
	
//	url: "http://services.japanesequiz.com/get_numbers.php",
	url: "json/numbers.json",
	model: NumberItemModel
	
});