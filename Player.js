
function Player(header, number)
{
	this.score=0;
	this.header=header;

	this.container=document.createElement('div');
	this.text=document.createElement("div");
	this.text.className="playerText";
	var text="Player "+number+" score:";
	var node = document.createTextNode(text);
	this.text.appendChild(node);
	this.element=document.createElement('div');
	this.element.className="player";
	this.element.innerHTML=this.score;
	this.container.appendChild(this.text);
	this.container.appendChild(this.element);
	this.header.appendChild(this.container);
}

Player.prototype.incrementScore=function()
{
	this.score++;
	this.element.innerHTML=this.score;
}