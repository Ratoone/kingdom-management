import party from "../../assets/images/party_token.png";
import skirmisher from "../../assets/images/skirmisher.png";
import infantry from "../../assets/images/infantry.png";
import cavalry from "../../assets/images/cavalry.png";
import siege from "../../assets/images/siege.png";
import "./PartyToken.css";
import React from "react";

interface DragableTokenProps {
    type: string;
    entityId: string;
    token: string;
    name?: string;
}

const DragableToken: React.FC<DragableTokenProps> = ({ type, entityId, token, name }) => {
    const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
        event.dataTransfer.setData("hexagon", "{}");
        event.dataTransfer.setData("type", type);
        event.dataTransfer.setData("entityId", entityId);
    };

    const pickToken = () => {
        switch (token) {
            case "Skirmisher":
                return skirmisher;
            case "Infantry":
                return infantry;
            case "Cavalry":
                return cavalry;
            case "Siege":
                return siege;
            default:
                return party;
        }
    };

    return (
        <div
            className="party-token"
            draggable="true"
            onDragStart={handleDragStart}
        >
            <div style={{position: "absolute", backgroundColor: "black", opacity: 0.5}}>{name}</div>
            <img src={pickToken()} style={{
                width: "100%",
                maxWidth: "75px",
                cursor: "move",
            }} />
        </div>
    );
};

export default DragableToken;
