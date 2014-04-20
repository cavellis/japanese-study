var QuizView = Backbone.View.extend({
	question:{},
	el: $('#quiz-view'),
	
	events:
	{
		"click #submitButton" : "submitAnswer",
		"click #nextButton" : "nextQuestion",
		"click #quiz-start-button" : "startQuiz"
			
	},

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
		var rc = Math.floor(Math.random()* conjugations.length);
		var randomConjugation = conjugations[rc];
		var conjugationType = randomConjugation.id;
		//display it to user
		$("#question-name").html("<h4>" + randomQuestion.get("word") + "</h4>");
		$("#conjugate-description").html("<h3>Conjugate this to: " + conjugationType +"</h3>");
		//save question so we can check it later
		this.question = randomConjugation;
    		
    	},
    	submitAnswer:function()
	{
		var answer = document.getElementById('input-IME').value;
		if(answer !="")
		{
			if(answer == this.question.conjugation)
			{
				$("#correct-incorrect").html("Correct!");
			}
			else
			{
				$("#correct-incorrect").html("Incorrect!");			
			}
		
			$("#nextButton").show();
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
		//$("#submitButton").hide();

		//todo maybe have app.js listen for loads and do hide/show
		$("#quiz-preloader").hide();
		$("#nextButton").hide();
		return this;
	}


});