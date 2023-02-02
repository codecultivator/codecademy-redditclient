import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadPostsForSubReddits } from "./postsSlice";

// todo: rework for function components
class PostRow extends React.Component {
  render() {
    const post = this.props.post;

    return (
      <tr>
        <td>{post.data.title}</td>
      </tr>
    );
  }
}

class PostTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const filteredPosts = this.props.posts.filter((post) => {
      return (
        post.data.title.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
      );
    });

    const rows = filteredPosts.map((post) => {
      return <PostRow post={post} key={post.data.id} />;
    });

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    return (
      <div className="mb-1 row">
        <label htmlFor="filterPage" className="col-sm-1 col-form-label">Filter:</label>
        <div className="col-sm-3">
          <input
            type="text"
            name="filterPage"
            className="form-control"
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
        </div>
      </div>
    );
  }
}

class PostsPage extends React.Component {
  state = {
    filterText: "",
  };

  getSubReddit = (pathname) => {
    const subReddit = pathname.replace("/", "");
    return subReddit == "" ? "Home" : subReddit;
  };

  componentDidMount() {
    const subReddit = this.getSubReddit(this.props.location.pathname);
    this.props.loadPosts(subReddit).catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname != this.props.location.pathname) {
      console.log("location changed", this.props.location);
      const subReddit = this.getSubReddit(this.props.location.pathname);
      this.props.loadPosts(subReddit).catch((err) => console.log(err));
    }
  }

  handleFilterTextChange = (filterText) => {
    this.setState({ filterText: filterText });
  };

  render() {
    const { posts } = this.props.posts;
    return (
      <React.Fragment>
        <div className="row">
          <SearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
        </div>
        <div className="row">
          <PostTable posts={posts} filterText={this.state.filterText} />
        </div>
      </React.Fragment>
    );
  }
}

PostTable.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  loadPosts: (subReddit) => dispatch(loadPostsForSubReddits(subReddit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
