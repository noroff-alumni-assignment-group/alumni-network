import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MemberIcon from "../../components/Group/MemberIcon"
import Post from "../../components/post/Post"
import { Group } from "../../models/Group"
import './groups.css'
import api from "../../services/api"

interface PostData {
    title: string;
    date: string;
    body: string;
    topics: string[];
    groups: string[];
    author: string;
    profileInitials: string;
    comments: {
      author: string;
      authorInitials: string;
      response: string;
    }[];
  }

const posts: PostData[] = [
    {
      title: "Lorem Ipsum",
      date: "2h ago",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      topics: ["TOPIC 1"],
      groups: ["GROUP 1"],
      author: "Anders A.",
      profileInitials: "AA",
      comments: [
        {
          author: "Marcus B",
          authorInitials: "MB",
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: "Aleksander R",
          authorInitials: "AR",
          response: "Yes sui!",
        },
      ],
    }
]

type params = {
    groupId: string
}

const GroupPage = () => {

    const [group, setGroup] = useState<Group>()
    const { groupId } = useParams<params>()

    
    useEffect(() => {
        async function getGroup() {
            return await api
            .get("/group/${groupId}")
            .then((response) => {
            return response.data;
            });
        }
        getGroup()
          
    }, [groupId])

    /*
    if (!group) {
        return null;
      } 
    */

    return (
        <>
            <div className="group-page">
                <div className="page-header">
                    <h3>Group name</h3>
                </div>
                <div className="member-card">
                    <div className="member-card-left">
                        <div className="member-icons">
                            <MemberIcon />
                            <MemberIcon />
                            <MemberIcon />
                        </div>
                        <div className="members-count">
                            <p>+14</p>
                        </div>
                    </div>
                    <div className="member-card-right">
                        <button className="invite-btn">Invite</button>
                        <div className="is-private">

                        </div>
                    </div>
                </div>
                <div className="feed-actions">
                    <div className="feed-header">
                        <h3>Posts</h3>
                    </div>
                    <button className="activity-btn">NEW POST</button>
                </div>
                <div className="group-feed">
                    {posts.map((post, i) => (
                        <Post 
                            key={`post-${i}`}
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