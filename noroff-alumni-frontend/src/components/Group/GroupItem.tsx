import "./group-comps.css";
import Group from "../../models/Group/Group";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Profilepicture from "../profilepicture/Profilepicure";

type propsGroup = {
  group: Group;
};

const GroupItem = ({ group }: propsGroup) => {
  const [membersData, setMembersData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMembersData(members: any[]) {
      try {
        const memberPromises = members.map(async (memberId: string) => {
          const response = await api.get(`/user/${memberId}`);
          return response.data;
        });

        const fetchedMembers = await Promise.all(memberPromises);
        setMembersData(fetchedMembers.slice(0, 3)); // Show only the first 3 members
        console.log("group members data:", fetchedMembers);
      } catch (error) {
        console.error(error);
      }
    }

    if (group.members) {
      fetchMembersData(group.members);
    }
  }, [group]);

  const remainingMembers = group.members?.length - 3;

  return (
    <>
      <div className="group-item">
        <div className="group-left">
          <h3>{group.name}</h3>
          <div className={group.isPrivate ? "private-item" : ""}>
            {group.isPrivate && <p>Private</p>}
          </div>
        </div>
          <div className="participants-event-pic-group">
            {remainingMembers > 0 && (
              <p className="remaining">+ {remainingMembers}</p>
            )}
            {membersData.map((participant, index) => (
              <div
                className={`profilebubble ${
                  index === 1 ? "middle-bubble" : ""
                }`}
                key={participant.id}
                style={{
                  marginLeft: index === 0 ? 0 : -15,
                  zIndex: membersData.length - index,
                }}
              >
                <Profilepicture author={participant} showDetails={true} />
              </div>
            ))}
          </div>
      </div>
    </>
  );
};

export default GroupItem;
