import {Building} from './building.js';
import {myGameField} from "../myGameField.js";
import {Strike} from "../createArmy/strike.js";
import {allBuild} from "../BD/all.js";


export class GunshotTurret extends Building {

    constructor(life, cost, side) {
        super(100, cost, side);
        this.timer;
        this.solder = {
            hp: life,
            cost: cost,
            timeStrike: 2,
            forse: 1,
            id: this.id,
            side: this.side
        };
        this.createGunshotTurret();
    }

    createGunshotTurret() {
        super.createBuild('gunshotTurret');
        this.build.addEventListener('dragend', () => {
            if (event.target.closest('.playground')) {
                this.createMagic();
            }
        });
    }

    createMagic() {
        this.path = {
            road: [],
            close: new Map()
        };
        let position = this.build.parentElement.closest('.gridClass');
        let positionX = position.getAttribute('x') - 2;
        let positionY = position.getAttribute('y') - 2;
        let enemy = this.solder.side === 'player' ? 'enemy' : 'player';
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                let haveInMyGameField = false;
                if ((positionX + x > -1 && positionX + x <= myGameField.length - 1) && (positionY + y > 0 && positionY + y <= myGameField.length - 1)) {
                    haveInMyGameField = true;
                }
                if (haveInMyGameField && this.build.closest('.gridClass') !== myGameField[positionY + y][positionX + x].id) {
                    this.path.road.push({id: myGameField[positionY + y][positionX + x].id});
                }
            }
        }
        this.path.road.push({id: this.build.closest('.gridClass')});
        this.path.close.set(1, 1);
        this.path.close.set(2, 2);

        this.timer = setTimeout(async function str(findEnemyDistance, path, solder, timer) {
            if (allBuild.has(solder.id)) {
                for (let value of Object.values(path.road)) {
                    let x = findEnemyDistance(solder);
                    let minPositionEnemy = x.minPositionEnemy,
                        positionEnemy = x.positionEnemy;
                    if (!value.id.classList.contains('damage') && !document.getElementById(solder.id).classList.contains('damage') && minPositionEnemy < 300) {
                        await new Strike().strike(path, solder, positionEnemy)
                    }
                }
                timer = setTimeout(str, solder.timeStrike * 300, findEnemyDistance, path, solder, timer);
            }
            else {
                clearTimeout(timer);
            }
        }, 1000, this.findEnemyDistance, this.path, this.solder, this.timer);
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
}

