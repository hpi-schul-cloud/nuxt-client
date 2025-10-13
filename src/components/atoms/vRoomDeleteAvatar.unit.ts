import vRoomDeleteAvatar from "./vRoomDeleteAvatar.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("vRoomDeleteAvatar", () => {
	const setup = () => {
		const wrapper = mount(vRoomDeleteAvatar, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		return { wrapper };
	};
	it("should emit 'deleteAvatar' event when an element drops onto it", async () => {
		const { wrapper } = setup();
		const avatarComponent = wrapper.find(".delete-avatar");

		avatarComponent.trigger("drop");
		await wrapper.vm.$nextTick();

		const emitted = wrapper.emitted();

		expect(emitted["deleteAvatar"]).toHaveLength(1);
	});

	it("should change its class name while 'drag' events triggered", async () => {
		const { wrapper } = setup();
		const avatarComponent = wrapper.find(".delete-avatar");

		expect(avatarComponent.element.className).not.toContain("hovered-delete-avatar");

		avatarComponent.trigger("dragenter");
		await wrapper.vm.$nextTick();

		expect(avatarComponent.element.className).toContain("hovered-delete-avatar");

		avatarComponent.trigger("dragleave");
		await wrapper.vm.$nextTick();
		expect(avatarComponent.element.className).not.toContain("hovered-delete-avatar");
		expect(avatarComponent.element.className).toContain("delete-avatar");
	});
});
