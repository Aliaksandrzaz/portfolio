let divFragment = document.createDocumentFragment();

let divMain = document.createElement('div');

divMain.id = 'main';

let count = 0;

for (let i = 0; i < 4; i++) {
    let divWrapper = document.createElement('div');
    divWrapper.classList.add('wrapper');
    for (let i = 0; i < 4; i++) {
        let divBorder = document.createElement('div');
        divBorder.classList.add('border');
        divWrapper.append(divBorder);

        let divImage = document.createElement('div');
        divImage.classList.add('image');
        count++;
        divImage.id = count;
        divBorder.append(divImage);

    }
    divMain.append(divWrapper);
}
divFragment.append(divMain);
document.body.append(divFragment);



