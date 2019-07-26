import {allBuild} from "../BD/all.js";
import {myGameField} from "../myGameField.js";

export class Building {//общий класс

    constructor(life, cost, side) {
        this.hp = life;
        this.cost = cost;
        this.side = side
        this.element;
        this.build;
        this.id = Math.ceil(Math.random() * 10 ** 10);
        this.bank = document.getElementById('credits');
        this.wrapper = document.getElementById('wrapper');
    }

    handleEvent(event) {

        switch (event.type) {
            case 'dragstart':
                this.element = event.target;
                this.wrapper.addEventListener('drop', this);
                return;
            case 'dragover':
                event.preventDefault();
                return;
            case 'drop':
                if (event.target.classList.contains('playground')) {
                    event.target.append(this.element);
                    this.element.removeAttribute('draggable');
                    this.removeListener();
                    document.getElementById(this.element.className).style.opacity = 0.5;
                    allBuild.get(this.id).grid = this.build.closest('.gridClass').id;
                }
                return;
        }
    }

    createBuild(buildName) {
        if (this.cost <= this.bank.textContent) {
            document.getElementById(buildName).classList.remove('disabled');
            let build = document.createElement('div');
            build.classList.add(`${buildName}`);
            build.setAttribute('draggable', 'true');
            build.setAttribute('side', this.side);
            build.id = this.id;
            document.getElementById(`${buildName}`).append(build);
            document.getElementById(`${buildName}`).style.opacity = 1;
            this.createHP(build);
            this.bank.textContent = this.bank.textContent - this.cost;
            build.addEventListener('dragstart', this);
            this.build = build;

            allBuild.set(this.id, {
                id: this.id,
                class: buildName,
                hp: this.hp,
                side: this.side,
                grid: ''
            });

            return build;
        }
        else {
            console.log('No money');
        }
    }

    removeListener() {
        this.build.removeEventListener('dragstart', this);
        this.build.removeEventListener('dragover', this);
        this.wrapper.removeEventListener('drop', this);
    }


    createHP(buildNameHP) {
        // let hpValue = document.createElement('div');
        // hpValue.classList.add('hpBuild');
        // hpValue.textContent = this.hp;
        // buildNameHP.append(hpValue);

        buildNameHP.textContent = this.hp;
    }
}