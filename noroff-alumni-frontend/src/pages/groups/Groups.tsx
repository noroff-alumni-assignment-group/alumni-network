import GroupItem from "../../components/Group/GroupItem";
import "./groups.css";
import Group from "../../models/Group/Group";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewGroupModulo from "../../components/Group/NewGroupModulo";
import GroupService from "../../services/groupService";
import GroupListItem from "../../models/Group/GroupListItem";
import Placeholder from "../../components/placeholder/Placeholder";


function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [showNewGroupModulo, setShowNewGroupModulo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllGroups() {
      await GroupService.getGroups().then((data) => {
        setGroups(data);
      });
    }
    getAllGroups();
  }, []);

  useEffect(() => {
    async function getMyGroups() {
      await GroupService.getUserGroups().then((data) => {
        setMyGroups(data);
      });
    }
    getMyGroups();
  }, []);

  const handleGroupClick = (group: Group) => {
    let page = `/groups/${group.id}`
    navigate(page)
  }

  const formHandler = (success: boolean) => {
    if(success){
      GroupService.getGroups()
          .then(data => {
            setGroups(data);
          })
      GroupService.getUserGroups()
          .then(data => {
            setMyGroups(data);
          })
      setShowNewGroupModulo(false)
    } else {
      setShowNewGroupModulo(false);
    }
  }

  return (
      <>
        <div className="group-container">
            {showNewGroupModulo ? <NewGroupModulo handler={formHandler}/> : null}
            <div className="groups-actions">
                <div className="group-list-header">
                    <h1>All groups</h1>
                </div>
                <button className="activity-btn" onClick={() => setShowNewGroupModulo(true)}>NEW GROUP</button>
            </div>
            <div className="groupslist">
                {groups.map(group => (
                    <div key={group.id} onClick={() => handleGroupClick(group)}>
                        <GroupItem key={group.id} group={group} />
                    </div>
                ))}
            </div>

            <div className="group-list-header">
                <h1>My groups</h1>
            </div>
            <div className="groupslist">
                {myGroups.length === 0 ? (
                    <Placeholder text={"You dont joined any groups yet. 🥲"} />
                ) : (
                    myGroups.map((group) => (
                        <div key={group.id} onClick={() => handleGroupClick(group)}>
                            <GroupItem key={group.id} group={group} />
                        </div>
                    ))
                )}
            </div>

        </div>
        </>
  );
}
export default Groups;
