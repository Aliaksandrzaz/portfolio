let myGameField = [],
    rockPosition = [452, 762, 843, 233, 328, 392, 417, 418, 323, 325, 358, 389, 390, 391, 360, 329, 362, 330, 331, 299, 332, 267, 266, 265, 232, 231, 199, 198, 167, 168, 136, 169, 137, 105, 104, 103, 135, 102, 234, 203, 171, 172, 484, 453, 964, 996, 899, 744, 745, 746, 714, 682, 683, 652, 651, 620, 588, 556, 555, 586, 553, 554, 906, 907, 875, 844, 845, 846, 847, 815, 814, 813, 462, 463, 495, 464, 465, 432, 401, 400, 402, 434, 467, 435, 436, 404, 373, 405, 369, 370, 440, 472, 408, 376, 377, 410, 441, 409, 378, 442, 411, 443, 379, 348, 380, 349, 350, 758, 759, 760, 757, 727, 761, 730, 698, 665, 666, 667, 668, 636, 634, 635, 1016, 1017, 984, 983, 950, 982, 919, 951],
    spicePosition = [517, 518, 551, 519, 486, 454, 455, 487, 520, 488, 456, 425, 457, 489, 521, 458, 426, 490, 522, 523, 491, 459, 427, 428, 460, 492, 524, 557, 525, 493, 526, 558, 590, 842, 811, 810, 779, 780, 747, 748, 749, 781, 782, 783, 751, 750, 716, 717, 718, 719, 720, 752, 689, 721, 688, 656, 655, 687, 685, 686, 654, 624, 592, 560, 528, 497, 529, 561, 593, 625, 657, 658, 498, 530, 562, 594, 626, 690, 722, 754, 786, 753, 818, 851, 852, 853, 821, 789, 788, 820, 819, 787, 755, 723, 691, 659, 627, 595, 563, 531, 499, 500, 532, 564, 596, 628, 660, 693, 661, 629, 565, 597, 598, 662, 630, 631, 632, 600, 568, 536, 505, 506, 475, 507, 539, 571, 603, 602, 601, 569, 537, 538, 570, 567, 535, 502, 534, 533, 469, 470, 503, 501, 471, 439, 407, 375, 343, 311, 310, 342, 374, 406, 438, 396, 397, 398, 399, 367, 335, 366, 365, 333, 334, 336, 303, 302, 270, 269, 268, 236, 205, 237, 238, 174, 206, 175, 207, 239, 271, 272, 240, 208, 209, 241, 242, 274, 306, 307, 275, 276, 308, 309, 341, 340, 339],
    main = document.getElementById('wrapper');

rockPosition.sort((a, b) => {
    return a - b;
});

let count = 0;

for (let i = 0; i < 32; i++) {

    let id = 0,
        building = false,
        rock = false,
        y = i,
        x = 0,
        F = 0,
        Gl = 0,
        spice = 0,
        parent = 0;

    myGameField[i] = [];

    for (let j = 0; j < 32; j++) {

        count++;
        id = document.createElement('div');
        id.classList.add('gridClass');
        id.id = count;
        x = j;

        myGameField[i][j] = {id, building, spice, rock, x, y, F, Gl, parent};
        myGameField[i][j].id.setAttribute('x', x);
        myGameField[i][j].id.setAttribute('y', y);
        main.append(myGameField[i][j].id);
    }
}


for (let k = 0; k < 32; k++) {
    for (let i = 0; i < 32; i++) {
        for (let j = 0; j < rockPosition.length; j++) {
            if (rockPosition[j] === +myGameField[k][i].id.id) {
                myGameField[k][i].rock = true;
                // myGameField[k][i].id.style.backgroundColor = 'red';
                // myGameField[k][i].id.style.opacity = 0.5;
            }
        }
        for (let j = 0; j < spicePosition.length; j++) {
            if (spicePosition[j] === +myGameField[k][i].id.id) {
                myGameField[k][i].spice = 100;
                // myGameField[k][i].id.style.backgroundColor = 'green';
                // myGameField[k][i].id.style.opacity = 0.5;
            }
        }

    }
}

export {myGameField};


