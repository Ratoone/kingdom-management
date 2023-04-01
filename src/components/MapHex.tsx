import { Hexagon } from "react-hexgrid";
import { MapHexData } from "../map/MapHex";
import { HexagonProps } from "react-hexgrid/lib/Hexagon/Hexagon";

interface MapHexProps extends HexagonProps {
    hexData: MapHexData;
}

const MapHexagon = ({ hexData, ...rest }: MapHexProps) => {
    return (
        <Hexagon {...rest} />
    );
};

export { MapHexagon }