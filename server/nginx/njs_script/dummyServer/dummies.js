// PATH, METHOD, STATUSCODE, BODY
const dummyDB = [
  [
    'POST',
    '/auth',
    201,
    [
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwibmlja25hbWUiOiJEdW1teSBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTY1NjI1OTAyMn0.Up4hkbXB2eSRagvfB689puO3HxFyPGADmO3mIFDm7qQ',
    ],
    {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuZXduaWNrIiwiZW1haWwiOiJ5ZWFoQHllYWguY29tIiwidHlwZSI6MSwicGVuZGluZyI6dHJ1ZSwiaWF0IjoxNjQxODEwNjk0LCJleHAiOjE2NDE4MjE0OTR9.3jHWfE3QRWHNk4_E2Owc_553syu3fuo-u6twEjXUa94',
    },
  ],
  [
    'GET',
    '/users',
    200,
    null,
    {
      email: 'sample@sample.com',
      nickname: 'kimchi1234',
      pomo: 4,
      rank: 30,
      pending: true,
    },
  ],
  [
    'POST',
    '/users',
    201,
    [
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwibmlja25hbWUiOiJEdW1teSBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTY1NjI1OTAyMn0.Up4hkbXB2eSRagvfB689puO3HxFyPGADmO3mIFDm7qQ',
    ],
    {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuZXduaWNrIiwiZW1haWwiOiJ5ZWFoQHllYWguY29tIiwidHlwZSI6MSwicGVuZGluZyI6dHJ1ZSwiaWF0IjoxNjQxODEwNjk0LCJleHAiOjE2NDE4MjE0OTR9.3jHWfE3QRWHNk4_E2Owc_553syu3fuo-u6twEjXUa94',
    },
  ],
  ['PATCH', '/users', 204, null, null],
  ['DELETE', '/users', 204, null, null],
  [
    'GET',
    '/playlists',
    200,
    null,
    {
      result: [
        {
          playlist_id: 1,
          playlist_name: '잔잔한 빗소리1',
          playlist_time: 150,
        },
        {
          playlist_id: 2,
          playlist_name: '잔잔한 빗소리2',
          playlist_time: 200,
        },
        {
          playlist_id: 3,
          playlist_name: '잔잔한 빗소리3',
          playlist_time: 250,
        },
      ],
    },
  ],
  [
    'POST',
    '/playlists',
    201,
    null,
    {
      playlist_id: 2,
    },
  ],
  ['PATCH', '/playlists/1', 204, null, null],
  ['PATCH', '/playlists/2', 204, null, null],
  ['PATCH', '/playlists/3', 204, null, null],
  ['PATCH', '/playlists/4', 204, null, null],
  ['PATCH', '/playlists/5', 204, null, null],
  ['PATCH', '/playlists/6', 204, null, null],
  ['PATCH', '/playlists/7', 204, null, null],
  ['PATCH', '/playlists/8', 204, null, null],
  ['PATCH', '/playlists/9', 204, null, null],
  ['PATCH', '/playlists/10', 204, null, null],
  ['PUT', '/playlists/1', 204, null, null],
  ['PUT', '/playlists/2', 204, null, null],
  ['PUT', '/playlists/3', 204, null, null],
  ['PUT', '/playlists/4', 204, null, null],
  ['PUT', '/playlists/5', 204, null, null],
  ['PUT', '/playlists/6', 204, null, null],
  ['PUT', '/playlists/7', 204, null, null],
  ['PUT', '/playlists/8', 204, null, null],
  ['PUT', '/playlists/9', 204, null, null],
  ['PUT', '/playlists/10', 204, null, null],
  ['DELETE', '/playlists/1', 204, null, null],
  ['DELETE', '/playlists/2', 204, null, null],
  ['DELETE', '/playlists/3', 204, null, null],
  ['DELETE', '/playlists/4', 204, null, null],
  ['DELETE', '/playlists/5', 204, null, null],
  ['DELETE', '/playlists/6', 204, null, null],
  ['DELETE', '/playlists/7', 204, null, null],
  ['DELETE', '/playlists/8', 204, null, null],
  ['DELETE', '/playlists/9', 204, null, null],
  ['DELETE', '/playlists/10', 204, null, null],
  [
    'GET',
    '/playlists/1',
    200,
    null,
    {
      result: [
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 1-1',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
        {
          music_id: 2,
          music_name: 'YouTube Data API v3 Tutorial : 1-2',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
      ],
    },
  ],
  [
    'GET',
    '/playlists/2',
    200,
    null,
    {
      result: [
        {
          music_id: 3,
          music_name: 'YouTube Data API v3 Tutorial : 2-1',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
        {
          music_id: 4,
          music_name: 'YouTube Data API v3 Tutorial : 2-2',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
      ],
    },
  ],
  [
    'GET',
    '/playlists/3',
    200,
    null,
    {
      result: [
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 3-1',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 3-2',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
      ],
    },
  ],
  [
    'GET',
    '/playlists/4',
    200,
    null,
    {
      result: [
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 4-1',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 4-2',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
      ],
    },
  ],
  [
    'GET',
    '/playlists/5',
    200,
    null,
    {
      result: [
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 5-1',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 5-2',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
      ],
    },
  ],
  [
    'GET',
    '/playlists/6',
    200,
    null,
    {
      result: [
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 6-1',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 6-2',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
      ],
    },
  ],
  [
    'GET',
    '/playlists/7',
    200,
    null,
    {
      result: [
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 7-1',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 7-2',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
      ],
    },
  ],
  [
    'GET',
    '/playlists/8',
    200,
    null,
    {
      result: [
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 8-1',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 8-2',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
      ],
    },
  ],
  [
    'GET',
    '/playlists/9',
    200,
    null,
    {
      result: [
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 9-1',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 9-2',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
      ],
    },
  ],
  [
    'GET',
    '/playlists/10',
    200,
    null,
    {
      result: [
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 10-1',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
        {
          music_id: 1,
          music_name: 'YouTube Data API v3 Tutorial : 10-2',
          music_url: 'TE66McLMMEw',
          music_time: 180,
        },
      ],
    },
  ],
  ['POST', '/playlists/1', 201, null, { music_id: 1 }],
  ['POST', '/playlists/2', 201, null, { music_id: 1 }],
  ['POST', '/playlists/3', 201, null, { music_id: 1 }],
  ['POST', '/playlists/4', 201, null, { music_id: 1 }],
  ['POST', '/playlists/5', 201, null, { music_id: 1 }],
  ['POST', '/playlists/6', 201, null, { music_id: 1 }],
  ['POST', '/playlists/7', 201, null, { music_id: 1 }],
  ['POST', '/playlists/8', 201, null, { music_id: 1 }],
  ['POST', '/playlists/9', 201, null, { music_id: 1 }],
  ['POST', '/playlists/10', 201, null, { music_id: 1 }],
  ['PATCH', '/playlists/1/1', 204, null, null],
  ['PATCH', '/playlists/2/1', 204, null, null],
  ['PATCH', '/playlists/3/1', 204, null, null],
  ['PATCH', '/playlists/4/1', 204, null, null],
  ['PATCH', '/playlists/5/1', 204, null, null],
  ['PATCH', '/playlists/6/1', 204, null, null],
  ['PATCH', '/playlists/7/1', 204, null, null],
  ['PATCH', '/playlists/8/1', 204, null, null],
  ['PATCH', '/playlists/9/1', 204, null, null],
  ['PATCH', '/playlists/10/1', 204, null, null],
  ['PUT', '/playlists/1/1', 204, null, null],
  ['PUT', '/playlists/2/1', 204, null, null],
  ['PUT', '/playlists/3/1', 204, null, null],
  ['PUT', '/playlists/4/1', 204, null, null],
  ['PUT', '/playlists/5/1', 204, null, null],
  ['PUT', '/playlists/6/1', 204, null, null],
  ['PUT', '/playlists/7/1', 204, null, null],
  ['PUT', '/playlists/8/1', 204, null, null],
  ['PUT', '/playlists/9/1', 204, null, null],
  ['PUT', '/playlists/10/1', 204, null, null],
  ['DELETE', '/playlists/1/1', 204, null, null],
  ['DELETE', '/playlists/2/1', 204, null, null],
  ['DELETE', '/playlists/3/1', 204, null, null],
  ['DELETE', '/playlists/4/1', 204, null, null],
  ['DELETE', '/playlists/5/1', 204, null, null],
  ['DELETE', '/playlists/6/1', 204, null, null],
  ['DELETE', '/playlists/7/1', 204, null, null],
  ['DELETE', '/playlists/8/1', 204, null, null],
  ['DELETE', '/playlists/9/1', 204, null, null],
  ['DELETE', '/playlists/10/1', 204, null, null],
  [
    'GET',
    '/ranks',
    200,
    null,
    {
      result: [
        {
          rank: 1,
          nickname: 'goldmedal',
          score: 1278,
        },
        {
          rank: 2,
          nickname: '2ndman',
          score: 1000,
        },
        {
          rank: 3,
          nickname: '3rdman',
          score: 900,
        },
        {
          rank: 4,
          nickname: '4thman',
          score: 800,
        },
        {
          rank: 5,
          nickname: '5thman',
          score: 700,
        },
      ],
    },
  ],
  [
    'POST',
    '/pomodoro',
    201,
    [
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwibmlja25hbWUiOiJEdW1teSBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTY1NjI1OTAyMn0.Up4hkbXB2eSRagvfB689puO3HxFyPGADmO3mIFDm7qQ',
    ],
    {
      newToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuZXduaWNrIiwiZW1haWwiOiJ5ZWFoQHllYWguY29tIiwidHlwZSI6MSwicGVuZGluZyI6dHJ1ZSwiaWF0IjoxNjQxODEyOTE4LCJleHAiOjE2NDE4MjM3MTh9.hlO9uAH3xCF03p3V0iDSmrwP7JeHAyzZCtuO2sO2hCU',
    },
  ],
  [
    'PATCH',
    '/pomodoro',
    204,
    [
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwibmlja25hbWUiOiJEdW1teSBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTY1NjI1OTAyMn0.Up4hkbXB2eSRagvfB689puO3HxFyPGADmO3mIFDm7qQ',
    ],
    null,
  ],
  [
    'POST',
    '/passwords',
    201,
    null,
    {
      message: 'email sent',
    },
  ],
  [
    'PATCH',
    '/passwords',
    200,
    [
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwibmlja25hbWUiOiJEdW1teSBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTY1NjI1OTAyMn0.Up4hkbXB2eSRagvfB689puO3HxFyPGADmO3mIFDm7qQ',
    ],
    null,
  ],
  [
    'POST',
    '/mails',
    200,
    null,
    { message: 'redirecting to https://final.eax.kr...' },
  ],
  ['GET', '/mails/sample@sample.com', 204, null, null],
  ['GET', '/nicknames/sample-nickname', 204, null, null],
];

export default dummyDB;
