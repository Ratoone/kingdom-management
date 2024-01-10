import token from "../../assets/images/party_token.png";
import "./PartyToken.css";
import React from "react";

const PartyToken: React.FC = () => {
    const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
        event.dataTransfer.setData("hexagon", "{}");
        event.dataTransfer.setData("type", "party");
    };

    return (
        <div
            id="party-token"
            draggable="true"
            onDragStart={handleDragStart}
        >
            <img src={token} style={{
                width: "50%",
                cursor: "move",
            }} />
        </div>
    );
};

export default PartyToken;