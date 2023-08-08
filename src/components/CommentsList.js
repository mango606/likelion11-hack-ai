import React from "react";

const Comment = ({ comment }) => {
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

  return (
    <div className="comment">
      {comment.delCheck === false ? (
        <>
        <h3>{comment.writer}</h3>
        <p>{comment.content}</p>
        <p>{formattedDate}</p>
        </>
      ) : (
        <p>삭제된 댓글입니다.</p>
      )}
      <div className="replies">
        {comment.replies.map((reply) => (
          <Reply key={reply.replyId} reply={reply} />
        ))}
      </div>
    </div>
  );
};

const Reply = ({ reply }) => {
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

  return (
    <div className="reply">
      <h4>{reply.writer}</h4>
      <p>{reply.content}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

const CommentsList = ({ comments }) => (
  <div className="comment_list">
    {comments.map((comment) => (
      <Comment key={comment.commentId} comment={comment} />
    ))}
  </div>
);

export default CommentsList;
