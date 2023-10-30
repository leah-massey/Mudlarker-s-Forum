import React, { useContext, useMemo } from "react";
import { useAsync } from "../hooks/useAsync";
import { useParams } from "react-router-dom";
import { getPost } from "../services/posts";

//createContext is a way of sharing state between many different components
const Context = React.createContext();

export function usePost() {
  return useContext(Context);
}

export function PostProvider({ children }) {
  //fetch id parameter from the route
  const { id } = useParams();
  //fetch post data using the async hook
  const { loading, error, value: post } = useAsync(() => getPost(id, [id]));
  const commentsByParentId = useMemo(() => {
    if (post?.comments == null) return [];
    const group = {};
    post.comments.forEach((comment) => {
      group[comment.parentId] ||= [];
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
