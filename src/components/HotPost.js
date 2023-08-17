import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    axios.defaults.baseURL = 'https://b233b880-2048-4890-965f-6ad3e1839bf0.mock.pstmn.io';
    axios.get('/ailion/posts/api/best/list').then((response)=> {
      setData(response.data.data);
    })
  }, []);

  const top5Post = (Object.values(data)).slice(0, 5);   // 5개의 게시글만 보여주기
  const item = top5Post.map((item) => (
    <ul class="hot-form" key={item.postId}>
        <li class="hot-post">
        <Link to={`/comm/${item.userId}/${item.postId}`} className="post-link">
        <div class="hot-table">
          <div class="hot-category">{item.category}</div>
          <div class="hot-title">{item.title}</div>
          <div class="hot-message">{item.content}</div>
        </div>
        </Link>
        </li>
    </ul>
  ));

  return item;
}

function HotPost() {
    const item = GetData();

    return (
        <div id="hot-padding">
        <h3 id="hot-title">인기 게시글 TOP5</h3>
        <div id="hot-box">
            {item}
        </div>
        </div>
    );
}
  
export default HotPost;