import NewPost from "../models/NewPost";
import api from "./api";

export async function createPost(newPost: NewPost){
    await api.post("/post", newPost);
}