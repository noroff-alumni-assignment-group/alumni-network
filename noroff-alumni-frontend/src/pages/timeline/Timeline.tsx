import React from 'react'
import Popup from "../../components/popup/Popup";
import PostForm from "../../components/post-form/PostForm";

function Timeline() {
  return (
    <div>
      Timeline
      <Popup child={<PostForm editing={false}/>}></Popup>
    </div>
  )
}

export default Timeline