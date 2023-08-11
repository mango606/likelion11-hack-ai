import React from 'react';
import Sidebar from '../Sidebar';
import Community from '../components/Community';

const CommunityPage = () => {
    return (
        <>
          <Sidebar />
          <article>
            <Community />
          </article>
        </>
      );
};

export default CommunityPage;