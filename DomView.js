define(function() {
    
    function DomView() {
        //this.controller = game;
        //this.modal = board
        this.table = document.getElementById('tblBoard')
        this.listeners = [] 
    
        this.resetTable = function(){
            this.table.innerHTML = ''
            document.getElementById("status").innerHTML = ''
        }
    
        // All interested parties are stored in an array of list
        this.addObserver = function(listener){
            this.listeners.push(listener)
        }
        
        this.setPlayer = function (player){
            document.getElementById("Player").innerHTML = 'current player: ' + player
            this.currntPlayer = player
        }
        
        this.display = function (arr) {
            for (var i=0; i<arr[0].length; i++) {
                var td = document.createElement("td")
                td.tagName = i
                for(var j=0; j<arr.length; j++) {
                    var tr = document.createElement("tr")
                    var node = document.createTextNode(arr[j][i])
                    tr.appendChild(node)
                    td.appendChild(tr)
                }

                document.getElementById("tblBoard").appendChild(td)  
            }

            this.addColumnHandlers()
        }
        
        this.updateStatus = function(winStatus){
            if (winStatus){
                document.getElementById("status").innerHTML = 'Player ' + this.currntPlayer + 
                    '- win the game.'
            } else {
                document.getElementById("status").innerHTML = 'Player ' + this.currntPlayer + 
                    '- not win the game. Continue playing.'
            } 
        }                   
        
        this.addColumnHandlers = function(){
            var columns = this.table.getElementsByTagName("td");
            for(j = 0; j < columns.length; j++) {
                var currentColumn = columns[j]
                
                currentColumn.addEventListener('click', this.insertChip(this, j), false)
                //currentColumn.onclick = this.insertChip(currentColumn, i);
            }
            
            document.getElementById("startButton").onclick = this.notifyAllObservers(this), false
        }
        
        this.insertChip = function (view, j) {
            return function () {
                var rows = this.childNodes
                for (i = rows.length-1; i >= 0; i-- ) {
                    if ((rows[i]).innerHTML === 'X')
                        {
                            (rows[i]).innerHTML = view.currntPlayer
                            for(l = 0; l < view.listeners.length; l++){
                                view.listeners[l].play(i, j)
                            }
                            break
                        }
                }
            }
        }
        
        // All interested parties get notified of change
        this.notifyAllObservers = function(view){    
            return function () {
                for(l = 0; l < view.listeners.length; l++){
                    view.listeners[l].startGame()
                }
            }
        }
    }
    
    return DomView
})