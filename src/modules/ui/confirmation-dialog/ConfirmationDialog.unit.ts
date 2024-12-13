import { ref } from "vue";
import { useInternalConfirmationDialog } from "./Confirmation.composable";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import ConfirmationDialog from "./ConfirmationDialog.vue";
import { VCard, VDialog } from "vuetify/lib/components/index.mjs";
import { createMock, DeepMocked } from "@golevelup/ts-jest";

jest.mock("./Confirmation.composable");
const useInternalConfirmationDialogMock = jest.mocked(
	useInternalConfirmationDialog
);

describe("ConfirmationDialog", () => {
	let internalConfirmationDialogMock: DeepMocked<
		ReturnType<typeof useInternalConfirmationDialog>
	>;

	beforeEach(() => {
		internalConfirmationDialogMock =
			createMock<ReturnType<typeof useInternalConfirmationDialog>>();
		useInternalConfirmationDialogMock.mockReturnValue(
			internalConfirmationDialogMock
		);
	});

	const setup = (options?: {
		isDialogOpen?: boolean;
		message?: string;
		confirmActionLangKey?: string;
	}) => {
		const { isDialogOpen, message, confirmActionLangKey } = {
			isDialogOpen: true,
			message: "titleMessage",
			confirmActionLangKey: "ActionKey",
			...options,
		};

		internalConfirmationDialogMock.dialogOptions = ref({
			message,
			confirmActionLangKey,
		});
		internalConfirmationDialogMock.isDialogOpen = ref(isDialogOpen);

		const wrapper = mount(ConfirmationDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		return { wrapper, message };
	};

	afterEach(() => {
		useInternalConfirmationDialogMock.mockReset();
	});

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({});

			expect(wrapper.exists()).toBe(true);
		});

		it("should render dialog title", async () => {
			const { wrapper, message } = setup();

			const dialogTitle = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.find(".dialog-title");

			expect(dialogTitle.text()).toContain(message);
		});
	});

	// fix: tests should be independent
	describe("when a dialog button clicked", () => {
		it("should call 'confirm' if 'confirm' button clicked", () => {
			const { wrapper } = setup();

			const confirmButton = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.findComponent("[data-testid='dialog-confirm']");

			confirmButton.trigger("click");
			expect(internalConfirmationDialogMock.confirm).toHaveBeenCalled();
		});

		it("should call 'cancel' if 'cancel' button clicked", () => {
			const { wrapper } = setup();

			const cancelButton = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.findComponent("[data-testid='dialog-cancel']");

			cancelButton.trigger("click");
			expect(internalConfirmationDialogMock.cancel).toHaveBeenCalled();
		});
	});
});

// ToDo: add test confirmBtnLanguageKey
