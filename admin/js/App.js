var App = function()
{
	//$.proxy( this.showMainMenu, this )
}
App.prototype = 
{
  rubyString:"",
  initialize:function()
  {
    $("#input").on( "select", $.proxy( this.onTextSelected, this ) );
    $("#input").on( "input", $.proxy( this.updateOutput, this ) );
    $("#furigana-btn").on("click", $.proxy( this.submitFurigana, this ) );
    $("#sentence-btn").on("click", $.proxy( this.submitSentence, this ) );
    $("#kanji-container").hide();
    $("#furigana-btn").hide();


  },
  submitSentence:function()
  {
    this.rubyString = $("#input").val();
    $("#output-txt").html(this.rubyString);

    $("#raw-output-txt").html("<xmp>" + encodeURIComponent(this.rubyString)　+ "</xmp>");

    $("#kanji-container").show();
    $("#furigana-btn").show();
  },
  submitFurigana:function()
  {
    /* 
      get the value of kanji box
      get the value of furigana box
      assemble the ruby

      get a plain version of output (?)
      find index of kanji
      insert ruby into output

      probably do regular expression
      to replace 

      <ruby></ruby>

      can we do something to check if it is a kanji?
      */
      var kanjiVal = $("#kanji").text();
      var furiganaVal = $("#furigana").val();

      var ruby = "<ruby>"+ kanjiVal + "<rp>(</rp><rt>" + furiganaVal + "</rt><rp>)</rp></ruby>";

      if(this.rubyString =="")
      {
        this.rubyString = ruby;
        $("#output-txt").html(this.rubyString);
      }
      else
      {

        var pattern = "<ruby><rb>" + kanjiVal + "</rb><rp>(</rp><rt>.*</rt><rp>)</rp></ruby>";
        var regEx = new RegExp(pattern);
        var result = regEx.exec(this.rubyString);
        // if we already put ruby
        if(result)
        {
          console.log("with ruby");
          console.log(result[0]);

          this.rubyString = this.rubyString.replace(result[0], ruby);
          $("#output-txt").html(this.rubyString);
        }
        else
        {
          //plain kanji
          pattern = kanjiVal;
          regEx = new RegExp(pattern);
          result = regEx.exec(this.rubyString);
          if(result)
          {
            console.log("plain kanji");
            console.log(result[0]);

            this.rubyString = this.rubyString.replace(result[0], ruby);
            $("#output-txt").html(this.rubyString);
          }

        }
      
      }
      //$("#raw-output-txt").html("<xmp>" + this.rubyString + "</xmp>");
      $("#raw-output-txt").html("<xmp>" + encodeURIComponent(this.rubyString) + "</xmp>");
    　
    
      return false;

    },
    updateOutput:function()
    {
    // console.log("change");
    // var val = $("#input").val();
    // $("#output-txt").html("<h2>" + val + "</h2>");
  },
  getSelectedText : function() 
  {
    var selText = "";
    if (window.getSelection) {  // all browsers, except IE before version 9
     if (document.activeElement && 
      (document.activeElement.tagName.toLowerCase () == "textarea" || 
       document.activeElement.tagName.toLowerCase () == "input")) 
     {
      var text = document.activeElement.value;
      selText = text.substring (document.activeElement.selectionStart, 
        document.activeElement.selectionEnd);
    }
    else 
    {
      var selRange = window.getSelection ();
      selText = selRange.toString ();
    }
  }
  else
  {
         if (document.selection.createRange) { // Internet Explorer
          var range = document.selection.createRange ();
          selText = range.text;
        }
      }
      return selText;
    },
    onTextSelected:function(event)
    {
      var selected =this.getSelectedText();
      $("#kanji").html(selected);
      $("#furigana").val("");

    }
  }

  window.app = new App();
  window.app.initialize();