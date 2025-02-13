import Sprite from "./Sprite";

class Brick extends Sprite {
    status: number;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string,
        ctx: CanvasRenderingContext2D
    ) {
        super(x, y, width, height, color, ctx);
        this.status = 1;
    }
}

export default Brick;
