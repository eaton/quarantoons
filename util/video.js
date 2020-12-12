const Cache = require("@11ty/eleventy-cache-assets");

// https://www.npmjs.com/package/video-thumbnail-url

// https://www.11ty.dev/docs/quicktips/cache-api-requests/

// https://artisansweb.net/get-thumbnail-youtube-vimeo-dailymotion-videos/

module.exports = {
  // Given a video URL, spit out a thumbnail URL
  urlToThumb: function () {},

  // Given a video URL, spit out an embed URL (not full embed code)
  urlToEmbed: function () {},

  // Given a video URL, return normalized link, embed URL, thumbnail URL, etc.
  urlToVideoData: function () {},

  // Given a YouTube playlist URL, return full playlist metadata, including  
  // title, individual videos URLs, and a thumbnail URL
  urlToPlaylistData: function () {},

  // Simple true-or-false check to determine if the URL points to a playlist.
  // Given our needs, if a specific video ID is present, return 'false' since
  // we can use it for thumbnail/etc purposes.
  isYouTubePlaylist: function() {},

  dataFromClipCollection: function (urls) {
    let data = { clips: urls.map(this.dataFromVideoUrl) }
    
    let ytSingleClips = data.clips
      .filter(clip => (clip.service == 'youtube' && clip.video))
      .map(function (clip, index, array) {
        if (clip.service == 'youtube' && clip.video) {
          return clip.video;
        }
      });
    
    if (ytSingleClips.length > 1 && ytSingleClips.length == data.clips.length) {
      data.customYtList = ytSingleClips
    }

    return data;
  },

  dataFromVideoUrl: function (url) {
    let data = { raw: url }

    try {
      const parsedUrl = new URL(url)
  
      if (parsedUrl.hostname.search('youtube.com|youtu.be') > -1) {
        data.service = 'youtube'
        if (list = parsedUrl.searchParams.get('list')) {
          data.playlist = list;
        }
        if (video = parsedUrl.searchParams.get('v')) {
          data.video = video;
          data.thumb = "//i3.ytimg.com/vi/" + video + "/hqdefault.jpg"
        }
        if (video = parsedUrl.searchParams.get('list')) {
        }
      } else if (parsedUrl.hostname.search('vimeo.com') > -1) {
        data.service = 'vimeo'
        data.video = parsedUrl.pathname.split('/')[1]
      } else {
        data.service = 'unknown'
      }
    }
    catch(err) {
      data.error = err
    }
    finally {
      return data
    }
  },
}
