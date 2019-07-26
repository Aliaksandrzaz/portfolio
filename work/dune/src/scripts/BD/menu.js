import {TodoStorage} from "./indexeDB.js";
import {allBuild, allSolder, allHeaderMenu} from "./all.js";
import {Infantry} from "../createArmy/createSolder/infantry.js";
import {Troopers} from "../createArmy/createSolder/troopers.js";
import {Traik} from "../createArmy/createMachine/traik.js";
import {Bmp} from "../createArmy/createMachine/bmp.js";
import {ProcessingPlant} from '../builds/processingPlant.js';
import {WindStation} from '../builds/windStation.js';
import {Barracks} from '../builds/barracks.js';
import {EasyFactory} from '../builds/easyFactory.js';
import {GunshotTurret} from '../builds/gunshotTurret.js';
import {myGameField} from "../myGameField.js";
import {EnemySolder} from "../enemy/enemySolder.js";
import {Solder} from "../createArmy/solder.js";
import {Enemy} from "../enemy/enemy.js";


export class TodoList {

    constructor() {
        this.storage = new TodoStorage();

        this.nameSolder = new Map([
            ['infantry', Infantry],
            ['troopers', Troopers],
            ['traik', Traik],
            ['bmp', Bmp]
        ]);

        this.nameBuild = new Map([
            ['windStation', WindStation],
            ['easyFactory', EasyFactory],
            ['barrack', Barracks],
            ['processingPlant', ProcessingPlant],
            ['gunshotTurret', GunshotTurret]
        ]);
        this.storage.init();
        this.menu = document.getElementById('menu');
        this.menu.addEventListener('click', this);
    }

    handleEvent(event) {
        switch (event.target.id) {
            case 'saveGame':
                return this.saveGameToStorage();
            case 'loadGame':
                return this.loadGameToStorage();
            case 'restart':
                return TodoList.restartGame();

        }
    }

    async saveGameToStorage() {

        for (let [key, value] of allHeaderMenu) {
            value.count = document.getElementById(key).textContent;
        }

        for (let [key, value] of allBuild) {
            value.grid = document.getElementById(key).closest('.gridClass').id;
        }

        await this.storage.put({allBuild, allSolder, allHeaderMenu, id: 1});
    }

    async loadGameToStorage() {

        TodoList.clearAll();
        TodoList.cleanField();

        this.storage.init()
            .then(() => this.storage.getAll())
            .then(items => {
                items[0].allSolder.forEach((el) => {
                    let nameClass = this.nameSolder.get(el.class);
                    el.side === 'enemy' ? new EnemySolder(el.hp, 0, el.forse, 0, el.timeWalk, el.timeStrike, el.side, document.getElementById(el.grid)).do(el.class) : new Solder(el.hp, 0, el.forse, 0, el.timeWalk, el.timeStrike, el.side, document.getElementById(el.grid)).createSolder(el.class);
                });
                new Enemy().createSolderEnemy();

                items[0].allBuild.forEach((el) => {
                    let playground = document.createElement('div');
                    playground.classList.add('playground');

                    let nameClass = this.nameBuild.get(el.class);
                    let place = el.grid;
                    let build = new nameClass(el.hp, 0, el.side);

                    document.getElementById(el.class).style.opacity = 0.5;
                    document.getElementById(place).append(playground);
                    playground.append(build.build);

                    if (build.createMagic !== undefined && build.side === 'player') {
                        build.createMagic()
                    }
                    build.removeListener();
                });

                items[0].allHeaderMenu.forEach((el, key) => {
                    document.getElementById(key).textContent = el.count;
                });

            });
    }

    static cleanField() {
        for (let [key, value] of allHeaderMenu) {
            document.getElementById(key).textContent = 1000;
        }
        TodoList.clearAll();

        for (let y = 0; y < 32; y++) {
            for (let x = 0; x < 32; x++) {
                while (myGameField[y][x].id.firstChild) {
                    myGameField[y][x].id.removeChild(myGameField[y][x].id.firstChild);
                }
            }
        }
    }

    static restartGame() {
        location.reload();

        window.addEventListener('load', function (e) {
            console.log('Image loaded');
        });
    }

    async onDelete(id) {
        await this.storage.delete(id);
    }

    static clearAll() {
        for (let i = 1; i < 99999; i++) {
            window.clearInterval(i);
            window.clearTimeout(i);
        }
        allBuild.clear();
        allSolder.clear();
        allHeaderMenu.clear();
    }
}

new TodoList();


