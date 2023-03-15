import GroupItem from "../../components/Group/GroupItem"
import './groups.css';
import { Group } from "../../models/Group";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

function Groups() {

  const [groups, setGroups] = useState<Group[]>([])
  const navigate = useNavigate()

  useEffect(() => {

    /*
    const fetchGroups = async () => {
      try {
        const response = await fetch('')
          if (!response.ok) {
            throw new Error("Could not find groups")
          }
          const data = await response.json()
          setGroups(data)
        } catch (error) {
            console.error(error)
        } 
    }
    fetchGroups() */

    setGroups([
      { id: 1, name: "Alumni" },
      { id: 2, name: "Golfers" },
      { id: 3, name: "Noroff" },
      
    ]);

  }, [])


  const handleNewGroupClick = () => {

  }

  const handleGroupClick = (group: Group) => {
    navigate(`groups/${group.id}`)
  }

  return (
      <>
        <div className="group-container">

          <div className="groupslist">

              <div className="groups-actions">
                <button className="activity-btn" onClick={handleNewGroupClick}>NEW GROUP</button>
              </div>

              <h3>All groups</h3>
                {groups.map(group => (
                  <div key={group.id} onClick={() => handleGroupClick(group)}>
                    <GroupItem key={group.id} group={group} />
                  </div>
                ))}
          </div>

          <div className="groupslist">
              <h3>My groups</h3>
              {groups.map(group => (
                  <div key={group.id} onClick={() => handleGroupClick(group)}>
                    <GroupItem key={group.id} group={group} />
                  </div>
                ))}
          </div>

        </div>
      </>
  )

}
export default Groups