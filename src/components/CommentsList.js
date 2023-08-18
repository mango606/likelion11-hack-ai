import React from "react";
import axios from "axios";

const Comment = ({ comment, User, Post }) => {
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

  return (
    <div className="comment">
      {comment.delCheck === false ? (
        <>
        <div className="commentImgWrap">
        <img className="commentProfileImg" src={"/img/alien" + (comment.userId % 5 + 1) + ".png"} alt="commentImg" />
        <h3>{comment.writer}</h3>

        {User === comment.userId ?
        <div className="commentBtnWrap">
        <button className="commentBtn" onClick={handleDeleteComment}>삭제</button>
        </div>
        : null}

        </div>
        <p className="commentContent">{comment.content}</p>
        <p className="commentDate">{formattedDate}</p>



        </>
      ) : (
        <p>삭제된 댓글입니다.</p>
      )}
      <div className="replies">
        {comment.replies.map((reply) => (
          <Reply key={reply.replyId} reply={reply} User={User} Post={Post} />
        ))}
      </div>
    </div>
  );
};

const Reply = ({ reply, User, Post }) => {
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
        },

      });
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

      {User === reply.userId ?
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

