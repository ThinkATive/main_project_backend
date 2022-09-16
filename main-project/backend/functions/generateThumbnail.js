const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

exports.generateThumbnail = async (event, _) => {
  const ImageName = event.name; // 해당 파일명
  const myBucket = event.bucket; // 해당 파일이 있는 버킷 장소

  if (ImageName.includes('thumb/')) return; // 이미 썸네일에 들어가있는 파일이면 멈춤

  // 버킷 위치를 넣어준 스토리지를 새로 만듦.
  // 만약 여기서 버킷 위치를 넣어주지 않았다면
  // storage를 불러올 때마다 버킷 위치도 같이 말해줘야함
  // ex) .pipe(storage.bucket('버킷위치').file('파일위치/파일명'))...
  const storage = new Storage().bucket(myBucket);
  const prefix = ImageName.split('/origin/')[0];
  const postfix = ImageName.split('/origin/')[1];

  // 파일의 각 크기와 디렉토리 명
  const imageResizeInto = [
    { width: 1280, dir: `${prefix}/thumb/l/${postfix}` },
    { width: 640, dir: `${prefix}/thumb/m/${postfix}` },
    { width: 320, dir: `${prefix}/thumb/s/${postfix}` },
  ];

  // 수업 때 배운 내용을 활용
  await Promise.all(
    imageResizeInto.map(({ width, directory }) => {
      return new Promise((resolve, reject) => {
        storage
          .file(ImageName)
          .createReadStream()
          .pipe(sharp().resize({ width }))
          .pipe(storage.file(`${directory}`).createWriteStream())
          .on('finish', () => resolve())
          .on('error', () => reject());
      });
    }),
  );
};

// event와 context 정보
const event = {
  bucket: 'mainproject-storage', // 해당 파일이 위치한 버킷명
  contentType: 'image/jpeg', // 해당 파일의 타입
  crc32c: 'bd3NVw==',
  etag: 'CNPd/eSou/kCEAE=',
  generation: '1660101708443347',
  id: 'mainproject-storage/1550590455.jpg/1660101708443347',
  kind: 'storage#object',
  md5Hash: 'gd+pSXDuNEt63vs4JLHDog==',
  mediaLink:
    'https://www.googleapis.com/download/storage/v1/b/mainproject-storage/o/thumb%2Fl%2F1550590455.jpg?generation=1660101708443347&alt=media',
  metageneration: '1',
  name: '1550590455.jpg', // 해당 파일의 파일명
  selfLink:
    'https://www.googleapis.com/storage/v1/b/mainproject-storage/o/thumb%2Fl%2F1550590455.jpg',
  size: '58861',
  storageClass: 'STANDARD',
  timeCreated: '2022-08-10T03:21:48.447Z',
  timeStorageClassUpdated: '2022-08-10T03:21:48.447Z',
  updated: '2022-08-10T03:21:48.447Z',
};

const context = {
  eventId: '5354982820171815',
  timestamp: '2022-08-10T03:21:48.503Z',
  eventType: 'google.storage.object.finalize',
  resource: {
    service: 'storage.googleapis.com',
    name: 'projects/_/buckets/mainproject-storage/objects/thumb/l/1550590455.jpg',
    type: 'storage#object',
  },
};
