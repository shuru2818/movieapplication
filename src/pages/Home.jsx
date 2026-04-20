import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

const API_KEY = "64478b74";

function Home({ setSelectedMovie, favorites, toggleFavorite, theme }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("history")) || [];
    } catch {
      return [];
    }
  });

  const [showHistory, setShowHistory] = useState(false);

  const [sortOrder, setSortOrder] = useState("newest");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    fetchMovies("avengers");
  }, []);

  // FETCH MULTIPLE PAGES
  const fetchMovies = async (query = search) => {
    try {
      setLoading(true);
      setError("");

      let allMovies = [];

      for (let i = 1; i <= 5; i++) {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&page=${i}&apikey=${API_KEY}`
        );

        const data = await res.json();

        if (data.Response === "False") break;

        allMovies = [...allMovies, ...data.Search];
      }

      setMovies(allMovies);
    } catch {
      setError("Unable to fetch movies.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (search.trim() === "") {
      setError("Enter movie name");
      return;
    }

    setPage(1);
    fetchMovies(search);

    setHistory((prev) => {
      const updated = [search, ...prev.filter((i) => i !== search)];
      return updated.slice(0, 5);
    });

    setShowHistory(false);
  };

  const handleHistoryClick = (item) => {
    setSearch(item);
    setPage(1);
    fetchMovies(item); // FIXED (was wrong before)
    setShowHistory(false);
  };

  const fetchMovieDetails = async (id) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );

      const data = await res.json();

      if (data.Response === "False") {
        setError("Failed to load details");
        return;
      }

      setSelectedMovie(data);
    } catch {
      setError("Failed to load details");
    } finally {
      setLoading(false);
    }
  };

  // FILTER + SORT
  const filteredMovies = movies
    .filter((m) => (filterType === "all" ? true : m.Type === filterType))
    .sort((a, b) =>
      sortOrder === "newest"
        ? b.Year.localeCompare(a.Year)
        : a.Year.localeCompare(b.Year)
    );

  // PAGINATION
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;

  const paginatedMovies = filteredMovies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // TOTAL PAGES (IMPORTANT FIX)
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  return (
    <div>
      <div style={styles.searchContainer}>
        <div style={{ position: "relative" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movie..."
            style={styles.input}
            onFocus={() => setShowHistory(true)}
          />

          {showHistory && history.length > 0 && (
            <div
              style={{
                ...styles.historyBox,
                backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
                color: theme === "dark" ? "#fff" : "#000",
              }}
            >
              {history.map((item, i) => (
                <div
                  key={i}
                  style={styles.historyItem}
                  onClick={() => handleHistoryClick(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          style={styles.dropdown}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        <select
          onChange={(e) => setFilterType(e.target.value)}
          style={styles.dropdown}
        >
          <option value="all">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
      </div>

      {loading && <Loader />}
      {!loading && error && <p>{error}</p>}

      <MovieList
        movies={paginatedMovies}
        onSelect={fetchMovieDetails}
        favorites={favorites}
        onToggleFav={toggleFavorite}
        theme={theme}
      />

      {/* PAGINATION FIXED */}
      {filteredMovies.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}    
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "8px",
    width: "250px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
  },
  dropdown: {
    padding: "8px",
    borderRadius: "5px",
  },
  historyBox: {
    position: "absolute",
    top: "40px",
    left: 0,
    width: "100%",
    borderRadius: "5px",
    zIndex: 10,
    border: "1px solid #ccc",
  },
  historyItem: {
    padding: "8px",
    cursor: "pointer",
  },
};

export default Home;