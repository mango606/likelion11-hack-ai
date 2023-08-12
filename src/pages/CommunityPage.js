import React from 'react';
import Sidebar from '../Sidebar';
import Community from '../components/Community';
import HotPost from '../components/HotPost';

const CommunityPage = () => {
    return (
        <>
          <Sidebar />
          <article>
            <HotPost />
            <Community />
          </article>
        </>
      );
};

export default CommunityPage;