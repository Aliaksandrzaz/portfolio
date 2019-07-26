import {Building} from './building.js';
import {CreateSolders} from "../createArmy/createSolder/createSolders.js";
import {ProcessingPlantCar} from "./processingPlantCar";

export class Barracks extends Building {//казарма

    constructor(life, cost, side) {
        super(life, cost, side);
        this.createBarrack();
    }

    createBarrack() {
        super.createBuild('barrack');
        this.build.addEventListener('dragend', ()=>{
            if (event.target.closest('.playground')){
                this.createMagic();
            }
        })

    }

    createMagic(){
        this.build.addEventListener('click', () => {
            new CreateSolders(this.build);
        });
    }
}