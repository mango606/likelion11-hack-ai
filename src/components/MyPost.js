import React from 'react';
import { dummyPosts } from "../dummyData";
import { useNavigate } from "react-router-dom";
import './MyPost.css';

const MyPost = () => {
   // username이 000인 요소만 있는 배열을 할당함.
  const filteredPosts = dummyPosts.filter((post) => post.username === "kimcoding");
  const navigate = useNavigate();
  return (
    <section id="my-info">
      <div id="my-background">
        <br />
        <img id="my-profile" src={filteredPosts[0].picture} />
      </div>
      <div id="intro">
        <p id="my-name">
          {filteredPosts[0].username}
        </p>
        <p id="my-likes"><a id="likes-number">28</a> 좋아요</p>
      </div>
      <p id="my-txt">안녕하세요. 저에 대해서 간단히 소개합니다. 글자 수 제한이 있습니다.</p>
      <hr></hr>
      <div id="post-menu">
        <img id="post-img" src="./img/angle-left.png" onClick={() => navigate(-1)}/>
        <h2>내가 쓴 글</h2>
    </div>
      <ul class="my-page">
        {/* 000이 작성한 포스트만 나옴. */}
        {filteredPosts.map((post) => (
        <li class="post" key={post.id}>
          <div class="post-content">
          <div class="post-category">{post.category}</div>
            <div class="post-title">{post.title}</div>
            <div class="post-message">{post.content}</div>
            <div class="post-content">
                <img class="post-img2" src="./img/heart.png"></img>
                <a class="post-likes">{post.likes}</a>
                <img class="post-img2" src="./img/comment-dots.png"></img>
                <a class="post-comments">{post.comments}</a>
                <span class="post-createdAt">{post.createdAt}</span>
            </div>
          </div>
          <img class="post-img3" src={post.picture}></img>
        </li>
        ))}
      </ul>
    </section>
  );
};

export default MyPost;