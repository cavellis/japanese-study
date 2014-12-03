/**
 * The main application.
**/
var App = function()
{
	/*
	TODO:
	quiz gameobject
	take logic out of view

	one view, multiple templates ?
	set instructions
	set title
	set header - 
	Japanese • Adjectives

	*/
}
App.prototype = 
{
	views : {},
	collections : {},
	models : {},
	dispatcher : {},
	quiz : null,

	initialize:function()
	{
		// app router, used for routing hash tags (ex #about, #movies/id)
		var appRouter = new ApplicationRouter();
		
		
		//TODO: appRouter.on('route:quiz'... doesn't work at all for no good reason. Figure out why
		appRouter.on('route:quiz', $.proxy( this.showQuiz2, this ));
		
		appRouter.on("showHome", $.proxy( this.showMainMenu, this ));		
		appRouter.on("showQuiz", $.proxy( this.showQuiz, this ));

		appRouter.on("showFlashcards", $.proxy(this.showFlashcards, this));
		
		//main menu
		var mainMenuCollection = new MainMenuCollection();
		var mainMenuView = new MainMenuView({collection: mainMenuCollection});
		mainMenuCollection.fetch({reset:true});

		// conjugation quiz
		var quizItemsCollection = new QuizItemsCollection();
		
	 	// numbers quiz
	 	var numbersCollection = new NumbersCollection();

	 	// sentences
	 	var sentencesCollection = new ParticleSentencesCollection();

	 	//hiragana 
	 	var hiraganaCollection = new HiraganaCollection();
	 	var katakanaCollection = new KatakanaCollection();

	 	// flashcards
	 	var flashcardsCollection = new FlashcardsCollection();

	 	//conjugation
	 	var quizView = new QuizView({collection: quizItemsCollection});
	 	
	 	var flashcardsView = new FlashcardsView({collection: flashcardsCollection});

	 	this.collections.quizItemsCollection = quizItemsCollection;
	 	this.collections.numbersCollection = numbersCollection;
	 	this.collections.sentencesCollection = sentencesCollection;
	 	this.collections.hiraganaCollection = hiraganaCollection;
	 	this.collections.katakanaCollection = katakanaCollection;
	 	this.collections.flashcardsCollection = flashcardsCollection;

	 	this.views.quizView = quizView;
	 	this.views.flashcardsView = flashcardsView;

	 	Backbone.history.start();
	 	
	},
	/**
	 * Show the main menu.
	 **/
	showMainMenu:function()
	{
		console.log("showMainMenu");
		$("#quiz-header").html("Japanese Quiz (beta)");
		
		$("#quiz-menu").show();
		$("#quiz-preloader").hide();
		$("#home-button").hide();
		$('#flashcards').hide();


	},
	showQuiz2:function(quizId)
	{
		console.log("plain route, which doesn't work");
	},
	showQuiz:function(quizId)
	{
		if(this.quiz != null)
		{
			this.quiz.destroy();
			this.quiz = null;
		}
		console.log("APPP::showQuiz("+quizId+")");
		$('#quiz-menu').hide();
		$('#flashcards').hide();
		$("#quiz-view").show();
		$("#home-button").show();

		switch(quizId)
		{
			case "hiragana":
				this.quiz = new HiraganaQuiz();
				this.quiz.initialize(this.collections.hiraganaCollection, this.views.quizView);
				this.loadQuiz(this.collections.hiraganaCollection);
				break;
			case "katakana":
				this.quiz = new KatakanaQuiz();
				this.quiz.initialize(this.collections.katakanaCollection, this.views.quizView);
				this.loadQuiz(this.collections.katakanaCollection);
				break;
			case "adjectives":
				this.quiz = new ConjugationQuiz();
				this.quiz.initialize(this.collections.quizItemsCollection, this.views.quizView);
				this.loadQuiz(this.collections.quizItemsCollection);
				break;

			case "numbers":
				this.quiz = new NumbersQuiz();
				this.quiz.initialize(this.collections.numbersCollection, this.views.quizView);
				this.loadQuiz(this.collections.numbersCollection);
				break;
			case "particles":
				this.quiz = new ParticlesQuiz();
				this.quiz.initialize(this.collections.sentencesCollection, this.views.quizView);
				this.loadQuiz(this.collections.sentencesCollection);

				break;
		}

		$("#home-button").show();
	},
	loadQuiz:function(quizCollection)
	{
		//console.log(quizCollection);
	 	// load the quiz questions
	 	//this.collections.quizItemsCollection.fetch(
	 	quizCollection.fetch(

	 		{
	 			reset:true,
	 			success : function(collection, response, options) 
	 			{
	 				$("#quiz-preloader").hide();
	 			},
	 			error : function(collection, response, options) 
	 			{
	 				console.log("error");
	 				console.log(response);
	 				console.log(options);
	 				$("#quiz-preloader-text").html("Error loading. Please refresh and try again");
	 			},
	 			timeout: 5000

	 		}
 		);
	 	
	},
	showFlashcards:function()
	{

		$("#quiz-menu").hide();
		$("#quiz-preloader").hide();
		$("#quiz-view").hide();
		$("#flashcards").show();
		$("#home-button").show();

		console.log("show flashcards");
		this.collections.flashcardsCollection.fetch(
			{
	 			reset:true,
	 			success : function(collection, response, options) 
	 			{
	 				console.log("success");
	 			},
	 			error : function(collection, response, options) 
	 			{
	 				console.log("error");
	 				console.log(response);
	 				console.log(options);
	 				$("#quiz-preloader-text").html("Error loading. Please refresh and try again");
	 			},
	 			timeout: 5000

	 		}


		);
	}
}
