import { makeRequest } from "./makeRequest";

// all requests for server that go to a post
export function getPosts() {
  return makeRequest("/posts");
}

export function getPost(id) {
  return makeRequest(`/posts/${id}`);
}
