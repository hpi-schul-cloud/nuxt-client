import { mount } from "@vue/test-utils";
import vRoomEmptyAvatar from "./vRoomEmptyAvatar.vue";

declare var createComponentMocks: Function;

describe("vRoomEmptyAvatar", () => {
	it("should display the correct size", () => {
		const wrapper = mount(vRoomEmptyAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				size: 100,
			},
		});
		const avatarComponent = wrapper.find(".avatar-component");
		expect(avatarComponent).toBeTruthy();
		expect(avatarComponent.vm.$props.size).toStrictEqual(100);
	});
});
