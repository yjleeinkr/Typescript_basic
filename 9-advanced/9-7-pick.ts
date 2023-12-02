namespace pick{
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

  // ✨ Pick<T, 필요한 Key1 | Key2 ...> 
  // 이런식으로 기존 타입에서 쓰고 싶은 속성만 골라서 제한적인 타입으로 만들 수 있다!
  type VideoMetadata = Pick<Video, 'id' | 'title'>;

  function getVideoMetadata(id: string): VideoMetadata {
    return {
      id,
      title: 'title',
    }
  }

  // 아래와 같이 정의되있다!
  type Pick2<T, K extends keyof T> = {
    [P in K]: T[P];
  }
}