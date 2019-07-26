import {allBuild, allSolder, all} from "../BD/all.js";

export class Strike {

    async strike(path, solder, enemy, timer) {

        let strike = document.createElement('div');
        let solderPos = document.getElementById(solder.id);
        let positionEnemy = enemy.getBoundingClientRect();
        let end = path.road[path.road.length - 1].id.getBoundingClientRect();
        strike.classList.add('piy');

        strike.style.left = `${solderPos.closest('.gridClass').offsetLeft}px`;
        strike.style.top = `${ solderPos.closest('.gridClass').offsetTop}px`;

        document.getElementById('wrapper').append(strike);
        strike.style.transition = 0.300 + 's';
        let angle = Strike.calculateAngle(positionEnemy.left, positionEnemy.top, end.left, end.top,);
        if (!solderPos.classList.contains('gunshotTurret')) {
            solderPos.style.transform = `rotateZ(${angle}deg)`;
        }

        strike.style.transform = `translate(${positionEnemy.left - path.road[path.road.length - 1].id.getBoundingClientRect().left + 32}px,
                                            ${positionEnemy.top - end.top + 32}px)`;

        strike.addEventListener('transitionend', async () => {
            strike.remove();

            if (enemy.firstChild.textContent - solder.forse > 0) {
                enemy.firstChild.textContent = enemy.firstChild.textContent - solder.forse;

                if (allSolder.has(+enemy.id)) {
                    allSolder.get(+enemy.id).hp = enemy.firstChild.textContent;
                    // allSolder.get(solder.id).grid = path.road[path.road.length - 1].id.id;
                }
                else if (allBuild.has(+enemy.id)) {
                    allBuild.get(+enemy.id).hp = enemy.firstChild.textContent;
                }


            }
            else {
                enemy.firstChild.textContent = 0;

                if (allSolder.has(+enemy.id)) {
                    allSolder.get(+enemy.id).hp = enemy.firstChild.textContent;
                    // allSolder.get(solder.id).grid = path.road[path.road.length - 1].id.id;
                }
                else if (allBuild.has(+enemy.id)) {
                    allBuild.get(+enemy.id).hp = enemy.firstChild.textContent;
                }
               await this.destroy(enemy, timer);

            }
        });

    }

    async destroy(enemy, timer) {
        clearInterval(timer);
        enemy.classList.add('damage');
        enemy.animate([
            {backgroundPositionY: '0px'},
            {backgroundPositionY: '-333px'}
        ], {
            easing: 'steps(5, end)',
            duration: 800,
            id: 0
        }).onfinish = () => {
            allBuild.delete(+enemy.id);
            allSolder.delete(+enemy.id);
           return new Promise((resolve => {
                resolve(enemy.remove());
            }))
        };

    }

    static calculateAngle(startX = 0, startY = 0, endX, endY,) {
        let x1 = startX;
        let y1 = startY;
        let x2 = endX;
        let y2 = endY;

        let dis = Math.abs(x2 - x1) + Math.abs(y2 - y1);

        //Узнаём угол в градусах
        let angl = -Math.round(Math.acos((y1 - y2) / dis) / Math.PI * 180);

        if (x1 - x2 < 0) {
            angl = -angl;
        }

        return angl;
    }
}