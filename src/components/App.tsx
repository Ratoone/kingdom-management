import { useState } from "react";
import { Role } from "./login/Role";
import HexagonalGrid from "./map/HexagonalGrid";
import LoginRegister from "./login/LoginRegister";

const App: React.FC = () => {
    const [role, setRole] = useState(Role.Unauthenticated);
    const [mapId, setMapId] = useState("S7FVbPdByRIKQzggDFDb");

    const handleLoadMap = (mapId: string, playerLogin: boolean) => {
        setRole(!playerLogin ? Role.GM : Role.Player);
        setMapId(mapId);
    };

    const handleNewMap = (password: string) => {
        setRole(Role.GM);
    };

    return (
        <div>
            {/* {role === Role.Unauthenticated ? (
                <LoginRegister onLoadMap={handleLoadMap} onNewMap={handleNewMap} />
            ) : ( */}
            <HexagonalGrid role={Role.GM} mapId={mapId} />
            {/* )} */}
        </div>
    );
};

export default App;