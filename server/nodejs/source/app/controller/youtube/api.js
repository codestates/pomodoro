require('dotenv').config();
const { User, Music, Playlist } = require('../../models/');
const { checkInputData } = require('../utils/error/error');
const imgUrlDownload = require('../utils/youtubeFunction');
const axios = require('axios');

const durationSecoend = (time) => {
  const m = /^[a-z]*(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)*/i.exec(time);
  const hour = m[1] ? parseInt(m[1], 10) : 0;
  const minutes = m[2] ? parseInt(m[2], 10) : 0;
  const seconds = m[3] ? parseInt(m[3], 10) : 0;

  return hour * 3600 + minutes * 60 + seconds;
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
  let music_url = req.body['music_url'];
  const youtubeRegEx = [
    /(?<=\w*youtu\.be\/)(.*)/g,
    /(?<=\w*youtube\.com\/watch\?v=)(.*)(?=[&])|(?<=\w*youtube\.com\/watch\?v=)(.*)/g,
  ];
  for (const checkRegEx of youtubeRegEx) {
    const result = music_url.match(checkRegEx);
    if (!result) continue;
    music_url = result[0];
    break;
  }
  const idx = music_url.indexOf('&');
  if (idx > 0) {
    music_url = music_url.substring(0, idx);
  }

  async function videosList(music_url) {
    const endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,status&id=${music_url}&key=${process.env.YOUTUBE_API_KEY}`;

    let videoInfo;
    try {
      videoInfo = await axios.get(endpoint);
    } catch (e) {
      console.log(`[ERROR] ${path} ${stub} -> 500 : ${e}`);
      return res.status(500).send('Internal Server Error');
    }

    let { duration } = videoInfo.data.items[0].contentDetails;
    const { title } = videoInfo.data.items[0].snippet;
    const thumbnailUrl = thumbnailFindImg(
      videoInfo.data.items[0].snippet.thumbnails
    );
    duration = durationSecoend(duration);
    const { embeddable } = videoInfo.data.items[0].status;
    return { title, thumbnailUrl, duration, embeddable };
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
      const embeddable = true;
      return { duration, title, thumbnailUrl, embeddable };
    })
    .then((videoInfo) => {
      const { duration, title, thumbnailUrl, embeddable } = videoInfo;
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
          embeddable,
        });
        throw new Error('early return');
      }

      if (!embeddable) {
        res.status(415).send('video embeddable false');
        throw new Error('video embeddable false');
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
        // imgUrlDownload(
        //   req.thumbnailUrl.url,
        //   `${process.env.IMAGE_PATH}${music_url}.jpg`,
        //   () => {
        //     console.log(`${music_url}.jpg 파일 생성`);
        //   }
        // );

        let fileToSave;
        try {
          fileToSave = await axios.get(req.thumbnailUrl.url, {
            responseType: 'stream',
          });
        } catch (e) {
          console.log(`[ERROR] ${path} ${stub} -> 500 : ${e}`);
          return res.status(500).send('Internal Server Error');
        }
        const fileName = `${music_url}.jpg`;
        const filePath = `${process.env.IMAGE_PATH}${fileName}`;
        try {
          fileToSave.data.pipe(require('fs').createWriteStream(filePath));
        } catch (e) {
          console.log(`[ERROR] ${path} ${stub} -> 500 : ${e}`);
          return res.status(500).send('Internal Server Error');
        }
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
      if (err.message === 'video embeddable false') return;
      console.error(err);
      return res.status(500).send(err);
    });
};

module.exports = youtubeAPIsearch;
