import { SukanoClass } from '../sudokus/sukano-class';
test('Sukano Constructor', () => {
	var sudoku = new SukanoClass(
		[
			'2*|8|14|6*|15',
			'9|4*|9|6*|17',
			'22|19|4*',
			'17|11|17',
			'16|18|11',
			'28|7*|10',
			'8*|16|18|3',
			'27|18',
			'7|5*|22|11',
		],
		['45', '29|6|10', '7|24|9|5*', '9|28|8', '36|9*', '43|2*', '45', '13|3*|13|16', '26|19'],
	);

	expect(sudoku.rowCount).toBe(9);
	expect(sudoku.rowPerBox).toBe(3);
	expect(sudoku.columnCount).toBe(9);
	expect(sudoku.columnPerBox).toBe(3);

	expect(sudoku.rules.length).toBe(5);

	expect(sudoku.get(1, 1).column).toBe(1);
	expect(sudoku.get(1, 1).row).toBe(1);
	expect(sudoku.get(1, 8).column).toBe(8);
	expect(sudoku.get(1, 8).row).toBe(1);
	expect(sudoku.get(2, 8).column).toBe(8);
	expect(sudoku.get(2, 8).row).toBe(2);
	expect(sudoku.get(9, 9).column).toBe(9);
	expect(sudoku.get(9, 9).row).toBe(9);

	expect(sudoku.solve()).toBe(true);
	expect(sudoku.print()).toBe(
		'2|1|7|4|5|9|8|3|6\n\
5|8|6|7|3|2|4|9|1\n\
3|4|9|6|8|1|7|2|5\n\
4|2|3|9|6|8|5|1|7\n\
1|7|5|2|4|3|6|8|9\n\
9|6|8|1|7|5|3|4|2\n\
6|3|2|8|1|7|9|5|4\n\
7|5|1|3|9|4|2|6|8\n\
8|9|4|5|2|6|1|7|3',
	);
	sudoku.getActionsSummary();
});

test('Sukano Constructor', () => {
	var sudoku = new SukanoClass(
		['15|12|18', '35|3*|7*', '27|11|7', '19|26', '2*|43', '4*|41', '39|6*', '16|18|11', '9|36'],
		['26|19', '36|5|4*', '4*|32|9*', '35|10', '15|15|15', '2*|9*|8|26', '10|15|6|14', '4|8|4*|29', '32|12|1*'],
	);
	sudoku.solve();
	console.log(sudoku.print());
	sudoku.getActionsSummary();
});
