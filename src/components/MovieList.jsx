import MovieCard from "../components/MovieCard";

function MovieList({ movies, favorites, onToggleFav, theme }) {
  return (
    <div style={styles.container}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          favorites={favorites}
          onToggleFav={onToggleFav}
          theme={theme}
        />
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export default MovieList;