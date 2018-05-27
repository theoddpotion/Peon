(function(){
    var cache = {};
    var loading = [];
    var callbacks = [];

    function load(src){
        if(src instanceof Array){
            src.forEach(function(url){
                _load(url);
            });
        }else{
            _load(src);
        }
    }

    function _load(url){
        if(cache[url]){
            return cache[url];
        }else{
            var img = new Image();
            img.onload = function(){
                cache[url] = img;

                if(isReady()){
                    callbacks.forEach(function(func){ func(); });
                }
            };
            cache[url] = false;
            img.src = url;
        }
    }

    function isReady(){
        var ready = true;
        for(var i in cache){
            if(cache.hasOwnProperty(i) && !cache[i]){
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func){
        callbacks.push(func);
    }

    function get(url){
        return cache[url];
    }

    window.assets = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();