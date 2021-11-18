import { mount } from "@vue/test-utils";
import vRoomEmptyAvatar from "./vRoomEmptyAvatar.vue";

declare var createComponentMocks: Function;

const propsData = {
	size: "4em",
};

const getWrapper = (props: object, options?: object) => {
	return mount(vRoomEmptyAvatar, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("vRoomEmptyAvatar", () => {
	it("should have the correct size prop", () => {
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".avatar-component-empty");
		expect(avatarComponent).toBeTruthy();
		expect(avatarComponent.vm.$props.size).toStrictEqual("4em");
	});

	it("should emit 'drop' event when an element drops onto it", async () => {
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".avatar-component-empty");

		avatarComponent.trigger("drop");
		await wrapper.vm.$nextTick();
		const emitted = wrapper.emitted();

		expect(emitted["drop"]).toHaveLength(1);
	});

	it("should change its class name while 'drag' events triggered", async () => {
		const wrapper = getWrapper(propsData);
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
