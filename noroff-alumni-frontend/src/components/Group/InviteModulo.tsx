import './group-comps.css'
import { useState } from "react"
import UserDisplayDTO from "../../models/UserDisplayDTO"

type InviteProps = {
    setHideInviteModulo: Function
}

const InviteModulo = ({setHideInviteModulo}: InviteProps) => {
    
    const [invited, setInvited] = useState<UserDisplayDTO[]>([])

    async function submitInvite() {
        setHideInviteModulo(true)
    }
    
    
    return (
        <div className="modulo-wrapper">
            <div className="modulo-box">
                <h3>Invite a new member</h3>
                <div className="user-list">
                    
                </div>
                <div className="modulo-actions">
                    <button className="cancel-btn" onClick={() => setHideInviteModulo(false)}>Cancel</button>
                    <button className="activity-btn" onClick={submitInvite}>Invite</button>
                </div>
            </div>
        </div>
    )
}
export default InviteModulo