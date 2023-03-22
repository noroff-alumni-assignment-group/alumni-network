import PostDTO from "../PostDTO";
import UserDisplayDTO from "../UserDisplayDTO";

export interface Group {
    id: number,
    name: string,
    isPrivate: boolean,
    members?: UserDisplayDTO | any,
    posts?: PostDTO | any
}