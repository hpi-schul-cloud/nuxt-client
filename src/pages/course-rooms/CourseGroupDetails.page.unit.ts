import CourseGroupDetailsPage from "./CourseGroupDetails.page.vue";
import CourseGroupTaskList from "@/components/course-rooms/groups/CourseGroupTaskList.vue";
import CourseGroupTopicList from "@/components/course-rooms/groups/CourseGroupTopicList.vue";
import { askDeletionForItem } from "@/utils/confirmation-dialog.utils";
import { createTestAppStoreWithPermissions } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Permission } from "@api-server";
import * as courseGroupModule from "@data-course-group";
import { CourseGroup, CourseGroupCourse } from "@data-course-group";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("@/utils/confirmation-dialog.utils");

describe("CourseGroupDetails.page", () => {
	const ada = { id: "user-1", firstName: "Ada", lastName: "Lovelace", fullName: "Ada Lovelace" };
	const tess = { id: "teacher-1", firstName: "Tess", lastName: "Teacher", fullName: "Tess Teacher" };
	const group: CourseGroup = { id: "group-1", name: "Group A", courseId: "course-1", members: [ada] };
	const topic = { id: "lesson-1", name: "Topic 1" };
	const tasks = {
		done: [{ homeworkId: "hw-1", name: "Done", description: "", url: "/homework/hw-1" }],
		open: [{ homeworkId: "hw-2", name: "Open", description: "", url: "/homework/hw-2" }],
	};

	const allPermissions = [
		Permission.COURSEGROUP_CREATE,
		Permission.COURSEGROUP_EDIT,
		Permission.TOPIC_CREATE,
		Permission.TOPIC_EDIT,
	];

	const setup = async ({
		permissions = allPermissions,
		isArchived = false,
		confirmed = true,
		groupLoadFails = false,
	} = {}) => {
		setActivePinia(createTestingPinia());
		createTestAppStoreWithPermissions(permissions);
		const router = createRouterMock();
		injectRouterMock(router);
		vi.mocked(askDeletionForItem).mockResolvedValue(confirmed);

		const course: CourseGroupCourse = {
			id: "course-1",
			name: "Math",
			color: "#ff0000",
			isArchived,
			students: [ada],
			teachers: [tess],
		};
		const groups = {
			fetchCourse: vi.fn().mockResolvedValue(course),
			fetchGroup: vi.fn().mockResolvedValue(groupLoadFails ? undefined : group),
			deleteGroup: vi.fn().mockResolvedValue(true),
			isMutating: ref(false),
		};
		const details = {
			fetchTopics: vi.fn().mockResolvedValue([topic]),
			deleteTopic: vi.fn().mockResolvedValue(true),
			fetchGroupTasks: vi.fn().mockResolvedValue(tasks),
		};
		vi.spyOn(courseGroupModule, "useCourseGroups").mockReturnValue(
			groups as unknown as ReturnType<typeof courseGroupModule.useCourseGroups>
		);
		vi.spyOn(courseGroupModule, "useCourseGroupDetails").mockReturnValue(
			details as unknown as ReturnType<typeof courseGroupModule.useCourseGroupDetails>
		);

		const wrapper = mount(CourseGroupDetailsPage, {
			props: { courseId: "course-1", groupId: "group-1" },
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { CourseGroupTopicList: true, CourseGroupTaskList: true },
			},
		});
		await flushPromises();

		return { wrapper, router, groups, details };
	};

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should show the group name, members and teachers", async () => {
		const { wrapper } = await setup();

		expect(wrapper.find("h1").text()).toBe("Group A");
		expect(wrapper.find('[data-testid="course-group-members"]').text()).toContain("Ada Lovelace");
		expect(wrapper.find('[data-testid="course-group-teachers"]').text()).toContain("Tess Teacher");
	});

	it("should load topics and tasks for the group size", async () => {
		const { wrapper, details } = await setup();

		expect(details.fetchGroupTasks).toHaveBeenCalledWith("group-1", "course-1", 1);
		expect(wrapper.findComponent(CourseGroupTopicList).props("topics")).toEqual([topic]);
		const taskLists = wrapper.findAllComponents(CourseGroupTaskList);
		expect(taskLists.map((list) => list.props("tasks"))).toEqual([tasks.done, tasks.open]);
		expect(taskLists[0].props("color")).toBe("#ff0000");
	});

	it("should not load topics and tasks when the group cannot be loaded", async () => {
		const { details } = await setup({ groupLoadFails: true });

		expect(details.fetchTopics).not.toHaveBeenCalled();
		expect(details.fetchGroupTasks).not.toHaveBeenCalled();
	});

	describe("permissions", () => {
		it("should allow topic and group actions with all permissions", async () => {
			const { wrapper } = await setup();

			const topicList = wrapper.findComponent(CourseGroupTopicList);
			expect(topicList.props("canCreate")).toBe(true);
			expect(topicList.props("canEdit")).toBe(true);
			expect(wrapper.find('[data-testid="edit-group"]').exists()).toBe(true);
			expect(wrapper.find('[data-testid="delete-course-group"]').exists()).toBe(true);
		});

		it("should hide actions without permissions", async () => {
			const { wrapper } = await setup({ permissions: [] });

			const topicList = wrapper.findComponent(CourseGroupTopicList);
			expect(topicList.props("canCreate")).toBe(false);
			expect(topicList.props("canEdit")).toBe(false);
			expect(wrapper.find('[data-testid="edit-group"]').exists()).toBe(false);
			expect(wrapper.find('[data-testid="delete-course-group"]').exists()).toBe(false);
		});

		it("should hide all actions in an archived course", async () => {
			const { wrapper } = await setup({ isArchived: true });

			expect(wrapper.findComponent(CourseGroupTopicList).props("canCreate")).toBe(false);
			expect(wrapper.find('[data-testid="edit-group"]').exists()).toBe(false);
			expect(wrapper.find('[data-testid="delete-course-group"]').exists()).toBe(false);
		});
	});

	describe("delete group", () => {
		it("should delete after confirmation and go back to the groups tab", async () => {
			const { wrapper, router, groups } = await setup();

			await wrapper.find('[data-testid="delete-course-group"]').trigger("click");
			await flushPromises();

			expect(askDeletionForItem).toHaveBeenCalledWith("Group A", "pages.courseRoomDetails.groups.group");
			expect(groups.deleteGroup).toHaveBeenCalledWith("group-1");
			expect(router.push).toHaveBeenCalledWith({
				name: "room-details",
				params: { id: "course-1" },
				query: { tab: "groups" },
			});
		});

		it("should not delete without confirmation", async () => {
			const { wrapper, groups } = await setup({ confirmed: false });

			await wrapper.find('[data-testid="delete-course-group"]').trigger("click");
			await flushPromises();

			expect(groups.deleteGroup).not.toHaveBeenCalled();
		});
	});

	describe("delete topic", () => {
		it("should delete after confirmation and reload the topics", async () => {
			const { wrapper, details } = await setup();

			wrapper.findComponent(CourseGroupTopicList).vm.$emit("delete", topic);
			await flushPromises();

			expect(details.deleteTopic).toHaveBeenCalledWith("lesson-1");
			expect(details.fetchTopics).toHaveBeenCalledTimes(2);
		});

		it("should not delete without confirmation", async () => {
			const { wrapper, details } = await setup({ confirmed: false });

			wrapper.findComponent(CourseGroupTopicList).vm.$emit("delete", topic);
			await flushPromises();

			expect(details.deleteTopic).not.toHaveBeenCalled();
		});
	});
});
