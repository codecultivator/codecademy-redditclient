import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SubReddits from "../components/SubReddits";
import PostsPage from "../features/posts/PostsPage";

function App() {
  return (
    <div className="container-fluid">
      <div className="row gx-5">
        <Router>
          <div className="col-3">
            <SubReddits></SubReddits>
          </div>
          <div className="col-9">
            <Switch>
              <Route path="/:subReddit?" component={PostsPage}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
