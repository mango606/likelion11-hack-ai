import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Community.css";
import './PostStyle.css';

const Community = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});

    // axios 사용
    useEffect(() => {
        let pages = page;
        const getPosts = async () => {
            console.log("getPosts");
            try {
                const response = await axios.get(`/ailion/api/posts/list`, {
                    params: {
                        pages: 0,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setData(response.data.content);
                setFilteredData(response.data.content); // 초기에 모든 데이터를 표시하기 위해 filteredData 초기화
            } catch (e) {
                console.log(e);
            }
        };
        getPosts();
    }, [page]);

    useEffect(() => {
        if (!(localStorage.getItem('jwt'))) {
            return;
        }
        const fetchUser = async () => {
            try {
                const response = await axios.get("/ailion/user/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });
                setUser(response.data.id);
            } catch (e) {
                console.log(e);
                localStorage.removeItem('jwt');
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setIsLoading(false);
        }
    }, [data]);

    // 게시글
    const items = (Object.values(data)).map((item) => (
        <ul className="my-page" key={item.postId}>
            <li className="post">
            <Link to={`/comm/${item.userId}/${item.postId}`} className="post-link">
            <div className="post-box">
                <div className="post-category">{item.category}</div>
                    <div className="post-title">{item.title}</div>
                    <div className="post-message">{item.content}</div>
                    <div className="post-content">
                        <img className="post-img2" src="./img/heart.png"></img>
                        <a className="post-likes">{item.likeCount}</a>
                        <img className="post-img2" src="./img/comment-dots.png"></img>
                        <a className="post-comments">{item.commentCount}</a>
                        <span className="post-createdAt">{item.createdDate}</span>
                </div>
            </div>
            </Link>
            </li>
        </ul>
    ));

    // createdDate 포맷 변환
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // 검색어 입력
  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
};

// 엔터 입력
const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        filterData(searchKeyword, selectedCategory);
    }
};

// 카테고리 클릭
const handleCategoryClick = (category) => {
  setSelectedCategory(category);
  setSearchKeyword(""); // 검색값 초기화
  filterData("", category); // 검색값 초기화 후 필터링된 결과 보여주기
};

const filterData = (keyword, category) => {
    const filtered = data.filter(item =>
        (category === "all" || item.category === category) &&
        (item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.content.toLowerCase().includes(keyword.toLowerCase()))
    );
    setFilteredData(filtered);
};


    return (
        <>
        {isLoading ? <div className="loading">Loading...</div> : <>



        <section>
            <h3 id="com-title">최근 게시글</h3>

            <div id="com-search-center">
            <form id="com-search-box" className="search">
            <input
                        id="com-search"
                        name="keyword"
                        placeholder="검색어를 입력해 주세요."
                        className="text"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        onKeyDown={handleEnterKey}
                    />
                </form>
            </div>

            <div id="com-btn">
                <div id="com-wrap">
                <button
                        onClick={() => handleCategoryClick("all")}
                        className={selectedCategory === "all" ? "selected" : ""}
                >
                        전체
                </button>
                <button
                        onClick={() => handleCategoryClick("자유")}
                        className={selectedCategory === "자유" ? "selected" : ""}
                >
                    자유
                </button>
                <button
                        onClick={() => handleCategoryClick("자신만의 AI 노하우")}
                        className={selectedCategory === "자신만의 AI 노하우" ? "selected" : ""}
                >
                    나만의 AI 노하우
                </button>
                <button
                    onClick={() => handleCategoryClick("AI 결과물 자랑")}
                    className={selectedCategory === "AI 결과물 자랑" ? "selected" : ""}
                >
                    결과물 자랑
                </button>
                <button
                    onClick={() => handleCategoryClick("수익 창출 공유")}
                    className={selectedCategory === "수익 창출 공유" ? "selected" : ""}
                >
                    수익 창출 공유
                </button>
                </div>
            </div>

            {filteredData.length > 0 ? (
                filteredData.map(item => (
                    <ul className="my-page" key={item.postId}>
                        <Link to={`/comm/${item.userId}/${item.postId}`} className="post-link">
                        <li className="post">
                            <div className="post-box">
                                <div className="post-category">{item.category} 게시판</div>
                                <div className="post-title">{item.title}</div>
                                <div className="post-message">{item.content}</div>
                                <div className="post-content">
                                    <img className="post-img2" src="./img/heart.png" alt="heart" />
                                    <a className="post-likes">{item.likeCount}</a>
                                    <img className="post-img2" src="./img/comment-dots.png" alt="comment" />
                                    <a className="post-comments">{item.commentCount}</a>
                                    <span className="post-createdAt">{formatDate(item.createdDate)}</span>
                                </div>
                            </div>
                            <img className="post-img3" src='https://cdn.pixabay.com/photo/2023/07/18/02/24/ai-generated-8133842_640.jpg'></img>
                        </li>
                        </Link>
                    </ul>
                ))
            ) : (
                <div className="post-none-box">
                    <p className="post-none">게시글이 존재하지 않습니다.</p>
                </div>
            )}

        </section>

        </>}


        </>
    );
};

export default Community;
