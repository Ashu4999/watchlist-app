import { Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { capitalizeSentence } from "../lib/functions";
import { MoviesCards } from "../components";

const MyList = () => {
  const location = useLocation();
  const [currentTitle, setCurrentTile] = useState("");
  const auth = useSelector((state) => state.auth);
  const savedMovies = useSelector((state) => state.savedMovies);
  const [currentSavedMovies, setCurrentSavedMovies] = useState(null);
  const [isFavoriteToggled, setIsFavoriteToggled] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get("title");
    if (title) {
      setCurrentTile(title);
      let userMovieList = savedMovies[auth.email];
      let currentTitleMovies = userMovieList.find(
        (item) => item.title === title
      );
      console.log("25", currentTitleMovies);
      setCurrentSavedMovies(currentTitleMovies);
    }
  }, [location, isFavoriteToggled]);

  return (
    <Container maxWidth="xl">
      {!currentTitle &&
      (!savedMovies[auth.email] ||
        (savedMovies[auth.email] && savedMovies[auth.email].length === 0)) ? (
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          There is no saved movie list.
        </Typography>
      ) : (
        <>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Saved Movies for the "{capitalizeSentence(currentTitle)}"
          </Typography>
          {currentSavedMovies &&
          currentSavedMovies.selectedMovies &&
          currentSavedMovies.selectedMovies.length ? (
            <MoviesCards
              data={currentSavedMovies.selectedMovies}
              searchedValue={currentTitle}
              setIsFavoriteToggledParentSignal={setIsFavoriteToggled}
            />
          ) : (
            <Typography>
              {currentTitle &&
              currentSavedMovies.selectedMovies &&
              currentSavedMovies.selectedMovies.length === 0
                ? "No Movies Found"
                : "Something Went Wrong..."}
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default MyList;
