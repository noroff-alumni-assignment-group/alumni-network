import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Group(props: any) {
   let navigate = useNavigate();
    async function handleGroupClick() {
        navigate("/group/" + props.group)
    }
  return (
    <div className="group" key={props.group} onClick={handleGroupClick}>
      {props.group}
    </div>
  );
}

export default Group;
