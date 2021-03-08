import React from 'react';
import { Link } from "react-router-dom"

function MyAlbum(props) {

  // console.log("props in MyAlbum component: ", props);

  const showAlbum = () => {
    return props.images.map(image => {
      return (
        <div key={image._id}>
          <img style={{ width: '300px' }} src={image.imageUrl} alt='this image' /> 
          <Link to={`/album/${image._id}`}><h2>{image.title}</h2></Link>
        </div>
      );
    });
  };
return <div>{showAlbum()}</div>;
}

export default MyAlbum;
