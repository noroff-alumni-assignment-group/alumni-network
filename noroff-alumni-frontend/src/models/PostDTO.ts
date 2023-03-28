import UserDisplayDTO from "./UserDisplayDTO";
import ReplyDTO from "./ReplyDTO";

type PostDTO = {
    id: number,
    title: string,
    body: string,
    last_updated: Date,
    author: UserDisplayDTO,
    target_user?: UserDisplayDTO,
    target_topics?: string[],
    target_group?: string[],
    replies?: ReplyDTO[];
}

export default PostDTO;
