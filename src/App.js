import "./App.css";
// import Content from "./config/Routes/Routes";
// import "./css/main.css"
import "bootstrap/dist/css/bootstrap.min.css"; //d
import React, { useEffect, useState } from "react";
import Myloader from "react-spinners/ClipLoader"; //d
import logoHBO from "./asset/images/hbo-max.svg";
import MainHeader from "./components/Header/MainHeader";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Trending from "./pages/TrendingShow/Trending";
import Movies from "./pages/Movies/Movies";
import TvSeries from "./pages/TvSeries/TvSeries";
import DetailPage from "./pages/DetailPage/DetailPage";
import Footer from "./components/Footer/Footer";
import BottomHeader from "./components/Header/BottomHeader";

function App() {
  const [spinner, setSpinner] = useState(true);


  useEffect(() => {
    setTimeout(() => setSpinner(false), 500);
  }, []);
  return (
    <>
      {!spinner ? (
        // <Content />
        <>
          <MainHeader />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/treading" element={<Trending />} />
              <Route path="/treading/page/:page" element={<Trending />} />
              <Route path="/all-movies" element={<Movies />} />
              <Route path="/movies/page/:page" element={<Movies />} />
              <Route path="/movies/:searhTerm/page/:page" element={<Movies />} />
              <Route path="/movies/category/:media/:id/page/:page" element={<Movies />} />
              <Route path="/all-series" element={<TvSeries />} />
              <Route path="/series/page/:page" element={<TvSeries />} />
              <Route path="/series/:searhTerm/page/:page" element={<TvSeries />} />
              <Route path="/tv-series/category/:media/:id/page/:page" element={<TvSeries />} />
              <Route path="/detail/:mediaType/:id" element={<DetailPage />} />
            </Routes>
          </div>
          <Footer />
          <BottomHeader />
        </>
      ) : (
        <div className="load_app" style={{ height: "400px" }}>
          <Myloader
            color="grey"
            size={80}
            className="m__load"
            speedMultiplier={1.5}
          />
          <img src={logoHBO} alt="" width="300" className="logo2 pt-4" />{" "}
        </div>
      )}
    </>
  );
}

export default App;
