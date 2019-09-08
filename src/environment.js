class Environment {
	constructor(grid) {
		this.grid = grid;
		this.gridRowsCount = this.grid.length;
		this.gridColsCount = this.grid[0].length;
	}
	getTileAt(pos) {
		let tile = this.grid[pos.row][pos.col];

		return tile;
	}
	setTileDirtiness(pos, dirty) {
		let tile = this.getTileAt(pos);

		tile.hasDirt = dirty;
	}
	setTileOcupation(pos, occupied) {
		let tile = this.getTileAt(pos);

		tile.isOccupied = occupied;
	}
	isTileAvailable(pos) {
		//console.log("isTileAvailable: ");
		//console.dir(pos);
		if (pos.row >= this.gridRowsCount ||
			pos.col >= this.gridColsCount ||
			pos.row < 0 || pos.col < 0 ||
			this.getTileAt(pos).isOccupied) {
			return false;
		}
		return true;
	}
}

export { Environment };
