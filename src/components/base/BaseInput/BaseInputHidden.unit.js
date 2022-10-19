import BaseInput from "./BaseInput";
import { supportedTypes } from "./BaseInputHidden";
import { render } from "@testing-library/vue";

describe("@/components/base/BaseInputHidden", () => {
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
