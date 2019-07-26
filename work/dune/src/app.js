import './styles/main.scss'
import './styles/build.scss'
import './styles/machine.scss'
import './styles/solder.scss'
import './styles/strike.scss'

import {CreateBuild} from './scripts/builds/createBuild';
import {SideMenu} from "./scripts/sideMenu/sideMenu";
import {TodoList} from "./scripts/BD/menu";
import {Enemy} from "./scripts/enemy/enemy";

new TodoList();
new SideMenu();
new CreateBuild();

let enemy = new Enemy();
enemy.createPlayground();
enemy.createBuildEnemy();
enemy.createSolderEnemy();