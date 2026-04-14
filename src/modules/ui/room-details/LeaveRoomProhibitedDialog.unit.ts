import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { LeaveRoomProhibitedDialog } from "@ui-room-details";
import { setActivePinia } from "pinia";

describe("LeaveRoomProhibitedDialog", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = () => {
		const wrapper = mount(LeaveRoomProhibitedDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				modelValue: true,
			},
		});
		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
		});
	});
});
