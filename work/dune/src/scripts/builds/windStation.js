import {Building} from './building.js';

export class WindStation extends Building {

    constructor(life, size, side) {
        super(life, size, side);
        this.energy = document.getElementById('energy');
        this.createWindStation();
    }

    createWindStation() {
        super.createBuild('windStation');
        this.build.addEventListener('dragend', () => {
            if (event.target.closest('.playground')){
                this.createMagic();
            }
        })
    }

    createMagic() {
        let time = setInterval(() => {
            this.energy.textContent++;
            if (!this.build.closest('.gridClass')) {
                clearInterval(time);
            }
        }, 500);
    }
}