import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import "../../css/components/Geners/Geners.css"
import "./Genres.css"


const Genre = ({
  media,
  setFilterGenre,
  setPage,
  setSearchTerm,
  setGenreTitle,
  // genreTitle,
  // setTreadingContent,
  // treadingContent,
  // handleRedirect,
}) => {
  const [getGenre, setGetGenre] = useState([]); //contain all genre of type of movies
  const navigate = useNavigate()

  //get all genres of type movies - media
  const fetchGenres = async () => {
    try {
      if (media) {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/${media}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setGetGenre(data.genres);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //handle click filter genre
  const handleFilter = (genre) => {
    setFilterGenre([genre]);
    setPage(1);
    setGenreTitle(genre);
    if (media === "tv") {
      navigate(`/tv-series/category/${media}/${genre.name}/page/1`);

    } else if (media === "movie") {
      navigate(`/movies/category/${media}/${genre.name}/page/1`);
    } else if (!media) {
      navigate("/all-movies");
    }
    let dropdownList = document.querySelector('#dropdownMenuLink ~ .dropdown-menu')
    dropdownList.classList.toggle('show')
    setSearchTerm('')
  };

  const handleClickDropdownMenuLink = (e) => {
    let dropdownList = document.querySelector('#dropdownMenuLink ~ .dropdown-menu')
    dropdownList.classList.toggle('show')
  }

  console.log(`all genre of ${media}`, getGenre)
  useEffect(() => {
    fetchGenres();
    return () => {
      setGetGenre();
    };
  }, []);

  return (
    <>
      <div className="dropdown" style={{ position: "relative " }}>
        <Link
          className="btn btn-secondary dropdown-toggle mybtn"
          to="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-expanded="false"
          onClick={handleClickDropdownMenuLink}
        >
          Filter By:{" "}
        </Link>

        <div className="dropdown-menu"
          aria-labelledby="dropdownMenuLink"
          style={{
            position: 'absolute',
            transform: 'translate3d(0px, 33px, 0px)',
            top: '0px',
            left: '0px',
            willChange: 'transform',
          }
          }
        >
          <div className="title__genre">Categories</div>

          <div className="category__content">
            <p className="dropdown-item3" onClick={handleFilter}>
              all {media === "movie" ? "Movies" : "Tv series"}
            </p>
            {getGenre &&
              getGenre.map((genre) => (
                <p
                  key={genre.id}
                  onClick={() => handleFilter(genre)}
                  className="dropdown-item2"
                >
                  {genre.name}
                </p>
              ))}
          </div>
        </div>
      </div >
    </>
  );
};

export default Genre;
