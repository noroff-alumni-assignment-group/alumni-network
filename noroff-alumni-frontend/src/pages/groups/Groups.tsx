import GroupItem from "../../components/Group/GroupItem"
import './groups.css'
import { Group } from "../../models/Group/Group"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import api from "../../services/api"
import NewGroupModulo from "../../components/Group/NewGroupModulo"

function Groups() {

  const [groups, setGroups] = useState<Group[]>([])
  const [myGroups, setMyGroups] = useState<Group[]>([])
  const [showNewGroupModulo, setShowNewGroupModulo] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function getGroups() {
      const response = await api.get("/group")
        setGroups(response.data)
    }
    getGroups()

  }, [])

  useEffect(() => {
    async function getMyGroups() {
      const response = await api.get("/user/groups")
      setMyGroups(response.data)
    }
    getMyGroups()
  }, [])

  const handleGroupClick = (group: Group) => {
    let page = `/groups/${group.id}`
    navigate(page)
  }

  return (
      <>
        <div className="group-container">
          {showNewGroupModulo ?<NewGroupModulo setHideModulo={setShowNewGroupModulo}/> : null}
          <div className="groups-actions">
                <div className="group-list-header">
                  <h3>All groups</h3>
                </div>
                <button className="activity-btn" onClick={()=>setShowNewGroupModulo(true)}>NEW GROUP</button>
          </div>
          <div className="groupslist">
                {groups.map(group => (
                  <div key={group.id} onClick={() => handleGroupClick(group)}>
                    <GroupItem key={group.id} group={group} />
                  </div>
                ))}
          </div>

          <div className="group-list-header">
              <h3>My groups</h3>
          </div>
          <div className="groupslist">
              {myGroups.map(group => (
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