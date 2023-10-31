import React, { useContext, useMemo } from "react";
import { useAsync } from "../hooks/useAsync"; // this is our previously made custom hook
import { useParams } from "react-router-dom"; // extracts the params from a URL (ie. the id etc)
import { getPost } from "../services/posts";

//createContext is a way of sharing state between many different components wthout having to pass props
const Context = React.createContext();

// this is a custom hook that returns the context data
export function usePost() {
  return useContext(Context);
}

// this component provides post related data to its children (really a context provider)
export function PostProvider({ children }) {
  //fetch id parameter from the route's URL
  const { id } = useParams();
  //fetch post data using the useAsync custom hook using the data (id) extracted above
  const { loading, error, value: post } = useAsync(() => getPost(id, [id]));
  //.GROUPING COMMENTS with the useMemo hook
  const commentsByParentId = useMemo(() => {
    if (post?.comments == null) return [];
    const group = {};
    post.comments.forEach((comment) => {
      group[comment.parentId] ||= []; // logical nullish assignment operator, which only assigns an empty array if group[comment.parentId] is null or undefined.
      group[comment.parentId].push(comment);
    });
    return group;
  }, [post?.comments]);
  console.log(commentsByParentId);

  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  return (
    <Context.Provider
      value={{
        post: { id, ...post },
        rootComments: commentsByParentId[null],
        getReplies,
      }}
    >
      {loading ? (
        <h1>loading</h1>
      ) : error ? (
        <h1 className="error">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
}
