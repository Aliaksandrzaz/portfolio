import {Building} from './building.js';
import {CreateMachine} from "../createArmy/createMachine/createMachine.js";

export class EasyFactory extends Building {
    constructor(life = 100, cost, side) {
        super(life, cost, side);
        this.createEasyFactory();
    }

    createEasyFactory() {
        super.createBuild('easyFactory');
        this.build.addEventListener('click', () => {
            new CreateMachine(this.easyFactory);
            if (event.target.closest('.playground')){
                this.createMagic();
            }
        });
    }

    createMagic(){
        this.build.addEventListener('click', () => {
            new CreateMachine(this.build);
        });
    }
}