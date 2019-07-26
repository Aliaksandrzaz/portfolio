export class View {

    constructor(controller, model) {

        this.controller = controller;
        this.model = model;
        this.square = document.getElementById('square');
        this.costValue = document.getElementById('cost__value');
        this.squareValue = document.getElementById('squareValue');
        this.squareRange = document.getElementById('squareRange');
        this.squareMinus = document.getElementById('squareMinus');
        this.squarePlus = document.getElementById('squarePlus');
        this.calculator = document.getElementById('calculator');

        this.makeOrder = document.getElementById('makeOrder');

        this.cosmetic = document.getElementById('cosmetic');
        this.capital = document.getElementById('capital');
        this.eurorepair = document.getElementById('eurorepair');

        this.newBuild = document.getElementById('newBuild');
        this.secondary = document.getElementById('secondary');

        this.calculator.addEventListener('click', this);
        this.squareRange.addEventListener('input', this);
        this.squareValue.addEventListener('input', this);

        this.costValue.textContent = this.model.value.costValue();

        this.phoneMask = IMask(
            document.getElementById('phoneNumber'), {
                mask: '+{7}(000)000-00-00'
            });
    }

    handleEvent() {
        let element = event.target;

        switch (element) {
            case this.squareMinus:
                this.controller.squareSubtraction(element);
                this.getValue();
                return;
            case this.squarePlus:
                this.controller.squareIncrease(element);
                this.getValue();
                return;
            case this.cosmetic:
                this.controller.changeCoefficient(element);
                this.costValue.textContent = this.model.value.costValue();
                return;
            case this.capital:
                this.controller.changeCoefficient(element);
                this.costValue.textContent = this.model.value.costValue();
                return;
            case this.eurorepair:
                this.controller.changeCoefficient(element);
                this.costValue.textContent = this.model.value.costValue();
                return;
            case this.newBuild:
                this.controller.changeCoefficient(element);
                this.costValue.textContent = this.model.value.costValue();
                return;
            case this.secondary:
                this.controller.changeCoefficient(element);
                this.costValue.textContent = this.model.value.costValue();
                return;
            case this.makeOrder:
                document.getElementById('modalSend').classList.toggle('closeForm');
                return this.controller.showForm();
        }

        switch (event.type) {
            case 'input':
                this.controller.squareRangeChange(element);
                this.controller.squareValueChange(element);
                this.getValue();
                return;
            case 'changeValue':
                this.squareValue.value = event.detail.square;
                this.squareRange.value = event.detail.square;
                this.costValue.textContent = event.detail.costValue();
                return;
        }

    }


    getValue(){
        this.squareValue.value = this.model.value.square;
        this.squareRange.value = this.model.value.square;
        this.costValue.textContent = this.model.value.costValue();
    }

}