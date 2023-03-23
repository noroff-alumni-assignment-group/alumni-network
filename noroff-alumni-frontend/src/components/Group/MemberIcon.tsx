import './group-comps.css'

const MemberIcon = ({firstName}: any, {lastName}: any) => {
    return (
        <>
            <div className='profile-icon'>
                <p>{`${firstName.charAt(0)}+${lastName.charAt(0)}`}</p>
            </div>
        </>
    )
}
export default MemberIcon