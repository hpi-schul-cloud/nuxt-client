import { generator } from "./feathersQueryGenerator";

describe("@components/organisms/DataFilter/feathersQueryGenerator", () => {
	it.each([
		["=", false, "equal"],
		["=", true, "unequal"],
		["<", false, 5],
		["<", true, 5],
		["<=", false, "def"],
		["<=", true, "abc"],
		["includes", false, [1, 2, 3]],
		["includes", true, [1, 2, 3]],
	])(
		"can generate query for %p with applyNegated %p with value %p",
		(operator, applyNegated, value) => {
			const filter = [
				{
					attribute: "randomKey",
					value,
					operator,
					applyNegated,
				},
			];
			expect(generator(filter)).toMatchSnapshot();
		}
	);
});
