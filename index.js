"use strict";

function $(id) { return document.getElementById(id); }
function create(el) { return document.createElement(el); }

window.onload = function() {
  var table = $("grid");

  var grid = [[],[],[],[]];
  
  for(var y = 0; y < 4; ++y) {
    var tr = create("tr");
    
    for(var x = 0; x < 4; ++x) {
      var cell = create("td");
  
      tr.appendChild(cell);
      grid[x][y]=cell;
    }
    
    table.appendChild(tr);
  }
  
  var game = new Game();
  
  var render = function() {
    for(var x = 0; x < 4; ++x)
      for(var y = 0; y < 4; ++y)
        grid[x][y].innerText = game.grid[x][y] || " ";
  };

  game.addElem();
  render();
  
  document.onkeydown = function(e) {
    switch(e.keyCode) {
      case 37:
        game.left();
        break;
      case 38:
        game.up();
        break;
      case 39:
        game.right();
        break;
      case 40:
        game.down();
        break;
    }
    
    if (game.gameOver()) {
      alert("loser");
    } else {
      game.addElem();
    }
    
    render();

  };
};