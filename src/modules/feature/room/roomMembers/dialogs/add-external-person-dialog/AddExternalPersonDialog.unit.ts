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

	const clickAddButton = async () => {
		const addBtn = wrapper.getComponent('[data-testid="add-external-person-add-email-btn"]');
		await addBtn.trigger("click");

		await flushPromises();
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
			const closeBtn = wrapper.getComponent('[data-testid="add-external-person-cancel-btn"]');

			await closeBtn.trigger("click");

			const emitted = wrapper.emitted();

			expect(emitted).toHaveProperty("close");
		});
	});

	describe("email step", () => {
		describe("when email is invalid", () => {
			it("should show a validation error and not call addMemberByEmail", async () => {
				const { wrapper } = setup();

				const emailInput = wrapper.getComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
				await emailInput.setValue("invalid-email");

				await clickAddButton();

				expect(emailInput.text()).toContain("pages.rooms.members.dialog.addExternalPerson.label.email.error");
				expect(useRoomMembersStore().addMemberByEmail).not.toHaveBeenCalled();
			});
		});

		describe("when email is valid", () => {
			it("should close the dialog if a matching account was found", async () => {
				const { wrapper, roomMembersStore } = setup();

				roomMembersStore.addMemberByEmail = vi
					.fn()
					.mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_FOUND_AND_ADDED);
				const email = "test@example.com";
				const emailInput = wrapper.getComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
				await emailInput.setValue(email);

				await clickAddButton();

				expect(roomMembersStore.addMemberByEmail).toHaveBeenCalledWith(email);
				expect(wrapper.emitted()).toHaveProperty("close");
			});

			it("should continue to the error step if a matching non-external account was found", async () => {
				const { wrapper, roomMembersStore } = setup();

				roomMembersStore.addMemberByEmail = vi
					.fn()
					.mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_IS_NOT_EXTERNAL);

				const emailInput = wrapper.getComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
				await emailInput.setValue("test-email@example.com");

				await clickAddButton();

				expect(roomMembersStore.addMemberByEmail).toHaveBeenCalledWith("test-email@example.com");

				expect((wrapper.vm as unknown as VueWrapper & { step: string }).step).toBe("error");
			});

			it("should continue to the details step if no matching account was found", async () => {
				const { wrapper, roomMembersStore } = setup();

				roomMembersStore.addMemberByEmail = vi.fn().mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND);

				const emailInput = wrapper.getComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
				await emailInput.setValue("test-email@example.com");
				await clickAddButton();

				expect(roomMembersStore.addMemberByEmail).toHaveBeenCalledWith("test-email@example.com");

				expect((wrapper.vm as unknown as VueWrapper & { step: string }).step).toBe("details");
				expect(wrapper.getComponent('[data-testid="add-external-person-firstname"]')).toBeTruthy();
				expect(wrapper.getComponent('[data-testid="add-external-person-confirm-btn"]')).toBeTruthy();
				expect(wrapper.find('[data-testid="add-external-person-add-email-btn"]').exists()).toBe(false);
			});

			it("should show an error notification if addMemberByEmail fails", async () => {
				const { wrapper, roomMembersStore } = setup();

				roomMembersStore.addMemberByEmail = vi.fn().mockResolvedValue(undefined);

				const emailInput = wrapper.getComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
				await emailInput.setValue("test-email@example.com");

				await clickAddButton();

				expect(useNotificationStore().notify).toHaveBeenCalledWith({
					autoClose: true,
					status: "error",
					text: "pages.rooms.members.dialog.addExternalPerson.errors.addingMember",
				});
			});
		});
	});

	describe("details step", () => {
		describe("when back button is clicked", () => {
			it("should go back to email step", async () => {
				const { wrapper, roomMembersStore } = setup();

				roomMembersStore.addMemberByEmail = vi.fn().mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND);

				const emailInput = wrapper.getComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
				await emailInput.setValue("test-email@example.com");

				await clickAddButton();

				expect((wrapper.vm as unknown as VueWrapper & { step: string }).step).toBe("details");

				const backBtn = wrapper.getComponent('[data-testid="add-external-person-back-btn"]');
				await backBtn.trigger("click");

				expect((wrapper.vm as unknown as VueWrapper & { step: string }).step).toBe("email");
				expect(wrapper.getComponent('[data-testid="add-external-person-add-email-btn"]')).toBeTruthy();
			});
		});

		describe("when details are invalid", () => {
			it("should show a validation error and not call startRegistrationProcess", async () => {
				const { wrapper, roomMembersStore } = setup();

				roomMembersStore.addMemberByEmail = vi.fn().mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND);

				const emailInput = wrapper.getComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
				await emailInput.setValue("test-email@example.com");

				await clickAddButton();

				const confirmBtn = wrapper.getComponent('[data-testid="add-external-person-confirm-btn"]');
				await confirmBtn.trigger("click");

				const firstNameInput = wrapper
					.getComponent('[data-testid="add-external-person-firstname"]')
					.getComponent(VTextField);
				const lastNameInput = wrapper
					.getComponent('[data-testid="add-external-person-lastname"]')
					.getComponent(VTextField);

				expect(firstNameInput.vm.errorMessages?.length || 0).toBeGreaterThan(0);
				expect(lastNameInput.vm.errorMessages?.length || 0).toBeGreaterThan(0);

				firstNameInput.setValue("John");
				confirmBtn.trigger("click");
				await flushPromises();

				expect(firstNameInput.vm.errorMessages?.length || 0).toBe(0);
				expect(lastNameInput.vm.errorMessages?.length || 0).toBeGreaterThan(0);
				expect(roomMembersStore.startRegistrationProcess).not.toHaveBeenCalled();
			});
		});

		describe("when details are valid", () => {
			it("should call startRegistrationProcess with correct data and close dialog", async () => {
				const { wrapper, roomMembersStore } = setup();

				roomMembersStore.addMemberByEmail = vi.fn().mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND);

				const email = "test-email@example.com";
				const emailInput = wrapper.getComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
				await emailInput.setValue(email);

				await clickAddButton();

				const firstName = "John";
				const lastName = "Doe";
				const firstNameInput = wrapper
					.getComponent('[data-testid="add-external-person-firstname"]')
					.getComponent(VTextField);
				await firstNameInput.setValue(firstName);
				const lastNameInput = wrapper
					.getComponent('[data-testid="add-external-person-lastname"]')
					.getComponent(VTextField);
				await lastNameInput.setValue(lastName);

				const confirmBtn = wrapper.getComponent('[data-testid="add-external-person-confirm-btn"]');
				await confirmBtn.trigger("click");

				await flushPromises();

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

				const email = "test-email@example.com";
				const emailInput = wrapper.getComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
				await emailInput.setValue(email);

				await clickAddButton();

				const firstName = "John";
				const lastName = "Doe";
				const firstNameInput = wrapper
					.getComponent('[data-testid="add-external-person-firstname"]')
					.getComponent(VTextField);
				await firstNameInput.setValue(firstName);
				const lastNameInput = wrapper
					.getComponent('[data-testid="add-external-person-lastname"]')
					.getComponent(VTextField);
				await lastNameInput.setValue(lastName);

				const confirmBtn = wrapper.getComponent('[data-testid="add-external-person-confirm-btn"]');
				await confirmBtn.trigger("click");

				await flushPromises();

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
