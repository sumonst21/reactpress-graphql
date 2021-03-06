import React from "react";
import { withRouter } from "next/router";
import PostList from "../components/ui/PostList";
import { compose } from "recompose";
import gql from "graphql-tag";
import Loader from "../components/ui/Loader";
import { graphql } from "react-apollo";
import withData from "../../../lib/withData";

class TagPage extends React.Component {
  render() {
    const { data } = this.props;
    if (data.loading) return <Loader />;
    return (
      <div>
        <h1>{data.tags.edges[0].node.name}</h1>
        {<PostList posts={data.posts} />}
      </div>
    );
  }
}

const query = gql`
  query postsByTagSlug($slug: String!) {
    tags(where: { slug: [$slug] }) {
      edges {
        node {
          name
        }
      }
    }
    posts(where: { tag: $slug }) {
      edges {
        node {
          id
          postId
          title
          content
          slug
        }
      }
    }
  }
`;

const queryOptions = {
  options: props => {
    return {
      variables: {
        slug: props.router.query.slug
      }
    };
  }
};

export default compose(
  withData,
  withRouter,
  graphql(query, queryOptions)
)(TagPage);
