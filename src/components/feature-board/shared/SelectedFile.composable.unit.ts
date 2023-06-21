import { useSelectedFile } from "./SelectedFile.composable";

describe("SelectedFile.composable", () => {
	it("should set selectedFile and get file", () => {
		const { setSelectedFile, getSelectedFile } = useSelectedFile();
		const file = new File([""], "filename");

		setSelectedFile(file);

		expect(getSelectedFile()).toBe(file);
	});

	it("should set selectedFile to undefined", () => {
		const { setSelectedFile, getSelectedFile } = useSelectedFile();

		setSelectedFile();

		expect(getSelectedFile()).toBe(undefined);
	});
});
