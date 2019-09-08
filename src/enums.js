class TurnEnum {
	static get LEFT() { return -1; }
	static get RIGHT() { return 1; }
}

class OrientationEnum {
	static get COUNT() { return 4; }
	static sum(orientation, turn) {
		return Math.abs(OrientationEnum.COUNT + orientation + turn) % OrientationEnum.COUNT;
	}
	static get LEFT() { return 0; }
	static get UP() { return 1; }
	static get RIGHT() { return 2; }
	static get DOWN() { return 3; }
}

export { TurnEnum, OrientationEnum };
