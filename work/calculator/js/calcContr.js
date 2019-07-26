import {SendForm} from "./send.js";

export class Controller {

    constructor(model) {
        this.model = model;
    }

    squareIncrease(element){
       return this.model.increase(element);
    }

    squareSubtraction(element){
        return this.model.subtraction(element);
    }

    squareRangeChange(element){
        return this.model.rangeChange(element);

    }

    squareValueChange(element) {
        return this.model.valueChange(element);
    }

    changeCoefficient(element){
        return this.model.changeCoefficient(element);
    }

    showForm(){
        return new SendForm();
    }
}