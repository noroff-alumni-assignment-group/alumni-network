import UserDisplayDTO from "./UserDisplayDTO";
import ReplyDTO from "./ReplyDTO";
import TopicReducedDTO from "./TopicReducedDTO";
import GroupReducedDTO from "./Group/GroupReducedDTO";

type PostDTO = {
    id: number,
    title: string,
    body: string,
    last_updated: Date,
    author: UserDisplayDTO,
    target_user?: UserDisplayDTO,
    target_topics?: TopicReducedDTO[],
    target_group?: GroupReducedDTO[],
    replies?: ReplyDTO[];
}

export default PostDTO;
