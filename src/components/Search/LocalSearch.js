import * as React from "react";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'
import "./LocalSearch.css"
import "../../pages/TrendingShow/PagesStyles.css"

export default function LocalSearch({ setSearchTerm, fetchSearchApi, setPage, searchTerm }) {

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#abb7c4;",
      },
    },
  });

  //handle click btn search
  const handleSearch = () => {
    fetchSearchApi();
    setPage(1)
  };

  //handle change input search
  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setPage(1)
  };

  useEffect(() => {
    fetchSearchApi();
    console.log('localsearch fetchSearchApi')
    return () => { };
  }, []);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <div className="form_search">
            <input
              value={searchTerm}
              type="search"
              placeholder="Search Movies Here ..."
              onChange={handleChange}
            />
            <SearchIcon className="icon" label="ss" />
            <div
              className="btn btn-primary brn-sm search__icon"
              onClick={handleSearch}
            >
              <span>
                Search
              </span>
            </div>
          </div>
        </div>
      </ThemeProvider >
    </>
  );
}
