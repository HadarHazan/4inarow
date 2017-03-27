define(function(require) {
    var Game = require('Game')
    var Board = require('Board')
    var DomView = require('DomView')
    
    //console.log(Game)
//    var g=new Game('1','2')
//    g.startGame()
    
    var N = 6
    var M = 7
    var player1 = '1'
    var player2 = '2'
    var modal = new Board(N, M)
    var consoleView = new DomView()
    var controller = new Game(player1, player2, modal, consoleView);
// change the state of the modal
    controller.startGame()
    
    
})

//const b = Board(4, 4)
//const PLAYER1 = '1'
//b.draw()
//b.insertChip('1', 0)
//b.insertChip('2', 1)
//b.insertChip('1', 0)
//b.insertChip('2', 1)
//b.insertChip('1', 0)
//b.insertChip('2', 1)
//b.insertChip('1', 0)
//b.draw()