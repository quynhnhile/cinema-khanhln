import axios from "axios";
import { useEffect, useState } from "react";
import SingleData from "../../components/SingleData/SingleData";
import { Link } from "react-router-dom";
import CarouselHomePage from "../../components/CarouselHomePage/CarouselHomePage";
import Myloader from "react-spinners/PuffLoader";
// import "../../css/pages/Home/Home.css";
import "./Home.css"

const Home = () => {
  const [allContent, setAllContent] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //call api get popular movies
  const fetchPopularMovieApi = async () => {
    try {
      const { data } = await axios.get(` 
     https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&page=1`);
      const alldata = data.results;
      const filter = alldata.slice(0, 7);
      setAllContent(filter);
      setIsLoading(true);

    } catch (error) {
      console.error(error);
    }
  };

  //call api get tv series
  const fetchPopularSeriesApi = async () => {
    try {
      const { data } = await axios.get(` 
      https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&page=1`);
      const alldata = data.results;
      const filter = alldata.slice(0, 7);
      setPopularSeries(filter);
      setIsLoading(true);

    } catch (error) {
      console.error(error);
    }
  };

  //call api get movies top rate
  const fetchTopRatedApi = async () => {
    try {
      const { data } = await axios.get(` 
      https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=1`);
      const alldata = data.results;
      const filter = alldata.slice(0, 7);
      setTopRated(filter);
      setIsLoading(true);

    } catch (error) {
      console.error(error);
    }
  };
  console.log('home page')
  useEffect(() => {
    window.scroll(0, 0);

    fetchPopularMovieApi();
    fetchPopularSeriesApi();
    fetchTopRatedApi();
    return () => {
      setPopularSeries();
      setAllContent();
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div style={{ marginTop: "-10px" }} className="bg__home">
            {/* carousel introduce film */}
            <CarouselHomePage />
          </div>
          <div className="TreadingHome3 pt-4">
            <div className="title__home">
              <div className="btn__home">
                <h6>
                  Movies On Air &#160;
                  <span style={{ paddingTop: "10px" }}>&#11166;</span>
                </h6>
              </div>
              <div className="view__more">
                <Link to="/all-movies" style={{ textDecoration: "none" }}>
                  <p>View more &#187;</p>
                </Link>
              </div>
            </div>

            <div className="ListContent2">
              {allContent &&
                allContent.map((data) => (
                  <SingleData key={data.id} {...data} mediaType="movie" />
                ))}
            </div>
          </div>
          <hr />
          <div className="TreadingHome3">
            <div className="title__home">
              <div className="btn__home">
                <h6>
                  TvSeries On Air &#160;
                  <span style={{ paddingTop: "10px" }}>&#11166;</span>
                </h6>
              </div>
              <div className="view__more">
                <Link to="/all-series" style={{ textDecoration: "none" }}>
                  <p>View more &#187;</p>
                </Link>
              </div>
            </div>
            <div className="ListContent2">
              {popularSeries &&
                popularSeries.map((data) => (
                  <SingleData key={data.id} mediaType="tv" {...data} />
                ))}
            </div>
          </div>
          <hr />
          <div className="TreadingHome3">
            <div className="title__home">
              <div className="btn__home" style={{ width: "160px" }}>
                <h6>
                  Top Rated &#160;
                  <span style={{ paddingTop: "10px" }}>&#11166;</span>
                </h6>
              </div>
              <div className="view__more">
                <Link to="/all-movies" style={{ textDecoration: "none" }}>
                  <p>View more &#187;</p>
                </Link>
              </div>
            </div>
            <div className="ListContent2">
              {topRated &&
                topRated.map((data) => (
                  <SingleData key={data.id} mediaType="movie" {...data} />
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="major" style={{ height: "600px" }}>
          <Myloader color='grey' size={60} />
        </div>
      )}
    </>
  );
};

export default Home;
