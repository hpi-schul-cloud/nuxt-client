import { VueWrapper, mount } from "@vue/test-utils";
import RoomAvatarIterator from "./RoomAvatarIterator.vue";
import vRoomAvatar from "@/components/atoms/vRoomAvatar.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";

const propsData = {
	itemSize: "4em",
	maxItems: 2,
	showBadge: true,
	avatars: [
		{
			id: "123",
			title: "Math 1a",
			shortTitle: "Ma",
			displayColor: "#f23f76",
			xPosition: 0,
			yPosition: 0,
			to: "",
		},
		{
			id: "234",
			title: "Spanish",
			shortTitle: "Sp",
			displayColor: "#f23f76",
			xPosition: 0,
			yPosition: 0,
			to: "",
		},
		{
			id: "345",
			title: "Bio 12c",
			shortTitle: "Bi",
			displayColor: "#ffffff",
			xPosition: 0,
			yPosition: 0,
			to: "",
		},
		{
			id: "456",
			title: "Geometry",
			shortTitle: "Ge",
			displayColor: "#ffffff",
			xPosition: 0,
			yPosition: 0,
			to: "",
		},
	],
	condenseLayout: true,
};

const getWrapper = () => {
	return mount(RoomAvatarIterator, {
		global: {
			plugins: [createTestingVuetify()],
			stubs: {
				VRoomAvatar: {
					template: '<div class="room-avatar" />',
					props: ["item", "draggable"],
				},
			},
		},
		props: propsData,
	});
};

describe("RoomAvatarIterator", () => {
	it("should have props", async () => {
		const wrapper = getWrapper();

		expect(wrapper.props()).toEqual({
			...propsData,
			colCount: 4,
			canDraggable: false,
		});
	});

	it("should iterate 2 avatar components", async () => {
		const wrapper = getWrapper();
		const avatarComponents = wrapper.findAllComponents(".room-avatar");

		expect(avatarComponents).toHaveLength(2);

		const avatarComponentOne = avatarComponents[0] as VueWrapper<
			typeof vRoomAvatar
		>;

		expect(avatarComponentOne.props()).toEqual({
			item: propsData.avatars[0],
			draggable: false,
		});
	});
});
