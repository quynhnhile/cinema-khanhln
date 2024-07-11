import axios from "axios";
import { useEffect, useState } from "react";
import Pagination2 from "../../components/Pagination/Pagination"; //d
import LocalSearch from "../../components/Search/LocalSearch";
import SingleData from "../../components/SingleData/SingleData";
import Myloader from "react-spinners/PuffLoader";
import Genre from "../../components/Genres/Genre";
import useGenre from "../../components/Genres/UseGenre";

const Movies = () => {
    const [treadingContent, setTreadingContent] = useState([]); //data film to render
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [searchTerm, setSearchTerm] = useState(""); //keyword search
    const [isLoading, setIsLoading] = useState(false);
    const [filterGenre, setFilterGenre] = useState([]); //contain filter genre info arr
    const [genreTitle, setGenreTitle] = useState();  //contain filter genre info obj
    const genreforURL = useGenre(filterGenre); //get id of genre

    console.log('movies genreforURL', genreforURL)
    console.log('movies filterGenre', filterGenre)
    console.log('movies genreTitle', genreTitle)

    // get movies with genre filter
    const fetchMovieApi = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&language=en-US&sort_by=popularity.desc&with_genres=${genreforURL}`
            );
            setTreadingContent(data.results);
            setNumOfPages(data.total_pages > 100 ? 100 : data.total_pages);
            setIsLoading(true);
        } catch (error) {
            console.log(error);
        }
    };
    // console.log('searchTera', searchTerm)

    // get movies with keyword - searchTerm filter
    const fetchSearchApi = async () => {
        if (searchTerm) {
            const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}&page=${page}&sort_by=popularity.desc`;
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

    console.log('movies page')

    useEffect(() => {
        window.scroll(0, 0);
        if (searchTerm) {
            fetchSearchApi();
        } else {
            fetchMovieApi();
        }
        return () => {
            setTreadingContent();
        };
    }, [page, isLoading, genreforURL, searchTerm]);

    return (
        <>
            <main className="all__movies">
                <div className="my__main">
                    <div className="TreadingHome">
                        <h3>{genreTitle ? genreTitle.name : ''} Movies:</h3>
                    </div>
                    <LocalSearch
                        setPage={handleChangePage}
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                        fetchSearchApi={fetchSearchApi}
                    //placehold="Search Movies"
                    // numOfpages={numOfPages}
                    // setIsLoading={setIsLoading}
                    // media="movies"
                    // isLoading={isLoading}
                    // treadingContent={treadingContent}
                    />
                </div>
                <div className="sec__main ">
                    <span className="all_genres ">
                        <Genre
                            media="movie"
                            setSearchTerm={setSearchTerm}
                            setFilterGenre={handleSetFilterGenre}
                            setPage={handleChangePage}
                            setGenreTitle={handleSetGenreTitle}
                        //genreTitle={genreTitle}
                        // filterGenre={filterGenre}
                        // setTreadingContent={setTreadingContent}
                        // numOfpages={numOfPages}
                        // page={page}
                        // treadingContent={treadingContent}
                        />
                    </span>
                </div>

                <div className="ListContent">
                    {isLoading && treadingContent ?
                        (
                            treadingContent.length > 0 ?
                                (
                                    treadingContent.map((data, index) => (
                                        <SingleData key={data.id} {...data} index={index} mediaType="movie" />
                                    ))
                                ) :
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
                        )

                        : (
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
                                    Loading ...
                                </p>
                            </div>
                        )}
                </div>
                {
                    treadingContent && treadingContent.length > 0 ?
                        <Pagination2
                            setPage={handleChangePage}
                            numOfPages={numOfPages}
                            media="movies"
                            searchTerm={searchTerm}
                            page={page}
                            genreforURL={genreforURL}
                            genreTitle={genreTitle}
                        // setIsLoading={setIsLoading}
                        />
                        : null
                }
            </main>
        </>
    );
};

export default Movies;
