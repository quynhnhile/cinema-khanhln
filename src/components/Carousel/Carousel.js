import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../api/config/DefaultImages";
import "./Carousel.css"
const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ mediaType, id }) => {
  const [credits, setCredits] = useState();

  const responsive = {
    0: {
      items: 1,
    },
    380: {
      items: 1,
    },
    512: {
      items: 2,
    },
    665: {
      items: 3,
    },
    767: {
      items: 3,
    },
    870: {
      items: 4,
    },
    1024: {
      items: 6,
    },
    1265: {
      items: 7,
    },
  };

  const items = credits?.map((characterInfo) => {
    return (
      <div className="carousel__d">
        <img
          src={characterInfo.profile_path ? `${img_300}/${characterInfo.profile_path}` : noPicture}
          alt=""
          className="caro_img"
          onDragStart={handleDragStart}
        />
        <div className="caro__details">
          <h6 className="cast__name">{characterInfo.original_name}</h6>
          <h6 className="character">{characterInfo.character}</h6>
        </div>
      </div>
    );
  });

  //get character of current movie
  const fetchCredits = async () => {
    try {
      console.log('4 carousel of detaill page')

      const { data } = await axios.get(` 
     https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
      const dataSlice = data.cast;
      setCredits(dataSlice);
      // console.log(data);

    } catch (error) {
      console.error(error);
    }
  };
  console.log('carousel of detaill page')

  useEffect(() => {
    fetchCredits();
  }, [mediaType, id]);

  return (
    <AliceCarousel
      infinite
      autoPlay
      disableButtonsControls
      disableDotsControls
      mouseTracking
      items={items}
      responsive={responsive}
    />
  );
};

export default Gallery;
