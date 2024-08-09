import { VueWrapper, mount } from "@vue/test-utils";
import CourseAvatarIterator from "./CourseAvatarIterator.vue";
import vCourseAvatar from "@/components/atoms/vCourseAvatar.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";

const propsData = {
	itemSize: "4em",
	maxItems: 2,
	avatars: [
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

const getWrapper = () => {
	return mount(CourseAvatarIterator, {
		global: {
			plugins: [createTestingVuetify()],
			stubs: {
				VCourseAvatar: {
					template: '<div class="course-avatar" />',
					props: ["item", "draggable"],
				},
			},
		},
		props: propsData,
	});
};

describe("CourseAvatarIterator", () => {
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
		const avatarComponents = wrapper.findAllComponents(".course-avatar");

		expect(avatarComponents).toHaveLength(2);

		const avatarComponentOne = avatarComponents[0] as VueWrapper<
			typeof vCourseAvatar
		>;

		expect(avatarComponentOne.props()).toEqual({
			item: propsData.avatars[0],
			draggable: false,
		});
	});
});
