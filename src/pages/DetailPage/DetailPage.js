import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { img_300, img_500, unavailable } from "../../api/config/DefaultImages";
import SingleData from "../../components/SingleData/SingleData";
import SingleVideoPage from "../../components/DetailContentPage/VideoContent";
import Myloader from "react-spinners/ClipLoader";
import Carousel from "../../components/Carousel/Carousel"
// import "../../css/components/SingleContentPage/SinglePage.css"
import "../../components/DetailContentPage/DetailPage.css"

const DetailPage = () => {
  // $(function () {
  //   $(".ico").on("click", function () {
  //     $(".ico").toggleClass("press", 1000);
  //   });
  // });
  const [content, setContent] = useState(); //contain info of current movie
  const [similarMovies, setSimilarMovies] = useState(); //contain info related movies
  const [video, setVideo] = useState(''); //contain key of video/trailer of current movie
  const [isLoading, setIsLoading] = useState(false);
  const { id, mediaType } = useParams();

  //get info of movie by movie id
  const fetchData = async () => {
    try {
      console.log('1 detaill page')
      const { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&page=1`);
      setContent(data);
      setIsLoading(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('fetchData detail movies fail', error.response)
      }
    }
  };

  console.log('detaill page')
  //get related movies
  const fetchSimilarMovies = async () => {
    try {
      console.log('2 detaill page')
      const { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`);
      const dataSlice = data.results;
      const filter = dataSlice.slice(0, 7); //max 7 related movies

      setSimilarMovies(filter);
      setIsLoading(true);
    } catch (error) {
      console.error(error);
    }
  };
  console.log('current movie id', id)
  console.log('detail page key trailer', video)
  
  //get info video of current movie by movie id
  const fetchVideos = async () => {
    try {
      console.log('3 detaill page')
      const { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);

      if (data.results[0].key) { //if have key (have video)
        setVideo(data.results[0].key);
      } else {
        console.log('dont have video')
      }
      setIsLoading(true);

    } catch (error) {
      //   console.error(error);
      console.log('dont have video:', error) //dont have key

    }
  };
  console.log('detail page content.poster_path', content)
  useEffect(() => {
    window.scroll(0, 0);

    fetchData();
    fetchSimilarMovies();
    fetchVideos();

    return () => {
      setVideo('') //reset key trailer video
    }
  }, [id, mediaType]);
  return (
    <>
      {isLoading ? (
        <>
          <div>
            {content && (
              <div
                className="open__modal"
                style={{
                  backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${content.backdrop_path})`,
                }}
              >
                <img
                  className="poster__img"
                  src={
                    content.poster_path
                      ? `${img_300}/${content.poster_path}`
                      : unavailable
                  }
                  alt=""
                />
                <img
                  className="backdrop__img"
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailable
                  }
                  alt=""
                />

                <div className="open__detailsPage">
                  <h3>{content.original_title || content.name}</h3>
                  <div
                    style={{
                      zIndex: "1000",
                      marginTop: "10px",
                      textAlign: "left",
                    }}
                    className="year"
                  >
                    {(//get year
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}{" "}
                    .
                    <b className="title_me">
                      {mediaType === "tv" ? "Tv Series ." : "Movie ."}
                    </b>
                    <b className="vote_back">
                      <b className="tmdb">TMDB</b>
                      <b className="vote_ave">-⭐{+content.vote_average.toFixed(1)}</b>
                    </b>
                  </div>
                  <h5
                    style={{
                      display: "flex",
                      fontSize: "12px",
                    }}
                    className="genreList"
                  >
                    {content.genres.map((data, i) => {
                      return (
                        <p
                          key={data.id}
                          style={{ fontSize: "13px", marginLeft: "6px" }}
                          className="mygenre"
                        >
                          {i > 0 && ", "}
                          {data.name}
                        </p>
                      );
                    })}
                  </h5>

                  <div className="videopage">
                    {content && (
                      <SingleVideoPage keyTrailer={video} title={content.title} />
                    )}
                  </div>
                  <div className="tagline">
                    <h5>{content.tagline}</h5>
                  </div>
                  <div className="overview">
                    <p>{content.overview}</p>
                  </div>
                  <div className="other_lists">
                    <ul style={{ padding: 0 }}>
                      <li>
                        DURATION:{" "}
                        <span>
                          {mediaType === "tv"
                            ? `${content.episode_run_time[0]} min episodes`
                            : `${content.runtime} min`}
                        </span>
                      </li>
                      {mediaType === "tv" ? (
                        <li>
                          SEASONS: <span>{content.number_of_seasons}</span>
                        </li>
                      ) : (
                        ""
                      )}

                      <li>
                        STUDIO:
                        {content.production_companies.map((studio, i) => {
                          return (
                            <span key={studio.id}>
                              {" "}
                              {i > 0 && ",  "}
                              {studio.name}
                            </span>
                          );
                        })}
                      </li>
                      {mediaType === "movie" ? (
                        <li>
                          RELEASE DATE: <span>{content.release_date}</span>
                        </li>
                      ) : (
                        ""
                      )}
                      <li>
                        STATUS: <span>{content.status}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="all__cast px-5 pt-5">
            <div className="cast__title">
              <h2>Cast</h2>
            </div>
            <div>
              <Carousel mediaType={mediaType} id={id} />
            </div>
          </div>
          <div className="similar__shows">
            <div className="btn__title">
              <h5>You May Also Like </h5>
            </div>
            <div className="similar">
              {similarMovies &&
                similarMovies.map((data) => (
                  <SingleData key={data.id} {...data} mediaType="movie" />
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="load_app" style={{ height: "500px" }}>
          <Myloader color="grey" size={60} />
          <p
            className="pt-4 text-secondary text-loading"
            style={{ textTransform: "capitalize", fontSize: "1rem" }}
          >
            Loading Please Wait...
          </p>
        </div>
      )}
    </>
  );
};

export default DetailPage;
