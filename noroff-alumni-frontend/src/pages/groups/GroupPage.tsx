import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Group from "../../models/Group/Group"
import './groups.css'
import Popup from "../../components/popup/Popup"
import PostForm from "../../components/post-form/PostForm"
import Post from "../../components/post/Post"
import PostDTO from "../../models/PostDTO"
import InviteModulo from "../../components/Group/InviteModulo"
import groupService from "../../services/groupService"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { setUser } from "../../store/userSlice"
import PostFeed from "../../components/post/PostFeed"

const GroupPage = () => {

    let { id } = useParams()
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [group, setGroup] = useState({} as Group)
    const [posts, setPosts] = useState<Array<PostDTO>>([])
    const [showPostForm, setShowPostForm] = useState(false)
    const [showInviteModulo, setShowInviteModulo] = useState(false)
    
    useEffect(() => {
        async function getGroup() {
            if (id) {
                setGroup(await groupService.getGroup(parseInt(id)))
                setPosts(await groupService.getGroupPosts(parseInt(id)))
            }
        }
        getGroup()

    }, [])

    async function handleJoinClick() {
        await groupService.joinGroup(group.id)
        let userGroups = [...user.groups!]
        userGroups.push(group.name)
        dispatch(setUser({...user, groups: userGroups}))
    }
    
    return (

            <div className="group-page">
                {showInviteModulo ? <InviteModulo setHideInviteModulo={setShowInviteModulo}/> : null}
                {showPostForm && <Popup child={<PostForm editing={false} handler={setShowPostForm}/>}/>}
                <div className="page-header">
                    <h1>{group?.name}</h1>
                    <button className="activity-btn" onClick={handleJoinClick}>Join</button>      
                </div>
                <div className="group-desc">
                    <p>{group.description}</p>
                </div>
                <div className="member-card">
                    <div className="member-card-left">
                        <div className="member-icons">
                            {/*group?.members?.map((member: UserDisplayDTO) => (
                                <MemberIcon key={member.id} member={member} />
                            ))*/}
                        </div>
                        <div className="members-count">
                            <p>{`${group?.members?.length}`}</p>
                        </div>
                    </div>
                    <div className="member-card-right">
                        <button className="invite-btn" onClick={() => setShowInviteModulo(true)}>Invite</button>
                    </div>
                </div>
                <div className="feed-actions">
                    <div className="feed-header">
                        <h3>Posts</h3>
                    </div>
                    <button className="activity-btn" onClick={() => setShowPostForm(true)}>NEW POST</button>
                </div>
                <div className="group-feed">
                    <PostFeed posts={posts}/>
                </div>
            </div>
    )
}
export default GroupPage