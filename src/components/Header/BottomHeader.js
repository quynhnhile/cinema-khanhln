import * as React from "react";
import Box from "@mui/material/Box";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import TheatersIcon from "@mui/icons-material/Theaters";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import "./BottomHeader.css"

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  &.MuiBottomNavigationAction-root{
    color:#abb7c4;
  },  
  &.Mui-selected {
    color: #1a9be7;
  }
`);

const BottomNavigation = styled(MuiBottomNavigation)(`
    background:rgba(1, 0, 12, 0.5) !important;
`);
export default function BottomHeader() {
  const [value, setValue] = React.useState("")
  const navigate = useNavigate()


  const handleClickHomeIcon = (e) => {
    navigate('/')
  }

  const handleClickTrendingIcon = (e) => {
    navigate('/treading')
  }
  const handleClickMoviesIcon = (e) => {
    navigate('/all-movies')
  }
  const handleClickSeriesIcon = (e) => {
    navigate('/all-series')
  }
  return (
    <Box
      style={{ zIndex: "2000" }}
      className="BottomNav"
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        justifyContent: "center",
      }}
    >
      <BottomNavigation
        style={{
          background: "black",
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
          <BottomNavigationAction
            className="BottomNavIcon"
            label="Home"
            icon={<HomeIcon />}
            color="primary"
            value="home"
            onClick={handleClickHomeIcon}
          />

        <BottomNavigationAction
          className="BottomNavIcon"
          label="Trending"
          icon={<WhatshotIcon />}
          color="primary"
          value="tread"
          onClick={handleClickTrendingIcon}
        />

        <BottomNavigationAction
          label="Movies"
          icon={<MovieIcon />}
          value="movies"
          onClick={handleClickMoviesIcon}
        />
        <BottomNavigationAction
          label="Series"
          icon={<TheatersIcon />}
          value="series"
          onClick={handleClickSeriesIcon}
        />
      </BottomNavigation>
    </Box>
  );
}
