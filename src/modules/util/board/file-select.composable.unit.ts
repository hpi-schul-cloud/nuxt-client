import { useSharedFileSelect } from "./file-select.composable";

describe("SharedFileSelectComposable", () => {
	describe("isFileSelectOnMountEnabled", () => {
		it("should be true as default", () => {
			const { isFileSelectOnMountEnabled } = useSharedFileSelect();
			expect(isFileSelectOnMountEnabled.value).toBe(true);
		});
	});

	describe("resetTriggerFileSelect", () => {
		it("should set 'isFileSelectOnMountEnabled' to be true again", () => {
			const { isFileSelectOnMountEnabled, resetFileSelectOnMountEnabled } = useSharedFileSelect();
			isFileSelectOnMountEnabled.value = false;
			resetFileSelectOnMountEnabled();
			expect(isFileSelectOnMountEnabled.value).toBe(true);
		});
	});

	describe("disableFileSelectOnMount", () => {
		it("should set 'isFileSelectOnMountEnabled' to false", () => {
			const { isFileSelectOnMountEnabled, disableFileSelectOnMount } = useSharedFileSelect();
			isFileSelectOnMountEnabled.value = true;
			disableFileSelectOnMount();
			expect(isFileSelectOnMountEnabled.value).toBe(false);
		});
	});
});
