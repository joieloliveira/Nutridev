import "./card.css";
import React from "react";

function Card (props) {
      
    //const cardStyle = {
        //backgroundColor: props.color || '#fca3cc',
        //borderColor: props.color || '#fca3cc',
    //}
    return (
        <div className="card">
            <div className="title">{props.titulo}</div>
            <div className="content">
                {props.children}
            </div>   
        </div>           
    );  
}
    
export default Card;