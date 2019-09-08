import { OrientationEnum, TurnEnum } from "./enums.js";

class Agent {
	constructor(environment, startPos, sensor, actuator, orientation) {
		this.environment = environment;
		this.sensor = sensor;
		this.actuator = actuator;
		this.isStarted = false;
		this.orientation = orientation;
		this.pos = startPos;
		this.calculateNewOrientation = (turn) => {
			//console.log("Calculating new orientation for turn " + turn);
			this.orientation = OrientationEnum.sum(this.orientation, turn);
			console.log(`New orientation ${this.orientation}`);
		}
	}
	act() {
		if (this.sensor.tileHasDirt(this.pos)) {
			this.actuator.suck(() => {
				this.environment.setTileDirtiness(this.pos, false);
			});
		}
		else {
			let canMoveLeft = this.sensor.canMoveLeft(this.pos, this.orientation);
			let canMoveRight = this.sensor.canMoveRight(this.pos, this.orientation);
			//console.log(`canMoveLeft: ${canMoveLeft}, canMoveRight: ${canMoveRight}`);
			if (!canMoveLeft && !canMoveRight) { return; }
			let turn = TurnEnum.LEFT;
			if (canMoveLeft && canMoveRight) {
				let moveRight = Math.round(Math.random());
				if (moveRight) { turn = TurnEnum.RIGHT };
			} else if (canMoveRight) {
				turn = TurnEnum.RIGHT;
			}
			console.log(`Current orientation ${this.orientation}, turn ${turn}`);
			let newPos = this.actuator.getNewPos(this.pos, this.orientation, turn);
			this.pos = this.actuator.moveTo(newPos);
			this.calculateNewOrientation(turn);
			console.log("new pos: ");
			console.dir(newPos);
		}
	}
	start() {
		if (!this.isStarted) {
			this.isStarted = true;
			let f = () => {
				this.act();
				if (this.isStarted) { setTimeout(() => { f(); }, 2000); }
			}
			f();
		}
	}
	stop() {
		this.isStarted = false;
	}
}

export { Agent };
