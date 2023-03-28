import React from 'react'
import FileUpload from './FileUpload'
import ImgCard from './ImgCard'
import Share from './Share';

const Home = () => {
  return (
    <div className="w-full h-screen bg-[#212936] mx-auto flex flex-col justify-center items-center mt-24">
      <FileUpload />
      <ImgCard />
      <Share />
    </div>
  );
}

export default Home