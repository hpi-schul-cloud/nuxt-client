import { mount } from "@vue/test-utils";
import vRoomDeleteAvatar from "./vRoomDeleteAvatar.vue";

declare var createComponentMocks: Function;

describe("vRoomDeleteAvatar", () => {
	it("should emit 'deleteAvatar' event when an element drops onto it", async () => {
		const wrapper = mount(vRoomDeleteAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
		});
		const avatarComponent = wrapper.find(".delete-avatar");

		avatarComponent.trigger("drop");
		await wrapper.vm.$nextTick();

		let emitted = wrapper.emitted();
		expect(emitted["deleteAvatar"]).toHaveLength(1);
	});

	it("should change its class name while 'drag' events triggered", async () => {
		const wrapper = mount(vRoomDeleteAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
		});
		const avatarComponent = wrapper.find(".delete-avatar");
		expect(avatarComponent.element.className).not.toContain(
			"hovered-delete-avatar"
		);

		avatarComponent.trigger("dragenter");
		await wrapper.vm.$nextTick();

		expect(avatarComponent.element.className).toContain(
			"hovered-delete-avatar"
		);

		avatarComponent.trigger("dragleave");
		await wrapper.vm.$nextTick();
		expect(avatarComponent.element.className).not.toContain(
			"hovered-delete-avatar"
		);
		expect(avatarComponent.element.className).toContain("delete-avatar");
	});
});
