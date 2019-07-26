import {Bmp} from "./bmp.js";
import {Traik} from "./traik.js";

export class CreateMachine {



    constructor(factory) {
        this.factory = factory;
        this.sideMenuMachine = document.getElementById('machineSideMenu');
        document.body.addEventListener('click', this);
    }

    async handleEvent() {
        let element = event.target;
        if (!element.closest('#sideMenu') && this.factory !== element) {
            this.sideMenuMachine.style.display = 'none';
            document.body.removeEventListener('click', this);
        }

        if (this.sideMenuMachine.style.display !== 'grid' && this.factory === element && element.getAttribute('side') === 'player') {
            document.getElementById('buildSideMenu').style.display = 'none';
            document.getElementById('solderSideMenu').style.display = 'none';
            this.sideMenuMachine.style.display = 'grid';
        }
        else if (element.closest('#machineSideMenu')) {
            this.createUnit();
        }
        // else if (event.target.closest('#buttonMachineSideMenu')) {
        //     this.sideMenuMachine.style.display = 'grid';
        // }
    }

    createUnit() {
        let nameSolder = event.target;

        switch (nameSolder.id) {
            case 'bmp':
                return this.checkPlace(nameSolder, this.createBmp);
            case 'traik':
                return this.checkPlace(nameSolder, this.createTraik);
        }

    }

    createBmp() {
        new Bmp(180, 50, 5, 2, 2, 3, 'player', this.factory)
    }

    createTraik() {
        new Traik(200, 40, 4, 3, 2, 3, 'player', this.factory)
    }

    checkPlace(eventPlace, someCreate) {
        if (!eventPlace.classList.contains('disabled')) {
            eventPlace.classList.add('disabled');
            someCreate.call(this);
        }
    }
}