import { UprightSixBySixSudokuClass } from '../sudokus/upright-six-by-six-sudoku-class';
test('Sukano Constructor', () => {
	var sudoku = new UprightSixBySixSudokuClass();

	expect(sudoku.rowCount).toBe(6);
	expect(sudoku.rowPerBox).toBe(3);
	expect(sudoku.columnCount).toBe(6);
	expect(sudoku.columnPerBox).toBe(2);

	expect(sudoku.rules.length).toBe(3);

	sudoku.set(1, 2, 3);
	sudoku.set(2, 4, 3);
	sudoku.set(2, 5, 6);
	sudoku.set(3, 1, 5);
	sudoku.set(3, 3, 1);
	sudoku.set(3, 4, 4);
	sudoku.set(3, 6, 2);
	sudoku.set(4, 1, 3);
	sudoku.set(4, 1, 3);
	sudoku.set(4, 4, 6);
	sudoku.set(4, 6, 1);
	sudoku.set(5, 2, 1);
	sudoku.set(5, 3, 5);
	sudoku.set(6, 5, 2);

	expect(sudoku.solve()).toBe(true);

	expect(sudoku.get(3, 5).value).toBe(3);
	expect(sudoku.get(3, 2).value).toBe(6);
	expect(sudoku.get(4, 2).value).toBe(2);
	expect(sudoku.get(4, 5).value).toBe(5);

	sudoku.getActionsSummary();
});
