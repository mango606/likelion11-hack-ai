import React, {useState, useEffect} from 'react';
import Sidebar from '../Sidebar';
import './RecommendationPage.css';
import axios from 'axios';

const RecommendationPage = () => {
  const [topAI, setTopAI] = useState([]);
  const [recAI, setRecAI] = useState([]);

  useEffect(() => {
    fetchTopAI();
    fetchRecAI();

  }, []);

  const fetchTopAI = async () => {
    try {
      const response = await axios.get('/ailion/api/top5'); 
      setTopAI(response.data);
    } catch (error) {
      console.error('Error fetching top AI:', error);
    }
  };

  const fetchRecAI = async () => {
    try {
      const response = await axios.get('/ailion/api/userRecommend');
      const allRecAI = Object.values(response.data);
      const combinedRecAI = allRecAI.reduce((acc, prop) => acc.concat(prop), []); 
      setRecAI(combinedRecAI);
    } catch (error) {
      console.error('Error fetching top AI:', error);
    }
  };  

// const extractImageUrl = async (url) => {
//     try {
//       const response = await axios.get(url);
//       const match = response.data.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
//       if (match && match[1]) {
//         return match[1];
//       }
//     } catch (error) {
//       console.error('Error extracting image URL:', error);
//     }
//     return null;
//   };
  
  return (
    <>
      <Sidebar />
      <article >
        <div className='top_container'>
        <span className='top_title'><h1>인기 AI TOP 5</h1></span>
        <ul className='topAI_list'>
          {topAI.map((ai) => (
            <li key={ai.id}>
              <a href={ai.url} target="_blank" rel="noopener noreferrer">
              
              <div className='recommend_box'>
                <div className='topAI_name'>{ai.name}</div>
                <img className="topAI_img" alt="인기 AI 이미지" src={ai.img} />
              </div>
              
              </a>
            </li>
            ))}
        </ul>
        </div>
        <div className='rec_container'>

        
       <div className='rec_title'><h1>사용자 추천 AI </h1></div>
       {recAI.length > 0 ? (
        <ul className="rec-page">
          {recAI.map((ai, index) => (
            <li className="rec-box" key={index}>
              <div className="rec_info">
                <a href={ai.url} target="_blank" rel="noopener noreferrer">
                  <div className="rec_name">{ai.name}</div>
                </a>
                <div className='rec_category'>{ai.category}</div>
                <div className="rec_content">{ai.content}</div>
              </div>
              <img className="rec_img" alt={`${ai.name} 로고`} src={ai.img} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="post-none-box">
          <p className="post-none">게시글이 존재하지 않습니다.</p>
        </div>
      )}
        </div>
      </article>
    </>
  );
};

export default RecommendationPage;