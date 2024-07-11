import axios from "axios";
import { useEffect, useState } from "react";
import SingleData from "../../components/SingleData/SingleData";
import Pagination from "../../components/Pagination/Pagination";
import Myloader from "react-spinners/PuffLoader";
import "./PagesStyles.css"
import "./TrendingStyles.css"


const Trending = () => {
  const [treadingContent, setTreadingContent] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  //get all trending movies
  const fetchTreadinApi = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setTreadingContent(data.results);
    setIsLoading(true);
  };

  const handleChangePage = (page) => {
    setPage(page)
  }

  useEffect(() => {
    window.scroll(0, 0);

    fetchTreadinApi();
  }, [page]);

  console.log('trending page') 
  return (
    <>
      <main className="all__treads">
        <div className="my__main2  pt-5">
          <div
            style={{ marginTop: "0px", color: "white" }}
            className="TreadingHome"
          >
            <h3> Trending Shows:</h3>
          </div>
        </div>

        <div className="ListContent2">
          {isLoading && treadingContent ? (
            treadingContent.map((data) => {
              console.log('trending data:', data)
              return (<SingleData key={data.id} {...data} />)
            })
          ) : (
            <div
              className="loading"
              style={{
                display: "flex",
                height: "450px",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Myloader color="grey" size={60} />
              <p
                style={{
                  color: "grey",
                  fontSize: "13px",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                Loading...
              </p>
            </div>
          )}
        </div>
        <Pagination
          setPage={handleChangePage}
          page={page}
          media="treading"
          numOfPages="5"
        />
      </main>
    </>
  );
};

export default Trending;
