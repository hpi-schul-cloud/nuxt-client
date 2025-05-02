import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import InviteMembersDialog from "./InviteMembersDialog.vue";
import { nextTick } from "vue";
import { createTestingPinia } from "@pinia/testing";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import { useBoardNotifier } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: () => ({ t: jest.fn().mockImplementation((key) => key) }),
	};
});

jest.mock("@util-board/BoardNotifier.composable");
const boardNotifier = jest.mocked(useBoardNotifier);

enum InvitationStep {
	PREPARE = "prepare",
	SHARE = "share",
}

jest.useFakeTimers();
describe("InviteMembersDialog", () => {
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	beforeEach(() => {
		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		boardNotifier.mockReturnValue(boardNotifierCalls);
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	const setup = (
		props: {
			modelValue?: boolean;
			schoolName?: string;
			preDefinedStep?: string;
		} = {
			modelValue: true,
			schoolName: "Test School",
			preDefinedStep: InvitationStep.PREPARE,
		}
	) => {
		const roomInvitationLinks = roomInvitationLinkFactory.buildList(3);
		const wrapper = mount(InviteMembersDialog, {
			global: {
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia({
						initialState: {
							roomInvitationLinkStore: {
								isLoading: false,
								roomInvitationLinks,
							},
						},
					}),
				],
			},
			props: {
				...{
					modelValue: true,
					schoolName: "Test School",
					preDefinedStep: InvitationStep.PREPARE,
				},
				...props,
			},
		});
		return { wrapper };
	};

	it("should render correctly", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);

		const dialog = wrapper.findComponent({ name: "VDialog" });

		expect(dialog.exists()).toBe(true);
	});

	describe("steps", () => {
		describe("when the step is PREPARE", () => {
			it("should have the correct title", async () => {
				const { wrapper } = setup({ preDefinedStep: InvitationStep.PREPARE });

				await nextTick();

				const card = wrapper.findComponent({ name: "VCard" });
				const title = card.findComponent({ name: "VCardTitle" });

				expect(title.text()).toBe(
					"pages.rooms.members.inviteMember.firstStep.title"
				);
			});

			it("should have the correct action buttons", async () => {
				const { wrapper } = setup({ preDefinedStep: InvitationStep.PREPARE });

				await nextTick();

				const actionButtons = wrapper.findAllComponents({ name: "VBtn" });

				expect(actionButtons.length).toBe(2);

				const cancelButton = actionButtons[0];
				const nextButton = actionButtons[1];

				expect(cancelButton.text()).toBe("common.actions.cancel");
				expect(nextButton.text()).toBe("common.actions.continue");
			});

			it("should not render the ShareModalResult component", async () => {
				const { wrapper } = setup({ preDefinedStep: InvitationStep.PREPARE });

				await nextTick();

				const shareModalResult = wrapper.findComponent({
					name: "ShareModalResult",
				});

				expect(shareModalResult.exists()).toBe(false);
			});

			it("should have the correct checkbox labels", async () => {
				const { wrapper } = setup({ preDefinedStep: InvitationStep.PREPARE });

				await nextTick();

				const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });

				[
					"pages.rooms.members.inviteMember.form.onlySchoolMembers.label",
					"pages.rooms.members.inviteMember.form.validForStudents.label",
					"pages.rooms.members.inviteMember.form.linkExpires.label",
					"pages.rooms.members.inviteMember.form.isConfirmationNeeded.label",
				].forEach((label) => {
					expect(
						checkboxes.some((checkbox) => checkbox.text().includes(label))
					).toBe(true);
				});
			});
		});

		describe("when the step is SHARE", () => {
			it("should have the correct title", async () => {
				const { wrapper } = setup({ preDefinedStep: InvitationStep.SHARE });

				await nextTick();

				const card = wrapper.findComponent({ name: "VCard" });
				const title = card.findComponent({ name: "VCardTitle" });

				expect(title.text()).toBe(
					"pages.rooms.members.inviteMember.secondStep.title"
				);
			});

			it("should have the correct action button", async () => {
				const { wrapper } = setup({ preDefinedStep: InvitationStep.SHARE });

				await nextTick();

				const closeButton = wrapper.findComponent({ ref: "closeButton" });

				expect(closeButton.text()).toBe("common.labels.close");
			});

			it("should render the ShareModalResult component", async () => {
				const { wrapper } = setup({ preDefinedStep: InvitationStep.SHARE });

				await nextTick();

				const shareModalResult = wrapper.findComponent({
					name: "ShareModalResult",
				});

				expect(shareModalResult.exists()).toBe(true);
			});
		});

		describe("when continue button is clicked", () => {
			it("should switch to SHARE step", async () => {
				const { wrapper } = setup({ preDefinedStep: InvitationStep.PREPARE });
				await nextTick();
				const shareModalBefore = wrapper.findComponent({
					name: "ShareModalResult",
				});
				expect(shareModalBefore.exists()).toBe(false);

				const nextButton = wrapper.findComponent({ ref: "continueButton" });
				await nextButton.trigger("click");
				jest.advanceTimersByTime(1000);
				await nextTick();

				const shareModalAfter = wrapper.findComponent({
					name: "ShareModalResult",
				});
				expect(shareModalAfter.exists()).toBe(true);
			});
		});
	});

	describe("emits", () => {
		it("should emit 'close' with false when cancel button is clicked", async () => {
			const { wrapper } = setup({ preDefinedStep: InvitationStep.PREPARE });
			await nextTick();
			const cancelButton = wrapper.findComponent({ ref: "cancelButton" });
			await cancelButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("close");
		});

		it("should emit 'close' with false when close button is clicked", async () => {
			const { wrapper } = setup({ preDefinedStep: InvitationStep.SHARE });
			await nextTick();
			const closeButton = wrapper.findComponent({ ref: "closeButton" });
			await closeButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("close");
		});
	});

	describe("form rules", () => {
		describe("when the first checkbox is checked", () => {
			it("should enable the second checkbox", async () => {
				const { wrapper } = setup({ preDefinedStep: InvitationStep.PREPARE });
				await nextTick();

				const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });
				const firstCheckbox = checkboxes[0];
				const secondCheckbox = checkboxes[1];

				await firstCheckbox.setValue(false);
				await nextTick();

				expect(secondCheckbox.props("disabled")).toBe(true);
			});
		});
	});

	describe("when the first checkbox is unchecked", () => {
		it("should disable and uncheck the second checkbox", async () => {
			const { wrapper } = setup({ preDefinedStep: InvitationStep.PREPARE });
			await nextTick();

			const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });
			const firstCheckbox = checkboxes[0];
			const secondCheckbox = checkboxes[1];

			await firstCheckbox.setValue(true);
			await secondCheckbox.setValue(true);
			await nextTick();

			expect(secondCheckbox.props("disabled")).toBe(false);
			expect(secondCheckbox.props("modelValue")).toBe(true);

			await firstCheckbox.setValue(false);
			await nextTick();

			expect(secondCheckbox.props("disabled")).toBe(true);
			expect(secondCheckbox.props("modelValue")).toBe(false);
		});
	});

	describe.skip("when the third checkbox is checked", () => {
		it("should enable date picker", async () => {
			const { wrapper } = setup({ preDefinedStep: InvitationStep.PREPARE });
			await nextTick();

			const datePickerBefore = wrapper.findComponent({ name: "DatePicker" });
			expect(datePickerBefore.attributes("disabled")).toBeDefined();

			const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });
			const thirdCheckbox = checkboxes[2];

			await thirdCheckbox.setValue(true);
			await nextTick();
			const datePicker = wrapper.findComponent(
				'[data-testid="date-picker-until"]'
			);
			await nextTick();

			expect(datePicker.attributes().disabled).toBe(undefined);
		});
	});
});
