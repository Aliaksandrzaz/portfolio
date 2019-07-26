import {ProcessingPlant} from './processingPlant.js';
import {Playground} from './playground.js';
import {WindStation} from './windStation.js';
import {Barracks} from './barracks.js';
import {EasyFactory} from './easyFactory.js';
import {GunshotTurret} from './gunshotTurret.js';

export class CreateBuild {
    constructor() {
        this.sideMenu = document.getElementById('sideMenu');
        this.sideMenuBarracks = document.getElementById('barrack');
        this.sideMenuWindStation = document.getElementById('windStation');
        this.sideMenuProcessingPlant = document.getElementById('processingPlant');
        this.sideMenuEasyFactory = document.getElementById('easyFactory');
        this.sideMenuPlayground = document.getElementById('playground');
        this.sideMenuGunshotTurret = document.getElementById('gunshotTurret');
        this.sideMenu.addEventListener('click', this);
    }

    async handleEvent() {
        let eventPlace = event.target;
        switch (eventPlace) {
            case this.sideMenuBarracks:
                return await CreateBuild.checkPlace(eventPlace, CreateBuild.createBarracks);
            case this.sideMenuPlayground:
                return await CreateBuild.checkPlace(eventPlace, CreateBuild.createPlayground);
            case this.sideMenuWindStation:
                return await CreateBuild.checkPlace(eventPlace, CreateBuild.createWindStation);
            case this.sideMenuProcessingPlant:
                return await CreateBuild.checkPlace(eventPlace, CreateBuild.createProcessingPlant);
            case this.sideMenuEasyFactory:
                return await CreateBuild.checkPlace(eventPlace, CreateBuild.createEasyFactory);
            case this.sideMenuGunshotTurret:
                return await CreateBuild.checkPlace(eventPlace, CreateBuild.createGunshotTurret);

        }
    }

    static createPlayground(time = 2) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(new Playground(Infinity, 4));
            }, time * 500 )
        });
    }

    static createBarracks(time = 2) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(new Barracks(150, 100, 'player'));
            }, time * 500 * 2)
        });
    }

    static createWindStation(time = 2) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(new WindStation(100, 50, 'player'));
            }, time * 500 * 1.5)
        });
    }

    static createProcessingPlant(time = 2) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(new ProcessingPlant(100, 100, 'player'));
            }, time * 500 * 2)
        });
    }

    static createEasyFactory(time = 2) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(new EasyFactory(150, 50, 'player'));
            }, time * 500 * 3)
        });
    }

    static createGunshotTurret(time = 2) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(new GunshotTurret(100, 120, 'player'));
            }, time * 500 * 3)
        });
    }

    static async checkPlace(eventPlace, someCreate) {
        if (!eventPlace.classList.contains('disabled') && eventPlace.children.length === 0) {
            eventPlace.classList.add('disabled');
            await someCreate();
            eventPlace.classList.remove('disabled');
        }
    }
}