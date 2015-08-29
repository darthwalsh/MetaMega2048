/// <reference path="lib/qunit.d.ts" />

QUnit.test( "game.shift", function( assert ) {
  var shiftsTo = function(from, to, modified) {
    var message = JSON.stringify(from) + "  ->   " + JSON.stringify(to);
    
    var game = new Game();
    game.shift(from);
    
    assert.deepEqual(from, to, message);

    assert.equal(game.modified, modified, "modified");
  };

  shiftsTo([0,0,0,0], [0,0,0,0]);

  shiftsTo([2,0,0,0], [2,0,0,0]);
  shiftsTo([0,2,0,0], [2,0,0,0], true);
  shiftsTo([0,0,2,0], [2,0,0,0], true);
  shiftsTo([0,0,0,2], [2,0,0,0], true);
  
  shiftsTo([2,2,0,0], [4,0,0,0], true);
  shiftsTo([0,2,0,2], [4,0,0,0], true);
  
  shiftsTo([4,2,0,0], [4,2,0,0]);
  shiftsTo([4,2,0,2], [4,4,0,0], true);
  
  shiftsTo([0,2,4,2], [2,4,2,0], true);
  shiftsTo([2,0,4,2], [2,4,2,0], true);
  shiftsTo([2,4,0,2], [2,4,2,0], true);
  shiftsTo([2,4,2,0], [2,4,2,0]);
  
  shiftsTo([0,2,2,2], [4,2,0,0], true);
  shiftsTo([2,0,2,2], [4,2,0,0], true);
  shiftsTo([2,2,0,2], [4,2,0,0], true);
  shiftsTo([2,2,2,0], [4,2,0,0], true);

  shiftsTo([2,4,2,2], [2,4,4,0], true);
  shiftsTo([2,4,8,2], [2,4,8,2]);
});

function makeGame(s) {
    var game = new Game();
    for(var i = 0; i < 16; ++i)
      game.grid[i%4][Math.floor(i/4)] = +s[i];
    return game;
}

QUnit.test( "game.dirs", function( assert ) {
  var dir = function(from, to, f) {
    assert.equal(from.length, 16, f + " from.length");
    assert.equal(to.length, 16, f + " from.length");
    
    var game = makeGame(from);
      
    var expected = [[],[],[],[]];
    for(var i = 0; i < 16; ++i)
      expected[i%4][Math.floor(i/4)] = +to[i];
    
    game[f]();
    
    assert.deepEqual(game.grid, expected, f);
  };
  
  dir("\
0000\
0000\
0020\
0000","\
0000\
0000\
2000\
0000",
  "left"
  );

  dir("\
0000\
0000\
2020\
0000","\
0000\
0000\
4000\
0000",
  "left"
  );

  dir("\
0000\
0000\
0020\
0000","\
0000\
0000\
0002\
0000",
  "right"
  );

  dir("\
0000\
0000\
0020\
0000","\
0020\
0000\
0000\
0000",
  "up"
  );

  dir("\
0000\
0000\
0020\
0000","\
0000\
0000\
0000\
0020",
  "down"
  );
});

QUnit.test( "game.gameover", function( assert ) {
  var dir = function(from, to, f) {
    assert.equal(from.length, 16, f + " from.length");
    assert.equal(to.length, 16, f + " from.length");
    
    var game = makeGame(from);
      
    var expected = [[],[],[],[]];
    for(var i = 0; i < 16; ++i)
      expected[i%4][Math.floor(i/4)] = +to[i];
    
    game[f]();
    
    assert.deepEqual(game.grid, expected, f);
  };
  
  assert.notOk(makeGame("\
0000\
0000\
0020\
0000").gameOver(), "simple game");

    assert.notOk(makeGame("\
2424\
4242\
2428\
4244").gameOver(), "can move right");

    assert.notOk(makeGame("\
2424\
4242\
2424\
4284").gameOver(), "can make down");

    assert.ok(makeGame("\
2424\
4242\
2424\
4242").gameOver(), "can't move'");
});
