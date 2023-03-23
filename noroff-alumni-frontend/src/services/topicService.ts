import NewTopic from "../models/NewTopic";
import api from "./api";

class TopicService {
  async getTopics(pageNum: number, pageSize: number) {
    return await api
      .get("/topic", {
        params: {
          page: pageNum,
          pageSize: pageSize,
        },
      })
      .then((response) => {
        return response.data;
      });
  }

  async getSubscribedTopics(){
    return await api.get("/topic/subscribed")
        .then(response => response.data);
  }

  async joinTopic(topicId: number) {
    return await api.post("/topic/" + topicId + "/join").then((response) => {
      console.log(response.data);
      return response.data;
    });
  }
  async searchTopics(searchWord: string, pageNum: number, pageSize: number) {
    return await api
      .get("/topic", {
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

  async createTopic(newTopic: NewTopic) {
    await api.post("/topic", newTopic);
  }
  async getTopic(topicId: number) {
    return await api.get("/topic/" + topicId).then((response) => {
      return response.data;
    });
  }
}
export default new TopicService();
