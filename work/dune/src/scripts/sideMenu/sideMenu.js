export class SideMenu {



    constructor() {
        this.nameBuildSideMenu = [
            "playground",
            "barrack",
            "windStation",
            "processingPlant",
            "easyFactory",
            "gunshotTurret",
        ];

        this.nameSolderSideMenu = [
            "infantry",
            "troopers",
        ];

        this.nameMachineSideMenu = [
            "traik",
            "bmp"
        ];

        this.buttonSideMenu = document.getElementById('buttonSideMenu');
        this.buildSideMenu = document.getElementById('buildSideMenu');
        this.solderSideMenu = document.getElementById('solderSideMenu');
        this.machineSideMenu = document.getElementById('machineSideMenu');
        this.createBuildSideMenu();
        this.createSolderSideMenu();
        this.createMachineSideMenu();
        this.buttonSideMenu.addEventListener('click', this);
    }

    handleEvent() {
        let nameButton = event.target;
        switch (nameButton.id) {
            case 'buttonBuildSideMenu':
                this.solderSideMenu.style.display = 'none';
                this.machineSideMenu.style.display = 'none';
                return this.buildSideMenu.style.display = 'grid';

            case 'buttonSolderSideMenu':
                this.buildSideMenu.style.display = 'none';
                this.machineSideMenu.style.display = 'none';
                return;

            case 'buttonMachineSideMenu':
                this.buildSideMenu.style.display = 'none';
                this.solderSideMenu.style.display = 'none';
                return
        }
    }

    createBuildSideMenu() {
        this.buildSideMenu.append(
            this.nameBuildSideMenu.reduce((fragment, item) => {
                let sideMenu = document.createElement('div');
                sideMenu.id = item;
                fragment.append(sideMenu);
                return fragment;
            }, document.createDocumentFragment())
        );
    }

    createSolderSideMenu() {
        this.solderSideMenu.append(
            this.nameSolderSideMenu.reduce((fragment, item) => {
                let sideMenu = document.createElement('div');
                sideMenu.id = item;
                fragment.append(sideMenu);
                return fragment;
            }, document.createDocumentFragment())
        );
    }

    createMachineSideMenu() {
        this.machineSideMenu.append(
            this.nameMachineSideMenu.reduce((fragment, item) => {
                let sideMenu = document.createElement('div');
                sideMenu.id = item;
                fragment.append(sideMenu);
                return fragment;
            }, document.createDocumentFragment())
        );
    }

}

