import CourseGroupCard from "./CourseGroupCard.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { CourseGroup } from "@data-course-group";
import { mount } from "@vue/test-utils";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VCard } from "vuetify/components";

describe("CourseGroupCard", () => {
	const router = createRouterMock();
	injectRouterMock(router);

	const group: CourseGroup = {
		id: "group-1",
		name: "Group A",
		courseId: "course-1",
		members: [
			{ id: "user-1", firstName: "Ada", lastName: "Lovelace", fullName: "Ada Lovelace" },
			{ id: "user-2", firstName: "Alan", lastName: "Turing", fullName: "Alan Turing" },
		],
	};

	const setup = (props = { group }) =>
		mount(CourseGroupCard, {
			props,
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

	it("should show the group name and its members", () => {
		const wrapper = setup();

		expect(wrapper.find('[data-testid="group-name-entry"]').text()).toContain("Group A");
		expect(wrapper.findAll('[data-testid="group-member-chip"]').map((chip) => chip.text())).toEqual([
			"Ada Lovelace",
			"Alan Turing",
		]);
	});

	it("should link to the group detail page", () => {
		const wrapper = setup();

		expect(wrapper.findComponent(VCard).props("to")).toEqual({
			name: "course-room-group-details",
			params: { id: "course-1", groupId: "group-1" },
		});
	});

	it("should not render member chips for a group without members", () => {
		const wrapper = setup({ group: { ...group, members: [] } });

		expect(wrapper.find('[data-testid="group-member-chip"]').exists()).toBe(false);
	});
});
