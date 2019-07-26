let allBuild = new Map(),

    allSolder = new Map(),

    allHeaderMenu = new Map(
        [
            ['credits', {count: document.getElementById('credits').textContent}],
            ['energy', {count: document.getElementById('energy').textContent}]
        ]
    );

export {allBuild, allSolder, allHeaderMenu};
