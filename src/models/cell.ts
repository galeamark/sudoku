export class Cell {
	row: number;
	column: number;
	values: number[];

	constructor(row: number, column: number) {
		this.row = row;
		this.column = column;
		this.values = [];
	}

	public get value(): number | undefined {
		return this.values.length === 1 ? this.values[0] : undefined;
	}
}
