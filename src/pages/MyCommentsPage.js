import React from 'react';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';

// import axios from 'axios';

import './MyCommentsPage.css';

const MyCommentsPage = () => {
  return (
    <>
      <Sidebar />
      <article>
        {/* 상단 프로필 */}
        <div className='profile_box'>
          <img className="profile_bgimg" alt="배경 이미지" src="img/back2.jpg" />
          <img className="profile_userimg" alt="프로필 이미지" src="img/user.png" />
          <div className='profile_username'>user name</div>
        </div>
      
        {/* 댓글 목록 */}
        <div className='list-top'>
          <Link to="/Mypage">
          <button className="angle-left">
            <img alt="뒤로가기 이미지" src="img/angle-left-color.png" />
          </button>
          </Link>
          <h3 className='title-text'>댓글 단 글</h3>
        </div>
        <ul class="my-page" >
            <li class="post-comments-box">
            <div class="post-box">
                <div class="post-category"> 게시판</div>
                    <div class="post-title"> 제목</div>
                    <div class="post-message">내용</div>
                    <div class="post-content">
                        <img class="post-img2" alt='하트이미지' src="./img/heart.png"></img>
                        <div class="post-likes">3</div>
                        <img class="post-img2" alt='댓글이미지' src="./img/comment-dots.png"></img>
                        <div class="post-comments">3</div>
                        <span class="post-createdAt">2024</span>
                </div>
            </div>
            </li>
        </ul>
      </article>
    </>
  );
};

export default MyCommentsPage;