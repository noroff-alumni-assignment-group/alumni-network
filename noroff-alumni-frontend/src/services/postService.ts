import NewPost from "../models/NewPost";
import api from "./api";

export async function createPost(newPost: NewPost){
    console.log(newPost);
    await api.post("/post", newPost);
}