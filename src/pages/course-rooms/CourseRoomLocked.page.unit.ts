import CourseRoomLockedPage from "./CourseRoomLocked.page.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("@/pages/CourseRoomLockedPage", () => {
	const setup = () => {
		const wrapper = mount(CourseRoomLockedPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				title: "Locked Course",
			},
		});

		return { wrapper };
	};

	it("should render permission error svg", () => {
		const { wrapper } = setup();

		const svgElement = wrapper.findComponent({ name: "permission-error-svg" });
		expect(svgElement.exists()).toBe(true);
	});

	it("should render course title", () => {
		const { wrapper } = setup();

		const titleElement = wrapper.get("[data-testid='courses-course-title']");

		expect(titleElement.text()).toBe("Locked Course");
	});

	it("should render error message", () => {
		const { wrapper } = setup();

		expect(wrapper.text()).toContain("pages.courseRooms.course-locked");
	});

	it("should render correct breadcrumbs", () => {
		const { wrapper } = setup();

		const breadcrumbs = wrapper.findAllComponents({
			name: "v-breadcrumbs-item",
		});

		expect(breadcrumbs).toHaveLength(2);
		expect(breadcrumbs[0].text()).toBe("common.words.courses");
		expect(breadcrumbs[1].text()).toBe("Locked Course");
		expect(breadcrumbs[1].props("disabled")).toBe(true);
	});
});
