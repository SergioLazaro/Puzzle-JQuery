/*Set id to all divs of the table*/
$(document).ready(function(){
    var idCount = 1;
    $('#puzzlearea > div').each(function(e){
      $(this).attr('id',"b" + idCount);
      console.log($(this).attr("id") + " - " + idCount);
      idCount++;
    });
    //Create div number 16th for confort
	$("#puzzlearea").append("<div id='blank'></div>");
});
//Positioning every div inside #puzzlearea
$(document).ready(function(){
	var x = 0;
	var y = 0;
	for(var i = 1; i <= 15; i++){
		$('#b' + i).css('left',Math.abs(x));
		$('#b' + i).css('top',Math.abs(y));
		x += 100;
		if(i%4 == 0){
			y+= 100;
			x = 0;
		}
	}
	$("#blank").css('border','0px');	//Clear black border
	$("#blank").css('left','300px');
	$("#blank").css('top','300px');	
});
/*Now, configure the background image for every div*/
$(document).ready(function(){
	var x = 0;
	var y = 0;
	for(var i = 1; i <= 15; i++){
		$('#b' + i).css('background','transparent url(elephant.jpg) no-repeat scroll ' + x.toString() + 'px ' + y.toString() + 'px');
		x -= 100;
		if(i%4 == 0){
			x = 0;
			y -= 100;	
		}
	}
});

$(document).ready(function(){
	//$('#puzzlearea > div').click(function(){
    $('#puzzlearea').on('click','div',function(){
		//Getting elements
		var id = $(this).attr("id");
    	div = $('#' + id);
    	blank = $('#blank');

    	//Getting positions in arrays
		var clickedValues = getPosition(div);
		var blankValues = getPosition(blank);

		//Check if clicked div is near enough to be changed
		//Just if:
		//Clicked div X value is 100px higher or 100px lower than blank X value AND Y value is the same
		//OR
		//Clicked div Y value is 100px higher or 100px lower than blank Y value and X value is the same 
    	if((blankValues[0] == clickedValues[0] && ((blankValues[1] == clickedValues[1] + 100) ||
    	 	(blankValues[1] == clickedValues[1] - 100))) 
    		|| (blankValues[1] == clickedValues[1] && ((blankValues[0] == clickedValues[0] + 100) ||
    		 (blankValues[0] == clickedValues[0] - 100)))){

    		//Switch divs positions
			blank.css('left',clickedValues[0] +'px');
			blank.css('top',clickedValues[1] +'px');

			div.css('left', blankValues[0] + 'px');
			div.css('top', blankValues[1] + 'px');

			//Now, clone and change on HTML code dynamically
			auxDiv = div.clone();
			auxBlank = blank.clone();

			$(div).replaceWith(auxBlank);
			$(blank).replaceWith(auxDiv);

    	}
    	else{
    		alert("You can't move this chip.");
    	}
    });
});

function shuffle(){    	
	var random = 0;
	for(var i = 1; i <= 15; i++){
		random = (Math.random()*15) + 1;
		random = Math.floor(random);
		fromDiv = $('#b' + i);
		toDiv = $('#b' + random);

		//Getting positions in arrays
		var fromValues = getPosition(fromDiv);
		var toValues = getPosition(toDiv);

		//Switch divs positions
		toDiv.css('left',fromValues[0] +'px');
		toDiv.css('top',fromValues[1] +'px');

		fromDiv.css('left', toValues[0] + 'px');
		fromDiv.css('top', toValues[1] + 'px');
		
		//Now, clone and change on HTML code dynamically
		auxFromDiv = fromDiv.clone();
		auxToDiv = toDiv.clone();

		fromDiv.replaceWith(auxToDiv);
		toDiv.replaceWith(auxFromDiv);
	}
}

/**
	Returns div LEFT and RIGHT position as a integer
	inside an array of length = 2
	The array contents [x,y]
*/
function getPosition(div){
	//Getting div position
	var x = div.css('left');
	x = parseInt(x.substring(0,x.length - 2));
	var y = div.css('top');
	y = parseInt(y.substring(0,y.length - 2));

	return [x,y];
}   
