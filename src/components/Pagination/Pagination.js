import * as React from "react";
// import Pagination from "@material-ui/lab/Pagination";
// import { Pagination } from "@mui/lab";
import { Pagination } from '@mui/material'
import { useNavigate } from "react-router-dom";
import "./pagination.css"

export default function Pagination2({
    setPage,
    numOfPages,
    media,
    searchTerm,
    genreforURL,
    genreTitle,
    page,
    // setIsLoading,
    // getGenre,
}) {
    const navigate = useNavigate()

    const handlePageChange = (currentPage) => {
    console.log('handlePageChange', currentPage)
    console.log('media', media)

        window.scroll(0, 0);
        if (searchTerm) {
            navigate(`/${media}/${searchTerm}/page/${currentPage}`);
        }
        else if (genreforURL) {
            if (media === "series") {
                console.log(`navigate url /tv-series/category/${media}/${genreTitle.name}/page/${currentPage}`)
                navigate(`/tv-series/category/${media}/${genreTitle.name}/page/${currentPage}`);
            } else if (media === "movies") {
                console.log(`navigate url /movies/category/${media}/${genreTitle.name}/page/${currentPage}`)
                navigate(`/movies/category/${media}/${genreTitle.name}/page/${currentPage}`);
            }
            console.log(`navigate url`)
        }
        else {
            navigate(`/${media}/page/${currentPage}`);
        }
        setPage(currentPage);
    };
    console.log('current page paginaion', page)
    // const mynum = parseInt(numOfPages);
    return (
        <div className="pagin">
            <Pagination
                count={+numOfPages || 10}
                shape="rounded"
                color="primary"
                variant="outlined"
                hidePrevButton
                hideNextButton
                className="ul MuiPaginationItem-root MuiPaginationItem-ellipsis Mui-selected"
                style={{
                    marginTop: "20px",
                    display: "flex",
                    zIndex: "1000",
                    justifyContent: "center",
                }}
                page={page}
                onChange={(e, value) => handlePageChange(value)}
            />
        </div>
    );
}
