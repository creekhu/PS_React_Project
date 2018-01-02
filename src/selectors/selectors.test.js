import expect from 'expect';
import { authorsFormattedForDropdown } from './selectors';

describe('Author Selectors', () => {
	describe('authorsFormattedForDropdown', () => {
		it('Should return author data formatted', () => {
			const authors = [
				{
					id: 'Tianqi-Hu',
					firstName: 'Tianqi',
					lastName: 'Hu'
				}
			];

			const expected = [
				{
					value: 'Tianqi-Hu',
					text: 'Tianqi Hu'
				}
			];

			expect(authorsFormattedForDropdown(authors)).toEqual(expected);
		});
	});
});