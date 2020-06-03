import BaseInput from "./BaseInput";
import { supportedTypes } from "./BaseInputHidden";
import { render } from "@testing-library/vue";
import { toBeVisible } from "@testing-library/jest-dom/matchers";

expect.extend({ toBeVisible });

describe("@components/base/BaseInputHidden", () => {
	it("input is not visible", () => {
		const mockText = "test input";
		supportedTypes.forEach(() => {
			const { getByDisplayValue } = render(BaseInput, {
				propsData: {
					type: "hidden",
					vmodel: mockText,
				},
			});
			expect(getByDisplayValue(mockText)).not.toBeVisible();
		});
	});
});
