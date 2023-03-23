import './group-comps.css';
import { Group } from '../../models/Group/Group';
import MemberIcon from './MemberIcon';

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
                    {group.members?.map((member: any) => (
                        <MemberIcon key={member.id} firstName={member.firstName} lastName={member.lastName}/>
                    ))}
                </div>
            </div>
        </>
    )
}
export default GroupItem