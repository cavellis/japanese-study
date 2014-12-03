/**
 * Particles Quiz
 */
var ParticlesQuiz = function()
{
	/*
	problems
	tags in mysql, field is text type (should be ok) but maybe just post the sentence to php,
	do the urlencode  and insert
	
	in php, have to 
	in js, have to do decodeURIComponent() - probably no way around
	it adds +_+ for space_space - ???

	*/
}
ParticlesQuiz.prototype = 
{
	_collection : null,
	_view : null,
	_question:{},
	_answered:false,

	initialize:function(collection, view)
	{
		this._collection = collection;
		
		console.log(this._collection);

		this._view = view;

		// bind the IME using the wanakana plugin
		var wk = window.wanakana;
		var inputIME = document.getElementById('input-IME');
		wk.bind(inputIME);

		this._question = {};

		this.showInstructions();
		$("#quiz-header").html("Japanese - Particles");
		$("#quiz-start-button").click($.proxy( this.startQuiz, this ));
		$("#submitButton").click($.proxy( this.submitHandler, this ));
	
	},
	nextQuestion:function()
    	{
		$("#correct-incorrect").html("");
		$("#input-IME").val("");

    		//grab a random from collection
    		var quizItems = this._collection.models;

    		console.log(quizItems);
		var r = Math.floor(Math.random()*quizItems.length);
		var randomQuestion = quizItems[r];

		//display it to user
		var question_str = decodeURIComponent(randomQuestion.get("phrase"));
		question_str = question_str.replace("+_+", " _ ");
		$("#question-name").html("<h4>" + question_str + "</h4>");
		$("#question-description").html("Fill in the missing particle. Type 'X' if a particle isn't needed.");
		//save question so we can check it later
		this._question = randomQuestion;
    		
    	},
    	submitHandler:function()
    	{
    		if(this._answered)
    		{
    			this._answered = false;
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
		if(answer == "x") answer = "X";

		if(answer !="")
		{
			this._answered = true;
			if(answer == this._question.get("answer"))
			{
				$("#correct-incorrect").html("Correct!");
			}
			else
			{
				$("#correct-incorrect").html("Incorrect! The answer was <b>" + this._question.get("answer")+"</b>");			
			}
		
			$("#submitButton").html("Next");
		}
	},
	startQuiz:function()
	{
		$("#quiz-instructions-view").hide();
		this.nextQuestion();
	},
	showInstructions:function()
	{
		$("#quiz-instructions-copy").html("Fill in the missing particle. Type <b>X</b> if a particle isn't needed.");
		$("#quiz-instructions-view").show();
		
	},
	destroy:function()
	{
		// remove listeners
		$("#quiz-start-button").unbind( "click" );
		$("#submitButton").unbind("click");
		// do other cleanup
	}

}	