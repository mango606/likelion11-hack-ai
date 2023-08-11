import React from 'react';
import { dummyPosts } from "../dummyData";
import "./Community.css";
import './MyPost.css';

const MyPost = () => {
  return (
    <section>
        <h3 id="com-title">커뮤니티</h3>
        <div id="com-wrap1">
        <button>
            자신만의 AI 노하우
        </button>        
        <button>
            AI 결과물 자랑
        </button>
        </div>
        <div id="com-wrap2">
        <button>
            자유
        </button>
        <button>
            수익 창출 공유
        </button>
        </div>

      {/* 요즘 핫한 게시글 어떻게 해야할지 모르겠음. 검색 기능도 필요함.
        <div>
          <img id="hot-img" src="./img/fire.png"></img>
          <p class="post-category">HOT 게시판</p>
        </div>
      */}
        
        <ul class="my-page">
        {/* kimcoding 이 작성한 포스트만 나옴. */}
        {dummyPosts.map((post) => (
        <li class="post" key={post.id}>
          <div id="post-content">
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