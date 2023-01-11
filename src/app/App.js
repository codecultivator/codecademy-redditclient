import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SubReddits from "../components/SubReddits";
import PostsPage from "../features/posts/PostsPage";

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <SubReddits></SubReddits>
        <Switch>
          <Route path="/:subReddit?" component={PostsPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
