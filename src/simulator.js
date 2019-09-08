import { Agent } from "./agent.js";
import { OrientationEnum } from "./enums.js";


class Simulator {
	constructor(environment, sensor, actuator) {
		let startPos = { row: 0, col: 0 };
		this.agent = new Agent(environment, startPos, sensor, actuator, OrientationEnum.LEFT);
	}
	start() {
		this.agent.start();
	}
	stop() {
		this.agent.stop();
	}
}

export { Simulator };
