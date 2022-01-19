const { User, Music, Playlist } = require('../../models/');
const fetchVideoInfo = require('updated-youtube-info');
const fs = require('fs');
const request = require('request');
const {
  checkInputData,
  checkToken_400_401_404,
  findUserInfomation,
} = require('../utils/error/error');
const imgUrlDownload = require('../utils/youtubeFunction');

const saveMusicAndThumbnail = async (req, res) => {
  const path = `/api/youtube POST`;
  const stub = `saveYoutubeURL`;
  console.log(`[stub] ${path} ${stub}`);
  checkToken_400_401_404(res, path, req.token);
  checkInputData(res, [req.body['music_url'], req.params['playlist_id']]); // video_id -> music_url 로 다시 변경

  // 호출 하기 전에 URL 을 체크

  // url search (youtube API)
  await fetchVideoInfo(req.body['music_url'])
    .then(async (videoInfo) => {
      if (videoInfo) {
        const {
          videoId: thumbnailFileName,
          videoId,
          url,
          title,
          thumbnailUrl,
          duration,
        } = videoInfo;

        // 썸네일 다운로드 - readFile 체크로 하여 분기점
        imgUrlDownload(
          thumbnailUrl,
          `${process.env.IMAGE_PATH}${thumbnailFileName}.jpg`,
          () => {
            console.log('파일 생성');
          }
        );
        fs.watchFile(
          `${process.env.IMAGE_PATH}${thumbnailFileName}.jpg`,
          (curr, prev) => {
            console.log('현재 수정된 시간 : ', curr.mtime);
            console.log('이전 수정된 시간 : ', prev.mtime);
          }
        );

        // 썸네일 크기 리사이징 - sharp 모듈 설치 오류로 인해 코드만 작성
        // sharp(`/source/app/controller/youtube/test/${thumbnailFileName}.jpg`)
        //   .resize(420, 300)
        //   .toFile(
        //     `/source/app/controller/youtube/test/${thumbnailFileName}.jpg`,
        //     (err, info) => {
        //       if (err) throw err;
        //       console.log('info : ', info);
        //       console.log('420,300 리사이징 완료');
        //     }
        //   );

        const { id: user_id } = req.token;
        const { playlist_id } = req.params;
        await User.findOne({ where: { user_id } }).then(async (user) => {
          findUserInfomation(res, path, user);
          // playlist_id 체크하기
          await Playlist.findOne({ where: { playlist_id } });
          await Music.create({
            playlist_id,
            music_name: title,
            music_address: videoId,
            music_length: duration,
          }).then((musicData) => {
            if (musicData) {
              const { music_id } = musicData.dataValues;
              res.status(201).json({ music_id });
            }
          });
        });
      }
    })
    .catch((err) => {
      console.error(`[ERROR] ${path} ${stub} -> 500 : ${err}`);
      res.status(500).send(err);
    });
};

module.exports = saveMusicAndThumbnail;
