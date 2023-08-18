import React from 'react';
import Sidebar from '../Sidebar';
import Home from '../components/Home';

const HomePage = () => {
  return (
    <>
      <Sidebar />
      <article id="home-img">
        <Home />
      </article>
    </>
  );
};

export default HomePage;