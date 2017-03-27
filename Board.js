//Module

define(function() {
    
    class Board {
      constructor(N = 6, M = 7) {
        this.N = N
        this.M = M
        //this.controller = game
        this.boardArr = []
        this.listeners = [] 
      }
    }

    // All interested parties get notified of change
    Board.prototype.notifyAllObservers = function(winStatus){    
        var i;
            for(i = 0; i < this.listeners.length; i++){
                this.listeners[i].notify(winStatus);
            }
    }
    
    // All interested parties are stored in an array of list
    Board.prototype.addObserver = function(listener){
            this.listeners.push(listener);
    }
    
    Board.prototype.initialize = function(){
        for (var i=0; i<this.N; i++) {
            this.boardArr[i] = []
            for(var j=0; j<this.M; j++) {
                this.boardArr[i][j] = 'X'
            }
       }
    }

    Board.prototype.checkWinner = function(i, j, player){
        this.insertChip (i, j, player)
        let count = 0
        var n, m

        for (n = this.N -1 ; n>=0; n--) {
            if (this.boardArr[n][j] !== player) {
                count = 0
            } else {
                count++
                if (count === 4)
                    return (true)
            }
        }

        for (m = 0; m<this.M; m++) {
            if (this.boardArr[i][m] !== player) {
                count = 0
            } else {
                count++
                if (count === 4)
                    return (true)
            }
        }
        
        if (i <= j){
            n = 0
            m = j-i
        } else {
            m = 0
            n = i-j
        }
        
        count = 0    
        while (n < this.N && m < this.M)
        {
            if (this.boardArr[n][m] !== player){
                count = 0
            } else {
                count++
                if (count === 4)
                    return (true)
            }
            
            n++
            m++
        }
        
        if (i < this.M-1-j){
            n = 0
            m = j+i
        } else {
            m = this.M -1
            n = i + (m -j)
        }
        
        count = 0    
        while (n < this.N && m >= 0)
        {
            if (this.boardArr[n][m] !== player){
                count = 0
            } else {
                count++
                if (count === 4)
                    return (true)
            }
            
            n++
            m--
        }
            
            
        return (false)
    }
    
    Board.prototype.insertChip = function(i, j, player){
        this.boardArr[i][j] = player
       // this.notifyAllObservers(bool);
    }
    
    return Board
})




//
//    Board.prototype.drow = function(){
//    //    console.log(this.arr)
//    //    console.log()
//        for (var i=0; i<this.M; i++) {
//            var td = document.createElement("td")
//            td.id = i
//            for(var j=0; j<this.N; j++) {
//                var tr = document.createElement("tr")
//                var node = document.createTextNode(this.arr[j][i])
//                tr.appendChild(node)
//                td.appendChild(tr)
//            }
//       
//            document.getElementById("tblBoard").appendChild(td)
//            //td.addEventListener("click", function() {insertChip(td)}, true)    
//        }
//        
//        this.addColumnHandlers()
//    }                            
    



//    Board.prototype.insertChip = function(J){
////        for (var i = this.N-1; i>=0; i--) {
////                if(this.arr[i][j] === 'X') {
////                    this.arr[i][j] = tag
////                    this.CheckWinner(tag, i, j)
////                    break
////                }
////        }
//        //var columns = this.table.getElementsByTagName('td')
//        var column = J
//        var rows = column.childNodes
//        for (i = rows.length-1; i >= 0; i-- ) {
//            if ((rows[i]).innerHTML === 'X')
//                {
//                    (rows[i]).innerHTML = '1'
//                    this.arr[i][J] = '1'
//                    break
//                }     
//        }
//    }
