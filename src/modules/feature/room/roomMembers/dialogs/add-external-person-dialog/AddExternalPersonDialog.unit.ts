import AddExternalPersonDialog from "./AddExternalPersonDialog.vue";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import { schoolFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { useNotificationStore } from "@data-app";
import { ExternalMemberCheckStatus, useRoomMembersStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { Mock } from "vitest";
import { VTextField } from "vuetify/components";

describe("AddExternalPersonDialog", () => {
	vi.mock("@vueuse/integrations/useFocusTrap");
	let wrapper: VueWrapper<InstanceType<typeof AddExternalPersonDialog>>;
	let pauseMock: Mock;
	let unpauseMock: Mock;

	beforeEach(() => {
		pauseMock = vi.fn();
		unpauseMock = vi.fn();
		(useFocusTrap as Mock).mockReturnValue({
			pause: pauseMock,
			unpause: unpauseMock,
			deactivate: vi.fn(),
		});

		setupStores({
			schoolsModule: SchoolsModule,
		});

		const ownSchool = {
			id: "school-id",
			name: "Paul-Gerhardt-Gymnasium",
		};
		schoolsModule.setSchool(schoolFactory.build(ownSchool));
	});

	const setup = (options?: { modelValue?: boolean }) => {
		const pinia = createTestingPinia({
			stubActions: false,
		});

		const roomMembersStore = useRoomMembersStore();
		roomMembersStore.startRegistrationProcess = vi.fn();

		wrapper = mount(AddExternalPersonDialog, {
			props: {
				modelValue: options?.modelValue ?? true,
			},
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n(), pinia],
			},
		});

		return { wrapper, roomMembersStore };
	};

	afterEach(() => {
		wrapper?.unmount();
	});

	afterAll(() => {
		vi.clearAllMocks();
	});

	const clickButton = async (partialName: string) => {
		const btn = wrapper.getComponent(`[data-testid="add-external-person-${partialName}-btn"]`);
		await btn.trigger("click");
		await flushPromises();
	};

	const getTextfield = (partialName: string) => {
		const textfield = wrapper
			.getComponent(`[data-testid="add-external-person-${partialName}"]`)
			.getComponent(VTextField);
		return textfield;
	};

	describe("when component is mounted", () => {
		it("should render the component", () => {
			const { wrapper } = setup();

			expect(wrapper.find('[data-testid="add-external-person-dialog"]')).toBeTruthy();
		});
	});

	describe("emits", () => {
		it("should emit 'close' event when dialog is closed", async () => {
			const { wrapper } = setup();

			await clickButton("cancel");

			const emitted = wrapper.emitted();
			expect(emitted).toHaveProperty("close");
		});
	});

	describe("email step", () => {
		describe("when email is invalid", () => {
			it("should show a validation error and not call addMemberByEmail", async () => {
				setup();

				const emailInput = getTextfield("email");
				await emailInput.setValue("invalid-email");

				await clickButton("add-email");

				expect(emailInput.text()).toContain("pages.rooms.members.dialog.addExternalPerson.label.email.error");
				expect(useRoomMembersStore().addMemberByEmail).not.toHaveBeenCalled();
			});
		});

		describe("when email is valid", () => {
			describe("when matching account exists", () => {
				describe("when matching account is external person", () => {
					it("should close the dialog", async () => {
						const { wrapper, roomMembersStore } = setup();

						roomMembersStore.addMemberByEmail = vi
							.fn()
							.mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_FOUND_AND_ADDED);

						const email = "test@example.com";
						await getTextfield("email").setValue(email);

						await clickButton("add-email");

						expect(roomMembersStore.addMemberByEmail).toHaveBeenCalledWith(email);
						expect(wrapper.emitted()).toHaveProperty("close");
					});

					describe("when adding the external member fails", () => {
						it("should show an error notification", async () => {
							const { roomMembersStore } = setup();

							roomMembersStore.addMemberByEmail = vi.fn().mockResolvedValue(undefined);

							await getTextfield("email").setValue("test-email@example.com");
							await clickButton("add-email");

							expect(useNotificationStore().notify).toHaveBeenCalledWith({
								autoClose: true,
								status: "error",
								text: "pages.rooms.members.dialog.addExternalPerson.errors.addingMember",
							});
						});
					});
				});
				describe("when matching account is not an external person", () => {
					it("should continue to the error step", async () => {
						const { wrapper, roomMembersStore } = setup();

						roomMembersStore.addMemberByEmail = vi
							.fn()
							.mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_IS_NOT_EXTERNAL);

						await getTextfield("email").setValue("test-email@example.com");
						await clickButton("add-email");

						expect(roomMembersStore.addMemberByEmail).toHaveBeenCalledWith("test-email@example.com");
						expect((wrapper.vm as unknown as VueWrapper & { step: string }).step).toBe("error");
					});
				});
			});

			describe("when no matching account exists", () => {
				it("should continue to the details step", async () => {
					const { wrapper, roomMembersStore } = setup();

					roomMembersStore.addMemberByEmail = vi.fn().mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND);

					await getTextfield("email").setValue("test-email@example.com");
					await clickButton("add-email");

					expect(roomMembersStore.addMemberByEmail).toHaveBeenCalledWith("test-email@example.com");

					expect((wrapper.vm as unknown as VueWrapper & { step: string }).step).toBe("details");
					expect(wrapper.getComponent('[data-testid="add-external-person-firstname"]')).toBeTruthy();
					expect(wrapper.getComponent('[data-testid="add-external-person-confirm-btn"]')).toBeTruthy();
					expect(wrapper.find('[data-testid="add-external-person-add-email-btn"]').exists()).toBe(false);
				});
			});
		});
	});

	describe("details step", () => {
		describe("when back button is clicked", () => {
			it("should go back to email step", async () => {
				const { wrapper, roomMembersStore } = setup();

				roomMembersStore.addMemberByEmail = vi.fn().mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND);

				await getTextfield("email").setValue("test-email@example.com");
				await clickButton("add-email");

				expect((wrapper.vm as unknown as VueWrapper & { step: string }).step).toBe("details");

				await clickButton("back");

				expect((wrapper.vm as unknown as VueWrapper & { step: string }).step).toBe("email");
				expect(wrapper.getComponent('[data-testid="add-external-person-add-email-btn"]')).toBeTruthy();
			});
		});

		describe("when details are valid", () => {
			it("should call startRegistrationProcess with correct data and close dialog", async () => {
				const { wrapper, roomMembersStore } = setup();

				roomMembersStore.addMemberByEmail = vi.fn().mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND);

				const email = "test-email@example.com";
				await getTextfield("email").setValue(email);
				await clickButton("add-email");

				const firstName = "John";
				const lastName = "Doe";
				await getTextfield("firstname").setValue(firstName);
				await getTextfield("lastname").setValue(lastName);
				await clickButton("confirm");

				expect(roomMembersStore.startRegistrationProcess).toHaveBeenCalledWith({
					email,
					firstName,
					lastName,
				});
				expect(wrapper.emitted()).toHaveProperty("close");
			});

			it("should show an error notification and close dialog if registerExternalMember fails", async () => {
				const { wrapper, roomMembersStore } = setup();
				roomMembersStore.addMemberByEmail = vi.fn().mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND);
				roomMembersStore.startRegistrationProcess = vi.fn().mockRejectedValue(new Error("Network error"));

				await getTextfield("email").setValue("test-email@example.com");
				await clickButton("add-email");

				await getTextfield("firstname").setValue("John");
				await getTextfield("lastname").setValue("Doe");

				await clickButton("confirm");

				expect(useNotificationStore().notify).toHaveBeenCalledWith({
					autoClose: true,
					status: "error",
					text: "pages.rooms.members.dialog.addExternalPerson.errors.addingMember",
				});
				expect(wrapper.emitted()).toHaveProperty("close");
			});
		});
	});
});
