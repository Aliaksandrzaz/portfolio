import {myGameField} from "../myGameField.js";
import {PathFinder} from "../pathFinder.js";
import {MoveAnimetion} from "../animation.js";

export class ProcessingPlantCar {

    constructor(processingPlant) {
        this.processingPlant = processingPlant;
        this.processingPlantCar = {
            hp: 100,
            id: ''
        };
        this.createProcessingPlantCar();
        this.moveProcessingPlantCar();

    }

    createProcessingPlantCar() {
        this.processingPlantCar.id = document.createElement('div');
        this.processingPlantCar.id.classList.add('machine');
        this.processingPlant.append(this.processingPlantCar.id);
    }

    getCoordinatesProcessingPlantCar() {
        let positionCar = this.processingPlantCar.id.getBoundingClientRect();
        let minPosition = new Map();

        myGameField.forEach((y) => {
            y.forEach((x) => {
                if (x.spice) {
                    let locationGameFieldX = x.id.getBoundingClientRect().x - positionCar.x,
                        locationGameFieldY = x.id.getBoundingClientRect().y - positionCar.y,
                        locationGameField = Math.sqrt((locationGameFieldX ** 2 + locationGameFieldY ** 2));
                    minPosition.set(locationGameField, [locationGameFieldX + positionCar.x, locationGameFieldY + positionCar.y]);
                }
            });
        });
        let id = Math.min(...minPosition.keys());
        let [positionSpiceX, positionSpiceY] = minPosition.get(id);

        return document.elementFromPoint(positionSpiceX, positionSpiceY).closest('.gridClass');
    }

    async moveProcessingPlantCar() {
        let start = this.processingPlantCar.id.closest('.gridClass');
        let startY = start.getAttribute('y');
        let startX = start.getAttribute('x');
        let end = this.getCoordinatesProcessingPlantCar();
        let endY = end.getAttribute('y');
        let endX = end.getAttribute('x');
        let path = new PathFinder(myGameField, startY, startX, endY, endX);
        let count = 0;

        setTimeout(function run(processingCar, anime) {

            let hasProcessingPlant = path.road.some((el) => {
                return el.id.querySelector('.processingPlant');
            });

            if (hasProcessingPlant) {
                count++;
                anime = new MoveAnimetion().move(path.road, 2, processingCar);
                anime.onfinish = () => {
                    path.road[path.road.length - 1].id.append(processingCar);
                    path.road.reverse();
                    count % 2 === 0  ? document.getElementById('credits').textContent = `${parseInt(document.getElementById('credits').textContent) + 20}` : 0;
                    setTimeout(run, path.road.length * 300 * 3 + 50, processingCar, anime);
                };
            }
            else {
                processingCar.remove();
            }
        }, 0, this.processingPlantCar.id)


    }

    getSpice() {
        document.getElementById('credits').textContent = `${parseInt(document.getElementById('credits').textContent) + 20}`;
    }
}





