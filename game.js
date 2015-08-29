"use strict";

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
    for (var y = 0; y < 4; ++y) {
      var temp = this.grid.map(function(a) { return a[y]});
      this.shift(temp);
      temp.map(function(x, i) { this.grid[i][y] = x; }, this);
    }
  },
  right: function() {
    this.grid.reverse();
    this.left();
    this.grid.reverse();
  },
  up: function() {
    this.grid.map(function(a) { this.shift(a); }, this);
  },
  down: function() {
    this.grid.map(function(a) { 
      a.reverse();
      this.shift(a);
      a.reverse();
    }, this);
  },
   
  shift: function(arr) {
    for (var from = 0, to = 0; from < 4; ++from) {
      if (from == to)  continue;
      
      var f = arr[from];
      if (!f) continue;
      
      var t = arr[to];
      if (t == 0 || t == f) {
        arr[to] += f;
      } else {
        ++to;
        if (from == to)  continue;
        arr[to] = f;
      }
      
      arr[from] = 0;
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




