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

	const setup = async ({ updateSuccess = true, loadedGroup = group } = {}) => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
		const router = createRouterMock();
		injectRouterMock(router);

		const composable = {
			fetchCourse: vi.fn().mockResolvedValue(course),
			fetchGroup: vi.fn().mockResolvedValue(loadedGroup),
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

		expect(composable.updateGroup).toHaveBeenCalledWith("group-1", {
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

	it("should not reset the form when the page re-renders while saving", async () => {
		const { wrapper, composable } = await setup();
		const before = wrapper.findComponent(CourseGroupForm).props("initialMemberIds");

		composable.isMutating.value = true;
		await flushPromises();

		expect(wrapper.findComponent(CourseGroupForm).props("initialMemberIds")).toBe(before);
	});

	it("should redirect to the group's own course when the URL combines it with another course", async () => {
		const { wrapper, router, composable } = await setup({ loadedGroup: { ...group, courseId: "course-2" } });

		expect(router.replace).toHaveBeenCalledWith({
			name: "course-room-group-edit",
			params: { id: "course-2", groupId: "group-1" },
		});
		expect(composable.fetchCourse).not.toHaveBeenCalled();
		expect(wrapper.findComponent(CourseGroupForm).exists()).toBe(false);
	});

	it("should not navigate when the page was left while saving", async () => {
		const { wrapper, router, composable } = await setup();
		let resolveUpdate: (value: boolean) => void = () => undefined;
		composable.updateGroup.mockReturnValueOnce(new Promise((resolve) => (resolveUpdate = resolve)));

		wrapper.findComponent(CourseGroupForm).vm.$emit("submit", { name: "Renamed", userIds: [] });
		wrapper.unmount();
		resolveUpdate(true);
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
