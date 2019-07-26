let IMAGE = [
    'blue',
    'green',
    'red',
    'grey',
    'yellow',
    'purple',
    'orange',
    'pink',
    'blue',
    'green',
    'red',
    'grey',
    'yellow',
    'purple',
    'orange',
    'pink'
];

function insertImage() { // заполнение цветом
    let btnTarget = event.target,
        inputEl = document.getElementById('inpt').value || 5;

    IMAGE.sort(function () {//Ранодомная сортировка
        return Math.random() - 0.5;
    });

    [...imageClassBefore].forEach((el, index) => {
        el.style.backgroundColor = IMAGE[index];
    });

    return new Promise((resolve) => {
        setTimeout(() => { // убираем цвет
            [...imageClassBefore].forEach((el) => {
                el.style.opacity = '0.0';
            });
            resolve(main.addEventListener('click', guess));
        }, 1000 * inputEl)
    });
}

async function guess() {
    let imageAfter = event.target.closest('.image');
    if (imageAfter) {
        let count = guessObj.guessImg.length;
        guessObj.guessImg.push(imageAfter);
        guessObj.guessEl.push(imageAfter.style.backgroundColor);
        imageAfter.style.opacity = '1';

        if (count === 1) {//Цвет совпал
            if (guessObj.guessEl[count] === guessObj.guessEl[count - 1] && guessObj.guessImg[count] !== guessObj.guessImg[count - 1]) {
                guessObj.guessImg[0].style.opacity = '1';
                guessObj.guessImg[1].style.opacity = '1';
            }

            else {//Цвет не совпал, ждет 0,5с
                console.log(guessObj.guessImg);
                await new Promise((resolve) => {
                    setTimeout(() => {
                        guessObj.guessImg[count].style.opacity = '0.0';
                        guessObj.guessImg[count - 1].style.opacity = '0.0';
                        resolve(guessObj.guessImg);
                    }, 500);

                });
            }

            for (let value of Object.values(guessObj)) {
                value.splice(0, 2);
            }
        }
    }
}

let imageClassBefore = document.getElementsByClassName('image');
let main = document.getElementById('main');
let btn = document.getElementById('btn');

let guessObj = {
    guessEl: [],
    guessImg: [],
};

btn.addEventListener('click', insertImage);

