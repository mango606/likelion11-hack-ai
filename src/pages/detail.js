import React from "react";
import "./detail.css";
import Sidebar from "../Sidebar";
import { useState } from "react";
import CommentsList from "../components/CommentsList";

import { data } from "./detailtest.js";

class Post {
  constructor(data) {
    this.title = data.title;
    this.content = data.content;
    this.author = data.writer;
    this.view = data.viewCount;
    this.date = this.getDate(data.createdDate);
    this.like = data.likeCount;
    this.commentNum = data.commentCount;
    this.comments = data.comments;
    this.img = "https://via.placeholder.com/650x300";
    this.likeCheck = data.likeCheck;
  }

  getDate(createdDate) {
    let newDate = new Date(createdDate);
    let formattedDate = newDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
    let formattedTime = newDate.toLocaleTimeString('ko-KR', { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' });
    formattedDate = `${formattedDate} ${formattedTime}`;
    return (formattedDate);
  }
}

const DetailPage = () => {
  const post = new Post(data);
  const [comment, setComment] = useState("");


  const handleLike = () => {
    if (post.likeCheck === false) {
      post.likeCheck = true;
    } else {
      post.likeCheck = false;
    }
    console.log(post.likeCheck);
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const commentSubmit = (event) => {
    event.preventDefault();
    console.log(post.comments);
  };

  return (
    <>
      <Sidebar />
      <article>
        <div className="detail">
          <div className="detail_title">
            <h1>{post.title}</h1>
          </div>
          <hr></hr>
          <div className="detail_content">
            <p>{post.content}</p>
            <img alt="postImg" className="detail_img" src={post.img} ali="sampleImg"></img>
            <p>이러이러한 내용이에요</p>
          </div>
          <div className="detail_footer">
            <p>{`${post.date} 조회 ${post.view}`}</p><br></br>
            <p>{`작성자 : ${post.author}`}</p><br></br>
            <div className="like">
            <img onClick={handleLike} alt="likeImg" src={post.likeCheck === false ? "img/emptyLike.png" : "img/like.png"}></img><p>{`좋아요 ${post.like} 댓글 ${post.commentNum}`}</p>
            </div>
          </div>
          <hr></hr>
          <div className="commentForm">
            <img
              className="commentImg"
              src="img/id.png"
              alt="user"
            />
            <input
              type="text"
              placeholder="댓글 작성"
              value={comment}
              onChange={handleCommentChange}
            />
            <button onClick={commentSubmit} >댓글 달기</button>
          </div>
          <hr></hr>
          <div className="comment_wrap">

          <h3>댓글</h3>
            <CommentsList comments={post.comments} />
          </div>

        </div>
      </article>
    </>
  );
};

export default DetailPage;
