"use strict";

function $(id) { return document.getElementById(id); }
function create(el) { return document.createElement(el); }

// http://stackoverflow.com/a/8023734/771768
// 0 <= h, s, v <= 1
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    return "#"+(r).toString(16)+(g).toString(16)+(b).toString(16);
}

function getColor(n) {
  if (n == 0)
    return "white";

  var l = 15 - (Math.log2(n) % 10);
  return HSVtoRGB(l/20, 0.5, 0.5);
}
  
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
      for(var y = 0; y < 4; ++y) {
        var n = game.grid[x][y];
        grid[x][y].innerText = n || " ";
        grid[x][y].style.backgroundColor = getColor(n);
      }
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
      default:
        return;
    }
    
    if (game.modified) {
      game.addElem();

      render();
    }

    if (game.win()) {
      alert("Winner!");
      document.onkeydown = null;
    } else if (game.lose()) {
      alert("loser...");
      document.onkeydown = null;
    }
    

  };
};