import UserDisplayDTO from "./UserDisplayDTO";

type ReplyDTO = {
    id: number,
    body: string,
    last_updated: Date,
    author: UserDisplayDTO
}

export default ReplyDTO;