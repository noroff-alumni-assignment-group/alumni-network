import React, {ReactNode} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import './alert.css';

type AlertTemplateProps = {
    options: any,
    message: ReactNode | undefined,
    close: any
}

const AlertTemplate = (props: AlertTemplateProps) => (
    <div className={"alert " + (
        props.options.type === "info" ? "alert-info" :
            (props.options.type === "success" ? "alert-success" :
                (props.options.type === "error" ? "alert-error" : ""))
    )}>
        <div className="alert-icon">
            {props.options.type === 'info' && <FontAwesomeIcon icon={faExclamationCircle}/>}
            {props.options.type === 'success' && <FontAwesomeIcon icon={faCheckCircle}/>}
            {props.options.type === 'error' && <FontAwesomeIcon icon={faTimesCircle}/>}
        </div>
        <div className="alert-message">{props.message}</div>
    </div>
)

export default AlertTemplate;