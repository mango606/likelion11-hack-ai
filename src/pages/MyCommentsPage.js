import React from 'react';
import Sidebar from '../Sidebar';
import { NavLink } from 'react-router-dom';
// import axios from 'axios';

import './MyCommentsPage.css';

const dummyComments = [
      {
        postId: 1,
        postTitle: '1 게시글',
        commentId: 1,
        content: '1 댓글 내용',
        createdDate: '2023-08-05T00:47:25.728966'
      },
      {
        postId: 2,
        postTitle: '2 게시글',
        commentId: 2,
        content: '2',
        createdDate: '2023-08-05T00:47:25.728966'
      },
      {
        postId: 3,
        postTitle: '제목',
        commentId: 3,
        content: '3333333333333333333333333333333333333333',
        createdDate: '2023-08-05T00:47:30.728966'
      }
];

const MyCommentsPage = () => {
  return (
    <>
      <Sidebar />
      <article className='mycomments_area'>
            <div className='mycomments_title'>            
                  <NavLink to="/Mypage">
                        <img className="mycomments_img" alt="뒤로가기 이미지" src="img/arrow_back.png" />
                  </NavLink>
                  <div className='mycomments_contents'>내 댓글 보기</div>
            </div>

             <ul>
             {dummyComments.map((comment) => (
                <li key={comment.commentId}>
                  <div className='mycomments_box'>
                      <div className='comment_category'>게시글 카테고리</div>
                      <hr/>
                      <div className='comment_content'>{comment.content}</div>
                    <div className='comment_title'>{comment.postTitle}</div>
                      <div className='comment_date'>
                        {new Date(comment.createdDate).toLocaleString()}
                      </div>
                  </div>
                </li>
                ))}
              </ul>

      
      </article>
    </>
  );
};

export default MyCommentsPage;