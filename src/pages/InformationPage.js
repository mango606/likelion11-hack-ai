import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import './InfoPage.css';
import axios from 'axios';

const InformationPage = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    console.log("start") 
    const fetchData = async () => {
      // if (!(localStorage.getItem('jwt'))) {
      //   return;
      // }
      try {
        let url = '/ailion/api/aiInfo';
        // let url = 'https://82cac7c3-07a4-4d45-900b-6c9cb3df5f89.mock.pstmn.io/ailion/api/aiInfo';
        if (selectedCategory !== "all") {
          // url = `https://82cac7c3-07a4-4d45-900b-6c9cb3df5f89.mock.pstmn.io/ailion/api/aiInfo/category/${selectedCategory}`;
          url = `/ailion/api/aiInfo/category/${selectedCategory}`;
        }
        // const response = await axios.get(url,{
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        //     }
        // });
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data);
        console.log('성공');
      } catch (error) {
        console.error('API 요청 에러:', error);
      }
    };
    fetchData();
  }, [selectedCategory]);

  

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  

  return (
    <>
      <Sidebar />
      <article>
        <div className='info-title'>
          최신 AI 정보를 확인해보세요
        </div>
        <div className='info-category'>
          <button
            onClick={() => handleCategoryClick("all")}
            className={selectedCategory === "all" ? "selected" : ""}
          >
            전체
          </button>
          <button
            onClick={() => handleCategoryClick("image")}
            className={selectedCategory === "image" ? "selected" : ""}
          >
            이미지
          </button>
          <button
            onClick={() => handleCategoryClick("search")}
            className={selectedCategory === "search" ? "selected" : ""}
          >
            검색형
          </button>
          <button
            onClick={() => handleCategoryClick("text")}
            className={selectedCategory === "text" ? "selected" : ""}
          >
            글쓰기
          </button>
          <button
            onClick={() => handleCategoryClick("music")}
            className={selectedCategory === "music" ? "selected" : ""}
          >
            음악
          </button>
          <button
            onClick={() => handleCategoryClick("video")}
            className={selectedCategory === "video" ? "selected" : ""}
          >
            비디오
          </button>
          <button
            onClick={() => handleCategoryClick("etc")}
            className={selectedCategory === "etc" ? "selected" : ""}
          >
            기타
          </button>
        </div>
        {data.length > 0 && (
          <ul className="info-content">
            {data.map((item,index) => (
              <li className="AI-box" key={index}>
                <div className="AI-info">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <div className='AI-name'>{item.name}</div>
                  </a>
                  <div className='AI-category'>{item.category}</div>
                  <div className='AI-content'>{item.content}
                  </div>

                </div>
                <img className="AI-img" alt="인기 AI 이미지" src={item.imageUrl} />
              </li>
            ))}
          </ul>
        )}
        {data.length === 0 && (
          <div className="post-none-box">
            <p className="post-none">게시글이 존재하지 않습니다.</p>
          </div>
        )}
      </article>
    </>
  );
};

export default InformationPage;
