import React from 'react';

export const Profile = () => {
  return <img src = "C:/Users/farheen/my-app-Copy/src/2.jpg" alt="Profile"/>;
};

export const Gallery = () => {
  return (
    <section>
      <h1>Amazing scientist</h1>
      <Profile/>
      <Profile/>
    </section>
  );
};

export default Gallery;
