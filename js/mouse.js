function mouse(e) {
    let x = e.pageX,
        y = e.pageY;
    mouseElement.style.left = `${x - 10}px`;
    mouseElement.style.top = `${y - 15}px`;
    // if (e.target.closest('[data-click]')){
    //     mouseElement.classList.add('mouse__target');
    //     mouseElement.style.left = `${x - 10}px`;
    //     mouseElement.style.top = `${y - 10}px`;
    // }
    // else {
    //     mouseElement.classList.remove('mouse__target');
    // }
    document.body.append(mouseElement);
}

let mouseElement = document.createElement('div');
mouseElement.classList.add('mouse');
document.body.addEventListener('mousemove', mouse);

