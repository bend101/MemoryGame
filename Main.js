var firstClick=true;

function Main(container, header)
{
	this.container = container;
	this.header = header;

	this.arrayOfValuesClicked = [];
	this.arrayOfCellsClicked = [];
	this.arrayForRandomise = [];
	this.arrayCells = [];
	this.count = 0;
	this.player = 1;
	this.playersArray = [];
	this.cardsFlippedScore=0;

	for (var i = 0; i < 2; i++)
	{
		for (var j = 0; j < 13; j++)
		{
			var imageNumber = this.getRandomNumber();

			var cell = new Cell(this.onCellClick.bind(this), imageNumber, this.container, this, (i * 13) + j);
			this.arrayCells.push(cell);
		}
		this.arrayForRandomise = [];
		container.style.clear = "left";

	}

	this.player1 = new Player(this.header, 1);
	this.playersArray.push(this.player1);
	this.player2 = new Player(this.header, 2);
	this.playersArray.push(this.player2);
}

Main.prototype.animateCards = function (row, col)
{
	var screenWidth=window.innerWidth;
	console.log("width is "+screenWidth);
	var leftOver=screenWidth%120;
	var leftMargin=leftOver/2;

	for (var i = 0; i < this.arrayCells.length; i++)
	{
		var element = this.arrayCells[i].element;
		//console.log(i);
		var x = leftMargin + (col * 120);
		var header=this.header.getBoundingClientRect();
		console.log(header.height);
		var y = row * 175 + (header.height+10);
		var rect = element.getBoundingClientRect();
		element.style.top=rect.top+"px"; // set initial position for transition


		this.makeTimeout(i, element, x, y);

		if (x + 240 < window.innerWidth)                                       //if card doesnt go other edge
		{
			col++;
		}
		else                                                                //if card goes other edge, new row
		{
			row = row + 1;
			col = 0;
			//setTimeout(this.animateCards.bind(this, (y+1), 0, i), 500);
		}
	}

}

Main.prototype.makeTimeout = function (index, element, x, y)
{
	setTimeout(function ()
		{
			var rect = element.getBoundingClientRect();
			element.style.top = (rect.top + y) + "px";
			element.style.left = x + "px";
		}.bind(this)
		, (index * 100));

}

Main.prototype.addToScore = function (playerNumber)
{
	if (playerNumber === 1)
	{
		this.playersArray[0].incrementScore();
	}
	else
	{
		this.playersArray[1].incrementScore();
	}
}

Main.prototype.getRandomNumber = function ()
{
	console.log("hello");
	var number = Math.floor(Math.random() * 13);
	if (this.arrayForRandomise.indexOf(number) === -1)
	{
		this.arrayForRandomise.push(number);
		return number;
	}
	else
	{
		return this.getRandomNumber();
	}

}

Main.prototype.switchPlayer = function ()
{
	if (this.player === 1)
	{
		this.player = 2;
	}
	else
	{
		this.player = 1;
	}
}


Main.prototype.onCellClick = function (value, cell)
{
	if (firstClick===true)
	{
		this.animateCards(0, 0);
		firstClick=false;
	}
	else
	{

		this.arrayOfValuesClicked.push(value);
		this.arrayOfCellsClicked.push(cell);
		this.count += 1;
		cell.flipCard();

		var isEven = (this.count % 2 == 0);

		if (isEven)
		{
			this.compare();
		}
	}
}


Main.prototype.compare = function ()
{
	var arrayLength = this.arrayOfValuesClicked.length;
	var lastValue = this.arrayOfValuesClicked[arrayLength - 1];
	var oneBeforeLastValue = this.arrayOfValuesClicked[arrayLength - 2];

	var lastCell = this.arrayOfCellsClicked[arrayLength - 1];
	var oneBeforeLastCell = this.arrayOfCellsClicked[arrayLength - 2];

	if (lastValue === oneBeforeLastValue)                                   //cards match
	{
		lastCell.disableCell();
		oneBeforeLastCell.disableCell();
		this.addToScore(this.player);
		console.log(this.cardsFlippedScore);
		this.switchPlayer();
		this.cardsFlippedScore += 2;
		if (this.cardsFlippedScore===26)
		{
			setTimeout(function()
			{
				var popup = confirm("Do you want to replay");
				if (popup === true)
				{
					location.reload();
				}
			},1000);
		}
	}
	else
	{
		setTimeout(function ()
		{
			lastCell.flipCard();   // cards dont match
			oneBeforeLastCell.flipCard();

		}, 1500);
		this.switchPlayer();
		console.log(this.player);

	}
}