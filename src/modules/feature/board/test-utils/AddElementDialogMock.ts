import { useAddElementDialog } from "../shared/AddElementDialog.composable";
import { Mock } from "vitest";
import { Ref, ref } from "vue";

interface Props {
	askTypeMock?: Mock;
}

export const setupAddElementDialogMock = (props: Props = {}) => {
	const mockedUseAddElementDialog = vi.mocked(useAddElementDialog);

	const createTextElementMock = vi.fn();
	const createFileElementMock = vi.fn();

	const staticElementTypeOptionsMock: Ref<
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
	const dynamicElementTypeOptionsMock: Ref<
		{
			icon: string;
			label: string;
			action: () => Promise<void>;
			testId: string;
		}[]
	> = ref([]);
	const askTypeMock = props.askTypeMock || vi.fn();
	const askOfficeFileTypeMock = vi.fn();
	const onFileSelectMock = vi.fn();
	const isFilePickerOpenMock = ref(false);
	const isDialogOpenMock = ref(false);

	const mocks = {
		askType: askTypeMock,
		askOfficeFileType: askOfficeFileTypeMock,
		isDialogOpen: isDialogOpenMock,
		staticElementTypeOptions: staticElementTypeOptionsMock,
		dynamicElementTypeOptions: dynamicElementTypeOptionsMock,
		onElementClick: vi.fn(),
		onFileElementClick: vi.fn(),
		onFileSelect: onFileSelectMock,
		isFilePickerOpen: isFilePickerOpenMock,
	};

	mockedUseAddElementDialog.mockReturnValue(mocks);

	return mocks;
};
