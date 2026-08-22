import { useEffect, useState } from "react";
import StarRating from "../assets/StarRating";
import Loader from "../assets/Loader";
import { useKey } from "../customHooks/useKey";


export default function MovieDetails({
  selectedID,
  onCloseMovie,
  apiKey,
  onAddMovie,
  watchedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watchedMovies
    .map((movie) => movie.imdbId)
    .includes(selectedID);

  const watchedMovieRating = watchedMovies.find(
    (movie) => movie.imdbId === selectedID,
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Runtime: runtime,
    Poster: poster,
    Plot: plot,
    imdbRating,
    Released: released,
    Director: director,
    Actors: actors,
    Genre: genre,
  } = movie;

  function handleOnAddMovie() {
    const newWatchedMovie = {
      runtime: Number(runtime.split(" ").at(0)),
      poster,
      year,
      title,
      imdbId: selectedID,
      imdbRating,
      userRating,
    };

    onAddMovie(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      setIsLoading(true);
      async function fetchMovieId() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedID}`,
        );
        if (!res.ok) throw new Error("Something went wrong!");
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      fetchMovieId();
    },
    [selectedID , apiKey],
  );

  useKey("Escape", onCloseMovie);

  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (e.code === "Escape") {
  //         onCloseMovie();
  //       }
  //     }

  //     document.addEventListener("keydown", callback);

  //     return function () {
  //       document.removeEventListener("keydown", callback);
  //     };
  //   },
  //   [onCloseMovie],
  // );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title],
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating && (
                    <button className="btn-add" onClick={handleOnAddMovie}>
                      + Add to List
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>You rated this movie {watchedMovieRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
