import CourseGroupEditPage from "./CourseGroupEdit.page.vue";
import CourseGroupForm from "@/components/course-rooms/groups/CourseGroupForm.vue";
import { createTestAppStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as courseGroupModule from "@data-course-group";
import { CourseGroup, CourseGroupCourse } from "@data-course-group";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

describe("CourseGroupEdit.page", () => {
	const ada = { id: "user-1", firstName: "Ada", lastName: "Lovelace", fullName: "Ada Lovelace" };
	const alan = { id: "user-2", firstName: "Alan", lastName: "Turing", fullName: "Alan Turing" };
	const course: CourseGroupCourse = { id: "course-1", name: "Math", isArchived: false, students: [ada], teachers: [] };
	// Alan already left the course but is still in the group
	const group: CourseGroup = { id: "group-1", name: "Group A", courseId: "course-1", members: [ada, alan] };

	const setup = async ({ updateSuccess = true } = {}) => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
		const router = createRouterMock();
		injectRouterMock(router);

		const composable = {
			fetchCourse: vi.fn().mockResolvedValue(course),
			fetchGroup: vi.fn().mockResolvedValue(group),
			updateGroup: vi.fn().mockResolvedValue(updateSuccess),
			isMutating: ref(false),
		};
		vi.spyOn(courseGroupModule, "useCourseGroups").mockReturnValue(
			composable as unknown as ReturnType<typeof courseGroupModule.useCourseGroups>
		);

		const wrapper = mount(CourseGroupEditPage, {
			props: { courseId: "course-1", groupId: "group-1" },
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

	it("should prefill the form with the group", async () => {
		const { wrapper } = await setup();

		const form = wrapper.findComponent(CourseGroupForm);
		expect(form.props("initialName")).toBe("Group A");
		expect(form.props("initialMemberIds")).toEqual(["user-1", "user-2"]);
		expect(form.props("isEdit")).toBe(true);
	});

	it("should keep members who left the course selectable", async () => {
		const { wrapper } = await setup();

		expect(wrapper.findComponent(CourseGroupForm).props("studentOptions")).toEqual([
			{ title: "Ada Lovelace", value: "user-1" },
			{ title: "Alan Turing", value: "user-2" },
		]);
	});

	it("should save and go to the group page", async () => {
		const { wrapper, router, composable } = await setup();

		wrapper.findComponent(CourseGroupForm).vm.$emit("submit", { name: "Renamed", userIds: ["user-1"] });
		await flushPromises();

		expect(composable.updateGroup).toHaveBeenCalledWith("group-1", "course-1", {
			name: "Renamed",
			userIds: ["user-1"],
		});
		expect(router.push).toHaveBeenCalledWith({
			name: "course-room-group-details",
			params: { id: "course-1", groupId: "group-1" },
		});
	});

	it("should stay on the page when saving fails", async () => {
		const { wrapper, router } = await setup({ updateSuccess: false });

		wrapper.findComponent(CourseGroupForm).vm.$emit("submit", { name: "Renamed", userIds: [] });
		await flushPromises();

		expect(router.push).not.toHaveBeenCalled();
	});

	it("should go to the group page on cancel", async () => {
		const { wrapper, router } = await setup();

		wrapper.findComponent(CourseGroupForm).vm.$emit("cancel");
		await flushPromises();

		expect(router.push).toHaveBeenCalledWith(expect.objectContaining({ name: "course-room-group-details" }));
	});
});
