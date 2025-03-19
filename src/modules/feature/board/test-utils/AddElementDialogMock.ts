import { Ref, ref } from "vue";
import { useAddElementDialog } from "../shared/AddElementDialog.composable";

interface Props {
	askTypeMock?: jest.Mock;
}

export const setupAddElementDialogMock = (props: Props = {}) => {
	const mockedUseAddElementDialog = jest.mocked(useAddElementDialog);

	const createTextElementMock = jest.fn();
	const createFileElementMock = jest.fn();

	const elementTypeOptionsMock: Ref<
		{
			icon: string;
			label: string;
			action: () => Promise<void>;
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
	const onFileSelectMock = jest.fn();
	const isFilePickerOpenMock = ref(false);
	const isDialogOpenMock = ref(false);

	const mocks = {
		askType: askTypeMock,
		isDialogOpen: isDialogOpenMock,
		elementTypeOptions: elementTypeOptionsMock,
		onElementClick: jest.fn(),
		onFileElementClick: jest.fn(),
		onFileSelect: onFileSelectMock,
		isFilePickerOpen: isFilePickerOpenMock,
	};

	mockedUseAddElementDialog.mockReturnValue(mocks);

	return mocks;
};
