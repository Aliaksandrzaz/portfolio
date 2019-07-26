import {Solder} from "../createArmy/solder.js";
import {allSolder} from "../BD/all.js";
import {MoveAnimetion} from "../animation.js";
import {PathFinder} from "../pathFinder.js";
import {Strike} from "../createArmy/strike.js";
import {myGameField} from "../myGameField.js";

export class EnemySolder extends Solder {

    constructor(hp, cost, forse, timeCreate, timeWalk, timeStrike, side, barrack) {
        super(hp, cost, forse, timeCreate, timeWalk, timeStrike, side, barrack);
        this.timerDo;
    }

    async do(type) {
        await this.createSolder(type);

        this.timerDo = setTimeout(async function go(callback, timerDo, id) {
            if (allSolder.has(id)) {
                await callback();
                timerDo = setTimeout(go, 1000, callback, timerDo, id)
            }
        }, 300, this.moveSolderEnemy.bind(this), this.timerDo, this.id)

    }

    moveSolderEnemy() {
        let start = this.element.closest('.gridClass'),
            startY = start.getAttribute('y'),
            startX = start.getAttribute('x');
        let positionEnemy = this.findEnemyDistance(this.element).positionEnemy;


        if (positionEnemy !== undefined && !this.element.classList.contains('damage')) {
            let endElement = positionEnemy.closest('.gridClass');
            let endY = positionEnemy.closest('.gridClass').getAttribute('y'),
                endX = positionEnemy.closest('.gridClass').getAttribute('x');
            let path = new PathFinder(myGameField, startY, startX, endY, endX);
            path.road.pop();

            this.animation = new MoveAnimetion().move(path.road, this.solder.timeWalk, this.element);


            return new Promise((resolve => {

                if (path.road.length === 1) {
                    path.road[path.road.length - 1].id.append(this.element);
                    resolve(this.strikeEnemy(path));
                }
                else if (path.road.length > 1) {
                    this.animation.onfinish = () => {
                        if (allSolder.has(this.id)) {
                            path.road[path.road.length - 1].id.append(this.element);
                            resolve(this.strikeEnemy(path));
                            allSolder.get(this.id).grid = path.road[path.road.length - 1].id.id;
                            this.animation = undefined;
                        }
                        else {
                            this.element.remove();
                        }
                    };
                }
                else {
                    resolve();
                }

            }))
        }
    }

    strikeEnemy(path) {
        return new Promise(resolve => {
            let minPositionEnemy = this.findEnemyDistance(path.road[path.road.length - 1].id).minPositionEnemy,
                positionEnemy = this.findEnemyDistance(path.road[path.road.length - 1].id).positionEnemy;

            if (Math.abs(minPositionEnemy) < 250 && !positionEnemy.classList.contains('damage') && !this.element.classList.contains('damage')) {
                clearTimeout(this.timer);
                setTimeout(function go(path, solder, positionEnemy, timer) {
                    resolve(new Strike().strike(path, solder, positionEnemy, timer));
                }, 300 * this.solder.timeStrike, path, this.solder, positionEnemy, this.timer)
            }
            else {
                resolve();
            }
        })
    }

    findEnemyDistance(path) {
        let enemy = this.solder.side === 'player' ? 'enemy' : 'player';

        let minDist = new Map();

        let start = this.element.closest('.gridClass');

        let allPositionEnemy = document.getElementById('wrapper').querySelectorAll(`[side=${enemy}]`);

        [...allPositionEnemy].forEach((el) => {
            let x = Math.abs(el.getBoundingClientRect().left - path.getBoundingClientRect().left),
                y = Math.abs(el.getBoundingClientRect().top - path.getBoundingClientRect().top);
            let distance = Math.floor(Math.sqrt(x ** 2 + y ** 2));
            minDist.set(distance, el);
        });

        let minPositionEnemy = Math.min(...minDist.keys()),
            positionEnemy = minDist.get(minPositionEnemy);
        return {minPositionEnemy, positionEnemy};
    }

}