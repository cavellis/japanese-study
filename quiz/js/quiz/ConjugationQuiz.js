/**
 * Conjugation Quiz
 */
var ConjugationQuiz = function()
{

}
ConjugationQuiz.prototype = 
{
	_collection : null,
	_view : null,
	_question:{},
	_stats:{},
	_answered:false,
	_i_conjugations:["い", "くない", "かった",　"くなかった"],
	_na_conjugations:["", "じゃない", "でした", "じゃなかった"],
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
		$("#quiz-header").html("Japanese - Adjectives");
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
	showRuby:function(randomQuestion)
	{
		var wordDisplay;
		var ruby = randomQuestion.get("ruby");
		if(ruby)
		{
			wordDisplay = decodeURIComponent(ruby);
		}
		else
		{
			wordDisplay = randomQuestion.get("hiragana");
		}
		$("#question-name").html(wordDisplay);
	},
	meaningQuestion:function(randomQuestion)
	{
		this.bindWanakana(false);
		var meaning = randomQuestion.get("dictionary_meaning");
		this.showRuby(randomQuestion);
		$("#question-description").html("<h3>What does this mean (English)?</h3>");
		//save question so we can check it later
		this._question.answer = meaning;
	},
	adjectiveTypeQuestion:function(randomQuestion)
	{
		this.bindWanakana(true);
		var adjective_type = randomQuestion.get("type_str");
		this.showRuby(randomQuestion);
		$("#question-description").html("<h3>Is this an い adjective or a な adjective?</h3>");
		//save question so we can check it later
		this._question.answer = adjective_type;
	},
	conjugationQuestion:function(randomQuestion)
	{
		this.bindWanakana(true);
		
		//check the type
		var adjective_type = randomQuestion.get("type_id");
		var stem = "";
		var randomConjugation;
		var word = randomQuestion.get("hiragana");

		var rc = Math.floor(Math.random()* 4);
		//todo: move to server
		switch(adjective_type)
		{
			case "1":
				// 'i' adj
				// only one exception really, いい because it used to be よい so stem is よ
				if(rc !=0)
				{
					if(word == "いい")
					{
						stem = "よ";
					}else if (word == "かっこいい")
					{
						stem = "かっこよ";
					}
					else
					{
						stem = word.substr(0, word.length-1);
					}
				}
				else
				{
					stem = word.substr(0, word.length-1);
				}
				randomConjugation = stem + this._i_conjugations[rc];
				break;

			case "2":
				//'na' adj
				stem = word;
				randomConjugation = stem + this._na_conjugations[rc];
				break;
		}

		var conjugationType;
		switch(rc)
		{
			case 0:
				conjugationType = "present positive";
				break;
			case 1:
				conjugationType = "present negative";
				break;
			case 2:
				conjugationType = "past positive";
				break;
			case 3:
				conjugationType = "past negative";
				break;
		}
		//if conjugation comes from db
		/*
		// pick a random conjugation
		var conjugations = randomQuestion.get("conjugations");
		var rc = Math.floor(Math.random()* conjugations.length);
		var randomConjugation = conjugations[rc];
		var conjugationType = randomConjugation.id;
		*/

		//display it to user
		this.showRuby(randomQuestion);
		$("#question-description").html("<h3>Conjugate to: <b>" + conjugationType +"</b>. Type in romaji (converts to hiragana).</h3>");
		//save question so we can check it later
		this._question.answer = randomConjugation;
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
		// pick a random topic
		var quizType = Math.floor(Math.random() * 3);
		console.log("random # " + quizType);
		if(quizType == 0)
		{
			//conjugation
			this.conjugationQuestion(randomQuestion);
		}
		else if(quizType == 1)
		{
			//ask the type
			this.adjectiveTypeQuestion(randomQuestion);
		}
		else
		{
			//ask meaning
			this.meaningQuestion(randomQuestion);
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
			// if meaning and multiple answers, split on , check if matches any in array
			if(this._question.answer.indexOf(",")!=-1)
			{
				var answers = this._question.answer.split(",");
				var n = answers.length;
				var foundAnswer = false;
				for(var i = 0; i < n; i++)
				{
					if(answers[i] == answer)
					{
						foundAnswer = true;
						break;
					}
				}
				//TODO:clean up
				if(foundAnswer)
				{
					$("#correct-incorrect").html("Correct!");
					this._stats.correct++;

				}
				else
				{
					$("#correct-incorrect").html("Incorrect! The answer was <b>" + this._question.answer+"</b>");			
				}

			}
			else
			{
				if(answer == this._question.answer)
				{
					$("#correct-incorrect").html("Correct!");
					this._stats.correct++;

				}
				else
				{
					$("#correct-incorrect").html("Incorrect! The answer was <b>" + this._question.answer+"</b>");			
				}
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
		$("#quiz-instructions-copy").html("Let's conjugate some Japanese adjectives. Type in <i>romaji</i> and answer the questions. It will convert to <i>hiragana</i> for you.<p>Don't worry about typing です or あります at the end for politeness, just the adjective.<p>Example: さむい<p>past positive: さむかった");
		$("#quiz-instructions-view").show();
		
	},
	destroy:function()
	{
		// remove listeners
		$("#quiz-start-button").unbind( "click" );
		$("#submitButton").unbind("click");
	}

}	