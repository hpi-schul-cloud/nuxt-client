import CourseGroupTopicList from "./CourseGroupTopicList.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("CourseGroupTopicList", () => {
	const topics = [{ id: "lesson-1", name: "Topic 1" }];

	const setup = (props: { topics?: typeof topics; canCreate?: boolean; canEdit?: boolean } = {}) =>
		mount(CourseGroupTopicList, {
			props: { topics, courseId: "course-1", groupId: "group-1", ...props },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

	it("should link each topic to the legacy topic page of the group", () => {
		const wrapper = setup();

		const topic = wrapper.find('[data-testid="course-group-topic"]');
		expect(topic.text()).toContain("Topic 1");
		expect(topic.attributes("href")).toBe("/courses/course-1/topics/lesson-1?courseGroup=group-1");
	});

	it("should show the empty text without topics", () => {
		const wrapper = setup({ topics: [] });

		expect(wrapper.find('[data-testid="course-group-topics-empty"]').exists()).toBe(true);
	});

	it("should offer adding a topic only when allowed", () => {
		expect(setup().find('[data-testid="course-group-add-topic"]').exists()).toBe(false);

		const addButton = setup({ canCreate: true }).find('[data-testid="course-group-add-topic"]');
		expect(addButton.attributes("href")).toBe("/courses/course-1/topics/add?courseGroup=group-1");
	});

	describe("when topics can be edited", () => {
		it("should link to the legacy editor with a return url to the group page", () => {
			const wrapper = setup({ canEdit: true });

			expect(wrapper.find('[data-testid="course-group-topic-edit"]').attributes("href")).toBe(
				"/courses/course-1/topics/lesson-1/edit?courseGroup=group-1&returnUrl=rooms%2Fcourse-1%2Fgroups%2Fgroup-1"
			);
		});

		it("should emit delete with the topic", async () => {
			const wrapper = setup({ canEdit: true });

			await wrapper.find('[data-testid="course-group-topic-delete"]').trigger("click");

			expect(wrapper.emitted("delete")).toEqual([[topics[0]]]);
		});
	});

	it("should hide edit and delete when topics cannot be edited", () => {
		const wrapper = setup();

		expect(wrapper.find('[data-testid="course-group-topic-edit"]').exists()).toBe(false);
		expect(wrapper.find('[data-testid="course-group-topic-delete"]').exists()).toBe(false);
	});
});
