import { UrbanGrid } from "../../features/settlement/UrbanGrid";
import "./Grid.css";

function Grid() {
    const urbanGrid = new UrbanGrid();
    const cellSize = 50; // Change this to adjust the size of each cell
    const marginSize = 25; // Change this to adjust the size of the margin between groups

    const cells = [];
    for (let i = 0; i < urbanGrid.blocks.length; i++) {
        for (let j = 0; j < 4; j++) {
            const building = urbanGrid.blocks[i].built.reduce((struct, structureBuild) => structureBuild[1].includes(j) ? structureBuild[0] : struct, "");
            cells.push(
                <div
                    key={`${i}-${j}`}
                    className="grid-cell"
                    style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        top: `${Math.floor(i / 3) * 2 * cellSize + Math.floor(j / 2) * cellSize + Math.floor(i / 3) * marginSize}px`,
                        left: `${(i % 3) * 2 * cellSize + (j % 2) * cellSize + (i % 3) * marginSize}px`,
                    }}
                >
                    {building || `${i}-${j}`}
                </div>
            );
        }
    }

    return (
        <div className="urban-grid-container">
            <div className="grid-overlay">{cells}</div>
        </div>
    );
}

export default Grid;