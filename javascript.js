function init(){
	console.log(">>Hidden all divs except 1st and last");
	divElements = document.querySelectorAll("div");
	for (var i = 1; i < divElements.length-1; i++) {

		divElements[i].backgroundImage="";
		divElements[i].onmouseout=unHintCard;
		divElements[i].style.display = "none";
	}
}

function gameReady(){
		for (var i = 1; i < divElements.length-1; i++) {
		divElements[i].onmouseover=hintCard; 
	}
}

function startGame(players){
	if (players == 2){
		window.player = 1;
		console.log(">>Game started for 2 players");
		hidebuttons();
		function wait(){	//codigo improvisado para que no empiece el juego antes de que esté pintado el tablero
			console.log(">>Waiting");
			setTimeout(continueExecution, 1000) //wait before continuing
		}
		function continueExecution(){ //wait till table is drawn
			console.log(">>Continuing execution");
			//functions are called from here from now on
			genTemp();
			gameReady();

		}
		wait();
		paintGrid();

	}
}

function hidebuttons(){
	aElements = document.querySelectorAll("a");
	pElements = document.querySelectorAll("p");
	aElements[0].style.display = "none";
	aElements[1].style.display = "none";
	aElements[2].style.display = "none";
	pElements[0].style.display = "none";
}

function paintGrid(){
	console.log(">>Started drawing grid")
	divElements = document.querySelectorAll("div");
	i=1;
	var timer = setInterval(draw,35);
	function draw(){ //un for un poco manual pero bueno
		divElements[i].style.display = "inline";
		i++;
		console.log(">>>>Draw function called by interval");
		if (i == divElements.length-1){
		clearInterval(timer);
		}
	}
}

function genTemp(){
	window.temp = Math.floor(Math.random() * 3) + 1;
	switch ( temp ){
		case 1:
			tempColor = "#aef5ff";
			break;
		case 2:
			tempColor = "#aeffbf";
			break;
		case 3:
			tempColor =	"#ffbb73";
			break;
	}
	console.log(">>Temp is "+ temp + " " + tempColor);
}

function hintCard(event){
	this.onclick=setCard;	//pongo el onclick aqui para evitar que el jugador pueda colocar una carta antes de hacer hover
	//me ha pasado en dos ocasiones, cuando el div se genera encima del puntero al iniciar la partida o cuando el ordenador funciona lento.
	this.style.outline = tempColor + " 3.8px solid";
	this.style.backgroundImage = "url('" +  "card" + player + ".png')";
	this.style.opacity = "0.3";
}

function unHintCard(event){
	this.style.outline = "#4b6d85 1.8px dashed";
	this.style.backgroundImage = "";
	this.style.opacity = "1";
}

function setCard(event){
	
	console.log(">>Player "+ player +" has played a card in " + this.id);
	this.style.backgroundImage = "url('" + "card" + player + ".png')";
	this.style.opacity = "1";
	this.onmouseover="";
	this.onmouseout="";
	this.onclick="";
	checkSurroundingCards(this)
	genTemp();
	checkVictory();
	if ( player == 1 ){
		player = 2
	}else{
		player = 1
	}
	;
}

function checkVictory(){
		var emptySpaces = 0;
		divElements = document.querySelectorAll("div");
		for (var i = 1; i < divElements.length-1; i++) {
			if (divElements[i].style.backgroundImage == ""){
				emptySpaces ++;
		}
	}
	console.log(">>Counting emtpy spaces on table ... " + emptySpaces);
	if ( emptySpaces == 0 ){
		var p1Points = 0;
		var p2Points = 0;
		for (var i = 1; i < divElements.length-1; i++) {
		console.log(divElements[i].style.backgroundImage);
				if (divElements[i].style.backgroundImage == 'url("card1.png")'){
					p1Points ++;
			}
		}
		for (var i = 1; i < divElements.length-1; i++) {
				if (divElements[i].style.backgroundImage == 'url("card2.png")'){
					p2Points ++;
			}
		}

	alert("GAME OVER! Player1: " + p1Points +" points.  Player 2: " + p2Points +" points.");
	location.reload(); 
	}
}

function checkSurroundingCards(that){ //esta función es terrible y debería ser substituida por
 //una función más simple cuando aprendamos a usar objetos. 
 //Pero esa es la ventaja de trabajar con código dividido por funciones, 
 //puedes reemplazar una cuando quieras.
	divElements 	= document.querySelectorAll("div");
	var top 		= that.id.substr(4) - 5;
	var bottom 		= +that.id.substr(4) + 5;
	var left 		= that.id.substr(4) - 1;
	var right 		= +that.id.substr(4) + 1;
	console.log(">>Surrounding cards are "+ top + " " + bottom + " " + left + " " + right);

	if ( top > 0){
		if ( temp == 1 /*cold*/){
			var i = 0;

			if ( divElements[top].style.outline == "3.8px solid rgb(255, 187, 115)"/*hot*/ ){
				//neutralize temperature
				divElements[top].style.outline = "3.8px solid rgb(174, 255, 191";
				that.style.outline = "3.8px solid rgb(174, 255, 191)";
				i = 1;
				console.log(">>>>Cold + hot touch top!");
				console.log(">>>>Cards neutralized");

			}

			if ( divElements[top].style.outline == "3.8px solid rgb(174, 245, 255)"/*cold*/ && i == 0 ){
				//freeze and destroy cards
				divElements[top].onmouseover=hintCard;
				divElements[top].onmouseout=unHintCard;
				divElements[top].onclick=setCard;
				divElements[top].style.outline = "#4b6d85 1.8px dashed";
				divElements[top].style.backgroundImage = "";
				divElements[top].style.opacity = "1";

				that.onmouseover=hintCard;
				that.onmouseout=unHintCard;
				that.onclick=setCard;
				that.style.outline = "#4b6d85 1.8px dashed";
				that.style.backgroundImage = "";
				that.style.opacity = "1";

				console.log(">>>>Cold + cold touch top!");
				console.log(">>>>Cards frozen!");

			}

			if ( divElements[top].style.outline == "3.8px solid rgb(174, 255, 191)"/*neutral*/ && i == 0 ){
				console.log(">>>>Neutral + cold touch top!");
				console.log(">>>>Nothing ocurrs");
				
			} 
		}//end top cold

		if ( temp == 3 /*hot*/){
			var i = 0;

			if ( divElements[top].style.outline == "3.8px solid rgb(255, 187, 115)"/*hot*/ ){
				//burn and destroy cards
				divElements[top].onmouseover=hintCard;
				divElements[top].onmouseout=unHintCard;
				divElements[top].onclick=setCard;
				divElements[top].style.outline = "#4b6d85 1.8px dashed";
				divElements[top].style.backgroundImage = "";
				divElements[top].style.opacity = "1";

				that.onmouseover=hintCard;
				that.onmouseout=unHintCard;
				that.onclick=setCard;
				that.style.outline = "#4b6d85 1.8px dashed";
				that.style.backgroundImage = "";
				that.style.opacity = "1";

				console.log(">>>>Hot + hot touch top");
				console.log(">>>>Cards burned!");

			}

			if ( divElements[top].style.outline == "3.8px solid rgb(174, 245, 255)"/*cold*/ && i == 0 ){
				//neutralize temperature
				divElements[top].style.outline = "3.8px solid rgb(174, 255, 191";
				that.style.outline = "3.8px solid rgb(174, 255, 191)";
				i = 1;
				console.log(">>>>Hot + cold touch top");
				console.log(">>>>Cards neutralized");

			}

			if ( divElements[top].style.outline == "3.8px solid rgb(174, 255, 191)"/*neutral*/ && i == 0 ){
				console.log(">>>>Hot + neutral touch top!");
				console.log(">>>>Nothing ocurrs");
				
			} 
		}//end top hot
	}//end top
	

	if ( right != 6 && right != 11 && right != 16 && right != 21 && right != 26){
		if ( temp == 1 /*cold*/){
			var i = 0;

			if ( divElements[right].style.outline == "3.8px solid rgb(255, 187, 115)"/*hot*/ ){
				//neutralize temperature
				divElements[right].style.outline = "3.8px solid rgb(174, 255, 191";
				that.style.outline = "3.8px solid rgb(174, 255, 191)";
				i = 1;
				console.log(">>>>Cold + hot touch right!");
				console.log(">>>>Cards neutralized");

			}

			if ( divElements[right].style.outline == "3.8px solid rgb(174, 245, 255)"/*cold*/ && i == 0 ){
				//freeze and destroy cards
				divElements[right].onmouseover=hintCard;
				divElements[right].onmouseout=unHintCard;
				divElements[right].onclick=setCard;
				divElements[right].style.outline = "#4b6d85 1.8px dashed";
				divElements[right].style.backgroundImage = "";
				divElements[right].style.opacity = "1";

				that.onmouseover=hintCard;
				that.onmouseout=unHintCard;
				that.onclick=setCard;
				that.style.outline = "#4b6d85 1.8px dashed";
				that.style.backgroundImage = "";
				that.style.opacity = "1";

				console.log(">>>>Cold + cold touch right!");
				console.log(">>>>Cards frozen!");

			}

			if ( divElements[right].style.outline == "3.8px solid rgb(174, 255, 191)"/*neutral*/ && i == 0 ){
				console.log(">>>>Neutral + cold touch right!");
				console.log(">>>>Nothing ocurrs");
				
			} 
		}//end right cold

		if ( temp == 3 /*hot*/){
			var i = 0;

			if ( divElements[right].style.outline == "3.8px solid rgb(255, 187, 115)"/*hot*/ ){
				//burn and destroy cards
				divElements[right].onmouseover=hintCard;
				divElements[right].onmouseout=unHintCard;
				divElements[right].onclick=setCard;
				divElements[right].style.outline = "#4b6d85 1.8px dashed";
				divElements[right].style.backgroundImage = "";
				divElements[right].style.opacity = "1";

				that.onmouseover=hintCard;
				that.onmouseout=unHintCard;
				that.onclick=setCard;
				that.style.outline = "#4b6d85 1.8px dashed";
				that.style.backgroundImage = "";
				that.style.opacity = "1";

				console.log(">>>>Hot + hot touch right");
				console.log(">>>>Cards burned!");

			}

			if ( divElements[right].style.outline == "3.8px solid rgb(174, 245, 255)"/*cold*/ && i == 0 ){
				//neutralize temperature
				divElements[right].style.outline = "3.8px solid rgb(174, 255, 191";
				that.style.outline = "3.8px solid rgb(174, 255, 191)";
				i = 1;
				console.log(">>>>Hot + cold touch right");
				console.log(">>>>Cards neutralized");

			}

			if ( divElements[right].style.outline == "3.8px solid rgb(174, 255, 191)"/*neutral*/ && i == 0 ){
				console.log(">>>>Hot + neutral touch right!");
				console.log(">>>>Nothing ocurrs");
				
			} 
		}//end right hot
	}//end right

	if ( left != 0 && left != 5 && left != 10 && left != 15 && left != 20){
		if ( temp == 1 /*cold*/){
			var i = 0;

			if ( divElements[left].style.outline == "3.8px solid rgb(255, 187, 115)"/*hot*/ ){
				//neutralize temperature
				divElements[left].style.outline = "3.8px solid rgb(174, 255, 191";
				that.style.outline = "3.8px solid rgb(174, 255, 191)";
				i = 1;
				console.log(">>>>Cold + hot touch left!");
				console.log(">>>>Cards neutralized");

			}

			if ( divElements[left].style.outline == "3.8px solid rgb(174, 245, 255)"/*cold*/ && i == 0 ){
				//freeze and destroy cards
				divElements[left].onmouseover=hintCard;
				divElements[left].onmouseout=unHintCard;
				divElements[left].onclick=setCard;
				divElements[left].style.outline = "#4b6d85 1.8px dashed";
				divElements[left].style.backgroundImage = "";
				divElements[left].style.opacity = "1";

				that.onmouseover=hintCard;
				that.onmouseout=unHintCard;
				that.onclick=setCard;
				that.style.outline = "#4b6d85 1.8px dashed";
				that.style.backgroundImage = "";
				that.style.opacity = "1";

				console.log(">>>>Cold + cold touch left!");
				console.log(">>>>Cards frozen!");

			}

			if ( divElements[left].style.outline == "3.8px solid rgb(174, 255, 191)"/*neutral*/ && i == 0 ){
				console.log(">>>>Neutral + cold touch left!");
				console.log(">>>>Nothing ocurrs");
				
			} 
		}//end left cold

		if ( temp == 3 /*hot*/){
			var i = 0;

			if ( divElements[left].style.outline == "3.8px solid rgb(255, 187, 115)"/*hot*/ ){
				//burn and destroy cards
				divElements[left].onmouseover=hintCard;
				divElements[left].onmouseout=unHintCard;
				divElements[left].onclick=setCard;
				divElements[left].style.outline = "#4b6d85 1.8px dashed";
				divElements[left].style.backgroundImage = "";
				divElements[left].style.opacity = "1";

				that.onmouseover=hintCard;
				that.onmouseout=unHintCard;
				that.onclick=setCard;
				that.style.outline = "#4b6d85 1.8px dashed";
				that.style.backgroundImage = "";
				that.style.opacity = "1";

				console.log(">>>>Hot + hot touch left");
				console.log(">>>>Cards burned!");

			}

			if ( divElements[left].style.outline == "3.8px solid rgb(174, 245, 255)"/*cold*/ && i == 0 ){
				//neutralize temperature
				divElements[left].style.outline = "3.8px solid rgb(174, 255, 191";
				that.style.outline = "3.8px solid rgb(174, 255, 191)";
				i = 1;
				console.log(">>>>Hot + cold touch left");
				console.log(">>>>Cards neutralized");

			}

			if ( divElements[left].style.outline == "3.8px solid rgb(174, 255, 191)"/*neutral*/ && i == 0 ){
				console.log(">>>>Hot + neutral touch left!");
				console.log(">>>>Nothing ocurrs");
				
			} 
		}//end left hot
	}//end left


	if ( bottom < 25 ){
		if ( temp == 1 /*cold*/){
			var i = 0;

			if ( divElements[bottom].style.outline == "3.8px solid rgb(255, 187, 115)"/*hot*/ ){
				//neutralize temperature
				divElements[bottom].style.outline = "3.8px solid rgb(174, 255, 191";
				that.style.outline = "3.8px solid rgb(174, 255, 191)";
				i = 1;
				console.log(">>>>Cold + hot touch bottom!");
				console.log(">>>>Cards neutralized");

			}

			if ( divElements[bottom].style.outline == "3.8px solid rgb(174, 245, 255)"/*cold*/ && i == 0 ){
				//freeze and destroy cards
				divElements[bottom].onmouseover=hintCard;
				divElements[bottom].onmouseout=unHintCard;
				divElements[bottom].onclick=setCard;
				divElements[bottom].style.outline = "#4b6d85 1.8px dashed";
				divElements[bottom].style.backgroundImage = "";
				divElements[bottom].style.opacity = "1";

				that.onmouseover=hintCard;
				that.onmouseout=unHintCard;
				that.onclick=setCard;
				that.style.outline = "#4b6d85 1.8px dashed";
				that.style.backgroundImage = "";
				that.style.opacity = "1";

				console.log(">>>>Cold + cold touch bottom!");
				console.log(">>>>Cards frozen!");

			}

			if ( divElements[bottom].style.outline == "3.8px solid rgb(174, 255, 191)"/*neutral*/ && i == 0 ){
				console.log(">>>>Neutral + cold touch bottom!");
				console.log(">>>>Nothing ocurrs");
				
			} 
		}//end bottom cold

		if ( temp == 3 /*hot*/){
			var i = 0;

			if ( divElements[bottom].style.outline == "3.8px solid rgb(255, 187, 115)"/*hot*/ ){
				//burn and destroy cards
				divElements[bottom].onmouseover=hintCard;
				divElements[bottom].onmouseout=unHintCard;
				divElements[bottom].onclick=setCard;
				divElements[bottom].style.outline = "#4b6d85 1.8px dashed";
				divElements[bottom].style.backgroundImage = "";
				divElements[bottom].style.opacity = "1";

				that.onmouseover=hintCard;
				that.onmouseout=unHintCard;
				that.onclick=setCard;
				that.style.outline = "#4b6d85 1.8px dashed";
				that.style.backgroundImage = "";
				that.style.opacity = "1";

				console.log(">>>>Hot + hot touch bottom");
				console.log(">>>>Cards burned!");

			}

			if ( divElements[bottom].style.outline == "3.8px solid rgb(174, 245, 255)"/*cold*/ && i == 0 ){
				//neutralize temperature
				divElements[bottom].style.outline = "3.8px solid rgb(174, 255, 191";
				that.style.outline = "3.8px solid rgb(174, 255, 191)";
				i = 1;
				console.log(">>>>Hot + cold touch bottom");
				console.log(">>>>Cards neutralized");

			}

			if ( divElements[bottom].style.outline == "3.8px solid rgb(174, 255, 191)"/*neutral*/ && i == 0 ){
				console.log(">>>>Hot + neutral touch bottom!");
				console.log(">>>>Nothing ocurrs");
				
			} 
		}//end bottom hot
	}//end bottom

}
