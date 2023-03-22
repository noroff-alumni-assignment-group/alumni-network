import NewTopic from "../models/NewTopic";
import api from "./api";

export async function getTopics(pageNum: number, pageSize: number) {
  return await api
    .get("http://localhost:8080/api/v1/topic", {
      params: {
        page: pageNum,
        pageSize: pageSize,
      },
    })
    .then((response) => {
      return response.data;
    });
}

export async function joinTopic(topicId: number) {
  return await api
    .post("http://localhost:8080/api/v1/topic/" + topicId + "/join")
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
}

export async function searchTopics(
  searchWord: string,
  pageNum: number,
  pageSize: number
) {
  return await api
    .get("http://localhost:8080/api/v1/topic", {
      params: {
        page: pageNum,
        pageSize: pageSize,
        search: searchWord,
      },
    })
    .then((response) => {
      return response.data;
    });
}

export async function createTopic(newTopic: NewTopic) {
  await api.post("http://localhost:8080/api/v1/topic", newTopic);
}
