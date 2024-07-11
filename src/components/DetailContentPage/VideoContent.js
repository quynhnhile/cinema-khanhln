import $ from "jquery";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useEffect } from "react";
import "./DetailPage.css"


const SingleVideoPage = ({ keyTrailer, title }) => {
  console.log('video content key trailer', keyTrailer)

  // Stops youtube video playing in background after close
  $(document).ready(function () {
    $(".modal").each(function () {
      var src = $(this).find("iframe").attr("src");
      //reset src when close modal
      $(this).on("click", function () {
        $(this).find("iframe").attr("src", "");
        $(this).find("iframe").attr("src", src);
      });
    });
  });

  //close modal
  const handleCloseModal = (e) => {
    $(".modal").removeClass('show')
    $(".modal").css('display', 'none')
  }

  useEffect(() => {
    //open modal
    $(".btn-watch-trailer").on('click', (e) => {
      $(".modal").addClass('show')
      $(".modal").css('display', 'block')
      $(".modal").css('background-color', 'rgba(0,0,0,0.5')
    })

  }, [])
  return (
    <>
      <div className="wrapper"
        style={{display: keyTrailer ? 'block' : 'none'}}
      >
        <div className="image play_trailer" data-title="Arrival">
            <div
              className="btn btn-success px-4 btn-watch-trailer"
              data-toggle="modal"
              data-target={`#${keyTrailer}`}
            >
              <span>
                <YouTubeIcon style={{ color: "#e93d3d" }} />
              </span>{" "}
              Watch Trailer
            </div>
  
        </div>
      </div>

      <div
        className="modal fade myModal"
        id={`${keyTrailer}`}
        tabIndex={`-1`}
        aria-labelledby="exampleModalLabel"
        style={{ transition: "all ease 2s" }}
        onClick={handleCloseModal}
      >
        <div className="modal-dialog" style={{ paddingTop: '100px' }}>
          <div
            className="modal-content"
            style={{ zIndex: "1500", marginTop: "20px !important" }}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title} Official Trailer
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true" style={{ color: "white" }}>
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-video">
              <iframe
                title={title}
                type="text/html"
                style={{ backgroundColor: "#000", border:'none'}}
                src={`https://www.youtube-nocookie.com/embed/${keyTrailer}?autoplay=0&amp;origin=http%3A%2F%2Fwww.themoviedb.org&amp;hl=en&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
              // src={`https://www.youtube.com/embed/${keyTrailer}`}
              // frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleVideoPage;
