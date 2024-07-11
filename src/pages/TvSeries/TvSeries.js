import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import LocalSearch from "../../components/Search/LocalSearch";
import SingleData from "../../components/SingleData/SingleData";
import Myloader from "react-spinners/PuffLoader";
import Genre from "../../components/Genres/Genre";
import useGenre from "../../components/Genres/UseGenre";

const TvSeries = () => {
    const [treadingContent, setTreadingContent] = useState([]); //data film to render
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [searchTerm, setSearchTerm] = useState(""); //keyword search
    const [isLoading, setIsLoading] = useState(false);
    const [filterGenre, setFilterGenre] = useState([]); //contain filter genre info arr
    const genreforURL = useGenre(filterGenre); //get id of genre
    const [genreTitle, setGenreTitle] = useState(); //contain filter genre info obj

    console.log('tv series genreforURL', genreforURL)
    console.log('tv series filterGenre', filterGenre)
    console.log('tv series genreTitle', genreTitle)

    //get all tv serires with genre filter
    const fetchMovieApi = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&sort_by=popularity.desc&with_genres=${genreforURL}`
            );
            setTreadingContent(data.results);
            setIsLoading(true);
            setNumOfPages(data.total_pages > 100 ? 100 : data.total_pages);

        } catch (error) {
            console.error(error);
        }
    };

    //get all tv serires with searchTerm filter
    const fetchSearchApi = async () => {
        if (searchTerm) {
            const SEARCH_API = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}&page=${page}&sort_by=popularity.desc`;
            const { data } = await axios.get(SEARCH_API);
            setTreadingContent(data.results);
            setNumOfPages(data.total_pages > 100 ? 100 : data.total_pages);
            setIsLoading(true);
        }
    };

    const handleChangePage = (page) => {
        setPage(page)
    }
    const handleSetFilterGenre = (genre) => {
        setFilterGenre(genre)
    }
    const handleSetGenreTitle = (genre) => {
        setGenreTitle(genre)
    }

    useEffect(() => {
        window.scroll(0, 0);

        if (searchTerm) {
            fetchSearchApi();
        } else {
            fetchMovieApi();
        }
        return () => {
            setTreadingContent(); //clean up
        };
    }, [page, isLoading, genreforURL, searchTerm]);
    console.log('tv series')

    return (
        <>
            <main className="all__series">
                <div className="my__main">
                    <div className="TreadingHome">
                        <h3> {genreTitle && genreTitle.name} TV series:</h3>
                    </div>
                    <LocalSearch
                        setPage={handleChangePage}
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                        fetchSearchApi={fetchSearchApi}
                    // setIsLoading={setIsLoading}
                    // isLoading={isLoading}
                    // treadingContent={treadingContent}
                    // numOfpages={numOfPages}
                    // media="series"
                    // placehold="Search Tv Series"
                    />
                </div>
                <div className="sec__main ">
                    <span className="all__genres ">
                        <Genre
                            media="tv"//
                            setSearchTerm={setSearchTerm}//
                            setFilterGenre={handleSetFilterGenre}//
                            setPage={setPage}//
                            setGenreTitle={handleSetGenreTitle}//
                        // filterGenre={filterGenre}
                        // setTreadingContent={setTreadingContent}
                        // numOfpages={numOfPages}
                        // page={page}
                        // genreTitle={genreTitle}
                        // treadingContent={treadingContent}
                        />
                    </span>
                </div>

                <div className="ListContent">
                    {isLoading && treadingContent ? (
                        treadingContent.length > 0 ?
                            treadingContent.map((data) => (
                                <SingleData key={data.id} {...data} mediaType="tv" />
                            ))
                            :
                            <p
                                style={{
                                    color: "grey",
                                    fontSize: "30px",
                                    marginLeft: "10px",
                                    marginTop: "10px",
                                }}
                            >
                                Have no result!
                            </p>
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

                {treadingContent && treadingContent.length > 0 ?
                    <Pagination
                        setPage={setPage}
                        numOfPages={numOfPages}
                        media="series"
                        page={page}
                        searchTerm={searchTerm}
                        genreforURL={genreforURL}
                        genreTitle={genreTitle}
                        style={{ marginBottom: "10px" }}
                    // setIsLoading={setIsLoading}
                    />
                    :
                    null
                }
            </main>
        </>
    );
};

export default TvSeries;
