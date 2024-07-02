import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  Tooltip,
  Stack,
  CardContent,
  IconButton,
} from "@mui/material";
import { BookmarkAdd as BookmarkAddIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { capitalizeSentence } from "../lib/functions";

const MyList = () => {
  const location = useLocation();
  const [currentTitle, setCurrentTile] = useState("");
  const auth = useSelector((state) => state.auth);
  const savedMovies = useSelector((state) => state.savedMovies);
  const [currentSavedMovies, setCurrentSavedMovies] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get("title");
    if (title) {
      setCurrentTile(title);
      let userMovieList = savedMovies[auth.email];
      let currentTitleMovies = userMovieList.find(
        (item) => item.title === title
      );
      console.log(currentTitleMovies);
      setCurrentSavedMovies(currentTitleMovies);
    }
  }, [location]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
        Saved Movies for the "{capitalizeSentence(currentTitle)}"
      </Typography>
      {currentSavedMovies &&
      currentSavedMovies.selectedMovies &&
      currentSavedMovies.selectedMovies.length ? (
        <Grid container spacing={2}>
          {currentSavedMovies.selectedMovies.map((item) => (
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
                      // onClick={() => saveOrRemoveImdbIdsUnderListAndUser(item)}
                    >
                      <BookmarkAddIcon
                      // sx={{
                      //   color:
                      //     savedMoviesOfSerchValue &&
                      //     savedMoviesOfSerchValue.selectedImdbIds.includes(
                      //       item.imdbID
                      //     )
                      //       ? "green"
                      //       : "",
                      // }}
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
        <Typography>Something Went Wrong...</Typography>
      )}
    </Container>
  );
};

export default MyList;
