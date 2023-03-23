import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import UserSelector from "@/components/user-selector/UserSelector.vue";

interface User {
	id: string;
	firstName: string;
	lastName: string;
}

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

const MOCK_SELECTED_USERS: string[] = ["userId2"];

describe("@components/user-selector/UserSelector", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(UserSelector as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: {
				users: MOCK_USERS,
				value: MOCK_SELECTED_USERS,
			},
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

			const user = MOCK_USERS[1];
			expect(selectedUser.text()).toEqual(user.firstName + " " + user.lastName);
		});
	});

	describe("when user selection changes", () => {
		it("should emit input event", async () => {
			setup();
			const selectBox = wrapper.findComponent({ name: "v-autocomplete" });
			expect(selectBox.exists()).toBe(true);

			selectBox.vm.$emit("change");
			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("input")).toHaveLength(1);
		});
	});
});
