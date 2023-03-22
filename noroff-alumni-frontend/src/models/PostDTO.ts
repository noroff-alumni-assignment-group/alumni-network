import UserDisplayDTO from "./UserDisplayDTO";

type PostDTO = {
    id: number,
    title: string,
    body: string,
    last_updated: Date,
    author: UserDisplayDTO,
    target_topic: string,
    target_group: string
}

export default PostDTO;
