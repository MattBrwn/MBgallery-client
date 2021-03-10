import React from 'react';
import { Link } from "react-router-dom"

function MyAlbum(props) {

  const showAlbum = () => {
  
    return props.images.map(image => {
      return (
        
        
          <div key={image._id}>
            <div class="album-picture">
            <img  src={image.imageUrl} alt='this image' /> 
            <div>
              <Link to={`/album/${image._id}`}><h2>{image.title}</h2></Link>
              
              <div class="album-decription">
              <p>{image.description}</p>

              </div>
            </div>
            
          </div>
        </div>
        
      );
    });
  };
return <div>{showAlbum()}</div>;
}

export default MyAlbum;
