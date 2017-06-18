//Module
define(function(require) {
    
    var Board = require('Board')

    class Game {  
       constructor(player1, player2, m, v) {
        this.player1 = player1
        this.player2 = player2
        //this.board = new Board(N,)
        this.view = v
        this.modal = m
        this.view.addObserver(this);
        this.currntPlayer = this.player1  
      } 
    };

    Game.prototype.startGame = function() {
        this.modal.initialize()
        this.view.resetTable()
        this.view.display(this.modal.boardArr)
        this.view.setPlayer(this.currntPlayer)
    }
    
    Game.prototype.play = function(i, j)
    {
        var winStatus = this.modal.checkWinner(i, j, this.currntPlayer)
        this.view.updateStatus(winStatus)
        this.switchPlayer()
    }
    
    Game.prototype.switchPlayer = function() {
        var player
        if(this.currntPlayer === this.player1){
            player = this.player2
        } else {
            player = this.player1
        }
        
        this.currntPlayer = player
        this.view.setPlayer(player)
    }
        
    return Game
})

