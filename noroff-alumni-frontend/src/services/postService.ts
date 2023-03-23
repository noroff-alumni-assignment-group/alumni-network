import NewPost from "../models/NewPost";
import api from "./api";
import PostDTO from "../models/PostDTO";
import EditPost from "../models/EditPost";


export async function getPosts(): Promise<PostDTO[]> {
    return await api.get("/post")
        .then(response => response.data);
}

export async function searchPosts(searchWord: string) {
    return await api.get("/post", {
            params: {
                searchWord: searchWord
            }
        })
        .then(response => response.data)
}

export async function getPost(post_id: number): Promise<PostDTO> {
    return await api.get("/post/" + post_id)
        .then(response => response.data)
}

export async function createPost(newPost: NewPost){
    await api.post("/post", newPost);
}

export async function editPost(editPost: EditPost, postId: number){
    await api.put("/post/" + postId, editPost);
}