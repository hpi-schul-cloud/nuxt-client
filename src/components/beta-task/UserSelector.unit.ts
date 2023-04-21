// import Vue from "vue";
// import createComponentMocks from "@@/tests/test-utils/componentMocks";
// import { MountOptions, mount, Wrapper } from "@vue/test-utils";
// import UserSelector from "@/components/beta-task/UserSelector.vue";
// import { User, COURSE_ASSIGNMENT } from "./types/User";

// const MOCK_USERS: User[] = [
// 	{
// 		id: "userId1",
// 		firstName: "User",
// 		lastName: "1",
// 	},
// 	{
// 		id: "userId2",
// 		firstName: "User",
// 		lastName: "2",
// 	},
// 	{
// 		id: "userId3",
// 		firstName: "User",
// 		lastName: "3",
// 	},
// ];

// const MOCK_SELECTED_USERS: User[] = [MOCK_USERS[1]];

// const defaultProps = {
// 	users: MOCK_USERS,
// 	selection: MOCK_SELECTED_USERS,
// 	courseAssignment: false,
// 	required: true,
// };

// describe("@components/beta-task/UserSelector", () => {
// 	let wrapper: Wrapper<Vue>;

// 	const setup = (props = defaultProps) => {
// 		document.body.setAttribute("data-app", "true");

// 		wrapper = mount(UserSelector as MountOptions<Vue>, {
// 			...createComponentMocks({}),
// 			propsData: props,
// 			provide: {
// 				i18n: { t: (key: string) => key },
// 			},
// 		});
// 	};

// 	describe("when component is mounted", () => {
// 		it("should be found in dom", () => {
// 			setup();
// 			expect(wrapper.findComponent(UserSelector).exists()).toBe(true);
// 		});

// 		it("should render with concated usernames", () => {
// 			setup();
// 			const selectedUser = wrapper.find(".v-chip__content");
// 			expect(selectedUser.exists()).toBe(true);

// 			const user = MOCK_SELECTED_USERS[0];
// 			expect(selectedUser.text()).toEqual(user.firstName + " " + user.lastName);
// 		});
// 	});

// 	describe("when selected user(s) is required", () => {
// 		it("should emit input when users are selected", async () => {
// 			setup();
// 			jest.useFakeTimers();
// 			const input = wrapper
// 				.findComponent({ name: "v-autocomplete" })
// 				.find("input");
// 			await input.trigger("blur");

// 			jest.advanceTimersByTime(1000);
// 			expect(wrapper.emitted("input")).toHaveLength(1);
// 		});

// 		it("should not emit input when no user is selected", async () => {
// 			setup();
// 			jest.useFakeTimers();
// 			const autocomplete = wrapper.findComponent({ name: "v-autocomplete" });
// 			const clearBtn = autocomplete.find(".v-icon");
// 			const input = autocomplete.find("input");
// 			expect(clearBtn.exists()).toBe(true);

// 			await clearBtn.trigger("click");
// 			await input.trigger("blur");
// 			await input.trigger("update:error");
// 			await wrapper.vm.$nextTick();

// 			jest.advanceTimersByTime(1000);
// 			expect(wrapper.emitted("input")).toBe(undefined);
// 		});
// 	});

// 	describe("when selected user(s) is not required", () => {
// 		it("should emit input when no user is selected", async () => {
// 			setup({ ...defaultProps, selection: [], required: false });
// 			jest.useFakeTimers();
// 			const selectBox = wrapper
// 				.findComponent({ name: "v-autocomplete" })
// 				.find("input");
// 			await selectBox.trigger("blur");

// 			jest.advanceTimersByTime(1000);
// 			expect(wrapper.emitted("input")).toHaveLength(1);
// 		});

// 		it("should emit input when users are selected", async () => {
// 			setup({ ...defaultProps, required: false });
// 			jest.useFakeTimers();
// 			const selectBox = wrapper
// 				.findComponent({ name: "v-autocomplete" })
// 				.find("input");
// 			await selectBox.trigger("blur");

// 			jest.advanceTimersByTime(1000);
// 			expect(wrapper.emitted("input")).toHaveLength(1);
// 		});
// 	});

// 	describe("when mounted with courseAssignment", () => {
// 		it("should render with all available users selected", async () => {
// 			setup({ ...defaultProps, selection: [], courseAssignment: true });

// 			const selectedUsers = wrapper.findAll(".v-chip__content");
// 			expect(selectedUsers.length).toEqual(MOCK_USERS.length);
// 		});
// 	});

// 	describe("when mounted without courseAssignment", () => {
// 		it("should render with selected users", async () => {
// 			setup();

// 			const selectedUsers = wrapper.findAll(".v-chip__content");
// 			expect(selectedUsers.length).toEqual(MOCK_SELECTED_USERS.length);
// 		});
// 	});

// 	describe("when all available students are selected", () => {
// 		it("should emit input with course assignment info", async () => {
// 			setup({ ...defaultProps, selection: MOCK_USERS });
// 			jest.useFakeTimers();
// 			const selectBox = wrapper
// 				.findComponent({ name: "v-autocomplete" })
// 				.find("input");
// 			await selectBox.trigger("blur");

// 			jest.advanceTimersByTime(1000);
// 			const emitted = wrapper.emitted("input") || [[]];
// 			expect(emitted[0][0]).toBeDefined();
// 			expect(emitted[0][0]).toStrictEqual(COURSE_ASSIGNMENT);
// 		});
// 	});

// 	describe("when not all available students are selected", () => {
// 		it("should emit input with user infos", async () => {
// 			setup({ ...defaultProps, selection: MOCK_SELECTED_USERS });
// 			jest.useFakeTimers();
// 			const selectBox = wrapper
// 				.findComponent({ name: "v-autocomplete" })
// 				.find("input");
// 			await selectBox.trigger("blur");

// 			jest.advanceTimersByTime(1000);
// 			const emitted = wrapper.emitted("input") || [[]];
// 			expect(emitted[0][0]).toBeDefined();
// 			expect(emitted[0][0]).toStrictEqual(MOCK_SELECTED_USERS);
// 		});
// 	});
// });
