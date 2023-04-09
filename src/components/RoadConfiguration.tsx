import tile_1 from "../database/tiles/0.png";
import tile_2_0 from "../database/tiles/01.png";
import tile_2_1 from "../database/tiles/02.png";
import tile_2_2 from "../database/tiles/03.png";
import tile_3_0 from "../database/tiles/012.png";
import tile_3_1 from "../database/tiles/013.png";
import tile_3_2 from "../database/tiles/014.png";
import tile_3_3 from "../database/tiles/024.png";
import tile_4_0 from "../database/tiles/0123.png";
import tile_4_1 from "../database/tiles/0124.png";
import tile_4_2 from "../database/tiles/0134.png";
import tile_5 from "../database/tiles/01234.png";
import tile_6 from "../database/tiles/012345.png";

const length2Tiles = [tile_2_0, tile_2_1, tile_2_2];
const length4Tiles = [tile_4_0, tile_4_1, tile_4_2]
const fullString = "012345";


const findMissingValues = (input: string): string => {
    return fullString.split("").filter(char => !input.includes(char)).join("");
}

const tileByRoadString = (road: string): [string, number] => {
    const roadStringLength = road.length;
    switch (roadStringLength) {
        case 1: {
            return [tile_1, parseInt(road)];
        }

        case 2: {
            const roadParsed = parseInt(road);
            const difference = roadParsed % 10 - Math.floor(roadParsed / 10);
            return [length2Tiles[difference - 1], Math.floor(roadParsed / 10)];
        }

        case 3: {
            const parsedRoadDirections = road.split("").map(Number);
            const difference1 = parsedRoadDirections[1] - parsedRoadDirections[0];
            const difference2 = parsedRoadDirections[2] - parsedRoadDirections[1];
            if (difference1 === difference2) {
                if (difference1 === 1) {
                    return [tile_3_0, parsedRoadDirections[0]];
                }
                return [tile_3_3, parsedRoadDirections[0]]
            }

            if ((difference1 === 1 && difference2 === 3) || (difference1 - difference2 === 1)) {
                return [tile_3_2, parsedRoadDirections[difference1 - 1]];
            }

            return [tile_3_1, parsedRoadDirections[difference1 + difference2 - 3]];
        }

        case 4: {
            const missingRoadParsed = parseInt(findMissingValues(road));
            const difference = missingRoadParsed % 10 - Math.floor(missingRoadParsed / 10);
            return [length4Tiles[difference - 1], (Math.floor(missingRoadParsed % 10) + 1) % 6];
        }

        case 5: {
            const missingValue = findMissingValues(road);
            return [tile_5, (parseInt(missingValue) + 1) % 6]
        }

        case 6: {
            return [tile_6, 0];
        }

        default: {
            throw new RangeError(`Road ${road} has an unexpected length!`);
        }
    }
}

export { tileByRoadString }