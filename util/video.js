import getThumb from 'video-thumbnail-url';
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
}

/* 
module.exports = async function() {
  try {
    // https://developer.github.com/v3/repos/#get
    let json = await Cache(URL, {
      duration: "1w", // 1 day
      type: "json" // also supports "text" or "buffer"
    });

    return {
      stargazers: json.stargazers_count
    };
  } catch(e) {
    console.log( "Failed getting GitHub stargazers count, returning 0" );
    return {
      stargazers: 0
    };
  }
};
*/