import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const API_KEY = "64478b74";

function MovieDetails({ theme }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );

      const data = await res.json();
      setMovie(data);
    } catch {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!movie) return <p>No Data</p>;

  const backImg =
    "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  const poster = movie.Poster !== "N/A" ? movie.Poster : backImg;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5",
        color: theme === "dark" ? "#ffffff" : "#000000",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          maxWidth: "500px",
          borderRadius: "12px",
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h1>{movie.Title}</h1>

        <img
          src={poster}
          alt={movie.Title}
          style={{ width: "300px", borderRadius: "10px" }}
        />

        <p><b>Year:</b> {movie.Year}</p>
        <p><b>Released:</b> {movie.Released}</p>
        <p><b>Rated:</b> {movie.Rated}</p>
        <p><b>Genre:</b> {movie.Genre}</p>
        <p><b>Runtime:</b> {movie.Runtime}</p>
        <p><b>Director:</b> {movie.Director}</p>
        <p><b>Writer:</b> {movie.Writer}</p>
        <p><b>Actors:</b> {movie.Actors}</p>
        <p><b>Language:</b> {movie.Language}</p>
        <p><b>Country:</b> {movie.Country}</p>
        <p><b>Awards:</b> {movie.Awards}</p>
        <p><b>IMDB Rating:</b> {movie.imdbRating}</p>
        <p><b>Metascore:</b> {movie.Metascore}</p>
        <p><b>Box Office:</b> {movie.BoxOffice}</p>
        <p><b>Production:</b> {movie.Production}</p>
        <p><b>Plot:</b> {movie.Plot}</p>
      </div>
    </div>
  );
}

export default MovieDetails;