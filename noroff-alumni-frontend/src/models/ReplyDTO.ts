import UserDisplayDTO from "./UserDisplayDTO";

type ReplyDTO = {
    id: number,
    body: string,
    last_updated: Date,
    author: UserDisplayDTO
    child_replies?: ReplyDTO[]
}

export default ReplyDTO;