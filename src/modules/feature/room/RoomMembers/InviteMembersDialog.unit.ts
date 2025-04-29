import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import InviteMembersDialog from "./InviteMembersDialog.vue";
import { nextTick } from "vue";

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: () => ({ t: jest.fn().mockImplementation((key) => key) }),
	};
});

enum InvitationStep {
	PREPARE = "prepare",
	SHARE = "share",
}

jest.useFakeTimers();
describe("InviteMembersDialog", () => {
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
		const wrapper = mount(InviteMembersDialog, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
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
});
