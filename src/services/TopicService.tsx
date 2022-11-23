import { TopicSummary, TopicDetail, TopicFull } from "../Types";

const AUTHOR_API_URL = `${import.meta.env.VITE_ROOT_API_URL}/topics`;
// TODO: replace with user principal
const username = "admin";
const password = "admin";

// methods are CRRUD or Create, Read all, Read by id, update, delete
export const createAuthor = async (
  topicdetail: TopicDetail
): Promise<TopicDetail> => {
  try {
    const response = await fetch(`${AUTHOR_API_URL}`, {
      method: "POST",
      body: JSON.stringify(topicdetail),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while trying to create topicdetail. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive?
    console.log("Exception occurred while creating topicdetail", e);
    throw new Error("Exception occurred while creating topicdetail");
  }
};

export const readAllTopicSummarys = async () => {
  try {
    const response = await fetch(`${AUTHOR_API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while reading all topicsummarys. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while reading all topicsummarys", e);
    throw new Error("Exception occurred while reading all topicsummarys");
  }
};

export const readTopicFullById = async (id: number): Promise<TopicFull> => {
  try {
    const response = await fetch(`${AUTHOR_API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while reading topicfull by id. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while reading topicfull by id", e);
    throw new Error("Exception occurred while reading topicfull by id");
  }
};

export const updateTopicDetail = async (
  topicdetail: TopicDetail
): Promise<TopicDetail> => {
  try {
    const response = await fetch(`${AUTHOR_API_URL}/${topic.id}`, {
      method: "PUT",
      body: JSON.stringify(topicdetail),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while updating topicdetail. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while updating topicdetail", e);
    throw new Error("Exception occurred while updating topicdetail");
  }
};

export const deleteTopicById = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${AUTHOR_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while deleting topic by id. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const text = await response.text();
    return text === "true";
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while deleting topic by id", e);
    throw new Error("Exception occurred while deleting topic by id");
  }
};
