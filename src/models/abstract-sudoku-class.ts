import { Cell } from './cell';
import { MeasurableActions } from './measurable-actions';
import { SudokuRow } from './sudoku-row';

export abstract class AbstractSudokuClass extends MeasurableActions {
	public rowCount: number;
	public columnCount: number;
	public abstract rowPerBox: number;
	public abstract columnPerBox: number;
	public rows: SudokuRow[];

	public minValue: number = 1;
	public maxValue: number;

	public abstract rules: ((cell: Cell) => boolean)[];

	constructor(rowCount: number, columnCount: number) {
		super();
		this.rowCount = rowCount;
		this.columnCount = columnCount;
		this.maxValue = Math.sqrt(this.rowCount * this.columnCount);
		this.rows = new Array();
		for (let rowNumber = 1; rowNumber <= this.rowCount; rowNumber++) {
			const thisRow = new SudokuRow(this.columnCount, rowNumber);
			this.rows.push(thisRow);
		}
	}

	get(row: number, column: number): Cell {
		if (0 >= row || row > this.rowCount) {
			throw new RangeError(`Argument row outside of range.`);
		}
		if (0 >= column || column > this.columnCount) {
			throw new RangeError(`Argument column outside of range.`);
		}
		return this.rows[row - 1].cells[column - 1];
	}

	set(row: number, column: number, value: number): void {
		if (this.minValue > value || value > this.maxValue) {
			throw new RangeError(`Argument value outside of range.`);
		}
		const cell = this.get(row, column);
		cell.values = [value];
	}

	clear(row: number, column: number): void {
		const cell = this.get(row, column);
		cell.values = [];
	}

	private overMax: (entry: any) => boolean = (value) => value > this.maxValue;

	private validate(cell: Cell): boolean {
		for (const rule of this.rules) {
			if (!rule(cell)) {
				return false;
			}
		}
		return true;
	}

	public solve(): boolean | undefined {
		const firstRowWithEmptyCell = this.rows
			.sort((a, b) => a.rowNumber - b.rowNumber)
			.find((r) => r.cells.filter((c) => c.value === undefined).length);
		const firstEmptyCell =
			firstRowWithEmptyCell === undefined
				? undefined
				: (firstRowWithEmptyCell.cells.sort((c) => c.column).find((c) => c.value === undefined) as Cell);
		if (firstEmptyCell === undefined) {
			return true;
		}
		let value = this.minValue;
		while (!this.overMax(value)) {
			this.set(firstEmptyCell.row, firstEmptyCell.column, value);
			if (this.validate(firstEmptyCell)) {
				const validSolution = this.solve();
				if (validSolution) {
					return true;
				} else {
					value++;
					if (this.overMax(value)) {
						this.clear(firstEmptyCell.row, firstEmptyCell.column);
						return false;
					}
				}
			} else {
				value++;
				if (this.overMax(value)) {
					this.clear(firstEmptyCell.row, firstEmptyCell.column);
					return false;
				}
			}
		}
	}

	public print(): string {
		return this.rows
			.sort((r1, r2) => r1.rowNumber - r2.rowNumber)
			.map((r) =>
				r.cells
					.sort((c1, c2) => c1.column - c2.column)
					.map((c) => c.values.sort((v1, v2) => v1 - v2).join(' '))
					.join('|'),
			)
			.join('\n');
	}
}

interface Execution {
	[key: string]: number[];
}
