import React from 'react';
import Sidebar from '../Sidebar';
import MyPost from '../components/MyPost';

// 내가 쓴 글. MyPostPage를 import 하는 게 아니라 MyPost를 import 할 수 있음.
const MyPostPage = () => {
  return (
    <>
      <Sidebar />
      <article>
        <MyPost />
      </article>
    </>
  );
};

export default MyPostPage;