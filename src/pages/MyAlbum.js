import React from 'react';
import { Link } from "react-router-dom"

function MyAlbum(props) {

  // console.log("props in AllBeers component: ", props);

  const showAlbum = () => {
    return props.album.map(image => {
      return (
        <div key={image._id}>
          <img style={{ width: '300px' }} src={image.imageUrl} alt='this image' />
          <h3>{image.title}</h3>
        </div>
      );
    });
  };
return <div>{showAlbum()}</div>;
}

export default MyAlbum;
