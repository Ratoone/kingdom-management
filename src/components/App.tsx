import { useState } from "react";
import { Role } from "./login/Role";
import HexagonalGrid from "./map/HexagonalGrid";
import LoginRegister from "./login/LoginRegister";

const App: React.FC = () => {
    const [role, setRole] = useState(Role.Unauthenticated);
    const [mapId, setMapId] = useState("");

    const handleLoadMap = (MapId: string, password?: string) => {
        setRole(!!password ? Role.GM : Role.Player);
        setMapId(MapId);
    };

    const handleNewMap = (password: string) => {
        setRole(Role.GM);
    };

    return (
        <div>
            {role === Role.Unauthenticated ? (
                <LoginRegister onLoadMap={handleLoadMap} onNewMap={handleNewMap} />
            ) : (
                <HexagonalGrid role={role} mapId={mapId} />
            )}
        </div>
    );
};

export default App;