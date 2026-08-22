//hooks
import { useState } from "react";
////////
//Components
import Main from "./Main";
//Movies management
import { WatchedList, WatchedSummary } from "./manageMovies/WatchedMoviesBox";
import MovieDetails from "./manageMovies/MovieDetails";
import { MovieList } from "./manageMovies/MoviesBox";
//Navbar
import Search from "./manageNavbar/Search";
import Navbar from "./manageNavbar/Navbar";
//assets
import Box from "./assets/Box";
import Loader from "./assets/Loader";
import ErrorMessage from "./assets/ErrorMessage";
//Custom hooks
import { useMovies } from "./customHooks/useMovies";
import { useLocalStorage } from "./customHooks/useLocalStorage";


//api key
const KEY = "f880f69";

export default function App() {

  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  // const [watched, setWatched] = useState(() => {
  //   const storedWatched = localStorage.getItem("watched");
  //   return storedWatched ? JSON.parse(storedWatched) : [];
  // });
  const [watched , setWatched] = useLocalStorage([], "watched")

  function selectIdHandler(id) {
    setSelectedID((selectedID) => (selectedID === id ? null : id));
  }
  function onCloseMovie() {
    setSelectedID(null);
  }

  function onAddMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

  const { movies, isLoading, error } = useMovies(query);



  return (
    <>
      <Navbar movies={movies}>
        <Search query={query} setQuery={setQuery} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} selectIdHandler={selectIdHandler} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onCloseMovie={onCloseMovie}
              apiKey={KEY}
              onAddMovie={onAddMovie}
              watchedMovies={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
