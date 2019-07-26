let costSquare = 12;

let coefficientsApartment = new Map([
    ['newBuild', 2.3],
    ['secondary', 4.4]
]);

let coefficientsRepair = new Map([
    ['cosmetic', 1],
    ['capital', 3],
    ['eurorepair', 5]
]);


export class Model {

    constructor() {

        this.value = {
            coeffRepair: coefficientsRepair.get('cosmetic'),
            coeffApartment: coefficientsApartment.get('newBuild'),
            square: 10,
            costValue: function () {
                return Math.ceil(this.square * costSquare * this.coeffRepair * this.coeffApartment)
            }
        };
        this.costValue = Math.ceil(this.value.square * costSquare * this.value.coeffRepair * this.value.coeffApartment);
        // this.emitChange();
    }

    emitChange() {
        // this.dispatchEvent(new CustomEvent('changeValue', {detail: this.value}));
    }

    increase(element) {
        this.value.square = this.value.square + 1;
        this.emitChange();
        return this.value.square;
    }

    subtraction(element) {
        this.value.square = this.value.square - 1 < 1 ? 1 : this.value.square - 1;
        this.emitChange();
        return this.value.square;
    }

    rangeChange(element) {
        this.value.square = element.value;
        this.emitChange();
        return this.value.square;
    }

    valueChange(element) {
        let value = Number(element.value);
        let check = /^[1-9][0-9]*$/gm;
        let req = new RegExp(check);
        if (req.test(value) === false) {
            value = 1;
        }
        this.value.square = Math.ceil(value);
        this.emitChange();
        return this.value.square;
    }

    changeCoefficient(element) {

        coefficientsApartment.forEach((value, coeff) => {
            if (coeff === element.id) {
                return this.value.coeffApartment = coefficientsApartment.get(element.id);
            }
        });

        coefficientsRepair.forEach((value, coeff) => {
            if (coeff === element.id) {
                return this.value.coeffRepair = coefficientsRepair.get(element.id);
            }
        });
        this.emitChange();
    }

    sum() {
        this.value.costValue = this.value.square * costSquare * this.value.coeffRepair * this.value.coeffApartment;
    }
}