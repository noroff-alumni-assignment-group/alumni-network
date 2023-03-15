import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Group } from "../../models/Group"

type params = {
    groupId: string
}

const GroupPage = () => {

    const [group, setGroup] = useState<Group>()
    const { groupId } = useParams<params>()

    useEffect(() => {

        /*
        const fetchGroup = async () => {
            try {
                const response = await fetch(`URL/groups/${groupId}`)
                if (!response.ok) {
                    throw new Error('Could not fetch group')
                }
                const data = await response.json()
                setGroup(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchGroup()
        */
       
    }, [groupId])


    if (group) {
        return (
            <div className="group-page">
                <h3>{group.name}</h3>

                <div className="member-card">

                </div>
                
                <div className="group-posts">
                    
                </div>
            </div>
        )
    }
}
export default GroupPage