import { Actuator } from "./src/actuator.js";
import { Environment } from "./src/environment.js";
import { Sensor } from "./src/sensor.js";
import { Simulator } from "./src/simulator.js";

function main(grid) {
	let environment = new Environment(grid);
	let actuator = new Actuator();
	let sensor = new Sensor(environment, actuator);
	let simulator = new Simulator(environment, sensor, actuator);

	simulator.start();
}

let grid = [];
grid[0] = [
	{ hasDirt: false, isOccupied: false },
	{ hasDirt: false, isOccupied: false },
	{ hasDirt: true, isOccupied: false }
];
grid[1] = [
	{ hasDirt: true, isOccupied: false },
	{ hasDirt: false, isOccupied: false },
	{ hasDirt: false, isOccupied: false }
];
grid[2] = [
	{ hasDirt: false, isOccupied: false },
	{ hasDirt: true, isOccupied: false },
	{ hasDirt: false, isOccupied: false }
];
main(grid);
