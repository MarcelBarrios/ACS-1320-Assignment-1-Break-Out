import Sprite from './Sprite';

class Brick extends Sprite {
    constructor(x, y, width, height, color, ctx) {
        super(x, y, width, height, color, ctx);

        this.status = 1;
    }
}

export default Brick;