jQuery(document).ready(function(){

    var scripts = document.getElementsByTagName("script");

    var jsFolder = "";

    for (var i= 0; i< scripts.length; i++)

    {

        if( scripts[i].src && scripts[i].src.match(/initaudioplayer-1\.js/i))

            jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/") + 1);

    }

    jQuery("#amazingaudioplayer-1").amazingaudioplayer({

        jsfolder:jsFolder,

        skinsfoldername:"",

        volumeimagewidth:24,

        showtime:true,

        showprogress:false,

        random:false,

        height:600,

        loadingformat:"Loading...",

        prevnextimage:"prevnext-24-24-0.png",

        skin:"Bar",

        showstop:false,

        prevnextimageheight:24,

        stopotherplayers:true,

        showloading:false,

        forcefirefoxflash:false,

        showvolumebar:true,

        width:200,

        volumeimage:"volume-24-24-0.png",

        playpauseimagewidth:24,

        prevnextimagewidth:24,

        forceflash:false,

        playpauseimageheight:24,

        stopimage:"stop-24-24-0.png",

        playpauseimage:"playpause-24-24-0.png",

        forcehtml5:false,

        showprevnext:true,

        autoplay:false,

        volumebarpadding:8,

        progressheight:8,

        defaultvolume:100,

        heightmode:"auto",

        stopimageheight:24,

        volumeimageheight:24,

        stopimagewidth:24,

        volumebarheight:80,

        noncontinous:false,

        timeformat:"%CURRENT% / %DURATION%",

        showvolume:true,

        fullwidth:false,

        loop:1,
        
        showloop:true,

        preloadaudio:true

    });

});