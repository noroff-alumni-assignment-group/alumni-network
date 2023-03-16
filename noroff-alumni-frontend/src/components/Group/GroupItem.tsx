import './group-comps.css';
import { Group } from '../../models/Group';

type propsGroup = {
    group: Group
}

const GroupItem = ({ group }: propsGroup) => {


    return (
        <>
            <div className="group-item">
                <div className="group-name">
                    <p>{group.name}</p>
                </div>
                   
                <div className="profile-icon">
                    <p>NC</p>
                </div>
            </div>
        </>
    )
}
export default GroupItem