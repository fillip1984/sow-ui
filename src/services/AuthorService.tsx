import { AuthorDetail, AuthorSummary } from "../Types";

const AUTHOR_API_URL = `${import.meta.env.VITE_ROOT_API_URL}/authors`;
// TODO: replace with user principal
const username = "admin";
const password = "admin";

export const authorKeys = {
  lists: ["author-list"] as const,
  list: (filter: string) => [...authorKeys.lists, { filter }] as const,
  details: ["author-details"] as const,
  detail: (id: number) => [...authorKeys.details, id] as const,
  all: () => [...authorKeys.lists, ...authorKeys.details] as const,
};

// methods are CRRUD or Create, Read all, Read by id, update, delete
export const createAuthor = async (
  author: AuthorDetail
): Promise<AuthorDetail> => {
  try {
    const response = await fetch(`${AUTHOR_API_URL}`, {
      method: "POST",
      body: JSON.stringify(author),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while trying to create author. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive?
    console.log("Exception occurred while creating author", e);
    throw new Error("Exception occurred while creating author");
  }
};

export const readAllAuthors = async (q = ""): Promise<AuthorSummary[]> => {
  try {
    const response = await fetch(`${AUTHOR_API_URL}?q=${q}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while reading all authors. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while reading all authors", e);
    throw new Error("Exception occurred while reading all authors");
  }
};

export const readAuthorById = async (id: number): Promise<AuthorDetail> => {
  try {
    const response = await fetch(`${AUTHOR_API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while reading author by id. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while reading author by id", e);
    throw new Error("Exception occurred while reading author by id");
  }
};

export const updateAuthor = async (
  author: AuthorDetail
): Promise<AuthorDetail> => {
  try {
    const response = await fetch(`${AUTHOR_API_URL}/${author.id}`, {
      method: "PUT",
      body: JSON.stringify(author),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while updating author. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while updating author", e);
    throw new Error("Exception occurred while updating author");
  }
};

export const deleteAuthorById = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${AUTHOR_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while deleting author by id. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const text = await response.text();
    return text === "true";
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while deleting author by id", e);
    throw new Error("Exception occurred while deleting author by id");
  }
};
