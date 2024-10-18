import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import AddParticipants from "./AddParticipants.vue";
import { RoleName } from "@/serverApi/v3";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { authModule } from "@/store";
import { Participants, mockPotentialParticipants } from "@data-room";
import { nextTick } from "vue";

jest.mock("@/store/store-accessor", () => {
	return {
		...jest.requireActual("@/store/store-accessor"),
		authModule: {
			getSchool: { id: "schoolId", name: "sample-school-name" },
		},
	};
});

describe("AddParticipants", () => {
	const setup = () => {
		const wrapper = mount(AddParticipants, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
			},
			props: {
				userList: mockPotentialParticipants,
				preSelectedRole: RoleName.Teacher,
			},
		});

		const wrapperVM = wrapper.vm as unknown as {
			userList: Participants[];
			preSelectedRole: RoleName;
			selectedUsers: Participants[];
		};

		return { wrapper, wrapperVM };
	};

	describe("when component is mounted", () => {
		it("should render component", () => {
			const { wrapper, wrapperVM } = setup();

			expect(wrapper.exists()).toBe(true);
			expect(wrapper.findComponent(AddParticipants)).toBeTruthy();
			expect(wrapperVM.userList).toStrictEqual(mockPotentialParticipants);
		});

		it("should render Autocomplete components", () => {
			const { wrapper } = setup();
			const autoCompleteComponents = wrapper.findAllComponents({
				name: "v-autocomplete",
			});

			expect(autoCompleteComponents).toHaveLength(3);
		});
	});

	describe("When userRole is changed", () => {
		it("should emit the userRole", async () => {
			const { wrapper } = setup();
			const roleComponent = wrapper.findComponent({
				name: "v-autocomplete",
				ref: "autoCompleteRole",
			});

			expect(roleComponent).toBeTruthy();
			await roleComponent.vm.$emit("update:modelValue", RoleName.Student);
			await nextTick();
			expect(wrapper.emitted("update:role")).toHaveLength(1);
			expect(wrapper.emitted("update:role")![0]).toStrictEqual([
				RoleName.Student,
			]);
		});
	});

	describe("When user is selected", () => {
		it("should add user to selectedUsers", async () => {
			const { wrapper, wrapperVM } = setup();
			const userComponent = wrapper.findComponent({
				name: "v-autocomplete",
				ref: "autoCompleteUsers",
			});

			expect(userComponent).toBeTruthy();
			await userComponent.vm.$emit("update:modelValue", [
				mockPotentialParticipants[0].id,
				mockPotentialParticipants[1].id,
			]);
			await nextTick();
			expect(wrapperVM.selectedUsers).toHaveLength(2);
		});
	});

	describe("When add button clicked", () => {
		it("should emit the selectedUsers", async () => {
			const { wrapper, wrapperVM } = setup();
			const userComponent = wrapper.findComponent({
				name: "v-autocomplete",
				ref: "autoCompleteUsers",
			});

			expect(userComponent).toBeTruthy();
			await userComponent.vm.$emit("update:modelValue", [
				mockPotentialParticipants[0].id,
				mockPotentialParticipants[1].id,
			]);
			await nextTick();

			const addButton = wrapper.findComponent({
				name: "v-btn",
				ref: "addButton",
			});
			expect(addButton).toBeTruthy();
			await addButton.trigger("click");
			await nextTick();
			expect(wrapper.emitted("add:participants")).toHaveLength(1);
			expect(wrapper.emitted("add:participants")![0]).toStrictEqual([
				wrapperVM.selectedUsers,
			]);
			expect(wrapper.emitted("close")).toHaveLength(1);
		});
	});

	describe("When cancel button clicked", () => {
		it("should emit the selectedUsers", async () => {
			const { wrapper } = setup();

			const cancelButton = wrapper.findComponent({
				name: "v-btn",
				ref: "cancelButton",
			});
			expect(cancelButton).toBeTruthy();
			await cancelButton.trigger("click");
			await nextTick();
			expect(wrapper.emitted("close")).toHaveLength(1);
		});
	});
});
