import { jest } from "@jest/globals";
import { useSelectedFile } from "@/components/feature-board/shared/SelectedFile.composable";

export const setupSelectedFileMock = () => {
	const mockedSelectedFile = jest.mocked(useSelectedFile);

	const getSelectedFile: () => File | undefined = jest.fn();
	const setSelectedFile = jest.fn();

	const mocks = {
		getSelectedFile,
		setSelectedFile,
	};

	mockedSelectedFile.mockReturnValue(mocks);

	return mocks;
};
