import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MovieDetails from "./screens/MovieDetails/MovieDetails";
import HomeScreen from "./screens/HomeScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/movie/:id" component={MovieDetails} />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
