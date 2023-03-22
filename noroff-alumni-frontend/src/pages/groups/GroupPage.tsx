import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MemberIcon from "../../components/Group/MemberIcon"
import { Group } from "../../models/Group/Group"
import './groups.css'
import api from "../../services/api"
import Popup from "../../components/popup/Popup"
import PostForm from "../../components/post-form/PostForm"
import Post from "../../components/post/Post"
import UserDisplayDTO from "../../models/UserDisplayDTO"

type params = {
    groupId: string
}

const GroupPage = () => {

    const [group, setGroup] = useState<Group>()
    const { groupId } = useParams<params>()
    const [showPostForm, setShowPostForm] = useState(false)
    const [isPrivate, setIsPrivate] = useState(false)

    
    useEffect(() => {
        async function getGroup() {
            const response = await api.get(`"/group/${groupId}"`)
            setGroup(response.data)
        }
        getGroup()
        if (group?.isPrivate === true) {
            setIsPrivate(true)
        }
          
    }, [groupId])

    useEffect(() => {
        async function getGroupPosts() {
           
        }
    })

    if (!group) {
        return null;
      } 

    return (
        <>
            <div className="group-page">
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
                        <button className="invite-btn">Invite</button>
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
                    {group?.posts?.map((post: any) => (
                        <Post 
                            key={post.id} 
                            title={post.title} 
                            date={post.date} 
                            body={post.body} 
                            topics={post.topics} 
                            groups={post.groups} 
                            author={post.author} 
                            profileInitials={post.profileInitials} 
                            comments={post.comments} 
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
export default GroupPage