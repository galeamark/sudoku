import { Cell } from '../models/cell';
import { SudokuCage } from '../models/sudoku-cage';
import { SudokuClass } from './sudoku-class';

export class KillerSudokuClass extends SudokuClass {
	protected _cells: Cell[];
	protected _cages: SudokuCage[];

	constructor(cages: SudokuCage[]) {
		super();
		this._cages = cages;

		this._cells = this.rows.flatMap((r) => r.cells);

		this.rules.push((c) => {
			const containingCage = this._cages.find(
				(cage) => cage.cells.filter((cell) => c.column === cell.column && c.row === cell.row).length,
			);

			if (containingCage === undefined) {
				return false;
			}
			const cells = this._cells.filter(
				(cell) => containingCage.cells.filter((cageCell) => cageCell.column === cell.column && cageCell.row === cell.row).length !== 0,
			);
			const committedValue = cells
				.filter((cell) => cell.value !== undefined)
				.reduce((prev, cell) => prev + (cell.value || 0), 0);

			if (cells.filter((cell) => cell.value !== undefined).length === cells.length) {
				// if filled in
				return containingCage.size === committedValue; // cage size not equal sum of cells
			}
			if (containingCage.size <= committedValue) {
				return false;
			}
			if (!containingCage.possibleValues.filter((val) => val === c.value).length) {
				return false;
			}
			return true;
		});
	}
}
