import {  useNavigate } from "react-router-dom";
import { img_300, unavailable } from "../../api/config/DefaultImages";
import MuiPlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { styled } from "@mui/material/styles";
// import "../../css/components/SingleData/SingleData.css"
import "./SingleData.css"


const PlayArrowRoundedIcon = styled(MuiPlayArrowRoundedIcon)(`

  &.MuiSvgIcon-root{
    color:#abb7c4 ;
  },  &.MuiSvgIcon-root:hover {
    color: #d13131 ;
  }
  
`);
const SingleData = ({
  poster_path,
  title,
  name,
  id,
  vote_average,
  release_date,
  first_air_date,
  mediaType,
  media_type,
  index
}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/detail/${mediaType || media_type}/${id}`);
    console.log(`click item /detail/${mediaType || media_type}/${id}`)
  };
  const setVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };
  // console.log('singledata mediaType', index)
  // console.log('singledata mediaType', mediaType)
  // console.log('singledata media_type', media_type )
  console.log('single data content.poster_path', poster_path)
  return (
    <>
      <div
        style={{ color: "white" }}
        className="SingleDataMedia"
        onClick={handleClick}
      >
        <span className={` tag ${setVoteClass(vote_average)} vote__tag`}>
          {Math.round(vote_average * 10) / 10}
        </span>

        <img
          src={poster_path ? `${img_300}/${poster_path}` : unavailable}
          alt=""
        />
        <div className="read__more">
          <PlayArrowRoundedIcon
            style={{
              border: "2px solid #abb7c4",
              borderRadius: "50px",
              fontSize: "3.2rem",
              cursor: "pointer",
            }}
            className="play__btn"
          />
        </div>
        <div className="SingleDataDetails">
          <h6>
            {title || name}(
            {(first_air_date || release_date || "-----").substring(0, 4)})
          </h6>
        </div>
      </div>
    </>
  );
};

export default SingleData;
