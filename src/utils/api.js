const API_KEY = "64478b74";

export const fetchMovies = async (searchTerm, page = 1) => {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}`
    );

    const data = await res.json();

    
    console.log("API Response:", data);

     if (data.Response === "False") {
      console.log("Error:", data.Error);
      return [];
    }

     return data.Search || [];
  } catch (err) {
    console.log("Fetch Error:", err);
    return [];
  }
};