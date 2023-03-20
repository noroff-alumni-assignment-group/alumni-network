import React from "react";
import "./popup.css";

type PopupTypes = {
    child: any
}

function Popup (props: PopupTypes) {

    return (
        <div className="popup">
            <div className="child-container">
                {props.child}
            </div>
        </div>
    )

}

export default Popup;