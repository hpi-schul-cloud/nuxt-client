import vRoomEmptyAvatar from "./vRoomEmptyAvatar.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

describe("vRoomEmptyAvatar", () => {
	const setup = () => {
		const wrapper = mount(vRoomEmptyAvatar, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: {
				size: "4em",
			},
		});
		return { wrapper };
	};

	it("should have the correct size prop", () => {
		const { wrapper } = setup();
		const avatarComponent = wrapper.findComponent({ name: "VAvatar" });

		expect(avatarComponent).toBeTruthy();
		expect(avatarComponent.props().size).toStrictEqual("4em");
	});

	it("should emit 'drop' event when an element drops onto it", async () => {
		const { wrapper } = setup();
		const avatarComponent = wrapper.findComponent({ name: "VAvatar" });

		avatarComponent.trigger("drop");
		await nextTick();

		expect(wrapper.emitted()).toHaveProperty("drop");
	});

	it("should change its class name while 'drag' events triggered", async () => {
		const { wrapper } = setup();
		const avatarComponent = wrapper.findComponent({ name: "VAvatar" });
		expect(avatarComponent.element.className).not.toContain("hovered-avatar");

		avatarComponent.trigger("dragenter");
		await nextTick();
		expect(avatarComponent.element.className).toContain("hovered-avatar");

		avatarComponent.trigger("dragleave");
		await wrapper.vm.$nextTick();
		expect(avatarComponent.element.className).not.toContain("hovered-avatar");
	});
});
