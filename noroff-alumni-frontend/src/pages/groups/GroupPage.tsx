import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MemberIcon from "../../components/Group/MemberIcon"
import { Group } from "../../models/Group/Group"
import './groups.css'
import Popup from "../../components/popup/Popup"
import PostForm from "../../components/post-form/PostForm"
import Post from "../../components/post/Post"
import UserDisplayDTO from "../../models/UserDisplayDTO"
import PostDTO from "../../models/PostDTO"
import GroupService from "../../services/groupService"
import InviteModulo from "../../components/Group/InviteModulo"


type params = {
    groupId: any
}

const GroupPage = () => {

    const [group, setGroup] = useState<Group>()
    const { groupId } = useParams<params>()
    const [showPostForm, setShowPostForm] = useState(false)
    const [showInviteModulo, setShowInviteModulo] = useState(false)
    const [isPrivate, setIsPrivate] = useState(false)
    const [posts, setPosts] = useState<PostDTO[]>([])

    
    useEffect(() => {
        async function getGroup() {
            await GroupService.getGroup(groupId)
                .then((data) => {
                setGroup(data)
            })
        }
        getGroup()
        if (group?.isPrivate === true) {
            setIsPrivate(true)
        }
    }, [groupId])

    useEffect(() => {
        async function getGroupPosts() {
           await GroupService.getGroupPosts(groupId)
               .then((data) => {
               setPosts(data)
           })
        }
        getGroupPosts()
    }, [])

    
    if (!group) {
        return null;
      } 
    

    return (
        <>
            <div className="group-page">
                {showInviteModulo ? <InviteModulo setHideInviteModulo={setShowInviteModulo}/> : null}
                {showPostForm && <Popup child={<PostForm editing={false} handler={setShowPostForm}/>}/>}
                <div className="page-header">
                    <h3>{group?.name}</h3>
                </div>
                <div className="member-card">
                    <div className="member-card-left">
                        <div className="member-icons">
                            {group?.members?.map((member: UserDisplayDTO) => (
                                <MemberIcon key={member.id} firstName={member.firstName} lastName={member.lastName} />
                            ))}
                        </div>
                        <div className="members-count">
                            <p>{`${group?.members?.length}`}</p>
                        </div>
                    </div>
                    <div className="member-card-right">
                        <button className="invite-btn" onClick={() => setShowInviteModulo(true)}>Invite</button>
                        <div className={(isPrivate ? "private-label" : "")}>
                            {isPrivate && <p>Private</p>}
                        </div>
                    </div>
                </div>
                <div className="feed-actions">
                    <div className="feed-header">
                        <h3>Posts</h3>
                    </div>
                    <button className="activity-btn" onClick={() => setShowPostForm(true)}>NEW POST</button>
                </div>
                <div className="group-feed">
                    {posts.map((post) => (
                        <Post key={post.id} post={post}/>
                    ))}
                </div>
            </div>
        </>
    )
}
export default GroupPage