import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import UserSelector from "@/components/beta-task/UserSelector.vue";
import { User } from "./types/User";

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

const MOCK_SELECTED_USERS: User[] = [MOCK_USERS[1]];

const defaultProps = {
	users: MOCK_USERS,
	selection: MOCK_SELECTED_USERS,
	required: true,
};

describe("@components/beta-task/UserSelector", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props = defaultProps) => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(UserSelector as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper.findComponent(UserSelector).exists()).toBe(true);
		});

		it("should render with concated usernames", () => {
			setup();
			const selectedUser = wrapper.find(".v-chip__content");
			expect(selectedUser.exists()).toBe(true);

			const user = MOCK_SELECTED_USERS[0];
			expect(selectedUser.text()).toEqual(user.firstName + " " + user.lastName);
		});
	});

	describe("when selected user(s) is required", () => {
		it("should emit input when users are selected", async () => {
			setup();
			const selectBox = wrapper.findComponent({ name: "v-autocomplete" });

			selectBox.vm.$emit("change");
			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("input")).toHaveLength(1);
		});

		it("should emit error event when no user is selected", async () => {
			setup({ ...defaultProps, selection: [] });
			const selectBox = wrapper.findComponent({ name: "v-autocomplete" });

			selectBox.vm.$emit("change");
			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("error")).toHaveLength(1);
		});
	});

	describe("when selected user(s) is not required", () => {
		it("should not emit error when no user is selected", async () => {
			setup({ ...defaultProps, selection: [], required: false });
			const selectBox = wrapper.findComponent({ name: "v-autocomplete" });

			selectBox.vm.$emit("change");
			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("error")).toBe(undefined);
		});

		it("should emit input when users are selected", async () => {
			setup();
			const selectBox = wrapper.findComponent({ name: "v-autocomplete" });

			selectBox.vm.$emit("change");
			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("input")).toHaveLength(1);
		});
	});
});
