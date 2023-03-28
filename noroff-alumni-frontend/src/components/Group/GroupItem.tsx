import './group-comps.css';
import Group from '../../models/Group/Group';

type propsGroup = {
    group: Group
}

const GroupItem = ({ group }: propsGroup) => {

    return (
        <>
            <div className="group-item">
                <div className="group-left">
                    <h3>{group.name}</h3>
                    <p>Members: {group.members.length}</p>
                </div>
                <div className={group.isPrivate ? "private-item" : ""}>
                    {group.isPrivate && <p>Private</p>}
                </div>
            </div>
        </>
    )
}
export default GroupItem