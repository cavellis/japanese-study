var NumbersQuizView = Backbone.View.extend({
	question:{},
	answered:false,
	el: $('#number-quiz-view'),
	
	events:
	{
		"click #submitButton" : "submitHandler",
		"click #quiz-start-button" : "startQuiz"
			
	},
	initialize:function () 
	{

     	this.collection.on("reset", this.render);
    	},
    	nextQuestion:function()
    	{
    		var hundreds = Math.floor(Math.random()*10);
    		var tens = Math.floor(Math.random()*10);
    		var ones = Math.floor(Math.random()*10);

    		var sum = String(hundreds)+String(tens)+String(ones);
    		// we get something like 4+3+2 = 432
    		// 四百 4 + 100
    		//　三十 3 + 10
    		// 二 2
    		// answer is sum
    		
    	},
    	submitHandler:function()
    	{
    		console.log(this.answered);
    		if(this.answered)
    		{

    		}
    		else
    		{
    		}
    	},
    	submitAnswer:function()
	{

	},
	startQuiz:function()
	{
		console.log("startquiz");
		this.nextQuestion();
	},
    	render: function( event )
	{

		return this;
	}


});