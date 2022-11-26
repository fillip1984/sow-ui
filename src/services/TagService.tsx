import { TagDetail, TagSummary } from "../Types";

const TAG_API_URL = `${import.meta.env.VITE_ROOT_API_URL}/tags`;
// TODO: replace with user principal
const username = "admin";
const password = "admin";

export const tagKeys = {
  lists: ["tag-list"] as const,
  list: (filter: string) => [...tagKeys.lists, { filter }] as const,
  details: ["tag-details"] as const,
  detail: (id: number) => [...tagKeys.details, id] as const,
  all: () => [...tagKeys.lists, ...tagKeys.details] as const,
};

// methods are CRRUD or Create, Read all, Read by id, update, delete
export const createTag = async (tag: TagDetail): Promise<TagDetail> => {
  try {
    const response = await fetch(`${TAG_API_URL}`, {
      method: "POST",
      body: JSON.stringify(tag),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while trying to create tag. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive?
    console.log("Exception occurred while creating tag", e);
    throw new Error("Exception occurred while creating tag");
  }
};

export const readAllTags = async (q: string): Promise<TagSummary[]> => {
  try {
    const response = await fetch(`${TAG_API_URL}?q=${q}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while reading all tags. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while reading all tags", e);
    throw new Error("Exception occurred while reading all tags");
  }
};

export const readTagById = async (id: number): Promise<TagDetail> => {
  try {
    const response = await fetch(`${TAG_API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while reading tag by id. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while reading tag by id", e);
    throw new Error("Exception occurred while reading tag by id");
  }
};

export const updateTag = async (tag: TagDetail): Promise<TagDetail> => {
  try {
    const response = await fetch(`${TAG_API_URL}/${tag.id}`, {
      method: "PUT",
      body: JSON.stringify(tag),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while updating tag. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while updating tag", e);
    throw new Error("Exception occurred while updating tag");
  }
};

export const deleteTagById = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${TAG_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while deleting tag by id. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const text = await response.text();
    return text === "true";
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while deleting tag by id", e);
    throw new Error("Exception occurred while deleting tag by id");
  }
};
