import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Tooltip,
  IconButton,
} from "@mui/material";
import { getItem, setItem } from "../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { BookmarkAdd as BookmarkAddIcon } from "@mui/icons-material";

const MoviesCards = ({ data, searchedValue }) => {
  const auth = useSelector((state) => state.auth);
  const [savedMoviesOfSerchValue, setsavedMoviesOfSerchValue] = useState(null);
  const [isFavoriteToggled, setIsFavoriteToggled] = useState(false);
  const dispatch = useDispatch();

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
          foundList.selectedMovies.push(data);
        } else {
          foundList.selectedImdbIds = foundList.selectedImdbIds.filter(
            (id) => id !== data.imdbID
          );
          foundList.selectedMovies = foundList.selectedMovies.filter(
            (item) => item.imdbID !== data.imdbID
          );
        }
      } else {
        userLists.push({
          title: searchedValueLower,
          selectedImdbIds: [data.imdbID],
          selectedMovies: [data],
        });
      }
    } else {
      savedMovies[auth.email] = [
        {
          title: searchedValueLower,
          selectedImdbIds: [data.imdbID],
          selectedMovies: [data],
        },
      ];
    }
    setItem("savedData", savedMovies);
    setIsFavoriteToggled((prevValue) => !prevValue);

    let latestData = getItem("savedData");
    if (latestData) {
      dispatch({
        type: "SAVED_MOIVE_CHANGE",
        payload: latestData,
      });
    }
  };

  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.imdbID}>
          <Card>
            <CardMedia
              component="img"
              sx={{ height: 450, objectFit: "fill" }}
              image={
                item.Poster.toLowerCase() !== "n/a"
                  ? item.Poster
                  : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
              }
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
  );
};

export default MoviesCards;
