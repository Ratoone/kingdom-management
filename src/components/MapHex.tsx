import { Hex, Hexagon } from "react-hexgrid";
import { MapHex } from "../map/MapHex";
import { HexagonProps } from "react-hexgrid/lib/Hexagon/Hexagon";

interface MapHexProps extends HexagonProps {
    hexData: MapHex;
}

const MapHexagon = ({ hexData, ...rest }: MapHexProps) => {
    return (
        <Hexagon {...rest} />
    );
};

export { MapHexagon }