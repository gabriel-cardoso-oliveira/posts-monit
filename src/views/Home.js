import React from 'react';
import { ToastContainer } from 'react-toastify';
// import sections
import Subheader from '../components/sections/Subheader';
import PostsList from '../components/sections/PostsList';

const Home = () => {
  return (
    <>
      <Subheader className="illustration-section-01" />
      <PostsList topDivider />
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default Home;
