import AddExternalPersonDialog from "./AddExternalPersonDialog.vue";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import { schoolFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { ExternalMemberCheckStatus, useRoomMembersStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { Mock } from "vitest";
import { nextTick } from "vue";
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
		roomMembersStore.registerExternalMember = vi.fn();

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

	describe("when component is mounted", () => {
		it("should render the component", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(AddExternalPersonDialog).exists()).toBe(true);
		});
	});

	describe("emits", () => {
		it("should emit 'close' event when dialog is closed", async () => {
			const { wrapper } = setup();
			const closeBtn = wrapper.findComponent('[data-testid="add-external-person-cancel-btn"]');

			await closeBtn.trigger("click");

			const emitted = wrapper.emitted();

			expect(emitted).toHaveProperty("close");
		});
	});

	describe("email step", () => {
		it("should handle invalid email validation", async () => {
			const { wrapper } = setup();

			const emailInput = wrapper.findComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
			emailInput.setValue("invalid-email");
			await nextTick();

			const addBtn = wrapper.findComponent('[data-testid="add-external-person-add-email-btn"]');
			await addBtn.trigger("click");

			expect(emailInput.vm.errorMessages?.length || 0).toBeGreaterThan(0);
		});
		it("should continue to the details step when a valid email address was entered and the backend returned ACCOUNT_FOUND_AND_ADDED", async () => {
			const { wrapper, roomMembersStore } = setup();

			roomMembersStore.addMemberByEmail = vi.fn().mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_FOUND_AND_ADDED);
			const email = "test@example.com";
			const emailInput = wrapper.findComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
			await emailInput.setValue(email);

			const addBtn = wrapper.findComponent('[data-testid="add-external-person-add-email-btn"]');
			await addBtn.trigger("click");

			await nextTick();

			expect(roomMembersStore.addMemberByEmail).toHaveBeenCalledWith(email);
			expect(wrapper.emitted()).toHaveProperty("close");
		});
		it("should continue to the details step when a valid email address was entered and the backend returned ACCOUNT_NOT_FOUND", async () => {
			const { wrapper, roomMembersStore } = setup();

			roomMembersStore.addMemberByEmail = vi.fn().mockResolvedValue(ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND);

			const emailInput = wrapper.findComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
			await emailInput.setValue("test-email@example.com");

			const addBtn = wrapper.findComponent('[data-testid="add-external-person-add-email-btn"]');
			await addBtn.trigger("click");

			await flushPromises();

			expect(roomMembersStore.addMemberByEmail).toHaveBeenCalledWith("test-email@example.com");

			expect((wrapper.vm as unknown as VueWrapper & { step: string }).step).toBe("details");

			const emailInputAfter = wrapper.findComponent<typeof VTextField>('[data-testid="add-external-person-email"]');
			expect(emailInputAfter.props().readonly).toBe(true);

			expect(wrapper.findComponent('[data-testid="add-external-person-firstname"]').exists()).toBe(true);
			expect(wrapper.findComponent('[data-testid="add-external-person-confirm-btn"]').exists()).toBe(true);
			expect(wrapper.findComponent('[data-testid="add-external-person-add-email-btn"]').exists()).toBe(false);
		});
	});
});
