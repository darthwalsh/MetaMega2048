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

  var h = (Math.log2(n) % 12) / 12;
  return HSVtoRGB(h, 0.5, 0.7);
}

function getSize(n) {
  switch (n.toString().length) {
    case 1: return "22px";
    case 2: return "20px";
    case 3: return "17px";
    case 4: return "13px";
    default: return "11px";
  }
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
        grid[x][y].style.fontSize = getSize(n);
      }
  };

  if (true) {
    game.addElem();
  } else {   // Debug appearence
    game.grid[0][0] = 0;
    game.grid[1][0] = 2;
    game.grid[2][0] = 4;
    game.grid[3][0] = 8;
    game.grid[0][1] = 128;
    game.grid[1][1] = 64;
    game.grid[2][1] = 32;
    game.grid[3][1] = 16;
    game.grid[0][2] = 256;
    game.grid[1][2] = 512;
    game.grid[2][2] = 1024;
    game.grid[3][2] = 2048;
    game.grid[0][3] = 2048 * 16;
    game.grid[1][3] = 2048 * 8;
    game.grid[2][3] = 2048 * 4;
    game.grid[3][3] = 2048 * 2;
  }
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