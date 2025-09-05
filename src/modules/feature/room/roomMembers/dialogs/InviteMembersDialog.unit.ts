import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import InviteMembersDialog from "./InviteMembersDialog.vue";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import { nextTick } from "vue";
import { createTestingPinia } from "@pinia/testing";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import { useBoardNotifier } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { VueWrapper } from "@vue/test-utils";
import {
	useRoomInvitationLinkStore,
	InvitationStep,
	RoomInvitationLink,
} from "@data-room";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import NotifierModule from "@/store/notifier";
import { Mock } from "vitest";

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: () => ({ t: vi.fn().mockImplementation((key) => key) }),
	};
});

vi.mock("@vueuse/integrations/useFocusTrap", () => {
	return {
		useFocusTrap: vi.fn(),
	};
});

vi.mock("@util-board/BoardNotifier.composable");
const boardNotifier = vi.mocked(useBoardNotifier);
vi.useFakeTimers();

describe("InviteMembersDialog", () => {
	let wrapper: VueWrapper<InstanceType<typeof InviteMembersDialog>>;
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let pauseMock: Mock;
	let unpauseMock: Mock;
	let deactivateMock: Mock;

	beforeAll(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});
	beforeEach(() => {
		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		boardNotifier.mockReturnValue(boardNotifierCalls);
		pauseMock = vi.fn();
		unpauseMock = vi.fn();
		deactivateMock = vi.fn();
		(useFocusTrap as Mock).mockReturnValue({
			pause: pauseMock,
			unpause: unpauseMock,
			deactivate: deactivateMock,
		});
	});
	afterEach(() => {
		vi.clearAllMocks();
		vi.clearAllTimers();
	});

	const setDescription = async (wrapper: VueWrapper, value: string) => {
		const descriptionField = wrapper.findComponent({
			ref: "descriptionField",
		});
		await descriptionField.setValue(value);
		await nextTick();
	};

	const setup = (
		options?: Partial<{
			modelValue: boolean;
			schoolName: string;
			preDefinedStep: string;
			editedLink: RoomInvitationLink | null;
		}>
	) => {
		const { modelValue, schoolName, preDefinedStep } = {
			modelValue: true,
			schoolName: "Test School",
			preDefinedStep: InvitationStep.PREPARE,
			...options,
		};
		const roomInvitationLinks = roomInvitationLinkFactory.buildList(3);
		const notifierModule = createModuleMocks(NotifierModule);

		wrapper = mount(InviteMembersDialog, {
			global: {
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia({
						initialState: {
							roomInvitationLinkStore: {
								isLoading: false,
								roomInvitationLinks,
								invitationStep: preDefinedStep,
								editedLink: options?.editedLink ?? null,
							},
						},
					}),
				],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
			props: {
				modelValue,
				schoolName,
			},
		});

		if (preDefinedStep !== InvitationStep.SHARE) {
			setDescription(wrapper, "invitation link");
		}

		const roomInvitationLinkStore = mockedPiniaStoreTyping(
			useRoomInvitationLinkStore
		);

		return { wrapper, roomInvitationLinkStore, notifierModule };
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
				const { wrapper } = setup();

				await nextTick();

				const card = wrapper.findComponent({ name: "VCard" });
				const title = card.findComponent({ name: "VCardTitle" });

				expect(title.text()).toBe(
					"pages.rooms.members.inviteMember.step.prepare.title"
				);
			});

			it("should have the correct action buttons", async () => {
				const { wrapper } = setup();

				await nextTick();

				const actionButtons = wrapper.findAllComponents({ name: "VBtn" });

				expect(actionButtons.length).toBe(2);

				const cancelButton = actionButtons[0];
				const nextButton = actionButtons[1];

				expect(cancelButton.text()).toBe("common.actions.cancel");
				expect(nextButton.text()).toBe("common.actions.continue");
			});

			it("should not render the ShareModalResult component", async () => {
				const { wrapper } = setup();

				await nextTick();

				const shareModalResult = wrapper.findComponent(ShareModalResult);

				expect(shareModalResult.exists()).toBe(false);
			});

			it("should have the correct checkbox labels", async () => {
				const { wrapper } = setup();

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

		describe("when the step is EDIT", () => {
			it("should have the correct title", async () => {
				const { wrapper } = setup({ preDefinedStep: InvitationStep.EDIT });

				await nextTick();

				const card = wrapper.findComponent({ name: "VCard" });
				const title = card.findComponent({ name: "VCardTitle" });

				expect(title.text()).toBe(
					"pages.rooms.members.inviteMember.step.edit.title"
				);
			});

			it("should have the correct action buttons", async () => {
				const { wrapper } = setup({ preDefinedStep: InvitationStep.EDIT });

				await nextTick();

				const actionButtons = wrapper.findAllComponents({ name: "VBtn" });

				expect(actionButtons.length).toBe(2);

				const cancelButton = actionButtons[0];
				const nextButton = actionButtons[1];

				expect(cancelButton.text()).toBe("common.actions.cancel");
				expect(nextButton.text()).toBe("common.actions.continue");
			});

			it("should set linkExpires-checkbox modelValue false if activeUntil value is default", async () => {
				const { wrapper } = setup({
					preDefinedStep: InvitationStep.EDIT,
					editedLink: roomInvitationLinkFactory.build({
						activeUntil: "2900-01-01T00:00:00.000Z",
					}),
				});
				await nextTick();
				const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });

				const linkExpiresCheckbox = checkboxes[2];
				expect(linkExpiresCheckbox.props("modelValue")).toBe(false);
			});

			describe("when close button is clicked", () => {
				it("should set the editedLink value to null", async () => {
					const { wrapper, roomInvitationLinkStore } = setup({
						preDefinedStep: InvitationStep.PREPARE,
					});
					await nextTick();

					roomInvitationLinkStore.editedLink =
						roomInvitationLinkStore.roomInvitationLinks[0];

					expect(roomInvitationLinkStore.editedLink).not.toBeNull();

					const cancelButton = wrapper.findComponent({ ref: "cancelButton" });
					await cancelButton.trigger("click");

					expect(roomInvitationLinkStore.editedLink).toBeNull();
				});
			});
		});

		describe("when the step is SHARE", () => {
			it("should have the correct title", async () => {
				const { wrapper } = setup({ preDefinedStep: InvitationStep.SHARE });

				await nextTick();

				const card = wrapper.findComponent({ name: "VCard" });
				const title = card.findComponent({ name: "VCardTitle" });
				await nextTick();
				await nextTick();

				expect(title.text()).toBe(
					"pages.rooms.members.inviteMember.step.share.title"
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

				const shareModalResult = wrapper.findComponent(ShareModalResult);

				expect(shareModalResult.exists()).toBe(true);
			});

			describe("when copy link button is clicked on ShareModalResult", () => {
				it("should copy the link to clipboard", async () => {
					const { wrapper, notifierModule } = setup({
						preDefinedStep: InvitationStep.SHARE,
					});

					await nextTick();

					const shareModalResult = wrapper.findComponent(ShareModalResult);

					await shareModalResult.vm.$emit("copied");

					expect(notifierModule.show).toHaveBeenCalledWith({
						text: "common.words.copiedToClipboard",
						status: "success",
					});
				});
			});

			describe("when close button is clicked on ShareModalResult", () => {
				it("should emit 'close'", async () => {
					const { wrapper } = setup({
						preDefinedStep: InvitationStep.SHARE,
					});

					await nextTick();

					const shareModalResult = wrapper.findComponent(ShareModalResult);

					await shareModalResult.vm.$emit("done");

					expect(wrapper.emitted()).toHaveProperty("close");
				});
			});
		});
	});

	describe("Continue button behavior", () => {
		it("should call createLink method if form is valid", async () => {
			const { wrapper, roomInvitationLinkStore } = setup({
				preDefinedStep: InvitationStep.PREPARE,
			});
			await nextTick();
			const shareModalBefore = wrapper.findComponent(ShareModalResult);
			expect(shareModalBefore.exists()).toBe(false);

			const nextButton = wrapper.findComponent({ ref: "continueButton" });
			await nextButton.trigger("click");
			await nextTick();

			const expectedFormValues = {
				title: "invitation link",
				activeUntil: roomInvitationLinkStore.DEFAULT_EXPIRED_DATE,
				isOnlyForTeachers: true,
				restrictedToCreatorSchool: true,
				requiresConfirmation: true,
			};

			expect(roomInvitationLinkStore.createLink).toHaveBeenCalledWith(
				expectedFormValues
			);
		});

		it("should call updateLink method if form is valid", async () => {
			const { wrapper, roomInvitationLinkStore } = setup({
				preDefinedStep: InvitationStep.EDIT,
			});
			await nextTick();
			const shareModalBefore = wrapper.findComponent(ShareModalResult);
			expect(shareModalBefore.exists()).toBe(false);

			const nextButton = wrapper.findComponent({ ref: "continueButton" });
			await nextButton.trigger("click");
			await nextTick();

			const expectedFormValues = {
				id: "",
				title: "invitation link",
				activeUntil: roomInvitationLinkStore.DEFAULT_EXPIRED_DATE,
				isOnlyForTeachers: true,
				restrictedToCreatorSchool: true,
				requiresConfirmation: true,
			};

			expect(roomInvitationLinkStore.updateLink).toHaveBeenCalledWith(
				expectedFormValues
			);
		});

		it("should not call store method when form is invalid", async () => {
			const { wrapper, roomInvitationLinkStore } = setup();

			await setDescription(wrapper, "  ");

			const nextButton = wrapper.findComponent({ ref: "continueButton" });
			await nextButton.trigger("click");
			await nextTick();

			const descriptionField = wrapper.findComponent({
				ref: "descriptionField",
			});

			expect(roomInvitationLinkStore.createLink).not.toHaveBeenCalled();
			expect(roomInvitationLinkStore.updateLink).not.toHaveBeenCalled();
			expect(descriptionField.text()).toContain(
				"common.validation.nonEmptyString"
			);
		});
	});

	describe("emits", () => {
		it("should emit 'close' with false when cancel button is clicked", async () => {
			const { wrapper } = setup();
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

	describe("Description field validation", () => {
		it("should show error when description is empty", async () => {
			const { wrapper } = setup();
			await nextTick();

			// needed to trigger validation correctly
			await setDescription(wrapper, "valid input");
			await setDescription(wrapper, "");

			const descriptionField = wrapper.findComponent({
				ref: "descriptionField",
			});
			expect(descriptionField.text()).toContain(
				"common.validation.nonEmptyString"
			);
		});

		it("should show error when description contains only whitespaces", async () => {
			const { wrapper } = setup();
			await nextTick();

			// needed to trigger validation correctly
			await setDescription(wrapper, "valid input");
			await setDescription(wrapper, "   ");

			const descriptionField = wrapper.findComponent({
				ref: "descriptionField",
			});
			expect(descriptionField.text()).toContain(
				"common.validation.nonEmptyString"
			);
		});

		it("should show error when description contains < followed by a string", async () => {
			const { wrapper } = setup();
			await nextTick();

			await setDescription(wrapper, "<abc123");

			const descriptionField = wrapper.findComponent({
				ref: "descriptionField",
			});
			expect(descriptionField.text()).toContain(
				"common.validation.containsOpeningTag"
			);
		});

		it("should show error when description is longer then 100 characters", async () => {
			const { wrapper } = setup();
			await nextTick();

			const longDescription = "a".repeat(101);
			await setDescription(wrapper, longDescription);

			const descriptionField = wrapper.findComponent({
				ref: "descriptionField",
			});
			expect(descriptionField.text()).toContain("common.validation.tooLong");
		});
	});

	describe("form rules", () => {
		describe("default values of checkboxes", () => {
			it("should have the first and fourth checkboxes checked as default", async () => {
				const { wrapper } = setup();
				await nextTick();

				const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });

				expect(checkboxes[0].props("modelValue")).toBe(true);
				expect(checkboxes[1].props("modelValue")).toBe(false);
				expect(checkboxes[2].props("modelValue")).toBe(false);
				expect(checkboxes[3].props("modelValue")).toBe(true);
			});
		});

		describe("when the first checkbox is checked", () => {
			it("should enable the second checkbox", async () => {
				const { wrapper } = setup();
				await nextTick();

				const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });
				const firstCheckbox = checkboxes[0];
				const secondCheckbox = checkboxes[1];

				await firstCheckbox.setValue(false);
				await nextTick();

				expect(secondCheckbox.props("disabled")).toBe(true);
			});
		});

		describe("when the first checkbox is unchecked", () => {
			it("should disable and uncheck the second checkbox", async () => {
				const { wrapper } = setup();
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

		describe("when the third checkbox is checked", () => {
			it("should enable date picker", async () => {
				const { wrapper } = setup();
				await nextTick();

				const datePickerBefore = wrapper.findComponent(
					'[data-testid="date-picker-until"]'
				);
				expect(datePickerBefore.classes().includes("v-input--disabled")).toBe(
					true
				);

				const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });
				const thirdCheckbox = checkboxes[2];

				await thirdCheckbox.setValue(true);

				const datePicker = wrapper.findComponent(
					'[data-testid="date-picker-until"]'
				);
				await nextTick();

				expect(datePicker.classes().includes("v-input--disabled")).toBe(false);
			});
		});

		describe("when the third checkbox value changes", () => {
			it("should disable/enable continue button", async () => {
				const { wrapper } = setup();
				await nextTick();

				const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });
				const thirdCheckbox = checkboxes[2];
				await thirdCheckbox.setValue(true);
				await nextTick();
				const continueButton = wrapper.findComponent(
					'[data-testid="invite-participant-save-btn"]'
				);

				expect(continueButton.classes("v-btn--disabled")).toBe(true);

				await thirdCheckbox.setValue(false);
				await nextTick();

				expect(continueButton.classes("v-btn--disabled")).toBe(false);
			});
		});
	});
});
