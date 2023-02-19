import BaseInput from "./BaseInput";
import BaseInputHidden from "./BaseInputHidden";
import { supportedTypes } from "./BaseInputHidden";

describe("@/components/base/BaseInputHidden", () => {
	it("input is not visible", () => {
		const mockText = "test input";
		supportedTypes.forEach(() => {
			const wrapper = mount(BaseInput, {
				propsData: {
					type: "hidden",
					vmodel: mockText,
				},
			});
			expect(wrapper.findComponent(BaseInputHidden)).toBeTruthy();
		});
	});
});
