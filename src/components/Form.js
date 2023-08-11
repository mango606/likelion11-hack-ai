import React from 'react';
import { useNavigate } from "react-router-dom";
import './Form.css';

const Form = () => {
  return (
    <>
    <h3>글쓰기</h3>
    <section id="write-box">
        <form id="write-form">
            <div id="write-title">
                <input type="text" class="form-title" name="title" placeholder='제목' required/>
            </div>
            <select name="category" required>
                <option value="" selected> 카테고리 선택</option>
                <option value="자신만의 AI 노하우 게시판">자신만의 AI 노하우 게시판</option>
                <option value="AI 결과물 자랑 게시판">AI 결과물 자랑</option>
                <option value="자유 게시판">자유</option>
                <option value="수익 창출 공유 게시판">수익 창출 공유</option>
            </select>
            <textarea class="form-content" name="content" rows="20" placeholder='본문 내용을 입력해 주세요.' required></textarea>
            <input type="text" class="write-hashtag" placeholder='#해시태그' name="hashtag"/>
            <div class="write-btn">
                <button type="button" class="write-cancl">취소</button>
                <button type="submit" class="write-submit">작성</button>
            </div>
        </form>
    </section>
    </>
    );
};

export default Form;