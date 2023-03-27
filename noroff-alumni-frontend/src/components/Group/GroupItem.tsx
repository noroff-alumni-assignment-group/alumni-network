import './group-comps.css';
import GroupListItem from '../../models/Group/GroupListItem';

type propsGroup = {
    group: GroupListItem
}

const GroupItem = ({ group }: propsGroup) => {

    return (
        <>
            <div className="group-item">
                <div className="group-name">
                    <p>{group.name}</p>
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