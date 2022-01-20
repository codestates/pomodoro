require('dotenv').config();
const { User, Music, Playlist } = require('../../models/');
const { google } = require('googleapis');
const service = google.youtube('v3');
const { checkInputData } = require('../utils/error/error');
const imgUrlDownload = require('../utils/youtubeFunction');

const durationSecoend = (time) => {
  time = time.split(/[A-Z]+/);
  time.pop();
  time.shift();
  if (time.length === 1) {
    return Number(time[0]);
  }
  if (time.length === 2) {
    return Number(time[0]) * 60 + Number(time[1]);
  }
  if (time.length === 3) {
    return Number(time[0]) * 3600 + Number(time[1]) * 60 + Number(time[2]);
  }
};

const thumbnailFindImg = (thumbnails) => {
  if (thumbnails['high']) {
    return thumbnails['high'];
  }
  if (thumbnails['medium']) {
    return thumbnails['medium'];
  }
  if (thumbnails['maxres']) {
    return thumbnails['maxres'];
  }
  if (thumbnails['standard']) {
    return thumbnails['standard'];
  }
  if (thumbnails['default']) {
    return thumbnails['default'];
  }
};

const youtubeAPIsearch = async (req, res) => {
  const path = `/api/youtube POST`;
  const stub = `youtubeAPIsearch`;
  console.log(`[stub] ${path} ${stub}`);
  checkInputData(res, [req.body['music_url'], req.params['playlist_id']]);
  const music_url = req.body['music_url'];

  async function videosList(music_url) {
    let videoInfo = await service.videos.list({
      key: process.env.YOUTUBE_API_KEY,
      part: 'contentDetails,snippet',
      id: music_url,
      maxResults: 1,
    });
    let { duration } = videoInfo.data.items[0].contentDetails;
    duration = durationSecoend(duration);
    const { title } = videoInfo.data.items[0].snippet;
    const thumbnailUrl = thumbnailFindImg(
      videoInfo.data.items[0].snippet.thumbnails
    );
    console.log('thumbnailUrl : ', thumbnailUrl);
    return { title, thumbnailUrl, duration };
  }

  async function playListVelueCheck(playlist_id) {
    const playListFindOne = await Playlist.findOne({ where: { playlist_id } });

    return playListFindOne;
  }

  async function musicUrlSearch(music_url) {
    const musicFindOne = await Music.findOne({
      where: { music_address: music_url },
    });

    return musicFindOne;
  }

  musicUrlSearch(music_url)
    .then((musicFindOne) => {
      if (!musicFindOne) return videosList(music_url);

      const { music_name: title, music_length: duration } =
        musicFindOne.dataValues;
      const thumbnailUrl = `https://final.eax.kr/images/${music_url}.jpg`;
      return { duration, title, thumbnailUrl };
    })
    .then((videoInfo) => {
      const { duration, title, thumbnailUrl } = videoInfo;
      req.thumbnailUrl = thumbnailUrl;
      req.videoInfo = { duration, title };

      if (req.token === 404 || req.token === 401 || req.token === 400) {
        res.status(200).json({
          title,
          music_url,
          duration,
          thumbnailUrl: thumbnailUrl['url']
            ? thumbnailUrl['url']
            : thumbnailUrl,
        });
        throw new Error('early return');
      }

      const { playlist_id } = req.params;
      return playListVelueCheck(playlist_id);
    })
    .then((playListVelue) => {
      if (!playListVelue) {
        throw new Error('not find playList_id');
      }
      const user_id = req.token.id;
      return User.findOne({ where: { user_id } });
    })
    .then(async (user) => {
      // 파일 생성 후 저장하기
      if (req.thumbnailUrl['url']) {
        imgUrlDownload(
          req.thumbnailUrl.url,
          `${process.env.IMAGE_PATH}${music_url}.jpg`,
          () => {
            console.log(`${music_url}.jpg 파일 생성`);
          }
        );
      }

      // Music 에서 추가하기
      return Music.create({
        playlist_id: req.params['playlist_id'],
        music_name: req.videoInfo['title'],
        music_address: music_url,
        music_length: req.videoInfo['duration'],
      });
    })
    .then((musicData) => {
      if (musicData) {
        const music_id = musicData.getDataValue('music_id');
        return res.status(200).json({ music_id });
      } else {
        throw new Error('not created music - sequelize');
      }
    })
    .catch((err) => {
      if (err.message === 'early return') return;
      console.error(err);
      return res.status(500).send(err);
    });
};

module.exports = youtubeAPIsearch;
