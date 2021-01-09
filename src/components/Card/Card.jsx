import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";
import './c-card.css'

const Card = props => {
  const {
    backdrop_path,
    overview,
    title,
    vote_average,
    release_date,
    id,
    poster_path
  } = props.movies;
  const { theme } = useContext(ThemeContext);
  const constrat = theme === "light" ? "dark" : "light";
  return (
    <div className={`col-sm-${props.sm} col-md-${props.md} col-lg-${props.lg} `}>
      <div
        className={`rounded-0 border-0 bg-transparent text-${constrat} card mx-auto mb-3`}
        style={{ maxWidth: 18 + "rem" }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          className="card-img-top rounded-0 border-0"
          alt="..."
        />
        <div className="card-body px-0">
          <h5 className="card-title">{title}</h5>
          <p className="mt-0 mb-4">{release_date}</p>

          <div className="d-flex justify-content-between align-items-center">
            <Link to={`/popular/${id}`} className={`details rounded border border-danger px-3 py-1 text-${constrat} `}>
              DETAILS
            </Link>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default Card;
