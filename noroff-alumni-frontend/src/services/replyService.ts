import api from "./api";
import NewReply from "../models/NewReply";


export async function getReply(id: number) {
    return await api.get("/reply/" + id)
        .then(response => response.data);
}

export async function createReply(newReply: NewReply, postId: number) {
    return await api.post("/reply", newReply, {
        params: {
            postId: postId
        }
    })
        .then(response => response.data);
}