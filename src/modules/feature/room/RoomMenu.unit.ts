import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import RoomMenu from "./RoomMenu.vue";
import { RouterLink } from "vue-router";

describe("@feature-room/RoomMenu", () => {
	const setup = () => {
		const wrapper = mount(RoomMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: ["RouterLink"],
			},
			props: {
				roomId: "123",
			},
			attachTo: document.body,
			stubs: {
				RouterLink,
			},
		});

		const menuBtn = wrapper.findComponent("[data-testid=room-menu]");

		return { wrapper, menuBtn };
	};

	it("should show all menu items", async () => {
		const { wrapper, menuBtn } = setup();
		await menuBtn.trigger("click");

		const menuItems = wrapper.findAllComponents({ name: "VListItem" });

		expect(menuItems.length).toEqual(3);
	});

	describe("when clicking on edit button", () => {
		it("should emit 'room:edit' event", async () => {
			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const editButton = wrapper.getComponent("[data-testid=room-action-edit]");
			await editButton.trigger("click");

			expect(wrapper.emitted("room:edit")).toHaveLength(1);
		});
	});

	describe("when clicking on edit button", () => {
		it("should emit 'room:edit' event", async () => {
			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const editButton = wrapper.getComponent("[data-testid=room-action-edit]");
			await editButton.trigger("click");

			expect(wrapper.emitted("room:edit")).toHaveLength(1);
		});
	});

	describe("when clicking on manage members button", () => {
		it("should emit 'room:manage-members' event", async () => {
			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const editButton = wrapper.getComponent(
				"[data-testid=room-action-manage-members]"
			);
			await editButton.trigger("click");

			expect(wrapper.emitted("room:manage-members")).toHaveLength(1);
		});
	});

	describe("when clicking on delete button", () => {
		it("should emit 'room:delete' event", async () => {
			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const editButton = wrapper.getComponent(
				"[data-testid=room-action-delete]"
			);
			await editButton.trigger("click");

			expect(wrapper.emitted("room:delete")).toHaveLength(1);
		});
	});
});
