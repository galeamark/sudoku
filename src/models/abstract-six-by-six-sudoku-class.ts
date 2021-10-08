import { AbstractSudokuClass } from './abstract-sudoku-class';
import { Cell } from './cell';
import { MeasurableActions } from './measurable-actions';

export abstract class AbstractSixBySixSudokuClass extends AbstractSudokuClass {
	rowPerBox: number;
	columnPerBox: number;
	rules: ((cell: Cell) => boolean)[];

	private _cells: Cell[];

	constructor(rowPerBox: number, columnPerBox: number) {
		super(6, 6);
		this.rowPerBox = rowPerBox;
		this.columnPerBox = columnPerBox;

		this._cells = this.rows.flatMap((r) => r.cells);

		this.rules = [
			(cell) =>
				this._cells.filter((c) => c.row === cell.row && c.column !== cell.column && c.value === cell.value).length ===
				0, // row uniqueness
			(cell) =>
				this._cells.filter((c) => c.column === cell.column && c.row !== cell.row && c.value === cell.value).length ===
				0, // column uniqueness
			(cell) =>
				this._cells.filter(
					(c) =>
						Math.ceil(c.column / (this.maxValue / this.rowPerBox)) ===
							Math.ceil(cell.column / (this.maxValue / this.rowPerBox)) &&
						Math.ceil(c.row / (this.maxValue / this.columnPerBox)) ===
							Math.ceil(cell.row / (this.maxValue / this.columnPerBox)) &&
						c.row !== cell.row &&
						c.column !== cell.column &&
						c.value === cell.value,
				).length === 0,
		];
	}
}
