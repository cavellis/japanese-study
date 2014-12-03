/**
 * Number Quiz
 */
 var NumbersQuiz = function()
 {

 }
 NumbersQuiz.prototype = 
 {
   _collection : null,
   _view : null,
   _question:{},
   _answered:false,

   initialize:function(collection, view)
   {
    this._collection = collection;
    this._view = view;
    this._question = {};

    this.showInstructions();
    $("#quiz-header").html("Japanese - Numbers");

    $("#input-IME").numeric();

    $("#quiz-start-button").click($.proxy( this.startQuiz, this ));
    $("#submitButton").click($.proxy( this.submitHandler, this ));

  },
  nextQuestion:function()
  {
    $("#correct-incorrect").html("");
    $("#input-IME").val("");
    var hundred_kanji = "百";
    var tens_kanji = "十";
    var ones_kanji = ["", "一","二","三","四","五","六","七","八","九","十"];
    var hundreds = Math.floor(Math.random()*10);
    var tens = Math.floor(Math.random()*10);
    var ones = Math.floor(Math.random()*10);
    var kanji_str = "";
    var sum = "";

    if(hundreds !=0)
    {
      if(hundreds == 1)
      {
       kanji_str = hundred_kanji;
     }
     else
     {
      kanji_str = ones_kanji[ hundreds ] + hundred_kanji;
    }
    sum += String(hundreds);
  }
  if(tens !=0)
  {
    if(tens ==1)
    {
      kanji_str += tens_kanji; 
    }
    else
    {
      kanji_str += ones_kanji[tens] + tens_kanji;
    }
    sum += String(tens);
  }
  else
  {
    if(hundreds !=0)
    {
     sum += String(tens);
   }
 }
 if(ones !=0)
 {
  kanji_str += ones_kanji[ones];
}
sum  += String(ones);
this._question.answer = sum;


    //display it to user
    $("#question-name").html("<h4>" + kanji_str + "</h4>");
    $("#question-description").html("<h3>What number is this?</h3>");
    
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
    if(answer !="")
    {
    	this._answered = true;
      if(answer == this._question.answer)
      {
        $("#correct-incorrect").html("Correct!");
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
    this.nextQuestion();
  },
  showInstructions:function()
  {
   $("#quiz-instructions-copy").html("Look at kanji and type the number.<p>");
   $("#quiz-instructions-view").show();
 },
 destroy:function()
 {
		// remove listeners
		$("#quiz-start-button").unbind( "click" );
		$("#submitButton").unbind("click");
		// do other cleanup
    $("#input-IME").removeNumeric();

  }
}