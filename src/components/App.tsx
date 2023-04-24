import { useState } from "react";
import { Role } from "./login/Role";
import HexagonalGrid from "./map/HexagonalGrid";
import LoginRegister from "./login/LoginRegister";

const App: React.FC = () => {
    const [role, setRole] = useState(Role.Unauthenticated);
    const [gameId, setGameId] = useState("");

    const handleLoadGame = (gameId: string, password?: string) => {
        setRole(!!password ? Role.GM : Role.Player);
        setGameId(gameId);
    };

    const handleNewGame = (password: string) => {
        setRole(Role.GM);
    };

    return (
        <div>
            {role === Role.Unauthenticated ? (
                <LoginRegister onLoadGame={handleLoadGame} onNewGame={handleNewGame} />
            ) : (
                <HexagonalGrid role={role} gameId={gameId} />
            )}
        </div>
    );
};

export default App;