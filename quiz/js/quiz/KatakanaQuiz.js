/**
 * Katakana Quiz
 */
var KatakanaQuiz = function()
{

}
KatakanaQuiz.prototype = 
{
	_collection : null,
	_view : null,
	_question:{},
	_stats:{},
	_answered:false,
	initialize:function(collection, view)
	{
		this._collection = collection;
		this._view = view;
		// bind the IME using the wanakana plugin
		this.bindWanakana(true);
		this._question = {};
		this._stats.total = 0;
		this._stats.correct = 0;
		this.showInstructions();
		$("#quiz-header").html("Japanese - Katakana");
		$("#quiz-start-button").click($.proxy( this.startQuiz, this ));
		$("#submitButton").click($.proxy( this.submitHandler, this ));

	},
	bindWanakana:function(shouldBind)
	{
		var wk = window.wanakana;
		var inputIME = document.getElementById('input-IME');
		if(shouldBind)
		{
			wk.unbind(inputIME);
			wk.bind(inputIME);
		}
		else
		{
			wk.unbind(inputIME);
		}
	},
	readingQuestion:function(randomQuestion)
	{
		this.bindWanakana(true);
		var hiragana = randomQuestion.get("romaji");
		$("#question-name").html(hiragana);
		$("#question-description").html("<h3>Type the katakana. Hold SHIFT as you type to type katakana.</h3>");
		//save question so we can check it later
		this._question.answer = randomQuestion.get("katakana");
	},
	meaningQuestion:function(randomQuestion)
	{
		this.bindWanakana(false);
		var hiragana = randomQuestion.get("katakana");
		$("#question-name").html(hiragana);
		$("#question-description").html("<h3>Type the romaji?</h3>");
		//save question so we can check it later
		this._question.answer = randomQuestion.get("romaji");
	},
	nextQuestion:function()
    	{
    		var percentCorrect = Math.round((this._stats.correct/this._stats.total) * 100);

    		this._stats.total++;
		$("#correct-incorrect").html("");
		$("#input-IME").val("");
		// or what if i just give points and have a leaderboard
		
    		//grab a random from collection
    		var quizItems = this._collection.models;
		var r = Math.floor(Math.random()*quizItems.length);
		var randomQuestion = quizItems[r];
		var rc = Math.floor(Math.random()* 2);
		switch(rc)
		{
			case 0:
				this.readingQuestion(randomQuestion);
				break;
			
			case 1:
				this.meaningQuestion(randomQuestion);
				break;
		}	
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
		// based on the question's answer, can check wanakana.isHiragana(string)
		// and shake if false, user could put mixed
		if(answer !="")
		{
			this._answered = true;
			
			if(answer == this._question.answer)
			{
				$("#correct-incorrect").html("Correct!");
				this._stats.correct++;

			}
			else
			{
				$("#correct-incorrect").html("Incorrect! The answer was <b>" + this._question.answer+"</b>");			
			}
			
			$("#submitButton").html("Next");
		}
	},
	startQuiz:function()
	{
		$("#quiz-instructions-view").hide();
		document.getElementById("input-IME").focus();
		this.nextQuestion();
	},
	showInstructions:function()
	{
		$("#quiz-instructions-copy").html("Katakana quiz");
		$("#quiz-instructions-view").show();
		
	},
	destroy:function()
	{
		// remove listeners
		$("#quiz-start-button").unbind( "click" );
		$("#submitButton").unbind("click");
	}

}	