import { OrientationEnum, TurnEnum } from "./enums.js";

class Actuator {
	moveTo(pos) { return pos; }
	getNewPos(currentPos, currentOrientation, turn) {
		if (turn != TurnEnum.LEFT && turn != TurnEnum.RIGHT) {
			return currentPos;
		}
		let newPos = { row: currentPos.row, col: currentPos.col };
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
