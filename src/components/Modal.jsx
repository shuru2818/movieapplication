function Modal({ movie, onClose, theme }) {
  if (!movie) return null;

  return (
    <div style={styles.overlay}>
      <div
        style={{
          ...styles.modal,
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
        }}
      >
        <button onClick={onClose} style={styles.closeBtn}>X</button>

        <h2>{movie.Title}</h2>
        <p><b>Genre:</b> {movie.Genre}</p>
        <p><b>Runtime:</b> {movie.Runtime}</p>
        <p><b>Director:</b> {movie.Director}</p>
        <p><b>Ratings:</b> {movie.imdbRating}</p>
        <p><b>Plot:</b> {movie.Plot}</p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
  },
  closeBtn: {
    float: "right",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    fontSize: "16px",
  },
};

export default Modal;