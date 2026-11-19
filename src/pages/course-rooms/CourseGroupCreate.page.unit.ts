import CourseGroupCreatePage from "./CourseGroupCreate.page.vue";
import CourseGroupForm from "@/components/course-rooms/groups/CourseGroupForm.vue";
import { createTestAppStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as courseGroupModule from "@data-course-group";
import { CourseGroupCourse } from "@data-course-group";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

describe("CourseGroupCreate.page", () => {
	const course: CourseGroupCourse = {
		id: "course-1",
		name: "Math",
		isArchived: false,
		students: [{ id: "user-1", firstName: "Ada", lastName: "Lovelace", fullName: "Ada Lovelace" }],
		teachers: [],
	};

	const setup = async ({ createFails = false } = {}) => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
		const router = createRouterMock();
		injectRouterMock(router);

		const composable = {
			fetchCourse: vi.fn().mockResolvedValue(course),
			createGroup: vi.fn().mockResolvedValue(createFails ? undefined : { id: "group-1" }),
			isMutating: ref(false),
		};
		vi.spyOn(courseGroupModule, "useCourseGroups").mockReturnValue(
			composable as unknown as ReturnType<typeof courseGroupModule.useCourseGroups>
		);

		const wrapper = mount(CourseGroupCreatePage, {
			props: { courseId: "course-1" },
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { CourseGroupForm: true },
			},
		});
		await flushPromises();

		return { wrapper, router, composable };
	};

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should offer the course students as members", async () => {
		const { wrapper, composable } = await setup();

		expect(composable.fetchCourse).toHaveBeenCalledWith("course-1");
		expect(wrapper.findComponent(CourseGroupForm).props("studentOptions")).toEqual([
			{ title: "Ada Lovelace", value: "user-1" },
		]);
	});

	it("should create the group and go back to the groups tab", async () => {
		const { wrapper, router, composable } = await setup();

		wrapper.findComponent(CourseGroupForm).vm.$emit("submit", { name: "Group A", userIds: ["user-1"] });
		await flushPromises();

		expect(composable.createGroup).toHaveBeenCalledWith("course-1", { name: "Group A", userIds: ["user-1"] });
		expect(router.push).toHaveBeenCalledWith({
			name: "room-details",
			params: { id: "course-1" },
			query: { tab: "groups" },
		});
	});

	it("should stay on the page when creating fails", async () => {
		const { wrapper, router } = await setup({ createFails: true });

		wrapper.findComponent(CourseGroupForm).vm.$emit("submit", { name: "Group A", userIds: [] });
		await flushPromises();

		expect(router.push).not.toHaveBeenCalled();
	});

	it("should go back to the groups tab on cancel", async () => {
		const { wrapper, router } = await setup();

		wrapper.findComponent(CourseGroupForm).vm.$emit("cancel");
		await flushPromises();

		expect(router.push).toHaveBeenCalledWith(expect.objectContaining({ query: { tab: "groups" } }));
	});
});
