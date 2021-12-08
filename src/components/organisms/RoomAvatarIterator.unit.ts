import { mount } from "@vue/test-utils";
import RoomAvatarIterator from "./RoomAvatarIterator.vue";

declare var createComponentMocks: Function;

const propsData = {
	itemSize: "4em",
	maxItems: 2,
	items: [
		{
			id: "123",
			title: "Math 1a",
			shortTitle: "Ma",
			displayColor: "#f23f76",
		},
		{
			id: "234",
			title: "Spanish",
			shortTitle: "Sp",
			displayColor: "#f23f76",
		},
		{
			id: "345",
			title: "Bio 12c",
			shortTitle: "Bi",
			displayColor: "#ffffff",
		},
		{
			id: "456",
			title: "Geometry",
			shortTitle: "Ge",
			displayColor: "#ffffff",
		},
	],
	condenseLayout: true,
};

const getWrapper = (props: object, options?: object) => {
	return mount(RoomAvatarIterator, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("RoomAvatarIterator", () => {
	it("should have props", async () => {
		const wrapper = getWrapper(propsData);

		expect(wrapper.vm.$props.itemSize).toStrictEqual("4em");
		expect(wrapper.vm.$props.maxItems).toStrictEqual(2);
		expect(wrapper.vm.$props.items).toStrictEqual(propsData.items);
		expect(wrapper.vm.$props.colCount).toStrictEqual(4);
		expect(wrapper.vm.$props.canDraggable).toBe(false);
		expect(wrapper.vm.$props.condenseLayout).toBe(true);
	});

	it("should iterate 2 avatar components", async () => {
		const wrapper = getWrapper(propsData);
		const avatarComponents = wrapper.findAll(".room-avatar") as any;

		expect(avatarComponents).toHaveLength(2);
		expect(avatarComponents.wrappers[0].vm.item.id).toStrictEqual("123");
		expect(avatarComponents.wrappers[0].vm.draggable).toBe(false);
	});

	it("should emit item data if an item is clicked", async () => {
		const payload = {
			id: "123",
			title: "Math 1a",
			shortTitle: "Ma",
			displayColor: "#f23f76",
		};
		const wrapper = getWrapper(propsData);
		const avatarComponent = wrapper.find(".room-avatar");
		avatarComponent.vm.$emit("click", payload);
		const emitted = wrapper.emitted();

		expect(emitted["click-avatar"]).toHaveLength(1);
		expect(
			emitted["click-avatar"] && emitted["click-avatar"][0][0]
		).toStrictEqual(payload);
	});
});
