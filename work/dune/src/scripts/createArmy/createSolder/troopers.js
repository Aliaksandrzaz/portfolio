import {Solder} from "../solder.js";

export class Troopers extends Solder {
    constructor(hp, cost, forse, timeWalk, timeCreate, timeStrike, side, barrack) {
        super(hp, cost, forse, timeWalk, timeCreate, timeStrike, side, barrack);
        this.createTroopers();
    }

    createTroopers() {
        let Troopers = super.createSolder('troopers');
    }

}