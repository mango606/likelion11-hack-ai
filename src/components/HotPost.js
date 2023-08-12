import React, { useEffect, useState } from 'react';
import axios from 'axios';

import HotPostTable from './HotPostTable';
import HotPostTableColumn from './HotPostTableColumn';
import HotPostTableRow from './HotPostTableRow';
import './HotPost.css';

function GetData() {
  const [data, setData] = useState({});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    axios.get('https://8287722c-6f79-48df-a597-93bbdb51645b.mock.pstmn.io/posts/best/list').then((response)=> {
      setData(response.data.data);
    })
  }, []);

  const top5Post = (Object.values(data)).slice(0, 5);   // 상위 5개의 게시글만 보여주기
  const item = top5Post.map((item) => (
    <HotPostTableRow key={item.postId}>
      <HotPostTableColumn>{item.postId}</HotPostTableColumn>
      <HotPostTableColumn>{item.title}</HotPostTableColumn>
      <HotPostTableColumn>{item.writer}</HotPostTableColumn>
      <HotPostTableColumn>{formatDate(item.createdDate)}</HotPostTableColumn>
      <HotPostTableColumn>{item.viewCount}</HotPostTableColumn>
    </HotPostTableRow>
  ));

  return item;
}

function HotPost() {
    const item = GetData();

    return (<>
    <h3 id="hot-title">HOT 게시글</h3>
        <HotPostTable headersName={['글번호', '제목', '작성자', '등록일', '조회수']}>
        {item}
        </HotPostTable>
    </>);
}
  
export default HotPost;