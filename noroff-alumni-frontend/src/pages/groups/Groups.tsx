import GroupItem from "../../components/Group/GroupItem";
import "./groups.css";
import Group from "../../models/Group/Group";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewGroupModulo from "../../components/Group/NewGroupModulo";
import GroupService from "../../services/groupService";
import GroupListItem from "../../models/Group/GroupListItem";
import Placeholder from "../../components/placeholder/Placeholder";
import LoadingIndicatorComponent from "../../components/LoadingIndicator/LoadingIndicatorComponent";


function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [showNewGroupModulo, setShowNewGroupModulo] = useState(false);
  const navigate = useNavigate();

  const [isGroupsLoading, setIsGroupsLoading] = useState(true);
  const [isUserGroupsLoading, setIsUserGroupsLoading] = useState(true);

  useEffect(() => {
    async function getAllGroups() {
      await GroupService.getGroups().then((data) => {
        setIsGroupsLoading(false);
        setGroups(data);
      });
    }
    getAllGroups();
  }, []);

  useEffect(() => {
    async function getMyGroups() {
      await GroupService.getUserGroups().then((data) => {
        setIsUserGroupsLoading(false);
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
      setIsGroupsLoading(true);
      GroupService.getGroups()
          .then(data => {
            setIsGroupsLoading(false);
            setGroups(data);
          })
      setIsUserGroupsLoading(true);
      GroupService.getUserGroups()
          .then(data => {
            setIsUserGroupsLoading(false);
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
                {isGroupsLoading && <LoadingIndicatorComponent/>}
                {!isGroupsLoading && groups.map(group => (
                    <div key={group.id} onClick={() => handleGroupClick(group)}>
                        <GroupItem key={group.id} group={group} />
                    </div>
                ))}
            </div>

            <div className="group-list-header">
                <h1>My groups</h1>
            </div>
            <div className="groupslist">
                {isUserGroupsLoading && <LoadingIndicatorComponent/>}
                {!isUserGroupsLoading && myGroups.length === 0 ? (
                    <Placeholder text={"You are not a member of any group yet."} />
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
