define(function() {
 
    function BoardModal(N, M){
        
        var stateChanged =  false;
        var state = 0;
        var listeners = [];
        var data = ["JS is object based language","JS implements prototypal inheritance"];
    
        // To access the data
        this.getData = function(){
            return data;
        };
    
        // To get the current state
        this.getState = function (){
            return state;
        };
    
        // For simplicity sake we have added this helper function here to show 
        // what happens when the state of the data is changed
        this.changeState = function (value) {
            state = value;
            stateChanged = true;
            notifyAllObservers();
        };
        
        // All interested parties get notified of change
        function notifyAllObservers (){
        var i;
            for(i = 0; i < listeners.length; i++){
                listeners[i].notify();
            }
        };
        
        // All interested parties are stored in an array of list
        this.addObserver = function (listener){
            listeners.push(listener);
        };
}
    
    
    return BoardModal
})