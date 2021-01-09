import React, { useState, useEffect } from "react";

import Card from "../components/Card/Card";

const PopularMovies = props => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const REACT_API_KEY = `a31f5c65ca60ed6c9818a95ef8987081`;

    const axios = require("axios").default;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${REACT_API_KEY}`
      )
      .then(response => {
        setPopular(response.data.results);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {popular
          ? popular.map(item => {
              return <Card sm={6} md={6} lg={4} key={item.id} movies={item} />;
            })
          : null}
      </div>
    </div>
  );
};

export default PopularMovies;
