import { useElementTypeSelection } from "@/components/feature-board/shared/ElementTypeSelection.composable";
import { jest } from "@jest/globals";
import { Ref, ref } from "vue";

interface Props {
	askTypeMock?: jest.Mock;
}

export const setupElementTypeSelectionMock = (props: Props = {}) => {
	const mockedElementTypeSelection = jest.mocked(useElementTypeSelection);

	const createTextElementMock = jest.fn();
	const createFileElementMock = jest.fn();

	const elementTypeOptionsMock: Ref<
		{
			icon: string;
			label: string;
			action: () => void;
			testId: string;
		}[]
	> = ref([
		{
			icon: "action1-icon",
			label: "action1-label",
			action: createTextElementMock,
			testId: "action1-id",
		},
		{
			icon: "action2-icon",
			label: "action2-label",
			action: createFileElementMock,
			testId: "action2-id",
		},
	]);
	const askTypeMock = props.askTypeMock || jest.fn();
	const onFileSelectMock = jest.fn<Promise<void>, unknown[]>();
	const isFilePickerOpenMock = ref(false);
	const isDialogOpenMock = ref(false);

	const mocks = {
		askType: askTypeMock,
		isDialogOpen: isDialogOpenMock,
		elementTypeOptions: elementTypeOptionsMock,
		onElementClick: jest.fn<Promise<void>, unknown[]>(),
		onFileElementClick: jest.fn(),
		onFileSelect: onFileSelectMock,
		isFilePickerOpen: isFilePickerOpenMock,
	};

	mockedElementTypeSelection.mockReturnValue(mocks);

	return mocks;
};
