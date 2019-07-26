import {WindStation} from "../builds/windStation.js";
import {Barracks} from "../builds/barracks.js";
import {ProcessingPlant} from "../builds/processingPlant.js";
import {EasyFactory} from "../builds/easyFactory.js";
import {GunshotTurret} from "../builds/gunshotTurret.js";
import {Playground} from "../builds/playground.js";
import {Building} from "../builds/building.js";
import {allBuild, allSolder, all} from "../BD/all.js";
import {EnemySolder} from "./enemySolder.js";

export class Enemy {

    constructor() {
        this.nameSolder = new Map([
            [0, {type: 'infantry', hp: 100, forse: 2, timeWalk: 3, timeCreate: 5, timeStrike: 1}],
            [1, {type: 'troopers', hp: 120, forse: 4, timeWalk: 4, timeCreate: 5, timeStrike: 1}]
        ]);

        this.nameMachine = new Map([
            [0, {type: 'traik', hp: 180, forse: 5, timeWalk: 2, timeCreate: 5, timeStrike: 1}],
            [1, {type: 'bmp', hp: 200, forse: 4, timeWalk: 2, timeCreate: 5, timeStrike: 1}],
        ]);

        this.nameBuild = new Map([
            ['windStation', WindStation],
            ['easyFactory', EasyFactory],
            ['barrack', Barracks],
            ['processingPlant', ProcessingPlant],
            ['gunshotTurret', GunshotTurret]
        ]);

        this.positionPlayground = [];

        this.placeId = [
            '972',
            '974',
            '938',
            '940',
            '943'
        ];
    }

    createPlayground() {
        this.placeId.forEach((placeId) => {
            let playground = new Playground(0, 0);
            document.getElementById(playground.playground.classList.value).style.opacity = 0.5;
            this.positionPlayground.push(playground);
            document.getElementById(placeId).append(playground.playground);
        })
    }

    createBuildEnemy() {
        let count = 0;
        this.nameBuild.forEach((build) => {
            let element = new build(100, 0, 'enemy');
            this.positionPlayground[count++].playground.append(element.build);
            document.getElementById(element.build.classList.value).style.opacity = 0.5;
            allBuild.get(element.id).side = 'enemy';
            // if (element.build.classList.item(0) === 'gunshotTurret') {
            //     element.createMagic();
            // }
        });
    }

    createSolderEnemy() {
        setTimeout(function go(nameSolder) {
            let barrack = document.getElementById(938);
            let type = nameSolder.get(Math.floor(Math.random() * 2));
            barrack != null ? new EnemySolder(type.hp, 0, type.forse, type.timeWalk, type.timeCreate, type.timeStrike, 'enemy', barrack).do(type.type) : 0;


            if (allSolder.size < 3){
                setTimeout(go, type.timeCreate * 8000, nameSolder);
            }
        }, 8000, this.nameSolder);

        setTimeout(function go(nameSolder) {
            let factory = document.getElementById(974);
            let type = nameSolder.get(Math.floor(Math.random() * 2));
            factory != null ? new EnemySolder(type.hp, 0, type.forse, type.timeWalk, type.timeCreate, type.timeStrike, 'enemy', factory).do(type.type) : 0;
            if (allSolder.size < 3){
                setTimeout(go, type.timeCreate * 10000, nameSolder);
            }
        }, 10000, this.nameMachine);

    }
}


