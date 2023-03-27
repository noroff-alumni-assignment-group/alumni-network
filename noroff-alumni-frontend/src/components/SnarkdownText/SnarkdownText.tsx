import React from "react";
import "./snarkdown-text.css";
import snarkdown from "snarkdown";

type SnarkdownTextProps = {
    text: string
}


function SnarkdownText (props: SnarkdownTextProps) {

    function toGithubMarkdown(text: string){
        return snarkdown(text);
    }

    return (
        <div className="snarkdown-text" dangerouslySetInnerHTML={{__html: toGithubMarkdown(props.text)}}></div>
    )
}

export default SnarkdownText;