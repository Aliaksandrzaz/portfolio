import {Building} from './building.js';
import {ProcessingPlantCar} from "./processingPlantCar.js";

export class ProcessingPlant extends Building {
    constructor(life = 100, size, side) {
        super(life, size, side);
        this.createProcessingPlant();
    }

    createProcessingPlant() {
        let processingPlant = super.createBuild('processingPlant');
        processingPlant.addEventListener('dragend', ()=>{
            if (event.target.closest('.playground')){
                new ProcessingPlantCar(processingPlant);
            }

        })
    }

    createMagic(){
        new ProcessingPlantCar(this.build);
    }
}
