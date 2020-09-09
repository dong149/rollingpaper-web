import '../styles/post.scss';

import React, { useState } from 'react';

interface Props{
  content: string,
  author: string,
  color: string,
}

const Post = ({ content, author, color }:Props) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      { !isClicked ? (
        <div
          className='post'
          onClick={ () => setIsClicked(!isClicked) }
          style={{ border: `1px solid ${color}` }}
        >
          <div className='post-content'>
            <span>{ content }</span>
          </div>
        </div>
      ) : (
        <div
          className='post-clicked'
          onClick={ () => setIsClicked(!isClicked) }
          style={{ backgroundColor: `${color}`, border: `1px solid ${color}` }}
        >
          <div className='post-author'>
            <span>{ author }</span>
          </div>
        </div>
      ) }
    </>
  );
};

export default Post;
