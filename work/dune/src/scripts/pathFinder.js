export class PathFinder {

    constructor(grid, startY, startX, endY, endX) {
        window.onerror = (err) => {
            console.log(`No path`);
        };
        this.move = [[1, 0], [0, 1], [0, -1], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]];
        this.road =[];
        this.start = [];
        this.close = new Map();
        this.myGameField = grid;
        this.end = {y: endY, x: endX};
        this.startPosition = {y: startY, x: startX};
        this.positionCar = this.myGameField[startY][startX];
        this.getPathFinder();
    }

    init() {

        this.start.push(this.positionCar);
        let neighbours = [];
        for (let i = 0; i < this.move.length; i++) {

            let haveInMyGameField = false;
            if (this.positionCar !== undefined && (this.positionCar.x + this.move[i][1] > -1 && this.positionCar.x + this.move[i][1] < this.myGameField.length) && (this.positionCar.y + this.move[i][0] > -1 && this.positionCar.y + this.move[i][0] < this.myGameField.length)) {
                haveInMyGameField = true;
            }

            if (haveInMyGameField && !this.myGameField[this.positionCar.y + this.move[i][0]][this.positionCar.x + this.move[i][1]].rock) {

                let G = this.findG(this.myGameField[this.positionCar.y + this.move[i][0]][this.positionCar.x + this.move[i][1]], i, this.positionCar);

                let H = PathFinder.manhattan(this.myGameField[this.positionCar.y + this.move[i][0]][this.positionCar.x + this.move[i][1]], this.myGameField[this.end.y][this.end.x]) * 10;

                let Full = G + H;

                neighbours.push(this.myGameField[this.positionCar.y + this.move[i][0]][this.positionCar.x + this.move[i][1]]);

                this.myGameField[this.positionCar.y + this.move[i][0]][this.positionCar.x + this.move[i][1]].Gl = G;
                this.myGameField[this.positionCar.y + this.move[i][0]][this.positionCar.x + this.move[i][1]].F = Full;
                // this.myGameField[this.positionCar.y + this.move[i][0]][this.positionCar.x + this.move[i][1]].id.textContent = `H:${H} G:${G} F:${Full}`;
                this.start.push(this.myGameField[this.positionCar.y + this.move[i][0]][this.positionCar.x + this.move[i][1]]);

                if (this.myGameField[this.positionCar.y + this.move[i][0]][this.positionCar.x + this.move[i][1]].parent === 0) {
                    this.myGameField[this.positionCar.y + this.move[i][0]][this.positionCar.x + this.move[i][1]].parent = this.positionCar;
                }
            }
        }

        for (let i = 0; i < this.start.length; i++) {
            if (this.positionCar === this.start[i]) {
                let x = this.start.splice(i, 1);
            }
        }

        this.close.set(this.positionCar, neighbours);
        this.positionCar = this.findMinFuel(this.start);

        // this.positionCar.id.style.backgroundColor = 'green';
    }

    findG(pos, i, posCar) {
        let x = 14;

        if (i < 4) {
            x = 10;
        }

        let curr = posCar.Gl + x;

        for (let value of this.close.values()) {
            value.some((el) => {
                if (el === pos && curr > pos.Gl) {
                    return curr = pos.Gl
                }
            });
        }
        return curr;
    }

    static manhattan(pos0, pos1) {
        let d1 = Math.abs(pos1.x - pos0.x);
        let d2 = Math.abs(pos1.y - pos0.y);
        return d1 + d2;
    }

    findMinFuel(start) {
        let minArrayNumber = [];
        start.map((el) => {
            if (!this.close.has(el) && el.F !== undefined) {
                minArrayNumber.push(el.F)
            }
        });

        return start.find((el) => {
            if (el.F === Math.min(...minArrayNumber)) {
                return el;
            }
        });
    }


    async getPathFinder() {
        while (!this.close.has(this.myGameField[this.end.y][this.end.x])) {
            this.init();
        }
        this.findWayReverse();
        this.cleanMyGameField();
    }

    findWayReverse() {
        let wayReverse = [];

        let finish = this.myGameField[this.end.y][this.end.x];

        wayReverse.push(finish);

        while (finish !== this.myGameField[this.startPosition.y][this.startPosition.x]) {
            finish = finish.parent;
            wayReverse.push(finish);
        }
        return this.road = wayReverse.reverse();
    }

    cleanMyGameField() {
        for (let i = 0; i < 32; i++) {
            for (let j = 0; j < 32; j++) {
                this.myGameField[i][j].Gl = 0;
                this.myGameField[i][j].parent = 0;
                this.myGameField[i][j].F = 0;
            }
        }
    }

}

