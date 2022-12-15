import React from "react";
import PropTypes from "prop-types";

class PostRow extends React.Component {
  render() {
    const post = this.props.post;

    return (
      <tr>
        <td>{post.title}</td>
      </tr>
    );
  }
}

class PostTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const filteredPosts = this.props.posts.filter((post) => {
      return post.title.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
    });

    const rows = filteredPosts.map((post) => {
      return <PostRow post={post} key={post.id} />;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
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
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </form>
    );
  }
}

class PostsPage extends React.Component {
  state = {
    filterText: "",
  };

  handleFilterTextChange = (filterText) => {
    this.setState({ filterText: filterText });
  };

  render() {
    return (
      <div>
        <h2>Posts</h2>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <PostTable posts={POSTS} filterText={this.state.filterText} />
      </div>
    );
  }
}

PostTable.propTypes = {
  posts: PropTypes.array.isRequired,
};

const POSTS = [
  { id: 1, title: "Posting One" },
  { id: 2, title: "Posting Two" },
];

export default PostsPage;
