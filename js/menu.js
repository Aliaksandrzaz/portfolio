function menuDo() {
    hamburger.classList.toggle('hamburger__close');
    hamburger.classList.toggle('hamburger__open');
    menuItem.classList.toggle('menu__item-open');
    main.style.opacity = getComputedStyle(main).opacity === '1' ? '0' : '1';
}

let hamburger = document.querySelector('.hamburger'),
    hamburgerContainer = document.querySelector('.hamburger-container'),
    menuItem = document.querySelector('.menu__item'),
    main = document.querySelector('.main');

hamburgerContainer.addEventListener('click', menuDo);

