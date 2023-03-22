import React from 'react'

function Topic(props: any) {
  return (
    <div className="topic" key={props.topic}>
      {props.topic}
    </div>
  );
}

export default Topic