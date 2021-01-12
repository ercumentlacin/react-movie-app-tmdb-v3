import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Http404 from '../Pages/Http404'
import ThemeContext from "../context/ThemeContext";
import Search from "./Search/Search";
import PopularMovies from "../Pages/PopularMovies";

import MovieDetails from "../components/Card/MovieDetails";
import Header from "./Header";

const AppContainer = () => {
  const { theme } = useContext(ThemeContext);

  const body = document.body;
  theme == "light"
    ? body.classList.remove("bg-dark") & body.classList.add("bg-light")
    : body.classList.remove("bg-light") & body.classList.add("bg-dark");

  return (
    <main className={`bg-${theme}`}>
      <Router>
        <Header />

        <Switch>
          <Route path="/popular/:movieID">
            <MovieDetails />
          </Route>

          <Route path="/popular">
            <PopularMovies />
          </Route>
          <Route exact path="/">
            <Search />
          </Route>
          <Route path="/404">
              <Http404 />
            </Route>
            <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    </main>
  );
};

export default AppContainer;
