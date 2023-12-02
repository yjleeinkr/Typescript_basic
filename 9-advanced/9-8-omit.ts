namespace omit {
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'https://...',
      data: 'byte-data...',
    }
  }

  // ✨ Omit<T, 안쓰는 Key1 | Key2 ...> 
  // 이런식으로 기존 타입에서 필요없는 속성만 골라서 제한적인 타입으로 만들 수 있다!
  type VideoMetadata = Omit<Video, 'url' | 'data'>;

  function getVideoMetadata(id: string): VideoMetadata {
    return {
      id,
      title: 'title!'
    }
  }

  // 아래와 같이 정의되있다!
  type Omit2<T, K extends keyof any> = Pick<T, Exclude2<keyof T, K>>
  type Exclude2<T, U> = T extends U ? never : T;
}