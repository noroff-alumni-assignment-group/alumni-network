import Post from "../PostModel"

type Group = {
    id: number,
    name: string,
    description: string,
    isPrivate: boolean,
    members: Array<string>,
    posts:Array<Post>
}
export default Group