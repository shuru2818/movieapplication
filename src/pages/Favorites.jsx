import MovieList from "../components/MovieList";

function Favorites({ favorites, setSelectedMovie, toggleFavorite }) {
  return (
    <div>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <MovieList
          movies={favorites}
          onSelect={setSelectedMovie}
          favorites={favorites}
          onToggleFav={toggleFavorite}
        />
      )}
    </div>
  );
}

export default Favorites;