import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { KebabMenuActionRoomMembers } from "@ui-kebab-menu";

describe("KebabMenuActionRoomMembers", () => {
	const setup = (canAddRoomMembers: boolean) => {
		const wrapper = mount(KebabMenuActionRoomMembers, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				canAddRoomMembers,
			},
		});

		return {
			wrapper,
		};
	};

	describe("when the user can add room members", () => {
		it("should show manage room members text", async () => {
			const { wrapper } = setup(true);

			const menuAction = wrapper.find(
				"[data-testId=kebab-menu-action-room-members]"
			);
			expect(menuAction.text()).toBe("pages.rooms.members.manage");
		});
	});

	describe("when the user can not add room members", () => {
		it("should show view room members text", async () => {
			const { wrapper } = setup(false);

			const menuAction = wrapper.find(
				"[data-testId=kebab-menu-action-room-members]"
			);
			expect(menuAction.text()).toBe("pages.rooms.members.view");
		});
	});
});
