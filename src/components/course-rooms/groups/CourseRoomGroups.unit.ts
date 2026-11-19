import CourseGroupCard from "./CourseGroupCard.vue";
import CourseRoomGroups from "./CourseRoomGroups.vue";
import { createTestAppStoreWithPermissions } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Permission } from "@api-server";
import * as courseGroupModule from "@data-course-group";
import { CourseGroup } from "@data-course-group";
import { useCourseRoomDetailsStore } from "@data-course-rooms";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { computed } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

describe("CourseRoomGroups", () => {
	const router = createRouterMock();
	injectRouterMock(router);

	const group: CourseGroup = { id: "group-1", name: "Group A", courseId: "course-1", members: [] };

	const setup = async ({
		groups = [group],
		permissions = [Permission.COURSE_EDIT, Permission.COURSEGROUP_CREATE],
		isArchived = false,
	}: { groups?: CourseGroup[]; permissions?: Permission[]; isArchived?: boolean } = {}) => {
		setActivePinia(createTestingPinia());
		createTestAppStoreWithPermissions(permissions);
		useCourseRoomDetailsStore().roomData.isArchived = isArchived;

		const fetchGroups = vi.fn().mockResolvedValue(groups);
		vi.spyOn(courseGroupModule, "useCourseGroups").mockReturnValue({
			fetchGroups,
			canSeeAllGroups: computed(() => permissions.includes(Permission.COURSE_EDIT)),
		} as unknown as ReturnType<typeof courseGroupModule.useCourseGroups>);

		const wrapper = mount(CourseRoomGroups, {
			props: { roomId: "course-1" },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});
		await flushPromises();

		return { wrapper, fetchGroups };
	};

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should load the groups of the course", async () => {
		const { fetchGroups } = await setup();

		expect(fetchGroups).toHaveBeenCalledWith("course-1");
	});

	it("should show a card per group with the headline for all groups", async () => {
		const { wrapper } = await setup();

		expect(wrapper.findAllComponents(CourseGroupCard)).toHaveLength(1);
		expect(wrapper.find('[data-testid="course-groups-headline"]').text()).toBe(
			"pages.courseRoomDetails.groups.headline.all"
		);
	});

	it("should show the headline for own groups to users without COURSE_EDIT", async () => {
		const { wrapper } = await setup({ permissions: [] });

		expect(wrapper.find('[data-testid="course-groups-headline"]').text()).toBe(
			"pages.courseRoomDetails.groups.headline.mine"
		);
	});

	describe("empty state", () => {
		const emptyStateTitle = (wrapper: Awaited<ReturnType<typeof setup>>["wrapper"]) =>
			wrapper.find('[data-testid="empty-state-title"]').text();

		it("should invite users who can create groups", async () => {
			const { wrapper } = await setup({ groups: [] });

			expect(emptyStateTitle(wrapper)).toBe("pages.courseRoomDetails.groups.empty.create.title");
			expect(wrapper.text()).toContain("pages.courseRoomDetails.groups.empty.create.text");
		});

		it("should say there are no groups yet to users who cannot create groups", async () => {
			const { wrapper } = await setup({ groups: [], permissions: [] });

			expect(emptyStateTitle(wrapper)).toBe("pages.courseRoomDetails.groups.empty.noGroupsYet");
			expect(wrapper.text()).not.toContain("pages.courseRoomDetails.groups.empty.create.text");
		});

		it("should say there are no groups in an archived course", async () => {
			const { wrapper } = await setup({ groups: [], isArchived: true });

			expect(emptyStateTitle(wrapper)).toBe("pages.courseRoomDetails.groups.empty.noGroups");
		});
	});
});
