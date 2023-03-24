import UserDisplayDTO from "./UserDisplayDTO";

type PostDTO = {
    id: number,
    title: string,
    body: string,
    last_updated: Date,
    author: UserDisplayDTO,
    target_user?: UserDisplayDTO,
    target_topics?: string[],
    target_groups?: string[],
    comments?: {
        author: UserDisplayDTO;
        response: string;
      }[];
}

export default PostDTO;
