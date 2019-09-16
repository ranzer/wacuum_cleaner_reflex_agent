import { OrientationEnum, TurnEnum } from "./enums.js";

class Actuator {
	constructor() {
		this.changePositionActions = {};
		this.changePositionActions[OrientationEnum.LEFT] = (turn, newPos) => {
			this.goForwardOrBackward(turn, newPos,
				(newPos) => { newPos.row++; },
				(newPos) => { newPos.row--; }
			);
		};
		this.changePositionActions[OrientationEnum.RIGHT] = (turn, newPos) => {
			this.goForwardOrBackward(turn, newPos,
				(newPos) => { newPos.row--; },
				(newPos) => { newPos.row++; }
			);
		};
		this.changePositionActions[OrientationEnum.UP] = (turn, newPos) => {
			this.goForwardOrBackward(turn, newPos,
				(newPos) => { newPos.col++; },
				(newPos) => { newPos.col--; }
			);
		};
		this.changePositionActions[OrientationEnum.DOWN] = (turn, newPos) => {
			this.goForwardOrBackward(turn, newPos,
				(newPos) => { newPos.col--; },
				(newPos) => { newPos.col++; }
			);
		}
	}
	goForwardOrBackward(turn, newPos, forwardAction, backwardAction) {
		if (turn == TurnEnum.LEFT) { backwardAction(newPos); }
		else if (turn == TurnEnum.RIGHT) { forwardAction(newPos); }
	}
	moveTo(pos) { return pos; }
	clonePos(pos) {
		return { row: pos.row, col: pos.col };
	}
	getNewPos(currentPos, currentOrientation, turn) {
		if (turn != TurnEnum.LEFT && turn != TurnEnum.RIGHT) {
			return currentPos;
		}
		let newPos = this.clonePos();
		switch (currentOrientation) {
			case OrientationEnum.LEFT: {
				if (turn == TurnEnum.LEFT) { newPos.row--; }
				else { newPos.row++; }
				break;
			}
			case OrientationEnum.RIGHT: {
				if (turn == TurnEnum.LEFT) { newPos.row++; }
				else { newPos.row--; }
				break;
			}
			case OrientationEnum.UP: {
				if (turn == TurnEnum.LEFT) {
					newPos.col--;
				}
				else { newPos.col++; }
				break;
			}
			case OrientationEnum.DOWN: {
				if (turn == TurnEnum.LEFT) { newPos.col++; }
				else { newPos.col--; }
				break;
			}
		}
		//console.log("getNewPos for turn " + turn + " and orientation " + currentOrientation);
		//console.dir(newPos);
		return newPos;
	}
	suck(cb) {
		console.log("Suck dirt");
		if (cb) { cb(); }
	}
}

export { Actuator };
