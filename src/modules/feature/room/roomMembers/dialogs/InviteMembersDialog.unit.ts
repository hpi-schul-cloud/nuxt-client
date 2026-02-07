import InviteMembersDialog from "./InviteMembersDialog.vue";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import { SchulcloudTheme } from "@/serverApi/v3/api";
import { createTestEnvStore, expectNotification, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { InvitationStep, RoomInvitationLink, useRoomInvitationLinkStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { DatePicker } from "@ui-date-time-picker";
import { flushPromises, VueWrapper } from "@vue/test-utils";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { setActivePinia } from "pinia";
import { beforeEach, Mock } from "vitest";
import { nextTick } from "vue";
import { VBtn, VCard, VCardTitle, VCheckbox, VDialog, VRadio, VRadioGroup, VTextField } from "vuetify/components";

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: () => ({ t: vi.fn().mockImplementation((key) => key) }),
	};
});

vi.mock("@vueuse/integrations/useFocusTrap", () => ({
	useFocusTrap: vi.fn(),
}));

describe("InviteMembersDialog", () => {
	let wrapper: VueWrapper<InstanceType<typeof InviteMembersDialog>>;
	let pauseMock: Mock;
	let unpauseMock: Mock;
	let deactivateMock: Mock;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({
			FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: false,
		});

		pauseMock = vi.fn();
		unpauseMock = vi.fn();
		deactivateMock = vi.fn();
		(useFocusTrap as Mock).mockReturnValue({
			pause: pauseMock,
			unpause: unpauseMock,
			deactivate: deactivateMock,
		});
		vi.useFakeTimers();
	});

	afterEach(() => {
		wrapper.unmount();
		vi.clearAllMocks();
		vi.clearAllTimers();
	});

	const setDescription = async (wrapper: VueWrapper, value: string) => {
		const descriptionField = wrapper.getComponent({
			ref: "descriptionField",
		}) as VueWrapper<VTextField>;

		await descriptionField.setValue(value);
		await descriptionField.trigger("blur");

		return descriptionField;
	};

	const setup = async (
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

		wrapper = mount(InviteMembersDialog, {
			attachTo: document.body,
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
			},
			props: {
				modelValue,
				schoolName,
			},
		});

		if (preDefinedStep !== InvitationStep.SHARE) {
			await setDescription(wrapper, "invitation link");
		}

		const roomInvitationLinkStore = mockedPiniaStoreTyping(useRoomInvitationLinkStore);

		return { wrapper, roomInvitationLinkStore, schoolName };
	};

	const getCheckboxByTestid = (wrapper: VueWrapper, testId: string) => {
		const checkbox = wrapper.getComponent(VCard).get(`[data-testid=${testId}]`).findComponent(VCheckbox);
		return checkbox;
	};

	it("should render correctly", async () => {
		const { wrapper } = await setup();
		expect(wrapper.exists()).toBe(true);

		const dialog = wrapper.findComponent(VDialog);
		expect(dialog.exists()).toBe(true);
	});

	describe("steps", () => {
		describe("when the step is PREPARE", () => {
			it("should have the correct title", async () => {
				const { wrapper } = await setup();

				const title = wrapper.getComponent(VCardTitle);

				expect(title.text()).toBe("pages.rooms.members.inviteMember.step.prepare.title");
			});

			it("should have the correct action buttons", async () => {
				const { wrapper } = await setup();
				const actionButtons = wrapper.findAllComponents(VBtn);
				expect(actionButtons.length).toBe(2);

				const cancelButton = wrapper.getComponent({ ref: "cancelButton" });
				const continueButton = wrapper.getComponent({ ref: "continueButton" });

				expect(cancelButton.text()).toBe("common.actions.cancel");
				expect(continueButton.text()).toBe("common.actions.continue");
			});

			it("should not render the ShareModalResult component", async () => {
				const { wrapper } = await setup();

				const shareModalResult = wrapper.findComponent(ShareModalResult);
				expect(shareModalResult.exists()).toBe(false);
			});

			it("should render radio buttons", async () => {
				const { wrapper, schoolName } = await setup();

				const radioGroup = wrapper.findComponent(VRadioGroup);
				expect(radioGroup.exists()).toBe(true);

				const radioButtons = radioGroup.findAllComponents(VRadio);
				const radioButtonLabels = radioButtons.map((radioButton) => radioButton.text());

				const expectedLabels = [`common.labels.only ${schoolName}`, "common.labels.allSchools"];

				expect(radioButtonLabels).toEqual(expectedLabels);
				expect(radioButtons.length).toBe(2);
			});

			it("should reset student checkbox when radio button selection changes", async () => {
				const { wrapper } = await setup();

				const radioGroup = wrapper.getComponent(VRadioGroup);
				const studentsCheckbox = getCheckboxByTestid(wrapper, "input-invite-participants-valid-for-students");
				await studentsCheckbox.setValue(true);
				expect(studentsCheckbox.props("modelValue")).toBe(true);

				await radioGroup.vm.$emit("update:modelValue", false);
				await radioGroup.setValue(true);

				const studentCheckboxAfterRoleSelectionChange = getCheckboxByTestid(
					wrapper,
					"input-invite-participants-valid-for-students"
				);
				expect(studentCheckboxAfterRoleSelectionChange.props("modelValue")).toBe(false);
			});

			it("should reset external person checkbox when radio button selection changes", async () => {
				const { wrapper } = await setup();
				createTestEnvStore({
					FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: true,
					SC_THEME: SchulcloudTheme.N21,
				});

				const radioGroup = wrapper.getComponent(VRadioGroup);
				await radioGroup.setValue(false);
				const externalPersonsCheckbox = getCheckboxByTestid(
					wrapper,
					"input-invite-participants-valid-for-external-persons"
				);
				await externalPersonsCheckbox.setValue(true);
				expect(externalPersonsCheckbox.props("modelValue")).toBe(true);

				await radioGroup.vm.$emit("update:modelValue", true);
				await radioGroup.setValue(false);

				const externalPersonsCheckboxAfterRoleSelectionChange = getCheckboxByTestid(
					wrapper,
					"input-invite-participants-valid-for-external-persons"
				);
				expect(externalPersonsCheckboxAfterRoleSelectionChange.props("modelValue")).toBe(false);
			});

			it("should render checked disabled teacher role checkbox", async () => {
				const { wrapper } = await setup();

				const teacherRoleCheckbox = getCheckboxByTestid(wrapper, "input-invite-participants-valid-for-teachers");
				expect(teacherRoleCheckbox.exists()).toBe(true);
				expect(teacherRoleCheckbox.props().disabled).toBe(true);
				expect(teacherRoleCheckbox.props("modelValue")).toBe(true);
				expect(teacherRoleCheckbox.text()).toBe("common.labels.teacher.neutral.plural");
			});

			describe("when only own school radio button is selected", () => {
				it("should render the valid-for-students checkbox", async () => {
					const { wrapper } = await setup();

					const radioGroup = wrapper.getComponent(VRadioGroup);
					await radioGroup.setValue(true);
					const studentsCheckbox = getCheckboxByTestid(wrapper, "input-invite-participants-valid-for-students");
					expect(studentsCheckbox.exists()).toBe(true);
				});

				it("should not show external experts checkbox", async () => {
					const { wrapper } = await setup();

					const radioGroup = wrapper.getComponent(VRadioGroup);
					await radioGroup.setValue(true);
					const externalExpertsCheckbox = wrapper.findComponent(
						'[data-testid="input-invite-participants-valid-for-external-persons"]'
					);
					expect(externalExpertsCheckbox.exists()).toBe(false);
				});

				it("should show external experts alert when inviting external persons feature is enabled and instance is not thr", async () => {
					const { wrapper } = await setup();
					createTestEnvStore({
						FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: true,
						SC_THEME: SchulcloudTheme.N21,
					});

					const radioGroup = wrapper.getComponent(VRadioGroup);
					await radioGroup.setValue(true);

					const alert = wrapper.getComponent('[data-testid="info-alert-external-persons"]');
					expect(alert.text()).toBe("pages.rooms.members.inviteMember.infoAlert.text.externalPersons");
				});

				it("should not show external experts alert when instance is thr and inviting external persons feature is enabled but", async () => {
					const { wrapper } = await setup();
					createTestEnvStore({
						FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: true,
						SC_THEME: SchulcloudTheme.Thr,
					});

					const radioGroup = wrapper.getComponent(VRadioGroup);
					await radioGroup.setValue(true);

					const alert = wrapper.findComponent('[data-testid="info-alert-external-persons"]');
					expect(alert.exists()).toBe(false);
				});
			});
			describe("when all schools radio button is selected", () => {
				it("should not render valid-for-students checkbox", async () => {
					const { wrapper } = await setup();

					const radioGroup = wrapper.getComponent(VRadioGroup);
					await radioGroup.setValue(false);
					const studentsCheckbox = wrapper.findComponent(
						'[data-testid="input-invite-participants-valid-for-students"]'
					);
					expect(studentsCheckbox.exists()).toBe(false);
				});

				it("should should render external persons checkbox when inviting external persons feature is enabled and instance is not thr", async () => {
					const { wrapper } = await setup();
					createTestEnvStore({
						FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: true,
						SC_THEME: SchulcloudTheme.N21,
					});

					const radioGroup = wrapper.getComponent(VRadioGroup);
					await radioGroup.setValue(false);
					const externalPersonsCheckbox = getCheckboxByTestid(
						wrapper,
						"input-invite-participants-valid-for-external-persons"
					);
					expect(externalPersonsCheckbox.exists()).toBe(true);
				});

				it("should not render external persons checkbox when instance is thr and inviting external persons feature is enabled", async () => {
					const { wrapper } = await setup();
					createTestEnvStore({
						FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: true,
						SC_THEME: SchulcloudTheme.Thr,
					});

					const radioGroup = wrapper.getComponent(VRadioGroup);
					await radioGroup.setValue(false);
					const externalPersonsCheckbox = wrapper.findComponent(
						'[data-testid="input-invite-participants-valid-for-external-persons"]'
					);
					expect(externalPersonsCheckbox.exists()).toBe(false);
				});

				it("should show students from other schools alert", async () => {
					const { wrapper } = await setup();
					createTestEnvStore({
						FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: true,
					});

					const radioGroup = wrapper.getComponent(VRadioGroup);
					await radioGroup.setValue(false);

					const alert = wrapper.getComponent('[data-testid="info-alert-students-from-other-schools"]');
					expect(alert.text()).toBe("pages.rooms.members.inviteMember.infoAlert.text.studentsFromOtherSchools");
				});
			});

			describe("link-expires checkbox", () => {
				it("should render", async () => {
					const { wrapper } = await setup();

					const linkExpiresCheckbox = getCheckboxByTestid(wrapper, "input-invite-participants-link-expires");
					expect(linkExpiresCheckbox.text()).toBe("pages.rooms.members.inviteMember.form.linkExpires.label");
				});
				it("should enable date picker and make it required", async () => {
					const { wrapper } = await setup();

					const datePickerBefore = wrapper.getComponent(DatePicker);
					expect(datePickerBefore.props().disabled).toBe(true);

					const linkExpiresCheckbox = getCheckboxByTestid(wrapper, "input-invite-participants-link-expires");
					await linkExpiresCheckbox.setValue(true);

					const datePicker = wrapper.getComponent(DatePicker);
					expect(datePicker.props().disabled).toBe(false);
					expect(datePicker.props().required).toBe(true);
				});

				it("should unpause focus trap and update activeUntil value when a date is selected", async () => {
					const { wrapper } = await setup();

					const linkExpiresCheckbox = getCheckboxByTestid(wrapper, "input-invite-participants-link-expires");
					await linkExpiresCheckbox.setValue(true);

					const datePicker = wrapper.getComponent(DatePicker);
					const selectedDateISO = new Date(2024, 0, 1).toISOString();
					datePicker.vm.$emit("update:date", selectedDateISO);
					await nextTick();

					expect(unpauseMock).toHaveBeenCalled();
					expect(datePicker.props().date).toBe(selectedDateISO);
				});
			});

			it("should render requires confirmation checkbox checked as default", async () => {
				const { wrapper } = await setup();

				const confirmationCheckbox = getCheckboxByTestid(wrapper, "input-invite-participants-requires-confirmation");
				expect(confirmationCheckbox.text()).toBe("pages.rooms.members.inviteMember.form.isConfirmationNeeded.label");
				expect(confirmationCheckbox.props("modelValue")).toBe(true);
			});
		});

		describe("when the step is EDIT", () => {
			it("should have the correct title", async () => {
				const { wrapper } = await setup({ preDefinedStep: InvitationStep.EDIT });
				const title = wrapper.getComponent(VCardTitle);

				expect(title.text()).toBe("pages.rooms.members.inviteMember.step.edit.title");
			});

			it("should have the correct action buttons", async () => {
				const { wrapper } = await setup({ preDefinedStep: InvitationStep.EDIT });

				const actionButtons = wrapper.findAllComponents(VBtn);
				expect(actionButtons.length).toBe(2);

				const cancelButton = wrapper.getComponent({ ref: "cancelButton" });
				const continueButton = wrapper.getComponent({ ref: "continueButton" });

				expect(cancelButton.text()).toBe("common.actions.cancel");
				expect(continueButton.text()).toBe("common.actions.continue");
			});

			it("should set linkExpires-checkbox modelValue false if activeUntil value is default", async () => {
				const { wrapper } = await setup({
					preDefinedStep: InvitationStep.EDIT,
					editedLink: roomInvitationLinkFactory.build({
						activeUntil: "2900-01-01T00:00:00.000Z",
					}),
				});

				const linkExpiresCheckbox = getCheckboxByTestid(wrapper, "input-invite-participants-link-expires");
				expect(linkExpiresCheckbox.props("modelValue")).toBe(false);
			});

			describe("when close button is clicked", () => {
				it("should set the editedLink value to null", async () => {
					const { wrapper, roomInvitationLinkStore } = await setup({
						preDefinedStep: InvitationStep.EDIT,
					});
					roomInvitationLinkStore.editedLink = roomInvitationLinkStore.roomInvitationLinks[0];

					await nextTick();
					expect(roomInvitationLinkStore.editedLink).not.toBeNull();

					const cancelButton = wrapper.getComponent({ ref: "cancelButton" });
					await cancelButton.trigger("click");

					expect(roomInvitationLinkStore.editedLink).toBeNull();
				});
			});
		});

		describe("when the step is SHARE", () => {
			it("should have the correct title", async () => {
				const { wrapper } = await setup({ preDefinedStep: InvitationStep.SHARE });

				const title = wrapper.getComponent(VCardTitle);

				expect(title.text()).toBe("pages.rooms.members.inviteMember.step.share.title");
			});

			it("should have the correct action button", async () => {
				const { wrapper } = await setup({ preDefinedStep: InvitationStep.SHARE });

				const closeButton = wrapper.getComponent({ ref: "closeButton" });
				expect(closeButton.text()).toBe("common.labels.close");
			});

			it("should render the ShareModalResult component", async () => {
				const { wrapper } = await setup({ preDefinedStep: InvitationStep.SHARE });

				const shareModalResult = wrapper.findComponent(ShareModalResult);
				expect(shareModalResult.exists()).toBe(true);
			});

			describe("when copy link button is clicked on ShareModalResult", () => {
				it("should copy the link to clipboard", async () => {
					const { wrapper } = await setup({
						preDefinedStep: InvitationStep.SHARE,
					});

					const shareModalResult = wrapper.getComponent(ShareModalResult);
					await shareModalResult.vm.$emit("copied");
					expectNotification("success");
				});
			});

			describe("when close button is clicked on ShareModalResult", () => {
				it("should emit 'close'", async () => {
					const { wrapper } = await setup({
						preDefinedStep: InvitationStep.SHARE,
					});

					const shareModalResult = wrapper.getComponent(ShareModalResult);
					await shareModalResult.vm.$emit("done");

					expect(wrapper.emitted()).toHaveProperty("close");
				});
			});
		});
	});

	describe("Continue button behavior", () => {
		describe("when form is valid", () => {
			it("should call createLink method if form is in prepare step", async () => {
				const { wrapper, roomInvitationLinkStore } = await setup({
					preDefinedStep: InvitationStep.PREPARE,
				});
				const shareModalBefore = wrapper.findComponent(ShareModalResult);
				expect(shareModalBefore.exists()).toBe(false);

				const nextButton = wrapper.getComponent({ ref: "continueButton" });
				await nextButton.trigger("click");
				await flushPromises();

				const expectedFormValues = {
					title: "invitation link",
					activeUntil: roomInvitationLinkStore.DEFAULT_EXPIRED_DATE,
					isUsableByStudents: false,
					isUsableByExternalPersons: false,
					restrictedToCreatorSchool: true,
					requiresConfirmation: true,
				};

				expect(roomInvitationLinkStore.createLink).toHaveBeenCalledWith(expectedFormValues);
			});

			it("should call updateLink method if form is in edit step", async () => {
				const { wrapper, roomInvitationLinkStore } = await setup({
					preDefinedStep: InvitationStep.EDIT,
				});
				await nextTick();

				const shareModalBefore = wrapper.findComponent(ShareModalResult);
				expect(shareModalBefore.exists()).toBe(false);

				const nextButton = wrapper.getComponent({ ref: "continueButton" });
				await nextButton.trigger("click");
				await flushPromises();

				const expectedFormValues = {
					id: "",
					title: "invitation link",
					activeUntil: roomInvitationLinkStore.DEFAULT_EXPIRED_DATE,
					isUsableByStudents: false,
					isUsableByExternalPersons: false,
					restrictedToCreatorSchool: true,
					requiresConfirmation: true,
				};

				expect(roomInvitationLinkStore.updateLink).toHaveBeenCalledWith(expectedFormValues);
			});

			it("should update activeUntil value when a date is selected", async () => {
				const { wrapper, roomInvitationLinkStore } = await setup();

				const linkExpiresCheckbox = getCheckboxByTestid(wrapper, "input-invite-participants-link-expires");
				await linkExpiresCheckbox.setValue(true);

				const datePicker = wrapper.getComponent(DatePicker);
				const selectedDateISO = new Date(2024, 0, 1).toISOString();
				datePicker.vm.$emit("update:date", selectedDateISO);
				await nextTick();

				const nextButton = wrapper.getComponent({ ref: "continueButton" });
				await nextButton.trigger("click");
				await flushPromises();

				expect(roomInvitationLinkStore.createLink).toHaveBeenCalledWith(
					expect.objectContaining({
						activeUntil: selectedDateISO,
					})
				);
			});
		});

		describe("when form is invalid", () => {
			it("should not call store method when form is invalid", async () => {
				const { wrapper, roomInvitationLinkStore } = await setup();
				await setDescription(wrapper, "  ");

				const nextButton = wrapper.getComponent({ ref: "continueButton" });
				await nextButton.trigger("click");
				await flushPromises();

				const descriptionField = wrapper.getComponent({
					ref: "descriptionField",
				});

				expect(roomInvitationLinkStore.createLink).not.toHaveBeenCalled();
				expect(roomInvitationLinkStore.updateLink).not.toHaveBeenCalled();
				expect(descriptionField.text()).toContain("Dies ist ein Pflichtfeld und darf nicht nur Leerzeichen enthalten.");
			});

			it("should focus the description field when it is the first invalid input", async () => {
				const { wrapper } = await setup();
				const descriptionField = wrapper.findComponent({
					ref: "descriptionField",
				});
				const input = descriptionField.find("input").element;

				await setDescription(wrapper, "  ");

				const nextButton = wrapper.findComponent({ ref: "continueButton" });
				await nextButton.trigger("click");
				await flushPromises();

				expect(document.activeElement).toBe(input);
			});

			it("should focus the date picker when it is the first invalid input", async () => {
				const { wrapper } = await setup();
				const expiryDateCheckbox = getCheckboxByTestid(wrapper, "input-invite-participants-link-expires");
				await expiryDateCheckbox.setValue(true);
				await nextTick();

				const datePicker = wrapper.getComponent('[data-testid="date-picker-until"]');
				const input = datePicker.get("input").element;

				const nextButton = wrapper.getComponent({ ref: "continueButton" });
				await nextButton.trigger("click");
				await flushPromises();

				expect(document.activeElement).toBe(input);
			});
		});
	});

	describe("emits", () => {
		it("should emit 'close' with false when cancel button is clicked", async () => {
			const { wrapper } = await setup();

			const cancelButton = wrapper.getComponent({ ref: "cancelButton" });
			await cancelButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("close");
		});

		it("should emit 'close' with false when close button is clicked", async () => {
			const { wrapper } = await setup({ preDefinedStep: InvitationStep.SHARE });

			const closeButton = wrapper.getComponent({ ref: "closeButton" });
			await closeButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("close");
		});
	});

	describe("Description field validation", () => {
		it("should show error when description is empty", async () => {
			const { wrapper } = await setup();

			const descriptionField = await setDescription(wrapper, "");

			expect(descriptionField.text()).toContain("Dies ist ein Pflichtfeld und darf nicht nur Leerzeichen enthalten.");
		});

		it("should show error when description contains only whitespaces", async () => {
			const { wrapper } = await setup();

			const descriptionField = await setDescription(wrapper, "   ");

			expect(descriptionField.text()).toContain("Dies ist ein Pflichtfeld und darf nicht nur Leerzeichen enthalten.");
		});

		it("should show error when description contains < followed by a string", async () => {
			const { wrapper } = await setup();

			await setDescription(wrapper, "<abc123");

			const descriptionField = wrapper.findComponent({
				ref: "descriptionField",
			});
			expect(descriptionField.text()).toContain("common.validation.containsOpeningTag");
		});

		it("should show error when description is longer then 100 characters", async () => {
			const { wrapper } = await setup();

			const longDescription = "a".repeat(101);
			await setDescription(wrapper, longDescription);

			const descriptionField = wrapper.findComponent({
				ref: "descriptionField",
			});
			expect(descriptionField.text()).toContain("Der eingegebene Text überschreitet die Maximallänge");
		});
	});
});
