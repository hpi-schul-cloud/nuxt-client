import { mount } from "@vue/test-utils";
import vRoomAvatar from "./vRoomAvatar.vue";

declare var createComponentMocks: Function;

const mockData = {
	id: "456",
	title: "Bio 12c",
	shortTitle: "Bi",
	displayColor: "#ffffff",
	xPosition: 5,
	yPosition: 2,
};

describe("vRoomAvatar", () => {
	it("should display the title", () => {
		const wrapper = mount(vRoomAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				item: mockData,
				size: 100,
				groupAvatar: false,
				showBadge: true,
			},
		});
		const labelElement = wrapper.find(".sub-title").element as HTMLInputElement;
		expect(labelElement).toBeTruthy();
		expect(labelElement.innerHTML).toStrictEqual("Bio 12c");
	});

	it("should display the short Title", () => {
		const wrapper = mount(vRoomAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				item: mockData,
				size: 100,
				groupAvatar: false,
				showBadge: true,
			},
		});
		const shortLabelElement = wrapper.find(".single-avatar")
			.element as HTMLInputElement;
		expect(shortLabelElement).toBeTruthy();
		expect(shortLabelElement.innerHTML).toStrictEqual("Bi");
	});

	it("should display the badge", () => {
		const wrapper = mount(vRoomAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				item: { ...mockData, notification: true },
				size: 100,
				groupAvatar: false,
				showBadge: true,
			},
		});
		const badgeElement = wrapper.find(".badge-component");
		expect(badgeElement).toBeTruthy();
		expect(badgeElement.vm.$props.value).toBeTruthy();
		expect(badgeElement.vm.$data.isActive).toBeTruthy();
	});

	it("should NOT display the badge", () => {
		const wrapper = mount(vRoomAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				item: mockData,
				size: 100,
				groupAvatar: false,
				showBadge: true,
			},
		});
		const badgeElement = wrapper.find(".badge-component");
		expect(badgeElement).toBeTruthy();
		expect(badgeElement.vm.$props.value).toBeFalsy();
		expect(badgeElement.vm.$data.isActive).toBeFalsy();
	});

	it("should display the correct color and size", () => {
		const wrapper = mount(vRoomAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				item: mockData,
				size: 100,
				groupAvatar: false,
				showBadge: true,
			},
		});
		const avatarComponent = wrapper.find(".avatar-component");
		expect(avatarComponent).toBeTruthy();
		expect(avatarComponent.vm.$props.color).toStrictEqual("#ffffff");
		expect(avatarComponent.vm.$props.size).toStrictEqual(100);
	});

	it("should have 'rounded-xl' class name", () => {
		const wrapper = mount(vRoomAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				item: mockData,
				size: 100,
				groupAvatar: false,
				showBadge: true,
			},
		});
		const avatarComponent = wrapper.find(".avatar-component");
		expect(avatarComponent).toBeTruthy();
		expect(avatarComponent.element.className).toContain("rounded-xl");
	});

	it("should have 'rounded' class name", () => {
		const wrapper = mount(vRoomAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				item: mockData,
				size: 100,
				groupAvatar: true,
				showBadge: true,
			},
		});
		const avatarComponent = wrapper.find(".avatar-component");
		expect(avatarComponent).toBeTruthy();
		expect(avatarComponent.element.className).toContain("rounded");
	});

	it("should emit 'click' event with correct payload", async () => {
		const wrapper = mount(vRoomAvatar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				item: mockData,
				size: 100,
				groupAvatar: false,
				showBadge: true,
			},
		});
		const avatarComponent = wrapper.find(".avatar-component");

		avatarComponent.trigger("click");
		await wrapper.vm.$nextTick();

		let emitted = wrapper.emitted();
		expect(emitted["click"]).toHaveLength(1);
		expect(emitted["click"] && emitted["click"][0][0]).toStrictEqual(mockData);
	});
});
