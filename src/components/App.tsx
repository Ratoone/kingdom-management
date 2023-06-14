import { useState } from "react";
import { Role } from "./login/Role";
import HexagonalGrid from "./map/HexagonalGrid";
import LoginRegister from "./login/LoginRegister";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// @ts-ignore
const ConditionalWrapper = ({ condition, wrapper, children }) => 
    condition ? wrapper(children) : children;

const App: React.FC = () => {
    const [role, setRole] = useState(Role.Unauthenticated);
    const [mapId, setMapId] = useState("");

    const handleLoadMap = (mapId: string, playerLogin: boolean) => {
        setRole(!playerLogin ? Role.GM : Role.Player);
        setMapId(mapId);
    };

    if (role === Role.Unauthenticated) {
        return <LoginRegister onLoadMap={handleLoadMap} />;
    }

    return (
        <ConditionalWrapper
            condition={role === Role.Player}
            // @ts-ignore
            wrapper={children =>
                <TransformWrapper minScale={0.6} limitToBounds={false}>
                    <TransformComponent>
                        {children}
                    </TransformComponent>
                </TransformWrapper>
            }>
            <HexagonalGrid role={role} mapId={mapId} />
        </ConditionalWrapper>
           
    );
};

export default App;
