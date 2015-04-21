var Cuadrito = Cuadrito || {};

var lines = {};

Cuadrito.Game = function(game){

};

Cuadrito.Game.prototype.create = function(){
  var hPixels = 31;//ancho de la imagen
  var vPixels = 3;//alto de la imagen

  var cuadritoSize = 10;//tamaño del cuadrito

  var x = {
    initial : 50,
    variable : 50,
    auxiliar : 50 + vPixels
  };
  var y = {
    initial : 50,
    variable : 50,
    auxiliar : 50
  };

  for (var i = 0; i <= cuadritoSize; i++) {
    for (var h = 0; h < cuadritoSize; h++) {
      var lineH = this.game.add.image(x.variable, y.auxiliar, 'linea');
      enableInput(lineH);
      lineH.linePosition = "x|" + h + "|" +i;
      lines[lineH.linePosition] = 0;
      x.variable += hPixels;
    };
    x.variable = x.initial;
    y.auxiliar += hPixels;

    for (var v = 0; v < cuadritoSize; v++) {
      var lineV = this.game.add.image(x.auxiliar, y.variable, 'linea');
      lineV.angle = 90;
      enableInput(lineV);
      lineV.linePosition = "y|" + v + "|" +i;
      lines[lineV.linePosition] = 0;
      y.variable += hPixels;
    };
    y.variable = y.initial;
    if (i == cuadritoSize - 1)
      x.auxiliar -= vPixels;
    x.auxiliar += hPixels;
  };
};

function enableInput(object){
  object.inputEnabled = true;
  object.input.useHandCursor = true;
  object.events.onInputOver.add(changeColor, object);
  object.events.onInputOut.add(changeColor, object);
  object.events.onInputDown.add(selectLine, object);
}

function changeColor(){
  if (this.input.pointerOut() == true)
    this.tint = 0xffffff;
  else
    this.tint = 0xff0000;
}

function selectLine(){
  //console.log("selectLine " + this.linePosition + " is enabled " + lines[this.linePosition]);
  this.inputEnabled = false;
  this.input.useHandCursor = false;
  this.events.onInputOver.removeAll();//dispose()
  this.events.onInputOut.removeAll();//dispose()
  this.events.onInputDown.removeAll();//dispose()

  lines[this.linePosition] = 1;
  validateCuadrito(this.linePosition);
}

function validateCuadrito(linePosition){
  var position = linePosition.split("|");
  var x = parseInt(position[1]);
  var y = parseInt(position[2]);
  var res = 0;
  var baseAxis;
  var contraryAxis;
  if (position[0] == "x"){
    baseAxis = "x";
    contraryAxis = "y";
  } else {
    baseAxis = "y";
    contraryAxis = "x";
  }
  res = isLineUsed([baseAxis,x,y-1]) + isLineUsed([contraryAxis,y-1,x]) + isLineUsed([contraryAxis,y-1,x+1]);
  if (res == 3){
    console.log("Cuadrito!!!");
  }
  res = isLineUsed([baseAxis,x,y+1]) + isLineUsed([contraryAxis,y,x]) + isLineUsed([contraryAxis,y,x+1]);
  if (res == 3){
    console.log("Cuadrito!!!");
  }
}

function isLineUsed(values){
  var line = lines[values.join("|")];
  if (line == undefined)
    return 0;
  return parseInt(line);
}

Cuadrito.Game.prototype.update = function(){
};