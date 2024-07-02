import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Stack,
  Button,
  Card,
  CardMedia,
  CardContent,
  Pagination,
  Tooltip,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  BookmarkAdd as BookmarkAddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import axios from "axios";
import { Snackbar } from "../components";
import { getItem, setItem } from "../lib/store";
import { useSelector } from "react-redux";

const WelcomeNote = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: "left",
        border: `1px solid ${theme.palette.primary.dark}`,
        padding: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" mb={1}>
        {`Welcome to `}
        <Typography
          component="span"
          variant="h4"
          sx={{ color: theme.palette.primary.main }}
        >
          Watchlists
        </Typography>
      </Typography>
      <Typography>
        Browse movies, add them to watchlists and share them with friends. Just
        click the <BookmarkAddIcon /> to add a movie, the poster to see more
        details or click to mark the movie as watched.
      </Typography>
    </Box>
  );
};

const MovieSearch = ({
  setSearchedValue,
  setSnackbarConfig,
  setCurrentPageNo,
}) => {
  const [inputValue, setInputValue] = useState("");
  function changeInputValue(e) {
    setInputValue(e.target.value);
  }

  function searchButtonClick() {
    if (!inputValue) {
      setSnackbarConfig((prevValue) => {
        return {
          open: true,
          message: "Please provide movie name",
          severity: "error",
        };
      });
      return;
    }

    setSearchedValue(inputValue);
    setCurrentPageNo(1);
  }

  return (
    <Stack sx={{ flexDirection: "row", gap: 1 }}>
      <TextField
        sx={{ width: "90%" }}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          ),
        }}
        value={inputValue}
        onChange={changeInputValue}
      />
      <Button
        variant="contained"
        sx={{ width: "10%" }}
        onClick={searchButtonClick}
      >
        Search
      </Button>
    </Stack>
  );
};

const MoviesListSection = ({
  data,
  curretPageNo,
  setCurrentPageNo,
  isLoading,
  searchedValue,
}) => {
  const auth = useSelector((state) => state.auth);
  const [totalPages, setTotalPages] = useState(null);
  const [savedMoviesOfSerchValue, setsavedMoviesOfSerchValue] = useState(null);
  const [isFavoriteToggled, setIsFavoriteToggled] = useState(false);

  useEffect(() => {
    if (searchedValue) {
      let savedMoviesList = getItem("savedData")
        ? getItem("savedData")[auth.email] || []
        : [];
      let searchValueSavedMovies = savedMoviesList.find(
        (item) => item.title === searchedValue.toLowerCase()
      );
      console.log("HERE 121", searchValueSavedMovies);
      setsavedMoviesOfSerchValue(searchValueSavedMovies);
    }
  }, [searchedValue, isFavoriteToggled]);

  useEffect(() => {
    if (data && data.totalResults) {
      let totalPages = Math.ceil(data.totalResults / 10);
      setTotalPages((prevValue) => totalPages);
    } else {
      setTotalPages(null);
    }
  }, [data]);

  const handlePageChange = (event, page) => {
    setCurrentPageNo((prevValue) => page);
  };

  const saveOrRemoveImdbIdsUnderListAndUser = (data) => {
    let savedMovies = getItem("savedData") || {};
    let searchedValueLower = searchedValue.toLowerCase();

    let foundUserInSavedMovies = Object.keys(savedMovies).find(
      (userEmail) => userEmail === auth.email
    );

    if (foundUserInSavedMovies) {
      let userLists = savedMovies[auth.email];

      let foundList = userLists.find(
        (list) => list.title === searchedValueLower
      );

      if (foundList) {
        if (!foundList.selectedImdbIds.includes(data.imdbID)) {
          foundList.selectedImdbIds.push(data.imdbID);
        } else {
          foundList.selectedImdbIds = foundList.selectedImdbIds.filter(
            (id) => id !== data.imdbID
          );
        }
      } else {
        userLists.push({
          title: searchedValueLower,
          selectedImdbIds: [data.imdbID],
        });
      }
    } else {
      savedMovies[auth.email] = [
        { title: searchedValueLower, selectedImdbIds: [data.imdbID] },
      ];
    }
    setItem("savedData", savedMovies);
    setIsFavoriteToggled((prevValue) => !prevValue);
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : data && data.Search && data.Search.length ? (
        <Grid container spacing={2}>
          {data.Search.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.imdbID}>
              <Card>
                <CardMedia
                  component="img"
                  sx={{ height: 450, objectFit: "fill" }}
                  image={item.Poster}
                  title={`${item.Title}-${item.imdbID}`}
                  alt="Not Available"
                />
                <CardContent sx={{ textAlign: "left" }}>
                  <Stack sx={{ flexDirection: "row" }}>
                    <Tooltip title={item.Title}>
                      <Typography
                        noWrap
                        sx={{ width: "90%" }}
                        variant="h5"
                        component="div"
                      >
                        {item.Title}
                      </Typography>
                    </Tooltip>
                    <IconButton
                      sx={{ padding: 0, width: "10%" }}
                      onClick={() => saveOrRemoveImdbIdsUnderListAndUser(item)}
                    >
                      <BookmarkAddIcon
                        sx={{
                          color:
                            savedMoviesOfSerchValue &&
                            savedMoviesOfSerchValue.selectedImdbIds.includes(
                              item.imdbID
                            )
                              ? "green"
                              : "",
                        }}
                      />
                    </IconButton>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {item.Year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.Type}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            {data && data.Error
              ? data.Error
              : "Please enter search value for movies"}
          </Typography>
        </Box>
      )}
      {totalPages && (
        <Stack sx={{ alignItems: "center" }}>
          <Pagination
            sx={{ width: "fit-content" }}
            page={curretPageNo}
            count={totalPages}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </>
  );
};

const HomePage = () => {
  const [searchedValue, setSearchedValue] = useState(null);
  const [searchResponse, setSearchResponse] = useState(null);
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [curretPageNo, setCurrentPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (curretPageNo && searchedValue) {
      getMoviesList();
    }
  }, [curretPageNo, searchedValue]);

  // useEffect(() => {
  //   setCurrentPageNo(1);
  // }, [searchedValue]);

  function toggleSnakbar() {
    setSnackbarConfig((prevValue) => {
      return { ...prevValue, open: !prevValue.open };
    });
  }

  async function getMoviesList() {
    try {
      setIsLoading(true);
      let params = {
        apiKey: process.env.REACT_APP_OMDBAPI_APIKEY,
        page: curretPageNo,
        type: "movie",
      };

      if (searchedValue) {
        params["s"] = searchedValue;
      }

      let response = await axios.get(
        `${process.env.REACT_APP_OMDBAPI_BASE_URL}?${new URLSearchParams(
          params
        )}`
      );
      setSearchResponse(response.data);
      setIsLoading(false);
    } catch (Exception) {
      setIsLoading(false);
      console.log(Exception);
    }
  }

  return (
    <Stack sx={{ gap: 5 }}>
      <WelcomeNote />
      <MovieSearch
        setSearchedValue={setSearchedValue}
        setSnackbarConfig={setSnackbarConfig}
        setCurrentPageNo={setCurrentPageNo}
      />
      <MoviesListSection
        data={searchResponse}
        curretPageNo={curretPageNo}
        setCurrentPageNo={setCurrentPageNo}
        isLoading={isLoading}
        searchedValue={searchedValue}
      />
      <Snackbar
        open={snackbarConfig.open}
        onClose={toggleSnakbar}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Stack>
  );
};

export default HomePage;
