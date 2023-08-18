import React from 'react';
import Sidebar from '../Sidebar';
import Form from '../components/Form';

const WritePage = () => {
    return (
        <>
          <Sidebar />
          <article id="write-article">
            <Form />
          </article>
        </>
      );
};

export default WritePage;