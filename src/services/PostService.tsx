import { Post } from "../Types";

const POST_API_URL = `${import.meta.env.VITE_ROOT_API_URL}/posts`;
// TODO: replace with user principal
const username = "admin";
const password = "admin";

// methods are CRRUD or Create, Read all, Read by id, update, delete
export const createPost = async (post: Post): Promise<Post> => {
  try {
    const response = await fetch(`${POST_API_URL}`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while trying to create post. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive?
    console.log("Exception occurred while creating post", e);
    throw new Error("Exception occurred while creating post");
  }
};

export const readAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${POST_API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while reading all posts. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while reading all posts", e);
    throw new Error("Exception occurred while reading all posts");
  }
};

export const readPostById = async (id: number): Promise<Post> => {
  try {
    const response = await fetch(`${POST_API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while reading post by id. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while reading post by id", e);
    throw new Error("Exception occurred while reading post by id");
  }
};

export const updatePost = async (post: Post): Promise<Post> => {
  try {
    const response = await fetch(`${POST_API_URL}/${post.id}`, {
      method: "PUT",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while updating post. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while updating post", e);
    throw new Error("Exception occurred while updating post");
  }
};

export const deletePostById = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${POST_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while deleting post by id. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const text = await response.text();
    return text === "true";
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while deleting post by id", e);
    throw new Error("Exception occurred while deleting post by id");
  }
};
