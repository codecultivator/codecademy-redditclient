import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import PostsPage from "./posts/PostsPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/" exact component={PostsPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
