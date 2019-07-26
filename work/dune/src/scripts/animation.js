export class MoveAnimetion {
    constructor(){
        this.animation;
    }

    move(road, timeWalk, element) {
        let move = [];
        let myRegExpRotate = /-?\d{1,3}/g;
        move.push({rotate: myRegExpRotate.exec(element.style.transform) | 0});

        for (let i = 1; i < road.length; i++) {
            let angle = MoveAnimetion.calculateAngle(road[i - 1].x, road[i - 1].y, road[i].x, road[i].y, move[i - 1].rotate);
            move.push({rotate: angle});
        }

        let moveAndChangeColor = road.length > 1 ? road.map((el, index) => {
            return {
                transform: `translate(${el.id.getBoundingClientRect().left - element.getBoundingClientRect().left}px,
                                      ${el.id.getBoundingClientRect().top - element.getBoundingClientRect().top }px)
                            rotateZ(${move[index].rotate}deg)`
            };
        }) : [];


        this.animation = element.animate(
            moveAndChangeColor, {
                duration: road.length * 300 * timeWalk,
                id: element.id
            });

        return this.animation;
    }

    static calculateAngle(startX = 0, startY = 0, endX, endY, angleStart) {
        let x1 = startX;
        let y1 = startY;
        let x2 = endX;
        let y2 = endY;

        x2 = x2 < x1 ? -x2 : x2;
        y2 = y2 < y1 ? -y2 : y2;

        let dis = Math.abs(x2 - x1) + Math.abs(y2 - y1);

        //Узнаём угол в градусах
        let angl = Math.round(Math.acos((y2 - y1) / dis) / Math.PI * 180);

        if (x1 > x2) {
            angl = -angl;
        }
        // console.log(`x1:${x1} y1:${y1} x2:${x2} y2:${y2} angl:${angl}`);
        return -angl;

    }


}
