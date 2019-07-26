import {Model} from "./calcModel.js";
import  {Controller} from "./calcContr.js";
import {View} from "./calcView.js";

let model = new Model();
let controller = new Controller(model);
let view = new View(controller, model);




