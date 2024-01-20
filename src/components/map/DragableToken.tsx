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
    token: string
}

const DragableToken: React.FC<DragableTokenProps> = ({ type, entityId, token }) => {
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
            <img src={pickToken()} style={{
                width: "50%",
                cursor: "move",
            }} />
        </div>
    );
};

export default DragableToken;
