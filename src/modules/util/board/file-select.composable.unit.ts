import { useSharedFileSelect } from "./file-select.composable";

describe("SharedFileSelectComposable", () => {
	describe("triggerFileSelect", () => {
		it("should be true as default", () => {
			const { triggerFileSelect } = useSharedFileSelect();
			expect(triggerFileSelect.value).toBe(true);
		});
	});

	describe("resetTriggerFileSelect", () => {
		it("should set 'triggerFileSelect' to be true again", () => {
			const { triggerFileSelect, resetTriggerFileSelect } = useSharedFileSelect();
			triggerFileSelect.value = false;
			resetTriggerFileSelect();
			expect(triggerFileSelect.value).toBe(true);
		});
	});
});
