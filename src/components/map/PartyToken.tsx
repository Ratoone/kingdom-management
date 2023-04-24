import token from "../../assets/images/party_token.png";
import "./PartyToken.css";

interface PartyTokenProps {
    x: number;
    y: number;
}

const PartyToken: React.FC<PartyTokenProps> = ({ x, y }) => {
    const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
        event.dataTransfer.setData("party-token", event.currentTarget.id);
        event.dataTransfer.setData("hexagon", "{}");
    };

    return (
        <div
            id="party-token"
            draggable="true"
            onDragStart={handleDragStart}
            style={{
                left: x,
                top: y,
            }}>
            <img src={token} style={{
                width: "50%"}} />
        </div>
    );
};

export default PartyToken;