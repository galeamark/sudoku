import { SudokuClass } from './sudoku-class';
import '@sithikus/numbers';

export class SukanoClass extends SudokuClass {
	private _columnRestrictions: string[][];
	private _rowRestrictions: string[][];

	private _translatedColumnRestrictions: string[][][];
	private _translatedRowRestrictions: string[][][];

	constructor(columnRestrictions: string[], rowRestrictions: string[]) {
		super();

		this._columnRestrictions = columnRestrictions.map((column) => column.split('|'));
		this._rowRestrictions = rowRestrictions.map((row) => row.split('|'));
		this._translatedColumnRestrictions = this.translateDefinitions(this._columnRestrictions);
		this._translatedRowRestrictions = this.translateDefinitions(this._rowRestrictions);

		this.rules.push((cell) =>
			this.measureAction('column rules', () => {
				const columnRestriction: string[] = this._translatedColumnRestrictions[cell.column - 1][cell.row - 1];
				const filledColumn = this._cells
					.filter((c) => c.column === cell.column && c.row <= cell.row)
					.map((c) => c.value)
					.join('');
				for (const columnRestrictionItem of columnRestriction) {
					if (columnRestrictionItem === filledColumn) {
						return true;
					}
				}
				return false;
			}),
		);
		this.rules.push((cell) =>
			this.measureAction('row rules', () => {
				const rowRestriction: string[] = this._translatedRowRestrictions[cell.row - 1][cell.column - 1];
				const filledRow = this._cells
					.filter((c) => c.row === cell.row && c.column <= cell.column)
					.map((c) => c.value)
					.join('');
				for (const rowRestrictionItem of rowRestriction) {
					if (rowRestrictionItem === filledRow) {
						return true;
					}
				}
				return false;
			}),
		);
	}

	public solve(): boolean | undefined {
		return super.solve();
	}

	private translateDefinitions = (array: string[][]): string[][][] => {
		const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		return array
			.map((definitionSet) => {
				const iterationNuumbers = ([] as number[]).concat(numbers);
				const definitionOptions: string[][] = definitionSet.map((definition) => {
					if (definition.indexOf('*') !== -1) {
						const definedNumber = parseInt(definition.replace('*', ''), 10);
						iterationNuumbers.splice(iterationNuumbers.indexOf(definedNumber), 1);
						return ['' + definedNumber];
					} else {
						const numericCr2: number = parseInt(definition, 10);
						const combinations2: number[][] = iterationNuumbers.getUniqueCombinations(numericCr2, 2);
						const combinations3: number[][] = iterationNuumbers.getUniqueCombinations(numericCr2, 3);
						const combinations4: number[][] = iterationNuumbers.getUniqueCombinations(numericCr2, 4);
						const combinations5: number[][] = iterationNuumbers.getUniqueCombinations(numericCr2, 5);
						const combinations6: number[][] = iterationNuumbers.getUniqueCombinations(numericCr2, 6);
						const combinations7: number[][] = iterationNuumbers.getUniqueCombinations(numericCr2, 7);
						const combinations8: number[][] = iterationNuumbers.getUniqueCombinations(numericCr2, 8);
						const combinations9: number[][] = iterationNuumbers.getUniqueCombinations(numericCr2, 9);
						const combinations: number[][] = combinations2.concat(
							combinations3,
							combinations4,
							combinations5,
							combinations6,
							combinations7,
							combinations8,
							combinations9,
						);

						return combinations.map((c) => c.getPermutations().map((c2) => c2.join(''))).flat();
					}
				});

				while (definitionOptions.length > 1) {
					const a: string[] = definitionOptions[definitionOptions.length - 2];
					const b: string[] = definitionOptions[definitionOptions.length - 1];
					definitionOptions.splice(definitionOptions.length - 2, 2);
					definitionOptions.push(
						a.flatMap((i) => {
							const ret: string[] = [];
							const regex = new RegExp('[' + i + ']', 'g');
							b.forEach((j) => {
								if (!j.match(regex)) {
									ret.push(i + j);
								}
							});
							return ret;
						}),
					);
				}
				return definitionOptions[0];
			})
			.map((restriction) =>
				[1, 2, 3, 4, 5, 6, 7, 8, 9].map((length) => [...new Set(restriction.map((r) => r.substring(0, length)))]),
			);
	};
}
