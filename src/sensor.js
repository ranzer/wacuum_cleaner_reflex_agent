import { TurnEnum } from "./enums.js";

class Sensor {
	constructor(environment, actuator) {
		this.environment = environment;
		this.actuator = actuator;
	}
	tileHasDirt(pos) {
		let tile = this.environment.getTileAt(pos);
		return tile.hasDirt;
	}
	canMoveLeft(pos, orientation) {
		let expectedPos = this.actuator.getNewPos(pos, orientation, TurnEnum.LEFT);
		return this.environment.isTileAvailable(expectedPos);
	}
	canMoveRight(pos, orientation) {
		let expectedPos = this.actuator.getNewPos(pos, orientation, TurnEnum.RIGHT);
		return this.environment.isTileAvailable(expectedPos);
	}
}

export { Sensor };
