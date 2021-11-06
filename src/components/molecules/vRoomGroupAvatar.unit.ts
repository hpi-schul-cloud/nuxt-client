import { mount } from "@vue/test-utils";
import vRoomGroupAvatar from "./vRoomGroupAvatar.vue";

declare var createComponentMocks: Function;

const mockData = {
	id: "4",
	title: "Fourth",
	shortTitle: "Bi",
	displayColor: "#EC407A",
	url: "/api/xxxx/1234w",
	xPosition: 2,
	yPosition: 4,
	groupElements: [
		{
			id: "5",
			title: "Math 7a",
			displayColor: "yellow",
		},
		{
			id: "6",
			title: "Bio 3a",
			displayColor: "green",
			notification: true,
		},
		{
			id: "7",
			title: "Geo 7b",
			displayColor: "yellow",
		},
	],
};

const secondMockData = {
	id: "4",
	title: "Fourth",
	shortTitle: "Bi",
	displayColor: "#EC407A",
	url: "/api/xxxx/1234w",
	xPosition: 2,
	yPosition: 4,
	groupElements: [
		{
			id: "5",
			title: "Math 7a",
			displayColor: "yellow",
		},
		{
			id: "6",
			title: "Bio 3a",
			displayColor: "green",
		},
		{
			id: "7",
			title: "Geo 7b",
			displayColor: "yellow",
		},
	],
};

const propsData = {
	data: mockData,
	size: 100,
	maxItems: 4,
};

const getWrapper = (props: object, options?: object) => {
	return mount(vRoomGroupAvatar, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("vRoomGroupAvatar", () => {
	it("should display the title", () => {
		const wrapper = getWrapper(propsData);
		const labelElement = wrapper.find(".sub-title").element as HTMLElement;

		expect(labelElement).toBeTruthy();
		expect(labelElement.innerHTML).toStrictEqual("Fourth");
	});

	it("should display the badge", () => {
		const wrapper = getWrapper(propsData);
		const badgeElement = wrapper.find(".badge-component");

		expect(badgeElement).toBeTruthy();
		expect(badgeElement.vm.$props.value).toBeTruthy();
		expect(badgeElement.vm.$data.isActive).toBeTruthy();
	});

	it("should NOT display the badge", () => {
		const wrapper = getWrapper({
			data: secondMockData,
			size: 100,
			maxItems: 4,
		});
		const badgeElement = wrapper.find(".badge-component");

		expect(badgeElement).toBeTruthy();
		expect(badgeElement.vm.$props.value).toBeFalsy();
		expect(badgeElement.vm.$data.isActive).toBeFalsy();
	});

	it("should display the correct size and group-avatar property", () => {
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".group-avatar-component");

		expect(avatarComponent).toBeTruthy();
		expect(avatarComponent.vm.$props.size).toStrictEqual(100 / 3);
		expect(avatarComponent.vm.$props.condenseLayout).toStrictEqual(true);
	});

	it("should have correct amount of items", () => {
		const wrapper = getWrapper(propsData);
		const avatarComponents = wrapper.findAll(".group-avatar-component");

		expect(avatarComponents).toBeTruthy();
		expect(avatarComponents).toHaveLength(3);
	});

	it("should contain the correct item", () => {
		const wrapper = getWrapper(propsData);
		const avatarComponents = wrapper.findAll(".group-avatar-component");

		expect(avatarComponents.wrappers[0].vm.$props.item.id).toStrictEqual("5");
	});

	it("should emit 'click' event with correct payload", async () => {
		const wrapper = getWrapper(propsData);
		const cardComponent = wrapper.find(".card-component");

		cardComponent.trigger("click");
		await wrapper.vm.$nextTick();
		const emitted = wrapper.emitted();

		expect(emitted["clicked"]).toHaveLength(1);
		expect(emitted["clicked"] && emitted["clicked"][0][0]).toStrictEqual(
			mockData.id
		);
	});

	it("should emit 'dragStart' event when it started dragging", async () => {
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".group-avatar-component");

		avatarComponent.trigger("dragstart");
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const emitted = wrapper.emitted();

		expect(emitted["startDrag"]).toHaveLength(1);
		expect(emitted["startDrag"] && emitted["startDrag"][0][0]).toStrictEqual(
			mockData
		);
	});
});
