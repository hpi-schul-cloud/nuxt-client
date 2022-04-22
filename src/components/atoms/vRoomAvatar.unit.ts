import { mount } from "@vue/test-utils";
import vRoomAvatar from "./vRoomAvatar.vue";
import EnvConfigModule from "@/store/env-config";

declare var createComponentMocks: Function;

const mockData = {
	id: "456",
	title: "Bio 12c",
	shortTitle: "Bi",
	displayColor: "#ffffff",
	xPosition: 5,
	yPosition: 2,
	startDate: "2019-12-07T23:00:00.000Z",
	untilDate: "2020-12-16T23:00:00.000Z",
	titleDate: "2019/20",
	href: "/courses/456",
};

const propsData = {
	item: mockData,
	size: "4em",
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
	beforeEach(() => {
		window.location.pathname = "";
	});
	it("should display the title", () => {
		const wrapper = getWrapper({ ...propsData });
		const labelElement = wrapper.find(".sub-title").element as HTMLElement;

		expect(labelElement).toBeTruthy();
		expect(labelElement.innerHTML.trim()).toStrictEqual("Bio 12c");
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
			size: "4em",
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
		const avatarComponent = wrapper.find(".v-avatar");

		expect(avatarComponent).toBeTruthy();
		expect(avatarComponent.vm.$props.color).toStrictEqual("#ffffff");
		expect(avatarComponent.vm.$props.size).toStrictEqual("4em");
	});

	it("should redirect to room page if env-variable is set", async () => {
		// @ts-ignore
		EnvConfigModule.setEnvs({ ROOM_VIEW_ENABLED: true });
		const location = window.location;
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".v-avatar");

		avatarComponent.trigger("click");
		expect(location.pathname).toStrictEqual("/rooms/456");
	});

	it("should redirect to room page if keyboard event triggered and env-variable is set", async () => {
		// @ts-ignore
		EnvConfigModule.setEnvs({ ROOM_VIEW_ENABLED: true });
		const location = window.location;
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".v-avatar");

		avatarComponent.trigger("keypress.enter");
		expect(location.pathname).toStrictEqual("/rooms/456");
	});

	it("should not redirect to course page if condenseLayout props is true", async () => {
		const location = window.location;
		const wrapper = getWrapper({
			item: mockData,
			size: "4em",
			showBadge: true,
			draggable: true,
			condenseLayout: true,
		});
		const avatarComponent = wrapper.find(".v-avatar");

		avatarComponent.trigger("click");
		expect(location.pathname).toStrictEqual("");
	});

	it("should emit 'dragStart' event when it started dragging", async () => {
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".v-avatar");

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
		const avatarComponent = wrapper.find(".v-avatar");

		avatarComponent.trigger("drop");
		await wrapper.vm.$nextTick();
		const emitted = wrapper.emitted();

		expect(emitted["drop"]).toHaveLength(1);
	});

	it("should NOT emit 'dragStart' event if 'draggable' prop is set false", async () => {
		const wrapper = getWrapper({
			item: mockData,
			size: "4em",
			showBadge: true,
			draggable: false,
		});
		const avatarComponent = wrapper.find(".v-avatar");

		avatarComponent.trigger("dragstart");
		await wrapper.vm.$nextTick();
		const emitted = wrapper.emitted();

		expect(emitted["startDrag"]).toBe(undefined);
	});
	it("should display the date title", () => {
		const propData = {
			item: {
				id: "123",
				title: "History",
				shortTitle: "Hi",
				displayColor: "#EF6C00",
				startDate: "2015-07-31T22:00:00.000Z",
				untilDate: "2018-07-30T22:00:00.000Z",
				titleDate: "2015-2018",
				searchText: "History 2015-2018",
				isArchived: true,
			},
			size: "4em",
			showBadge: true,
			draggable: true,
		};

		const wrapper = getWrapper({ ...propData });
		const element = wrapper.find(".date-title").element as HTMLElement;

		expect(element).toBeTruthy();
		expect(element.innerHTML.trim()).toStrictEqual("2015-2018");
	});
});
