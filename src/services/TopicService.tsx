import { TopicDetail, TopicSummary, UserAccount } from "../Types";

const TOPIC_API_URL = `${import.meta.env.VITE_ROOT_API_URL}/topics`;

export const topicKeys = {
  lists: ["topic-list"] as const,
  list: (filter: string) => [...topicKeys.lists, { filter }] as const,
  details: ["topic-details"] as const,
  detail: (id: number) => [...topicKeys.details, id] as const,
  all: () => [...topicKeys.lists, ...topicKeys.details] as const,
};

// methods are CRRUD or Create, Read all, Read by id, update, delete
export const createTopic = async (
  topicdetail: TopicDetail,
  userAccount: UserAccount
): Promise<TopicDetail> => {
  try {
    const response = await fetch(`${TOPIC_API_URL}`, {
      method: "POST",
      body: JSON.stringify(topicdetail),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAccount.token}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while trying to create topic. HTTP Status: ${response.status} and message: ${response.statusText}`;
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

export const readAllTopics = async (
  q = "",
  userAccount: UserAccount
): Promise<TopicSummary[]> => {
  try {
    const response = await fetch(`${TOPIC_API_URL}?q=${q}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAccount.token}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while reading all topics. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while reading all topics", e);
    throw new Error("Exception occurred while reading all topics");
  }
};

export const readTopicById = async (
  id: number,
  userAccount: UserAccount
): Promise<TopicDetail> => {
  try {
    const response = await fetch(`${TOPIC_API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAccount.token}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while reading topic by id. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while reading topic by id", e);
    throw new Error("Exception occurred while reading topic by id");
  }
};

export const updateTopic = async (
  topic: TopicDetail,
  userAccount: UserAccount
): Promise<TopicDetail> => {
  try {
    const response = await fetch(`${TOPIC_API_URL}/${topic.id}`, {
      method: "PUT",
      body: JSON.stringify(topic),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAccount.token}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while updating topic. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while updating topic", e);
    throw new Error("Exception occurred while updating topic");
  }
};

export const deleteTopicById = async (
  id: number,
  userAccount: UserAccount
): Promise<boolean> => {
  try {
    const response = await fetch(`${TOPIC_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${userAccount.token}`,
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
