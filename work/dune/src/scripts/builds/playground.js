import {myGameField} from '../myGameField.js';

export class Playground {//площадь

    constructor() {
        this.playground = this.createPlayground();
        // this.element;
        document.body.addEventListener('dragover', this);
    }

    handleEvent(event) {
        switch (event.type) {
            case 'dragstart':
                this.element = event.target;
                document.body.addEventListener('drop', this);
                return;
            case 'dragover':
                event.preventDefault();
                return;
            case 'drop':
                let x = event.target.getAttribute('x'),
                    y = event.target.getAttribute('y');
                if (event.target.classList.contains('gridClass') && !myGameField[y][x].rock && !myGameField[y][x].spice) {
                    event.target.append(this.element);
                    this.element.setAttribute('draggable', 'false');
                    document.getElementById('playground').style.opacity = 0.5;
                    this.element.removeEventListener('dragstart', this);
                    document.body.removeEventListener('drop', this);
                }
                return;
        }
    }


    createPlayground() {
        let playground = document.createElement('div');
        playground.classList.add('playground');
        playground.setAttribute('draggable', 'true');
        document.getElementById('playground').append(playground);
        document.getElementById('playground').style.opacity = 1;
        playground.addEventListener('dragstart', this);
        return playground;
    }

}