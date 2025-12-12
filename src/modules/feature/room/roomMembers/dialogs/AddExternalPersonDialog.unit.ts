import AddExternalPersonDialog from "./AddExternalPersonDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ExternalMemberCheckStatus } from "@data-room";
import { VueWrapper } from "@vue/test-utils";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { Mock } from "vitest";
import { nextTick } from "vue";
import { VTextField } from "vuetify/components";

vi.mock("@vueuse/integrations/useFocusTrap");

describe("AddExternalPersonDialog", () => {
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
	});

	const setup = (options?: { memberStatus: ExternalMemberCheckStatus; modelValue: boolean }) => {
		wrapper = mount(AddExternalPersonDialog, {
			props: {
				memberStatus: options?.memberStatus || undefined,
				modelValue: options?.modelValue ?? true,
			},
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	afterEach(() => {
		wrapper.unmount();
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

		it("should emit 'update:mail' event when add button is clicked", async () => {
			const { wrapper } = setup();

			const emailInput = wrapper.findComponent('[data-testid="invite-external-person-email"]').getComponent(VTextField);
			emailInput.setValue("test@de.de");
			await nextTick();

			const addBtn = wrapper.findComponent('[data-testid="add-external-person-add-btn"]');
			await addBtn.trigger("click");

			const emitted = wrapper.emitted();
			expect(emitted).toHaveProperty("update:mail");
			expect(emitted["update:mail"]?.[0]).toEqual(["test@de.de"]);
		});

		it("should not emit 'update:mail' event when add button is clicked with invalid email", async () => {
			const { wrapper } = setup();

			const emailInput = wrapper.findComponent('[data-testid="invite-external-person-email"]').getComponent(VTextField);
			emailInput.setValue("invalid-email");
			await nextTick();

			const addBtn = wrapper.findComponent('[data-testid="add-external-person-add-btn"]');
			await addBtn.trigger("click");

			const emitted = wrapper.emitted();
			expect(emitted).not.toHaveProperty("update:mail");
		});
	});
});
