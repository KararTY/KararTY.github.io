// Testing YouTube API.
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api";
var secondScriptTag = document.getElementsByTagName('script')[0]
secondScriptTag.parentNode.insertBefore(tag, secondScriptTag)

var player;
var f = {
  youtube: (id = "") => {
    new YT.Player('video', {
      height: '100%',
      width: '100%',
      color: 'yellow',
      videoId: id,
      events: {
        'onReady': onPlayerReady
      }
    })
  }
}

function onPlayerReady(event) {
  event.target.playVideo();
}

// width: 854px; height: 480px;