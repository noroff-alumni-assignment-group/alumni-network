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
                <div className="">
                    {/*group.members?.map((member: any) => (
                        <MemberIcon key={member.id} firstName={member.firstName} lastName={member.lastName}/>
                    ))*/}
                </div>
            </div>
        </>
    )
}
export default GroupItem