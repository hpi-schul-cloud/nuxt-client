import Vue, { ref, computed } from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import UserSelector from "@/components/beta-task/UserSelector.vue";
import { User, COURSE_ASSIGNMENT } from "./types/User";
import { useUserSelectorState } from "./state/UserSelector.composable";

const MOCK_USERS: User[] = [
	{
		id: "userId1",
		firstName: "User",
		lastName: "1",
	},
	{
		id: "userId2",
		firstName: "User",
		lastName: "2",
	},
	{
		id: "userId3",
		firstName: "User",
		lastName: "3",
	},
];

const MOCK_USER_IDS = [MOCK_USERS[0].id, MOCK_USERS[1].id, MOCK_USERS[2].id];

const MOCK_USER_ITEMS = [
	{
		text: MOCK_USERS[0].firstName + MOCK_USERS[0].lastName,
		value: MOCK_USERS[0].id,
	},
	{
		text: MOCK_USERS[1].firstName + MOCK_USERS[1].lastName,
		value: MOCK_USERS[1].id,
	},
	{
		text: MOCK_USERS[2].firstName + MOCK_USERS[2].lastName,
		value: MOCK_USERS[2].id,
	},
];

const MOCK_SELECTED_USERS: User[] = [MOCK_USERS[1]];

jest.mock("./state/UserSelector.composable");
const mockedUseUserSelectorState = jest.mocked(useUserSelectorState);

const defaultProps = {
	courseId: "1234",
	selection: MOCK_SELECTED_USERS,
	courseAssignment: false,
	required: true,
};

describe("@components/beta-task/UserSelector", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props = defaultProps, isLoading = false) => {
		document.body.setAttribute("data-app", "true");
		mockedUseUserSelectorState.mockReturnValue({
			fetchStudents: jest.fn(),
			users: ref(MOCK_USERS),
			userIds: computed(() => MOCK_USER_IDS),
			items: computed(() => MOCK_USER_ITEMS),
			isLoading: ref(isLoading),
		});
		wrapper = mount(UserSelector as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
			provide: {
				i18n: { t: (key: string) => key },
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper.findComponent(UserSelector).exists()).toBe(true);
		});
	});

	describe("'UserSelector' component", () => {
		it("should be disabled if loading state is 'true'", () => {
			setup(defaultProps, true);
			expect(
				wrapper.findComponent({ ref: "user-selector" }).attributes().disabled
			).toBeDefined;
		});

		it("should not be disabled if loading state is 'false'", () => {
			setup();
			expect(
				wrapper.findComponent({ ref: "user-selector" }).attributes().disabled
			).toBeUndefined;
		});
	});

	describe("when selected user(s) is required", () => {
		it("should emit input when users are selected", async () => {
			setup();
			jest.useFakeTimers();
			const input = wrapper
				.findComponent({ name: "v-autocomplete" })
				.find("input");
			await input.trigger("blur");
			jest.advanceTimersByTime(1000);
			expect(wrapper.emitted("input")).toHaveLength(1);
		});

		it("should not emit input when no user is selected", async () => {
			setup();
			jest.useFakeTimers();
			const autocomplete = wrapper.findComponent({ name: "v-autocomplete" });
			const clearBtn = autocomplete.find(".v-icon");
			const input = autocomplete.find("input");
			expect(clearBtn.exists()).toBe(true);
			await clearBtn.trigger("click");
			await input.trigger("blur");
			await input.trigger("update:error");
			await wrapper.vm.$nextTick();
			jest.advanceTimersByTime(1000);
			expect(wrapper.emitted("input")).toBe(undefined);
		});
	});

	describe("when selected user(s) is not required", () => {
		it("should emit input when no user is selected", async () => {
			setup({ ...defaultProps, selection: [], required: false });
			jest.useFakeTimers();
			const selectBox = wrapper
				.findComponent({ name: "v-autocomplete" })
				.find("input");
			await selectBox.trigger("blur");

			jest.advanceTimersByTime(1000);
			expect(wrapper.emitted("input")).toHaveLength(1);
		});

		it("should emit input when users are selected", async () => {
			setup({ ...defaultProps, required: false });
			jest.useFakeTimers();
			const selectBox = wrapper
				.findComponent({ name: "v-autocomplete" })
				.find("input");
			await selectBox.trigger("blur");

			jest.advanceTimersByTime(1000);
			expect(wrapper.emitted("input")).toHaveLength(1);
		});
	});

	describe("when mounted with courseAssignment", () => {
		it("should render with all available users selected", async () => {
			setup({ ...defaultProps, selection: [], courseAssignment: true });

			await wrapper.vm.$nextTick();
			const selectedUsers = wrapper.findAll(".v-chip__content");
			expect(selectedUsers.length).toEqual(MOCK_USERS.length);
		});
	});

	describe("when mounted without courseAssignment", () => {
		it("should render with selected users", async () => {
			setup();

			await wrapper.vm.$nextTick();
			const selectedUsers = wrapper.findAll(".v-chip__content");
			expect(selectedUsers.length).toEqual(MOCK_SELECTED_USERS.length);
		});
	});

	describe("when all available students are selected", () => {
		it("should emit input with course assignment info", async () => {
			setup({ ...defaultProps, selection: MOCK_USERS });
			jest.useFakeTimers();
			const selectBox = wrapper
				.findComponent({ name: "v-autocomplete" })
				.find("input");
			await selectBox.trigger("blur");

			jest.advanceTimersByTime(1000);
			const emitted = wrapper.emitted("input") || [[]];
			expect(emitted[0][0]).toBeDefined();
			expect(emitted[0][0]).toStrictEqual(COURSE_ASSIGNMENT);
		});
	});

	describe("when not all available students are selected", () => {
		it("should emit input with user infos", async () => {
			setup({ ...defaultProps, selection: MOCK_SELECTED_USERS });
			jest.useFakeTimers();
			const selectBox = wrapper
				.findComponent({ name: "v-autocomplete" })
				.find("input");
			await selectBox.trigger("blur");

			jest.advanceTimersByTime(1000);
			const emitted = wrapper.emitted("input") || [[]];
			expect(emitted[0][0]).toBeDefined();
			expect(emitted[0][0]).toStrictEqual(MOCK_SELECTED_USERS);
		});
	});
});
