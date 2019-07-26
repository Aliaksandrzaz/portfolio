import {PathFinder} from "../pathFinder.js";
import {myGameField} from "../myGameField.js";
import {Strike} from "./strike.js";
import {MoveAnimetion} from "../animation.js";
import {allBuild, allSolder} from "../BD/all.js";

export class Solder {

    constructor(hp = 100, cost = 10, forse = 100, timeCreate = 1, timeWalk = 1, timeStrike = 1, side, barrack) {
        this.barrack = barrack;
        this.animation;
        this.timer;
        this.element;
        this.bank = document.getElementById('credits');
        this.id = Math.ceil(Math.random() * 10 ** 10);
        this.solder = {
            hp: hp,
            cost: cost,
            timeCreate: timeCreate,
            timeWalk: timeWalk,
            timeStrike: timeStrike,
            forse: forse,
            side: side,
            id: ''
        };
    }

    handleEvent(event) {
        switch (event.type) {
            case 'dblclick':
                let startElement = event.target.closest('.gridClass');
                return this.selectSolder(startElement);
            case 'click':
                return this.moveSolder()
        }
    }

    createSolder(typeSolder) {
        if (this.solder.cost <= this.bank.textContent) {
            return new Promise(resolve => {
                setTimeout(() => {
                    this.element = document.createElement('div');
                    this.element.classList.add(typeSolder);
                    this.createHP(this.element);
                    this.element.setAttribute('side', this.solder.side);
                    this.barrack.append(this.element);
                    this.element.addEventListener('dblclick', this);
                    this.element.id = this.id;
                    this.solder.id = this.id;
                    this.bank.textContent = this.bank.textContent - this.solder.cost;
                    document.getElementById(typeSolder).classList.remove('disabled');

                    allSolder.set(this.id, {
                        timeWalk: this.solder.timeWalk,
                        forse: this.solder.forse,
                        id: this.id,
                        class: typeSolder,
                        hp: this.element.textContent,
                        side: this.solder.side,
                        grid: this.element.closest('.gridClass').id,
                    });
                    resolve(this);

                }, this.solder.timeCreate * 500)
            });
        }
        else {
            console.log('No money');
        }
    }

    selectSolder(startElement) {
        this.element.style.outline = '3px solid green';
        let startY = startElement.getAttribute('y');
        let startX = startElement.getAttribute('x');
        return this.moveSolder(startY, startX);
    }

    moveSolder(startY, startX) {
        document.getElementById('wrapper').addEventListener('click', async () => {
            this.element.style.outline = '';
            let endElement = event.target.closest('.gridClass');
            let endY = endElement.getAttribute('y'),
                endX = endElement.getAttribute('x');

            if (this.animation) {
                this.animation.pause();
                let position = this.element.getBoundingClientRect();
                let parrentCoord = document.elementsFromPoint(position.x, position.y);
                parrentCoord.find((el) => {
                    if (el.classList.contains('gridClass')) {
                        return el;
                    }
                }).append(this.element);
                this.animation.cancel();
                this.animation = undefined;
            }
            if (!myGameField[endY][endX].rock) {
                let path = new PathFinder(myGameField, startY, startX, endY, endX);

                this.animation = new MoveAnimetion().move(path.road, this.solder.timeWalk, this.element);

                // if (myGameField[endY][endX].id.querySelector('[side]')) {
                //     this.animation = new MoveAnimetion().move(path.road, this.solder.timeWalk, this.element);
                // }
                // else {
                //     this.animation = new MoveAnimetion().move(path.road, this.solder.timeWalk, this.element);
                // }

                this.animation.onfinish = () => {
                    if (allSolder.has(this.id)) {
                        path.road[path.road.length - 1].id.append(this.element);
                        allSolder.get(this.id).grid = endElement.id;
                        this.element.style.transform = `rotateZ(${0}deg)`;
                        this.animation = undefined;
                    }
                    else {
                        this.element.remove();
                    }

                };
                this.strikePlayer(path);
            }
        }, {once: true});
    }

    findEnemyDistance(solder) {

        let enemy = solder.side === 'player' ? 'enemy' : 'player';

        let minDist = new Map();

        let allPositionEnemy = document.getElementById('wrapper').querySelectorAll(`[side=${enemy}]`); //enemy

        [...allPositionEnemy].forEach((el) => {
            let elPosition = el.getBoundingClientRect();
            let x = Math.abs(elPosition.left - document.getElementById(solder.id).getBoundingClientRect().left),
                y = Math.abs(elPosition.top - document.getElementById(solder.id).getBoundingClientRect().top);
            let distance = Math.floor(Math.sqrt(x ** 2 + y ** 2));
            minDist.set(distance, el);
        });

        let minPositionEnemy = Math.min(...minDist.keys()),
            positionEnemy = minDist.get(minPositionEnemy);
        return {minPositionEnemy, positionEnemy};
    }

    strikePlayer(path) {
        return new Promise(resolve => {
            this.timer = setTimeout(function go(path, findEnemyDistance, solder, timer) {
                let x = findEnemyDistance(solder);
                let minPositionEnemy = x.minPositionEnemy,
                    positionEnemy = x.positionEnemy;
                if (Math.abs(minPositionEnemy) < 250 && !positionEnemy.classList.contains('damage') && !document.getElementById(solder.id).classList.contains('damage')) {
                    resolve(new Strike().strike(path, solder, positionEnemy, timer));
                    timer = setTimeout(go, solder.timeStrike * 600, path, findEnemyDistance, solder, positionEnemy, timer)
                }
                else {
                    resolve();
                }
            }, path.road.length * 300 * this.solder.timeWalk, path, this.findEnemyDistance, this.solder, this.timer);
        })
    }

    createHP(solderNameHP) {
        let hpValue = document.createElement('div');
        hpValue.classList.add('hpSolder');
        hpValue.textContent = this.solder.hp;
        solderNameHP.append(hpValue);
    }

}
