import { AbstractSudokuClass } from '../models/abstract-sudoku-class';
import { Cell } from '../models/cell';

export class SudokuClass extends AbstractSudokuClass {
	rowPerBox: number;
	columnPerBox: number;
	columnSeparations: number;
	rowSeparations: number;
	rules: ((cell: Cell) => boolean)[];

	protected _cells: Cell[];

	constructor() {
		super(9, 9);
		this.rowPerBox = 3;
		this.columnPerBox = 3;
		this.columnSeparations = this.maxValue / this.columnPerBox;
		this.rowSeparations = this.maxValue / this.rowPerBox;

		this._cells = this.rows.flatMap((r) => r.cells);

		this.rules = [
			(cell) =>
				this.measureAction(
					'row uniqueness',
					() =>
						this._cells.filter((c) => c.row === cell.row && c.column !== cell.column && c.value === cell.value)
							.length === 0,
				), // row uniqueness
			(cell) =>
				this.measureAction(
					'column uniqueness',
					() =>
						this._cells.filter((c) => c.column === cell.column && c.row !== cell.row && c.value === cell.value)
							.length === 0,
				), // column uniqueness
			(cell) =>
				this.measureAction(
					'box uniqueness',
					() =>
						this._cells.filter(
							(c) =>
								c.row !== cell.row &&
								c.column !== cell.column &&
								c.value === cell.value &&
								Math.ceil(c.column / this.columnSeparations) === Math.ceil(cell.column / this.columnSeparations) &&
								Math.ceil(c.row / this.rowSeparations) === Math.ceil(cell.row / this.rowSeparations),
						).length === 0,
				), // box uniqueness
		];
	}
}
