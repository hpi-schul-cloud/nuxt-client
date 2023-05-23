import { useFilePicker } from "./FilePicker.composable";

const { isFilePickerOpen, triggerFilePicker } = useFilePicker();

describe("Filepicker composable", () => {
	describe("triggerFilePicker", () => {
		it("should invert isFilePickerOpen state", () => {
			expect(isFilePickerOpen.value).toBe(false);

			triggerFilePicker();
			expect(isFilePickerOpen.value).toBe(true);

			triggerFilePicker();
			expect(isFilePickerOpen.value).toBe(false);
		});
	});
});
