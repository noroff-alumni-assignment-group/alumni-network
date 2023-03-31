import api from "./api";
import NewReply from "../models/NewReply";


export async function getReply(id: number) {
    return await api.get("/reply/" + id)
        .then(response => response.data);
}

export async function getReplies(postId: number) {
    return await api.get("/reply", {
            params: {
                postId: postId
            }
        })
        .then(response => response.data)
}

export async function createReply(newReply: NewReply, postId: number, replyId?: number) {
    return await api.post("/reply", newReply, {
        params: {
            postId: postId,
            parentId: replyId
        }
    })
        .then(response => response.data);
}