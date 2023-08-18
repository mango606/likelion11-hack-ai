import React from "react";
import "./DetailPage.css";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentsList from "../components/CommentsList";

import axios from "axios";


class Post {
  constructor(datas) {
    const data = datas.data;
    this.title = data.title;
    this.content = data.content;
    this.author = data.writer;
    this.view = data.viewCount;
    this.date = this.getDate(data.createdDate);
    this.like = data.likeCount;
    this.commentNum = data.commentCount;
    this.comments = data.comments;
    this.img = "https://via.placeholder.com/650x300";
    this.likeCheck = datas.likeCheck;
    this.userId = data.userId;
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
  const [data, setData] = useState(null);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { postId, userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/ailion/api/posts/${postId}/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        setData(response.data);

      } catch (e) {
        console.log(e);

      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const postObject = new Post(data);
      setPost(postObject);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log(post);
  // }, [post]);

  useEffect(() => {
    if (!(localStorage.getItem('jwt'))) {
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get("/ailion/user/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });

        setUser(response.data.id);

      } catch (e) {
        console.log(e);
        localStorage.removeItem('jwt');
      }
    };
    fetchUser();
  }, []);

  const handleLike = () => {
    if (like === false) {
      setLike(true);
    } else {
      setLike(false);
    }
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const commentSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() === "") {
      return ;
    }

  };

  useEffect(() => {

    if (post !== null && user !== null) {
      setIsLoading(false);
    }
  }, [post, user]);




  return (
    <>

    {isLoading ? <div className="loading">Loading...</div> :
    <>

  <Sidebar />

      <article>
        <div className="detail">
          <div className="detail_title">
            <h1>{post.title}</h1>
            <div className="detailPostInfo">
            <img className="detailPostImg" alt="postImg" src={"/img/alien" + (post.userId % 5 + 1) + ".png"}></img>
            <p className="postAuthor">{post.author}</p>
            <p className="detailPostDate">{`${post.date}`}</p>

              {user && user === post.userId ?
              <div className="detailPostButtonWrap">
              <button className="detailPostButton">게시글 삭제</button>
              </div> : <></>}

            </div>
          </div>
          <hr></hr>
          <div className="detail_content">
            <img alt="postImg" className="detail_img" src={post.img} ali="sampleImg"></img>
            <p>{post.content}</p>
          </div>
          <div className="detail_footer">
            <div className="like">
            <img className="likeImg" onClick={handleLike} alt="likeImg" src={like === false ? "/img/emptyLike.png" : "/img/like.png"}></img><p>{`${post.like}`}</p>
            <img className="postCommentImg" alt="commentImg" src="/img/comment-dots.png"></img><p>{`${post.commentNum}`}</p>
            <img className="postViewImg" alt="viewImg" src="/img/view.png"></img><p>{`${post.view}`}</p>
            </div>
          </div>
          <hr></hr>
          <div className="commentForm">
            <img
              className="commentImg"
              src="/img/cyclops.png"
              alt="user"
            />
            <input
              className="commentInput"
              type="text"
              placeholder="댓글 작성"
              value={comment}
              onChange={handleCommentChange}
            />
            <button className="commentButton" onClick={commentSubmit} >댓글 달기</button>
          </div>
          <hr></hr>
          <div className="comment_wrap">

            <CommentsList comments={post.comments} User={user} />
          </div>

        </div>
      </article>


    </>
    }
    </>
  );
};

export default DetailPage;
