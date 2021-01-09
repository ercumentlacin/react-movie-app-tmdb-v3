import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";

import Card from "./Card";
import './m-movie-detail.css'

const MovieDetails = props => {
  const { movies } = props;
  const [movie, setMovie] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const { movieID } = useParams();
  const { theme } = useContext(ThemeContext);
  const constrat = theme === "light" ? "dark" : "light";

  useEffect(() => {
    const REACT_API_KEY = `a31f5c65ca60ed6c9818a95ef8987081`;
    const axios = require("axios").default;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${REACT_API_KEY}`
      )
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => console.log(error));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${REACT_API_KEY}`
      )
      .then(response => {
        setRecommendations(response.data.results);
      })
      .catch(error => console.log(error));
  }, [movie]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieID]);
  return (
 
      <div className="col-sm-8 offset-sm-2">
        <nav aria-label="breadcrumb" className="my-3 d-flex justify-content-center breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className={`text-${constrat}`} to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {movie.title}
            </li>
          </ol>
        </nav>
        {/* nav */}
        <img
            src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}`}
            className="img-fluid "
            alt={movie.title + " poster"}
          />
        <div
          className={`shadow-sm p-3 text-${constrat} d-flex flex-wrap justify-content-center`}
        >
          
          <div className="ms-md-5">
            <h1><Link className={`title text-${constrat}`} to="#">{movie.title}</Link></h1>
            <p>
              <strong>Release Data:</strong> {" " + movie.release_date}
            </p>
            <hr />
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            <p>
              <strong>Users Vote:</strong>
              <span className="ms-2 rounded-circle border border-danger p-2">
                {"   " + movie.vote_average}
              </span>
            </p>
          </div>
        </div>
        <hr />
        <h2 className="mb-3">Recommendations</h2>
        <div className="row">
          {recommendations
            ? recommendations.map(item => {
                return (
                  <Card sm={12} md={6} lg={4} key={item.id} movies={item} />
                );
              })
            : null}
        </div>
      </div>

  );
};
export default MovieDetails;
