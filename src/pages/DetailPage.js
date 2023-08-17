import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

import "./DetailPage.css";
import Sidebar from "../Sidebar";
import CommentsList from "../components/CommentsList";

function DetailPage() {
  const { userId, postId } = useParams();
  const [data, setData] = useState([]);
  const [likeCheck, setLikeCheck] = useState({});
  const [comment, setComment] = useState("");
  const [mycomment, setMyComment] = useState("");

  useEffect(() => {
    // axios.defaults.baseURL = 'https://b233b880-2048-4890-965f-6ad3e1839bf0.mock.pstmn.io';
    axios.get(`/ailion/posts/${userId}/${postId}`)
      .then((response) => {
        setData(response.data.data);
        setLikeCheck(response.data.likeCheck);
        setComment(response.data.data.comments);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [userId, postId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleLike = () => {
    setLikeCheck(!likeCheck);
  };

  const handleCommentChange = (event) => {
    setMyComment(event.target.value);
  };

  const commentSubmit = (event) => {
    event.preventDefault();
    console.log(mycomment);
  };

  return (
    <>
      <Sidebar />
      <article>
        <div className="detail">
          <div className="detail_title">
            <h1>{data.title}</h1>
          </div>
          <hr />
          <div className="detail_content">
            <p>{data.content}</p>
            <img alt="postImg" className="detail_img" src={"https://via.placeholder.com/650x300"} ali="sampleImg" />
          </div>
          <div className="detail_footer">
            <p>{`${formatDate(data.createdDate)} 조회 ${data.viewCount}`}</p><br />
            <p>{`작성자 : ${data.writer}`}</p><br />
            <div className="like">
              <img
                className="likeImg"
                onClick={handleLike}
                alt="likeImg"
                src={likeCheck === false ? "https://private-user-images.githubusercontent.com/75062110/260640455-940926a1-3666-45f4-8e01-3fa270607283.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE2OTIwODA3NDQsIm5iZiI6MTY5MjA4MDQ0NCwicGF0aCI6Ii83NTA2MjExMC8yNjA2NDA0NTUtOTQwOTI2YTEtMzY2Ni00NWY0LThlMDEtM2ZhMjcwNjA3MjgzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzA4MTUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMwODE1VDA2MjA0NFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQ3NTIzM2Y5Y2E5OGFkYWNkNDMxZWUzYjkzYjVlYTM4NTEzYTA0YmViOWVmYzA4NWEwYjg0OWUxYmU4NjIxM2QmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.NSnhDcJXqsN1QPrGp1Zhzy836HrQ2KFTYth7z0vi1kE" : "https://private-user-images.githubusercontent.com/75062110/260640468-3d7881d0-e213-4fd3-bf9f-594e8488decc.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE2OTIwODA3NDQsIm5iZiI6MTY5MjA4MDQ0NCwicGF0aCI6Ii83NTA2MjExMC8yNjA2NDA0NjgtM2Q3ODgxZDAtZTIxMy00ZmQzLWJmOWYtNTk0ZTg0ODhkZWNjLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzA4MTUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMwODE1VDA2MjA0NFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTY5MzhhZGI3YjA2NDljM2NjNDgyNTg0YjZhZTU4ZTdkNjk3NmM1MWY5OWQ2NDJjMDFiMTMyZTBhNGU3ZGNhZmUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.-D7e48lmhCy3-SXutqip8kzSKwM4ZcvmnSK9_yGUX_U"}
              />
              <p>{`좋아요 ${data.likeCount} 댓글 ${data.commentCount}`}</p>
            </div>
          </div>
          <hr />
          <div className="commentForm">
            <img className="commentImg" src="img/id.png" alt="user" />
            <input
              className="commentInput"
              type="text"
              placeholder="댓글 작성"
              value={mycomment}
              onChange={handleCommentChange}
            />
            <button className="commentButton" onClick={commentSubmit}>
              댓글 달기
            </button>
          </div>
          <hr />
          <div className="comment_wrap">
            <h3>댓글</h3>
            <CommentsList comments={comment} />
          </div>
        </div>
      </article>
    </>
  );
}

export default DetailPage;