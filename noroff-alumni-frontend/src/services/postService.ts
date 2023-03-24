import NewPost from "../models/NewPost";
import api from "./api";
import PostDTO from "../models/PostDTO";
import EditPost from "../models/EditPost";


/**
 * Retrieves a single post based on id
 * @param post_id The id of the post
 */
export async function getPost(post_id: number): Promise<PostDTO> {
    return await api.get("/post/" + post_id)
        .then(response => response.data)
}

/**
 * Retrieves all posts
 */
export async function getPosts(): Promise<PostDTO[]> {
    return await api.get("/post")
        .then(response => response.data);
}

/**
 * Searches all posts
 * @param searchWord Search term
 */
export async function searchPosts(searchWord: string) {
    return await api.get("/post", {
            params: {
                searchWord: searchWord
            }
        })
        .then(response => response.data)
}

/**
 * Retrieves all posts for a given user
 * @param authorId id of the user that created the post
 */
export async function getPostsUser(authorId: string){
    return await api.get("/post/user", {
            params: {
                authorId: authorId
            }
        })
        .then(response => response.data)
}

/**
 * Searches all posts for a given user based on the search term
 * @param authorId id of the user that created the post
 * @param searchWord The search term
 */
export async function searchPostsUser(authorId: string, searchWord: string){
    return await api.get("/post/user", {
            params: {
                authorId: authorId,
                searchWord: searchWord
            }
        })
        .then(response => response.data)
}


/**
 * Creates a new post
 * @param newPost DTO of the new post to create
 */
export async function createPost(newPost: NewPost){
    await api.post("/post", newPost);
}

/**
 * Edits the values (title and body) of an existing post
 * @param editPost DTO of the values to change for the post
 * @param postId The id of the post to change
 */
export async function editPost(editPost: EditPost, postId: number){
    await api.put("/post/" + postId, editPost);
}