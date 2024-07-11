import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../../asset/images/home-icon.svg"
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "../../asset/images/movie-icon.svg";
import TheatersIcon from "../../asset/images/series-icon.svg";
import $ from "jquery";
import mySvg from "../../asset/images/hbo-max.svg"
// import "../../css/components/MainNav/MainNav.css"
import "./MainHeader.css"

//change bg color of header when scroll 
$(function () {
  $(document).on("scroll", function () {
    var $nav = $(".navbar");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});

const MainHeader = () => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <Link className="navbar-brand" to="/">
          <div className="MainHeading">
            <img src={mySvg} alt="" className="logo2" />{" "}
          </div>
        </Link>

        <div className="collapse navbar-collapse d-flex justify-content-between">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active  nav__link">
              <Link className="nav-link" to="/">
                <img
                  src={HomeIcon}
                  style={{
                    fontSize: "17px",
                    marginBottom: "5px",
                    marginRight: "0px",
                  }}
                  alt=""
                />
                Home <span className="sr-only"></span>
              </Link>
            </li>
            <li className="nav-item  nav__link">
              <Link className="nav-link" to="/treading">
                <WhatshotIcon
                  style={{
                    fontSize: "17px",
                    marginBottom: "5px",

                    marginRight: "2px",
                  }}
                />
                Trending
              </Link>
            </li>
            <li className="nav-item  nav__link">
              <Link className="nav-link" to="/all-movies">
                <img
                  src={MovieIcon}
                  style={{
                    fontSize: "17px",
                    marginBottom: "2px",
                    marginRight: "1px",
                  }}
                  alt=""
                />
                Movies
              </Link>
            </li>
            <li className="nav-item nav__link">
              <Link className="nav-link" to="/all-series">
                <img
                  src={TheatersIcon}
                  style={{
                    fontSize: "17px",
                    marginBottom: "5px",
                    marginRight: "1px",
                  }}
                  alt=""
                />
                TvSeries
              </Link>
            </li>
          </ul>

          <div className="all__right">
            <div className="btn-login" style={{marginRight: '27px'}}>
              <button className=" login-btn">login</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainHeader;
