var QuizView = Backbone.View.extend({
	question:{},
	answered:false,
	el: $('#quiz-view'),
	
	events:
	{
		"click #submitButton" : "submitHandler",
		"click #quiz-start-button" : "startQuiz"
			
	},
f
	initialize:function () 
	{

		// bind the IME using the wanakana plugin
		var wk = window.wanakana;
		var inputIME = document.getElementById('input-IME');
		wk.bind(inputIME);

		this.question = {};
     	this.collection.on("reset", this.render);

    	},
    	nextQuestion:function()
    	{
    		$("#nextButton").hide();
		$("#correct-incorrect").html("");
		$("#input-IME").val("");

    		//grab a random from collection
    		var quizItems = this.collection.models;
		var r = Math.floor(Math.random()*quizItems.length);
		var randomQuestion = quizItems[r];
		// pick a random conjugation
		var conjugations = randomQuestion.get("conjugations");
		console.log(randomQuestion);
		var rc = Math.floor(Math.random()* conjugations.length);
		var randomConjugation = conjugations[rc];
		var conjugationType = randomConjugation.id;
		//display it to user
		$("#question-name").html("<h4>" + randomQuestion.get("word") + "</h4>");
		$("#conjugate-description").html("<h3>Conjugate to: " + conjugationType +"</h3>");
		//save question so we can check it later
		this.question = randomConjugation;
    		
    	},
    	submitHandler:function()
    	{
    		console.log(this.answered);
    		if(this.answered)
    		{
    			this.answered = false;
    			$("#submitButton").html("Submit");
    			this.nextQuestion();
    		}
    		else
    		{
    			this.submitAnswer();
    		}
    	},
    	submitAnswer:function()
	{
		var answer = document.getElementById('input-IME').value;
		if(answer !="")
		{
			this.answered = true;
			if(answer == this.question.conjugation)
			{
				$("#correct-incorrect").html("Correct!");
			}
			else
			{
				$("#correct-incorrect").html("Incorrect! The answer was <b>" + this.question.conjugation+"</b>");			
			}
		
			$("#submitButton").html("Next");
		}
	},
	startQuiz:function()
	{
		console.log("startquiz");
		$("#quiz-instructions-view").hide();
		this.nextQuestion();
	},
    	render: function( event )
	{

		return this;
	}


});