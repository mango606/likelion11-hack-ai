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
      const response = await axios.get('/ailion/api/top5',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          }
      });
      setTopAI(response.data);
    } catch (error) {
      console.error('Error fetching top AI:', error);
    }
  };

  const fetchRecAI = async () => {
    try {
      if (localStorage.getItem('jwt')) {
        const response = await axios.get('/ailion/userRecommend', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
      
        const userInterests = ['MUSIC'];
        const data = response.data;
        const allRecAI = [];
      
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key) && userInterests.includes(key)) {
            allRecAI.push(...data[userInterests]);
          }
        }
      
        setRecAI(allRecAI);
        const combinedRecAI = allRecAI.reduce((acc, prop) => acc.concat(prop), []);
        setRecAI(combinedRecAI);
        
      }
      
       else {
        const response = await axios.get('/ailion/api/userRecommend');
        const allRecAI = Object.values(response.data);
        const combinedRecAI = allRecAI.reduce((acc, prop) => acc.concat(prop), []);
        setRecAI(combinedRecAI);
      }
    } catch (error) {
      console.error('Error fetching recommended AI:', error);
    }
  };
  
  return (
    <>
      <Sidebar />
      <article >
        <div className='top_container'>
        <span className='top_title'><h1>인기 AI TOP 5</h1></span>
        <ul className='topAI_list'>
          {topAI.map((ai, index) => (
            <li key={index}>
              <a href={ai.url} target="_blank" rel="noopener noreferrer">
              
              <div className='recommend_box'>
                <div className='topAI_name'>{ai.name}</div>
                <img className="topAI_img" alt="인기 AI 이미지" src={ai.imageUrl} />
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
              <img className="rec_img" alt={`${ai.name} 로고`} src={ai.imageUrl} />
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