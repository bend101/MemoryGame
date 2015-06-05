
function Card (frontImageNumber, cell)
{
	this.cell=cell;
	this.frontImageNumber=frontImageNumber;
	this.frontImage="url('images/"+frontImageNumber+".png')";
	this.backImage="url('images/back.png')";
	this.value=null;
	this.frontShowing=false;

	this.front=document.createElement("div");
	this.front.id="front";
	this.front.className="frontDiv";
	this.front.style.backgroundImage=this.frontImage;
	this.cell.appendChild(this.front);

	this.back=document.createElement("div");
	this.back.id="back";
	this.back.className="backDiv";
	this.back.style.backgroundImage=this.backImage;
	this.cell.appendChild(this.back);

	this.workOutValue();
}

Card.prototype.workOutValue=function()
{
	if (this.frontImageNumber>0 && this.frontImageNumber<10)
	{
		this.value=this.frontImageNumber+1;
	}
	switch(this.frontImageNumber)
	{
		case 0:
			this.value = "A";
			break;
		case 10:
			this.value = "J";
			break;
		case 11:
			this.value = "Q";
			break;
		case 12:
			this.value = "K";
			break;
	}
};

Card.prototype.flipCard=function()
{
	if (this.frontShowing===false)
	{
		this.back.style.transform = "perspective(600px) rotateY(-180deg)";
		this.front.style.transform = "perspective(600px) rotateY(0deg)";
		this.back.style.webkitTransform = "perspective(600px) rotateY(-180deg)";
		this.front.style.webkitTransform = "perspective(600px) rotateY(0deg)";
		this.frontShowing=true;
	}
	else
	{
		this.back.style.transform = "perspective(600px) rotateY(0deg)";
		this.front.style.transform = "perspective(600px) rotateY(-180deg)";
		this.back.style.webkitTransform = "perspective(600px) rotateY(0deg)";
		this.front.style.webkitTransform = "perspective(600px) rotateY(-180deg)";
		this.frontShowing=false;
	}
};

Card.prototype.getValue=function()
{
	return this.value;
};