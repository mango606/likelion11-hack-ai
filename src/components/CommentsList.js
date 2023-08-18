import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import { useState } from "react";


const Comment = ({ comment, User, Post }) => {

  const [reply, setReply] = useState("");
  const [showInput, setShowInput] = useState(false);

  const formattedDate = new Date(comment.createdDate).toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }
  );

  const flag = comment.replies.length === 1 && comment.delCheck === true ? true : false;
  const Navigate = useNavigate();

  const handleDeleteComment = async () => {
    try {

      await axios.delete(`/ailion/comments`, {
        data : {
          "commentId" : comment.commentId,
          "postId" : parseInt(Post),
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },

      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleReply = async () => {

    if (!(localStorage.getItem('jwt'))) {
      Navigate('/login');
    }
    setShowInput(!showInput);
    if (showInput === true) {
      if (reply.trim() !== "") {

        try {
          await axios.post('/ailion/reply', {
            "postId" : parseInt(Post),
            "commentId" : comment.commentId,
            "content" : reply,
            "userId" : parseInt(User)
            }, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
              }})
          window.location.reload();
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  const handleReplySet = (e) => {
    setReply(e.target.value);
  }

  return (
    <div className="comment">
      {comment.delCheck === false ? (
        <>
        <div className="commentImgWrap">
        <img className="commentProfileImg" src={"/img/alien" + (comment.userId % 5 + 1) + ".png"} alt="commentImg" />
        <h3>{comment.writer}</h3>

        {parseInt(User) === comment.userId ?
        <div className="commentBtnWrap">
        <button className="commentBtn" onClick={handleDeleteComment}>delete</button>
        <button className="commentBtn" onClick={handleReply}>reply</button>
        </div>
        :
        <div className="commentBtnWrap">
        <button className="commentBtn" onClick={handleReply}>reply</button>
        </div>
        }





        </div>
        <p className="commentContent">{comment.content}</p>
        <p className="commentDate">{formattedDate}</p>
        {showInput && <input type="text" value={reply} onChange={handleReplySet} placeholder="입력하세요" />}


        </>
      ) : (
        <p>삭제된 댓글입니다.</p>
      )}
      <div className="replies">
        {comment.replies.map((reply) => (
          <Reply key={reply.replyId} reply={reply} User={User} Post={Post} flag={flag} comment={comment.commentId} />
        ))}
      </div>
    </div>
  );
};

const Reply = ({ reply, User, Post, flag, comment }) => {

  const formattedDate = new Date(reply.createdDate).toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }
  );


  const handleDeleteReply = async () => {
    try {

      await axios.delete(`/ailion/reply/`, {
        data : {
          "postId" : parseInt(Post),
          "replyId" : reply.replyId
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
      });
      if (flag === true) {
        await axios.delete(`/ailion/comments`, {
          data : {
            "commentId" : comment,
            "postId" : parseInt(Post),
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          },
        });
      }
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="reply">
      <div className="replyImgWrap">
      <img className="replyImg" src={"/img/alien" + (reply.userId % 5 + 1) + ".png"} alt="commentImg" />
      <h4>{reply.writer}</h4>

      {parseInt(User) === reply.userId ?
        <div className="commentBtnWrap">
        <button className="commentBtn" onClick={handleDeleteReply}>삭제</button>
        </div>
        : null}


      </div>
      <p className="replyContent">{reply.content}</p>
      <p className="replyDate">{formattedDate}</p>



    </div>
  );
};


const CommentsList = ({ comments, User, Post }) => {


  return (
  <div className="comment_list">
    {comments.map((comment) => (
      <Comment key={comment.commentId} comment={comment} User={User} Post={Post} />
    ))}
  </div>
  );
};
export default CommentsList;

