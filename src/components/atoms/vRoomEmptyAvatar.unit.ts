import { mount } from "@vue/test-utils";
import vRoomEmptyAvatar from "./vRoomEmptyAvatar.vue";

declare var createComponentMocks: Function;

describe("vRoomEmptyAvatar", () => {
	it("should have the correct size prop", () => {
		const wrapper = mount(vRoomEmptyAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				size: 100,
				location: { x: 5, y: 2 },
			},
		});
		const avatarComponent = wrapper.find(".avatar-component-empty");
		expect(avatarComponent).toBeTruthy();
		expect(avatarComponent.vm.$props.size).toStrictEqual(100);
	});

	it("should emit 'drop' event when an element drops onto it", async () => {
		const wrapper = mount(vRoomEmptyAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				size: 100,
				location: { x: 5, y: 2 },
			},
		});
		const avatarComponent = wrapper.find(".avatar-component-empty");

		avatarComponent.trigger("drop");
		await wrapper.vm.$nextTick();

		let emitted = wrapper.emitted();
		expect(emitted["drop"]).toHaveLength(1);
		expect(emitted["drop"] && emitted["drop"][0][0]).toStrictEqual({
			x: 5,
			y: 2,
		});
	});

	it("should change its class name while 'drag' events triggered", async () => {
		const wrapper = mount(vRoomEmptyAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				size: 100,
				location: { x: 5, y: 2 },
			},
		});
		const avatarComponent = wrapper.find(".avatar-component-empty");
		expect(avatarComponent.element.className).not.toContain("hovered-avatar");

		avatarComponent.trigger("dragenter");
		await wrapper.vm.$nextTick();

		expect(avatarComponent.element.className).toContain("hovered-avatar");

		avatarComponent.trigger("dragleave");
		await wrapper.vm.$nextTick();
		expect(avatarComponent.element.className).not.toContain("hovered-avatar");
	});
});
