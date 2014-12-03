var HiraganaCollection  = Backbone.Collection.extend({
	url: "http://services.japanesequiz.com/get_hiragana_katakana.php?type=hiragana&grouped=0",
	model: GenericModel

});