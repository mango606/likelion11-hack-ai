// Post 테스트용 임시 데이터

const getRandomNumber = (min, max) => {
    return parseInt(Math.random() * (Number(max) - Number(min) + 2));
  };
  
  const getParsedDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString('ko-KR');
  }
  
  const dummyPosts = [
    {
      id: 1,
      username: 'kimcoding',
      picture: `https://randomuser.me/api/portraits/women/${getRandomNumber(
        1,
        98
      )}.jpg`,
      category: "자유 게시판",
      title: "chatGPT를 소개합니다.",
      content:
        'ChatGPT는 OpenAI가 개발한 프로토타입 대화형 인공지능 챗봇이다. ChatGPT는 대형 언어 모델 GPT-3의 개선판인 GPT-3.5를 기반으로 만들어졌으며, 지도학습과 강화학습을 모두 사용해 파인 튜닝되었다.',
      createdAt: getParsedDate('2022-02-24T16:17:47.000Z'),
      updatedAt: getParsedDate('2022-02-24T16:17:47.000Z'),
      likes: 83,
      comments: 12, 
    },
    {
      id: 2,
      username: 'parkhacker',
      picture: `https://randomuser.me/api/portraits/men/${getRandomNumber(
        1,
        98
      )}.jpg`,
      category: "자신만의 AI 노하우 게시판",
      title: "이거 쉬워요.",
      content:
        'GPT-4 is more creative and collaborative than ever before. It can generate, edit, and iterate with users on creative and technical writing tasks, such as composing songs, writing screenplays, or learning a user’s writing style.',
      createdAt: getParsedDate('2022-02-25T16:17:47.000Z'),
      updatedAt: getParsedDate('2022-02-25T16:17:47.000Z'),
      likes: 22,
      comments: 4, 
    },
    {
      id: 3,
      username: 'leedesign',
      picture: `https://randomuser.me/api/portraits/women/${getRandomNumber(
        1,
        98
      )}.jpg`,
      category: "자신만의 AI 노하우 게시판",
      title: "빙 사용법",
      content:
        '아이디어를 이미지로 구현한다. 원하는 이미지를 찾을 수 없습니까? 새로운 Bing의 AI 기반 이미지 작성기를 사용하여 채팅에서 지금 바로 만들 수 있습니다. 한 곳에서 검색, 채팅 및 만들기를 모두 할 수 있습니다.',
      createdAt: getParsedDate('2022-02-26T16:17:47.000Z'),
      updatedAt: getParsedDate('2022-02-26T16:17:47.000Z'),
      likes: 63,
      comments: 23, 
    },
    {
      id: 4,
      username: 'songfront',
      picture: `https://randomuser.me/api/portraits/men/${getRandomNumber(
        1,
        98
      )}.jpg`,
      category: "수익 창출 공유 게시판",
      title: "아니 이게 되네?",
      content:
        'Bing helps you turn information into action, making it faster and easier to go from searching to doing.',
      createdAt: getParsedDate('2022-02-27T16:17:47.000Z'),
      updatedAt: getParsedDate('2022-02-27T16:17:47.000Z'),
      likes: 3,
      comments: 7, 
    },
    {
      id: 5,
      username: 'choiback',
      picture: `https://randomuser.me/api/portraits/women/${getRandomNumber(
        1,
        98
      )}.jpg`,
      category: "자유 게시판",
      title: "ㅋㅋ",
      content:
        '개발만 해서는 아무것도 될 수 없음. 다른 팀, 다른 개발자들의 협업이 반드시 필요함. 많은 회사에서 자주 사용하는 도구들과는 안면을 좀 익혀두면 마찬가지로 회사 적응에 도움이 됨.',
      createdAt: getParsedDate('2022-02-28T16:17:47.000Z'),
      updatedAt: getParsedDate('2022-02-28T16:17:47.000Z'),
      likes: 3,
      comments: 1, 
    },
    {
      id: 1,
      username: 'kimcoding',
      picture: `https://randomuser.me/api/portraits/women/${getRandomNumber(
        1,
        98
      )}.jpg`,
      category: "자유 게시판",
      title: "이렇게 하니까 chatGPT 결과 나와요",
      content:
        '역시 설명을 잘 해야 되네요~ 너무 어려워요ㅠㅠ',
      createdAt: getParsedDate('2022-02-24T16:17:47.000Z'),
      updatedAt: getParsedDate('2022-02-24T16:17:47.000Z'),
      likes: 83,
      comments: 12, 
    },
    {
      id: 1,
      username: 'kimcoding',
      picture: `https://randomuser.me/api/portraits/women/${getRandomNumber(
        1,
        98
      )}.jpg`,
      category: "자유 게시판",
      title: "이렇게 하니까 chatGPT 결과 나와요",
      content:
        '역시 설명을 잘 해야 되네요~ 너무 어려워요ㅠㅠ',
      createdAt: getParsedDate('2022-02-24T16:17:47.000Z'),
      updatedAt: getParsedDate('2022-02-24T16:17:47.000Z'),
      likes: 83,
      comments: 12, 
    },
  ];
  
  export { dummyPosts };
  