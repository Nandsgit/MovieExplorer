// import React from 'react';
import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

//af298f5
const API_URL = "http://www.omdbapi.com?apikey=af298f5";

// const movie1 = {
//   Title: "Batman v Superman: Dawn of Justice",
//   Year: "2016",
//   imdbID: "tt2975590",
//   Type: "movie",
//   //   Poster:"N/A"
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search);
    setSearchTerm("");
  };

  const searchMoviesOnEnter = async (e) => {
    if (e.key === "Enter") {
      const response = await fetch(`${API_URL}&s=${e.target.value}`);
      const data = await response.json();
      console.log(data.Search);
      setMovies(data.Search);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    searchMovies("Matrix");
  }, []);

  return (
    <div className="app">
      <h1> Movie Explorer </h1>
      <div className="search">
        {/* //TODO: need to apply keyboard onClick  */}
        <input
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => searchMoviesOnEnter(e)}
        />

        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2> No movies found </h2>
        </div>
      )}
    </div>
  );
};

export default App;

//   //defining a container to add movies : //{" "}
//   <div className="container">
//     defining each movie to create map component for later
//     <div className="movie">
//       <div>
//         <p> {movie1.Year}</p>
//       </div>

//       <div>
//         <img
//           src={
//             movie1.Poster !== "N/A"
//               ? movie1.Poster
//               : "https://via.placeholder.com/400"
//           }
//           alt={movie1.Title}
//         />
//       </div>

//       <div>
//         <span> {movie1.Type}</span>
//         <h3> {movie1.Title}</h3>
//       </div>
//     </div>
//     <MovieCard movie1={movies[0]} />
//   </div>
