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
     
    render();

  };
};


var Game = function() {
  this.grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
};

Game.prototype = {
  left: function() { 
    this.addElem();
  },
  right: function() {
    for (var y = 0; y < 4; ++y) {

      
    }
    
    this.addElem();
  },
  up: function() {
    this.addElem();
  },
  down: function() {
    this.addElem();
  },
   
  slide: function(arr) {
    for (var from = 0, to = 0; from < 4; ++from) {
      if (from == to)  continue;
      
      var f = arr[from];
      if (!f) continue;
      
      var t = arr[to];
      if (t == 0 || t == f) {
        arr[to] += f;
      } else {
        ++to;
        arr[to] = f;
      }
    }
  },

  addElem: function() {
    var count = 0;
    var x, y;
    
    do {
      if(count++ == 16) {
        alert("loser");
        return;
      }
      x = Math.floor(Math.random() * 4);
      y = Math.floor(Math.random() * 4);
    } while (this.grid[x][y]);
    
    var chance = Math.random();
    this.grid[x][y] = chance < 0.8 ? 2 : 4;
  }
};




