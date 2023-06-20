import { useSelectedFile } from "@/components/feature-board/shared/SelectedFile.composable";
import { jest } from "@jest/globals";

interface Props {
	getSelectedFileMock?: () => File | undefined;
	setSelectedFileMock?: (file?: File) => void;
}

export const setupSelectedFileMock = (props: Props = {}) => {
	const { getSelectedFileMock, setSelectedFileMock } = props;
	const mockedSelectedFile = jest.mocked(useSelectedFile);

	const getSelectedFile = getSelectedFileMock ?? jest.fn();
	const setSelectedFile = setSelectedFileMock ?? jest.fn();

	const mocks = {
		getSelectedFile,
		setSelectedFile,
	};

	mockedSelectedFile.mockReturnValue(mocks);

	return mocks;
};
