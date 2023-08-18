import React from "react";
import "./DetailPage.css";
import Sidebar from "../Sidebar";
import { useParams, useNavigate } from "react-router-dom";
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
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [like, setLike] = useState(false);


  const { postId, userId } = useParams();

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/ailion/api/posts/${postId}/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log(response.data);
        setData(prevData => ({
          ...prevData,
          ...response.data,
        }));

      } catch (e) {
        console.log(e);

      }
    };
    fetchData();
  }, [postId, userId]);

  useEffect(() => {
    if (data) {
      const postObject = new Post(data);
      setPost(postObject);
      setLike(postObject.likeCheck);
    }
  }, [data]);


  useEffect(() => {
    if (!(localStorage.getItem('jwt'))) {
      return;
    }
    const userId = localStorage.getItem('userId');
    setUser(userId);
  }, []);

  const handleLike = async () => {
    if (!(localStorage.getItem('jwt'))) {
      Navigate('/login');
    }

    if (post.likeCheck === false) {
      try {
        await axios.post(`/ailion/hearts`, {
          "postId" : postId,
          "userId" : user
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        });
        setLike(true);
        window.location.reload();
      }
      catch (e) {
        console.log(e);
      }
    } else {
      try {
        await axios.delete(`/ailion/hearts`, {
          data: {
            "postId" : postId,
            "userId" : user
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
      });
      setLike(false);
      window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const commentSubmit = (event) => {
    event.preventDefault();

    if (!(localStorage.getItem('jwt'))) {
      Navigate('/login');
    }

    if (comment.trim() === "") {
      return ;
    }
    const commentObject = {
      'content' : comment,
      'userId' : user,
      'postId' : postId
    };

    const fetchComment = async () => {
      try {
        await axios.post("/ailion/comments", commentObject, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        setComment("");
      } catch (e) {
        console.log(e);
      }
    }
  fetchComment();
  window.location.reload();
};

  useEffect(() => {

    if (!(localStorage.getItem('jwt'))) {
      if (post !== null) {
        setIsLoading(false);
      }
    }
    if (post !== null && user !== null) {
      setIsLoading(false);
    }
  }, [post, user]);


  const deletePosting = async () => {
    try {
      await axios.delete(`/ailion/posts/${postId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      Navigate('/');
    } catch (e) {
      console.log(e);
    }
  }


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

              {user && parseInt(user) === post.userId ?
              <div className="detailPostButtonWrap">
              <button className="detailPostButton" onClick={deletePosting}>게시글 삭제</button>
              </div> : <></>}

            </div>
          </div>
          <hr></hr>
          <div className="detail_content">
            <img alt="postImg" className="detail_img" src={post.img} ali="sampleImg"></img>
            <p className="postContent">{post.content}</p>
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

            <CommentsList comments={post.comments} User={user} Post={postId} />
          </div>

        </div>
      </article>


    </>
    }
    </>
  );
};

export default DetailPage;
