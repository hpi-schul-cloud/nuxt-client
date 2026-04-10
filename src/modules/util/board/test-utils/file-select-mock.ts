import { useSharedFileSelect } from "../file-select.composable";
import { Mock } from "vitest";
import { ref } from "vue";

interface Props {
	resetFileSelectOnMountEnabledMock?: Mock;
	disableFileSelectOnMountMock?: Mock;
}

export const setupFileSelectMock = (props: Props = {}) => {
	const { resetFileSelectOnMountEnabledMock, disableFileSelectOnMountMock } = props;
	const mockedSharedFileSelect = vi.mocked(useSharedFileSelect);

	const isFileSelectOnMountEnabled = ref(true);
	const resetFileSelectOnMountEnabled = resetFileSelectOnMountEnabledMock ?? vi.fn();
	const disableFileSelectOnMount = disableFileSelectOnMountMock ?? vi.fn();

	const mocks = {
		isFileSelectOnMountEnabled,
		resetFileSelectOnMountEnabled,
		disableFileSelectOnMount,
	};

	mockedSharedFileSelect.mockReturnValue(mocks);

	return mocks;
};
