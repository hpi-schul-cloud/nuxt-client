import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import ConfirmationDialog from "./ConfirmationDialog.vue";
import { VCard, VDialog } from "vuetify/lib/components/index";
import { VueWrapper } from "@vue/test-utils";
import { LeaveRoomProhibitedDialog } from "@ui-room-details";
import { WarningAlert } from "@ui-alert";

describe("ConfirmationDialog", () => {
	let wrapper: VueWrapper<InstanceType<typeof ConfirmationDialog>>;

	const setup = () => {
		wrapper = mount(LeaveRoomProhibitedDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { modelValue: true },
		});
		return { wrapper };
	};

	afterEach(() => {
		wrapper.unmount(); // otherwise tests break when running all tests, necessary due focus trap
	});

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
		});

		it("should render dialog title", async () => {
			const { wrapper } = setup();

			const dialogTitle = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.find('[data-testid="dialog-title"]');

			expect(dialogTitle.text()).toContain("pages.rooms.leaveRoom.menu");
		});

		it("should render warning alert", async () => {
			const { wrapper } = setup();

			const warningAlert = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.findComponent(WarningAlert);

			expect(warningAlert.text()).toBe(
				"pages.rooms.leaveRoom.RoomOwner.warning"
			);
		});
	});

	describe("close button", () => {
		it("should update model value when dialog is closed", async () => {
			const { wrapper } = setup();

			const dialog = wrapper.findComponent(VDialog);

			const closeButton = dialog
				.findComponent(VCard)
				.find("[data-testid='dialog-close']");

			await closeButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("update:modelValue");
			expect(wrapper.emitted("update:modelValue")).toEqual([[false]]);
		});
	});
});
