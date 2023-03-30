import React from "react";
import "./LoadingIndicator.css";

function LoadingIndicatorComponent () {
    return (
        <div className="loading-indicator-component">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default LoadingIndicatorComponent;