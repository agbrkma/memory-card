/* eslint-disable react/prop-types */
// import React from "react";

export default function Card(props){
    return(
        <div className="card" onClick={props.onClick}>
            <img src={props.imageUrl} alt={props.title} />
            <p>{props.title}</p>
        </div>
    )
}