import {Infantry} from "./infantry.js";
import {Troopers} from "./troopers.js";

export class CreateSolders {

    constructor(barrack) {
        this.barrack = barrack;
        this.sideMenuSolder = document.getElementById('solderSideMenu');
        document.body.addEventListener('click', this);
    }

    async handleEvent() {
        let element = event.target;
        if (!element.closest('#sideMenu') && this.barrack !== element) {
            this.sideMenuSolder.style.display = 'none';
            document.body.removeEventListener('click', this);
        }

        if (this.sideMenuSolder.style.display !== 'grid' && this.barrack === element && element.getAttribute('side') === 'player') {
            document.getElementById('buildSideMenu').style.display = 'none';
            document.getElementById('machineSideMenu').style.display = 'none';
            this.sideMenuSolder.style.display = 'grid';
        }
        else if (element.closest('#solderSideMenu')) {
            this.createUnit();
        }
        // else if (element.closest('#buttonSolderSideMenu')) {
        //     this.sideMenuSolder.style.display = 'grid';
        // }
    }

    createUnit() {
        let nameSolder = event.target;

        switch (nameSolder.id) {
            case 'infantry':
                return this.checkPlace(nameSolder, this.createInfantry);
            case 'troopers':
                return this.checkPlace(nameSolder, this.createTroopers);
        }

    }

    createInfantry() {
        new Infantry(100, 10, 2, 2, 5, 3, 'player', this.barrack);

    }

    createTroopers() {
        new Troopers(120, 15, 4, 3, 6, 4, 'player', this.barrack)
    }

    checkPlace(eventPlace, someCreate) {
        if (!eventPlace.classList.contains('disabled')) {
            eventPlace.classList.add('disabled');
            someCreate.call(this);
        }
        else {
            console.log(`Очередь занята`)
        }
    }
}

