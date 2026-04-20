import { useNavigate } from "react-router-dom";

function MovieCard({ movie, favorites, onToggleFav, theme }) {
  const navigate = useNavigate();

  const backImg =
    "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  const poster =
    movie.Poster !== "N/A" ? movie.Poster : backImg;

  const isFav = favorites.some(
    (fav) => fav.imdbID === movie.imdbID
  );

  return (
    <div
      style={{
        ...styles.card,
        backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      }}
      onClick={() => navigate(`/movie/${movie.imdbID}`)} // ⭐ PAGE NAVIGATION
    >
      <img
        src={poster}
        alt={movie.Title}
        style={styles.image}
        onError={(e) => {
          e.target.src = backImg;
        }}
      />

      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>

      <button
        onClick={(e) => {
          e.stopPropagation(); // ⭐ important (card click avoid)
          onToggleFav(movie);
        }}
      >
        {isFav ? "❤️ Remove" : "🤍 Add"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px",
    width: "200px",
    textAlign: "center",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "8px",
  },
};

export default MovieCard;