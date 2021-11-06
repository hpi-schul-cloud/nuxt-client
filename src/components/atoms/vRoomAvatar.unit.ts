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

const propsData = {
	item: mockData,
	size: 100,
	showBadge: true,
	draggable: true,
};

const getWrapper = (props: object, options?: object) => {
	return mount(vRoomAvatar, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("vRoomAvatar", () => {
	it("should display the title", () => {
		const wrapper = getWrapper({ ...propsData });
		const labelElement = wrapper.find(".sub-title").element as HTMLElement;

		expect(labelElement).toBeTruthy();
		expect(labelElement.innerHTML).toStrictEqual("Bio 12c");
	});

	it("should NOT display the title", () => {
		const wrapper = getWrapper({ ...propsData, condenseLayout: true });
		const labelElement = wrapper.find(".sub-title").element as HTMLElement;

		expect(labelElement).toBeFalsy();
	});

	it("should display the short Title", () => {
		const wrapper = getWrapper(propsData);
		const shortLabelElement = wrapper.find(".single-avatar")
			.element as HTMLElement;

		expect(shortLabelElement).toBeTruthy();
		expect(shortLabelElement.innerHTML).toStrictEqual("Bi");
	});

	it("should display the badge", () => {
		const wrapper = getWrapper({
			item: { ...mockData, notification: true },
			size: 100,
			showBadge: true,
		});
		const badgeElement = wrapper.find(".badge-component");

		expect(badgeElement).toBeTruthy();
		expect(badgeElement.vm.$props.value).toBeTruthy();
		expect(badgeElement.vm.$data.isActive).toBeTruthy();
	});

	it("should NOT display the badge", () => {
		const wrapper = getWrapper(propsData);
		const badgeElement = wrapper.find(".badge-component");

		expect(badgeElement).toBeTruthy();
		expect(badgeElement.vm.$props.value).toBeFalsy();
		expect(badgeElement.vm.$data.isActive).toBeFalsy();
	});

	it("should display the correct color and size", async () => {
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".avatar-component");

		expect(avatarComponent).toBeTruthy();
		expect(avatarComponent.vm.$props.color).toStrictEqual("#ffffff");
		expect(avatarComponent.vm.$props.size).toStrictEqual(100);
	});

	it("should have 'rounded-xl' class name", () => {
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".avatar-component");

		expect(avatarComponent).toBeTruthy();
		expect(avatarComponent.element.className).toContain("rounded-xl");
	});

	it("should have 'rounded' class name", () => {
		const wrapper = getWrapper({ ...propsData, showBadge: true });
		const avatarComponent = wrapper.find(".avatar-component");

		expect(avatarComponent).toBeTruthy();
		expect(avatarComponent.element.className).toContain("rounded");
	});

	it("should emit 'click' event with correct payload", async () => {
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".avatar-component");

		avatarComponent.trigger("click");
		await wrapper.vm.$nextTick();
		const emitted = wrapper.emitted();

		expect(emitted["click"]).toHaveLength(1);
		expect(emitted["click"] && emitted["click"][0][0]).toStrictEqual(mockData);
	});

	it("should emit 'dragStart' event when it started dragging", async () => {
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".avatar-component");

		expect(wrapper.vm.$data.isDragging).toBe(false);
		avatarComponent.trigger("dragstart");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$data.isDragging).toBe(true);
		const emitted = wrapper.emitted();

		expect(emitted["startDrag"]).toHaveLength(1);
		expect(emitted["startDrag"] && emitted["startDrag"][0][0]).toStrictEqual(
			mockData
		);
	});

	it("should emit 'drop' event when an element dropped onto it", async () => {
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".avatar-component");

		avatarComponent.trigger("drop");
		await wrapper.vm.$nextTick();
		const emitted = wrapper.emitted();

		expect(emitted["drop"]).toHaveLength(1);
	});
});
