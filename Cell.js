
function Cell(fnCellClickCallback, cardNumber, container, main, numberInPack)
{
	this.main=main;
	this.callBack=fnCellClickCallback;
	this.numberInPack=numberInPack;

	this.element=document.createElement('div');
	this.boundFunction=this.onClick.bind(this);
	this.element.addEventListener('mousedown',this.boundFunction);
	this.element.style.width="116px";
	this.element.style.height="171px";

	this.element.style.position="absolute";
	this.element.style.top="0px";
	this.element.style.left=(window.innerWidth/2-58)+"px";
	this.element.className="cell";
	container.appendChild(this.element);

	this.card=new Card(cardNumber, this.element);
}

Cell.prototype.onClick=function()
{
	var value=this.card.getValue();
	this.callBack(value,this);
}

Cell.prototype.disableCell=function()
{
	this.element.removeEventListener('mousedown',this.boundFunction)
}

Cell.prototype.flipCard=function()
{
	this.card.flipCard();
}

