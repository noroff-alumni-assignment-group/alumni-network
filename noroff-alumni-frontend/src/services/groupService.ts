import { NewGroup } from "../models/Group/NewGroup"
import api from "./api"


class GroupService {

    async getGroups() {
        return await api
        .get("/group")
        .then((response) => {
            return response.data
        })
    }

    async getUserGroups() {
        return await api
        .get("/group/member")
        .then((response) => {
            return response.data
        })
    }

    async getGroup(groupId: number) {
        return await api
        .get("/group/" + groupId)
        .then((response) => {
            return response.data
        })
    }

    async getGroupPosts(groupId: number) {
        return await api
        .get("/group/" + groupId + "/posts")
        .then((response) => {
            return response.data
        })
    }

    async createGroup(newGroup: NewGroup) {
        await api
        .post("/group", newGroup)
    }

    async joinGroup(groupId: number) {
        await api
        .post("/group" + groupId + "/join")
    }
}
export default new GroupService()