import './group-item.css';
import { Group } from '../../models/Group';

type props = {
    group: Group
}

const GroupItem = ({ group }: props) => {



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