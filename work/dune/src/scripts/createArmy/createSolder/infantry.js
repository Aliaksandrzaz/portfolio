import {Solder} from "../solder.js";
import {allBuild} from "../../BD/all.js";

export class Infantry extends Solder {
    constructor(hp, cost, forse, timeWalk, timeCreate, timeStrike, side,  barrack) {
        super(hp, cost, forse, timeWalk, timeCreate, timeStrike, side, barrack);
        this.createInfantry();
    }

     createInfantry() {
        super.createSolder('infantry');
    }
}