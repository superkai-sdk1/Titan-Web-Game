var display = false;
var toShow = 0;

(function($){

    $.ajax({
       url: "http://localhost:1100/timer/test_echo",
       crossDomain: true,
       success: function (data){
         if(data == "test_ok"){
            alert("Обнаружен сервер таймера theMAFIA! Приятной игры:)");
            display = true;
         }
       }
     });
})(jQuery);

var Stopwatch = function(elem, options) {
    var timer = createTimer(),
        offset,
        clock,
        interval;


    // default options
    options = options || {};
    options.delay = options.delay || 1;

    // append timer
    elem.appendChild(timer);

    // initialize
    reset();

    function createTimer() {
        return document.createElement('span');
    }

    function start() {
        if (!interval) {
            offset   = Date.now();
            interval = setInterval(update, options.delay);
        }
    }

    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function reset() {
        
        clock = 0;
        render();
    }

    function delta() {
        var now = Date.now(),
            d   = now - offset;

        offset = now;
        return d;
    }

    function update() {
        clock += delta();
        render();
    }

    function render() {
        var minutes = parseInt( clock/1000 / 60 ) % 60;
        var seconds = parseInt( clock/1000 ) % 60;

        var result = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds  < 10 ? '0' + seconds : seconds); // + ':' + (centisecond  < 10 ? '0' + centisecond : centisecond);

        timer.innerHTML = result;
    }

    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
};

var sw = new Stopwatch(document.getElementById('time'), { delay: 100 });
document.getElementById('time').addEventListener('click', function(){
    sw.stop();
    sw.reset();
    sw.start();
    if(display){
        (function($){
            $.ajax({
               url: "http://localhost:1100/timer/1",
               crossDomain: true
             });
        })(jQuery);
    }
});
document.getElementById('stop').addEventListener('click', function() {
    sw.stop();
    sw.reset();
    if(display){
        (function($){
            $.ajax({
               url: "http://localhost:1100/timer/0",
               crossDomain: true
             });
        })(jQuery);
    }
    return false;
});

document.addEventListener('onkeydown', function() {
    sw.stop();
    sw.reset();
    sw.start();
    if(display){
        (function($){
            $.ajax({
               url: "http://localhost:1100/timer/1",
               crossDomain: true
             });
        })(jQuery);
    }
    return false;
});