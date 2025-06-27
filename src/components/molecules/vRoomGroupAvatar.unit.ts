import vRoomAvatar from "@/components/atoms/vRoomAvatar.vue";
import RoomAvatarIterator from "@/components/organisms/RoomAvatarIterator.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { VBadge, VCard } from "vuetify/lib/components/index";
import vRoomGroupAvatar from "./vRoomGroupAvatar.vue";

vi.mock("vue-router");

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
	size: "4em",
	maxItems: 4,
};

const getWrapper = (
	props: {
		data: object;
		size: string;
		maxItems: number;
		draggable?: boolean;
	} = propsData,
	options?: object
) => {
	return mount(vRoomGroupAvatar, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props,
		...options,
	});
};

describe("vRoomGroupAvatar", () => {
	it("should display the title", () => {
		const wrapper = getWrapper(propsData);
		const labelElement = wrapper.find(".subtitle").element as HTMLElement;

		expect(labelElement).toBeTruthy();
		expect(labelElement.innerHTML.trim()).toStrictEqual("Fourth");
	});

	it("should display the badge", () => {
		const wrapper = getWrapper(propsData);
		const badgeElement = wrapper.findComponent(VBadge);

		expect(badgeElement).toBeTruthy();
		expect(badgeElement.props("modelValue")).toBeTruthy();
	});

	it("should NOT display the badge", () => {
		const wrapper = getWrapper({
			data: secondMockData,
			size: "4em",
			maxItems: 4,
		});
		const badgeElement = wrapper.findComponent(VBadge);

		expect(badgeElement).toBeTruthy();
		expect(badgeElement.props("modelValue")).toBeFalsy();
	});

	it("should display the correct size and group-avatar property", () => {
		const wrapper = getWrapper(propsData);
		const iterator = wrapper.findComponent(RoomAvatarIterator);

		expect(iterator).toBeTruthy();
		expect(iterator.props("itemSize")).toStrictEqual("0.8em");
		expect(iterator.props("avatars")).toStrictEqual(mockData.groupElements);
		expect(iterator.props("condenseLayout")).toBe(true);
	});

	it("should have correct amount of items", () => {
		const wrapper = getWrapper(propsData);
		const avatarComponents = wrapper.findAllComponents(vRoomAvatar);

		expect(avatarComponents).toBeTruthy();
		expect(avatarComponents).toHaveLength(3);
	});

	it("should contain the correct item", () => {
		const wrapper = getWrapper(propsData);
		const avatarComponents = wrapper.findAllComponents(vRoomAvatar);

		expect(avatarComponents[0].props("item").id).toStrictEqual("5");
	});

	it("should emit 'click' event with correct payload", async () => {
		const wrapper = getWrapper(propsData);
		const cardComponent = wrapper.findComponent(VCard);

		cardComponent.trigger("click");
		await Promise.resolve();
		const emitted = wrapper.emitted();

		expect(emitted["clicked"]).toHaveLength(1);
		expect(emitted["clicked"]).toStrictEqual([[mockData.id]]);
	});

	it("should emit 'click' event with correct payload if keyboard event triggered", async () => {
		const wrapper = getWrapper(propsData);
		const cardComponent = wrapper.findComponent(VCard);

		cardComponent.trigger("keypress.enter");
		await Promise.resolve();
		const emitted = wrapper.emitted();

		expect(emitted["clicked"]).toHaveLength(1);
		expect(emitted["clicked"]).toStrictEqual([[mockData.id]]);
	});

	it("should emit 'dragStart' event when it started dragging", async () => {
		const wrapper = getWrapper({
			data: mockData,
			size: "4em",
			maxItems: 4,
			draggable: true,
		});
		const avatarComponent = wrapper.findComponent(vRoomAvatar);

		avatarComponent.trigger("dragstart");
		await Promise.resolve();
		const emitted = wrapper.emitted();

		expect(emitted["startDrag"]).toHaveLength(1);
		expect(emitted["startDrag"]).toStrictEqual([[mockData]]);
	});

	it("should NOT emit 'dragStart' event if 'draggable' prop is set false", async () => {
		const wrapper = getWrapper({
			data: mockData,
			size: "4em",
			maxItems: 4,
			draggable: false,
		});
		const avatarComponent = wrapper.findComponent(vRoomAvatar);

		avatarComponent.trigger("dragstart");
		await Promise.resolve();
		const emitted = wrapper.emitted();

		expect(emitted["startDrag"]).toBe(undefined);
	});
});
