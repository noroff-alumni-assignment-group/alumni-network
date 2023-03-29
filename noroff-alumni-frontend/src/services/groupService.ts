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
        .then((response) => response.data)
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
        .then((response) => {
            return response.data
        })
    }

    async joinGroup(groupId: number) {
        return await api
        .post("/group/" + groupId + "/join")
        .then((response) => {
            return response.data
        })
    }

    async leaveGroup(groupId: number) {
        return await api
        .post("/group/" + groupId + "/leave")
        .then((response) => {
            return response.data
        })
    }

    async inviteToGroup(groupId: number, userId: string | undefined) {
        return await api
        .post("/group/" + groupId + "/invite/" + userId)
    }
}
export default new GroupService()