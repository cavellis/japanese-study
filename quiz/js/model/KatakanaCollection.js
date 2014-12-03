var KatakanaCollection  = Backbone.Collection.extend({
	url: "http://services.japanesequiz.com/get_hiragana_katakana.php?type=katakana&grouped=0",
	model: GenericModel

});