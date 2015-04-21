window.onload = function () {
  var height = 768;
  var width = 1024;
  // var game = new Phaser.Game(height*4/3, height, Phaser.AUTO);
  var game = new Phaser.Game(width, height, Phaser.AUTO);
  
  game.state.add('Boot', Cuadrito.Boot);
  game.state.add('Preloader', Cuadrito.Preloader);
  game.state.add('StartScreen', Cuadrito.StartScreen);
  game.state.add('MainMenu', Cuadrito.MainMenu);
  game.state.add('Game', Cuadrito.Game);

  game.state.start('Boot');
};