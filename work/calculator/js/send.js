let email = 'example@rambler.ru';

export class SendForm {
    constructor() {
        this.modalSend = document.getElementById('modalSend');
        this.sendBtn = document.getElementById('sendBtn');
        this.costForm = document.getElementById('costForm');
        this.closeFormBtn = document.getElementById('closeFormBtn');
        this.phoneNumber = document.getElementById('phoneNumber');
        this.costValue = document.getElementById('cost__value');

        this.cosmetic = document.getElementById('cosmetic');
        this.capital = document.getElementById('capital');
        this.eurorepair = document.getElementById('eurorepair');
        this.newBuild = document.getElementById('newBuild');
        this.secondary = document.getElementById('secondary');

        this.calculator = document.getElementById('calculator');
        this.costForm.textContent = this.costValue.textContent;
        this.squareValue = document.getElementById('squareValue');

        this.modalSend.addEventListener('click', this);
    }

    handleEvent() {
        let element = event.target;

        switch (element) {
            case this.sendBtn:
                return this.sendForm(event);
            case this.closeFormBtn:
                return this.closeForm();
        }
    }

    closeForm() {
        this.modalSend.classList.add('closeForm');
    }

    formRadioChecked(){
        let radioChecked = [];
        this.calculator.querySelectorAll('input[type=radio]:checked + label').forEach((el)=> {
            radioChecked.push(el.textContent);
        });
        return radioChecked;
    }

    sendForm(e) {
        let url = './php/index.php';
        let formData = new FormData();
        formData.append('value', this.formRadioChecked());
        formData.append('square', this.squareValue.value);
        formData.append('costValue', this.costForm.textContent);
        formData.append('email', email);
        formData.append('phoneNumber', this.phoneNumber.value);

        if (this.phoneNumber.value.length === 16) {
            e.preventDefault();
            fetch(url, {method: 'POST', body: formData})
                .then(function (response) {
                    return response.text();
                })
                .catch(function (err) {
                    //Failure
                    console.log('Error');
                });
            this.closeForm();
        }

    }


}