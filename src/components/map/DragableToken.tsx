import token from "../../assets/images/party_token.png";
import "./PartyToken.css";
import React from "react";

interface DragableTokenProps {
    type: string;
    entityId: string;
}

const DragableToken: React.FC<DragableTokenProps> = ({ type, entityId }) => {
    const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
        event.dataTransfer.setData("hexagon", "{}");
        event.dataTransfer.setData("type", type);
        event.dataTransfer.setData("entityId", entityId);
    };

    return (
        <div
            className="party-token"
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

export default DragableToken;