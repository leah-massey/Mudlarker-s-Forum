export function useUser() {
  // regex that pulls out the userId from our cookie
  return { id: document.cookie.match(/userId=(?<id>[^;]+);?$/).groups.id };
}
