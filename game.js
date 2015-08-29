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
    this.modified = false;
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
    this.modified = false;
    this.grid.map(function(a) { this.shift(a); }, this);
  },
  down: function() {
    this.modified = false;
    this.grid.map(function(a) { 
      a.reverse();
      this.shift(a);
      a.reverse();
    }, this);
  },
   
  shift: function(arr) {
    for (var from = 0, to = 0; from < 4; ++from) {
      if (from == to) continue;
      
      var f = arr[from];
      if (!f) continue;
      
      var t = arr[to];
      if (t == 0) {
        arr[to] += f;
      } else if (t == f) {
        arr[to] += f;
        ++to;
      } else {
        ++to;
        if (from == to) continue;
        arr[to] = f;
      }
      
      this.modified = true;
      
      arr[from] = 0;
    }
  },

  addElem: function() {
    var x, y;
    
    do {
      x = Math.floor(Math.random() * 4);
      y = Math.floor(Math.random() * 4);
    } while (this.grid[x][y]);
    
    var chance = Math.random();
    this.grid[x][y] = chance < 0.8 ? 2 : 4;
  },
  
  lose: function() {
    var orig = JSON.stringify(this.grid);
    
    var m = false;
    this.left();
    m = m || this.modified;
    this.right();
    m = m || this.modified;
    this.up();
    m = m || this.modified;
    this.down();
    m = m || this.modified;
    
    this.grid = JSON.parse(orig);
    
    return !m;
  },
  
  win: function() {
    return this.grid.some(function (arr) {
      return arr.indexOf(2048) != -1;
    })
  }
};




