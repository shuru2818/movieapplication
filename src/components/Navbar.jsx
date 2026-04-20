import { Link, useLocation } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  const location = useLocation();

  return (
    <div
      style={{
        ...styles.navbar,
        backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
      }}
    >
      <h2 style={{ margin: 0 }}>🎬 MovieApp</h2>

      <div>
        <Link
          to="/"
          style={{
            ...styles.link,
            color: location.pathname === "/" ? "#00bcd4" : "gray",
          }}
        >
          Home
        </Link>

        <Link
          to="/favorites"
          style={{
            ...styles.link,
            color:
              location.pathname === "/favorites"
                ? "#00bcd4"
                : "gray",
          }}
        >
          Favorites
        </Link>
      </div>

      <button onClick={toggleTheme} style={styles.button}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
  );
}

//STYLES ADDED
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  link: {
    margin: "0 10px",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "500",
  },
  button: {
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
  },
};

export default Navbar;