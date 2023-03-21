import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MemberIcon from "../../components/Group/MemberIcon"
import { Group } from "../../models/Group"
import './groups.css'
import api from "../../services/api"

type params = {
    groupId: string
}

const GroupPage = () => {

    const [group, setGroup] = useState<Group>()
    const { groupId } = useParams<params>()

    
    useEffect(() => {
        async function getGroup() {
            const response = await api.get("/group/${groupId}")
            setGroup(response.data)
        }
        getGroup()
          
    }, [groupId])

    
    if (!group) {
        return null;
      } 


    return (
        <>
            <div className="group-page">
                <div className="page-header">
                    <h3>{group?.name}</h3>
                </div>
                <div className="member-card">
                    <div className="member-card-left">
                        <div className="member-icons">
                            {group?.members.map((index) => (
                                <MemberIcon key={index} />
                            ))}
                        
                        </div>
                        <div className="members-count">
                            <p>{`+${group?.members.length}`}</p>
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
                      
                </div>
            </div>
        </>
    )
}
export default GroupPage