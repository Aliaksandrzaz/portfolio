import {Solder} from "../solder.js";

export class Traik extends Solder {
    constructor(hp, cost, forse, timeWalk, timeCreate, timeStrike, side, barrack) {
        super(hp, cost, forse, timeWalk, timeCreate, timeStrike, side, barrack);
        this.createInfantry();
    }

    createInfantry() {
        super.createSolder('traik')
    }
}