import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";

import Card from "./Card";
import "./m-movie-detail.css";

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
    <>
      <nav
        aria-label="breadcrumb"
        className="my-3 d-flex justify-content-center breadcrumb"
      >
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link className={`text-${constrat}`} to="/">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {movie.title}
          </li>
        </ol>
      </nav>
      {/* nav */}
      <img
        src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${
          movie.backdrop_path
        }`}
        className="img-fluid "
        alt={movie.title + " poster"}
      />
      <div
        className={`shadow-sm p-3 text-${constrat} d-flex flex-wrap justify-content-center`}
      >
        <div className="ms-md-5">
          <h1 className="text-center">
            <Link className={`title text-${constrat}`} to="#">
              {movie.title}
            </Link>
          </h1>
          <div className="row">
            <div className="col-sm-10 offset-sm-1">
              <div className="row">
                <div className="col-md-4">
                  <h6>{movie.runtime}</h6>
                  <h6>{movie.release_date}</h6>
                  {movie.genres &&
                    movie.genres.map((item, index) => (
                      <h6 className="d-inline" key={index}>
                        {item.name}
                        <span className={`spans`}>, </span>
                      </h6>
                    ))}
                </div>
                <div className="col-md-8">
                  <p className="text-left">{movie.overview}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row my-5">
                <h3 className="mb-3 text-center">Recommendations</h3>
                {recommendations
                  ? recommendations.map(item => {
                      return (
                        <Card
                          sm={12}
                          md={6}
                          lg={4}
                          key={item.id}
                          movies={item}
                        />
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MovieDetails;
