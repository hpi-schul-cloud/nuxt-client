import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import AddMembers from "./AddMembers.vue";
import { RoleName, SchoolForExternalInviteResponse } from "@/serverApi/v3";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { authModule } from "@/store";
import { nextTick } from "vue";
import {
	roomMemberListFactory,
	roomMemberSchoolResponseFactory,
} from "@@/tests/test-utils";
import { RoomMember } from "@data-room";

jest.mock("@/store/store-accessor", () => {
	return {
		...jest.requireActual("@/store/store-accessor"),
		authModule: {
			getSchool: { id: "schoolId", name: "sample-school-name" },
		},
	};
});

const mockPotentialMembers = roomMemberListFactory.buildList(3);
const roomMembersSchools = roomMemberSchoolResponseFactory.buildList(3);

describe("AddMembers", () => {
	const setup = () => {
		const wrapper = mount(AddMembers, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
			},
			props: {
				memberList: mockPotentialMembers,
				schools: roomMembersSchools,
			},
		});

		const wrapperVM = wrapper.vm as unknown as {
			memberList: RoomMember[];
			preSelectedRole: RoleName;
			selectedUsers: RoomMember[];
			schoolList: SchoolForExternalInviteResponse[];
			roles: { id: string; name: string }[];
		};

		return { wrapper, wrapperVM };
	};

	describe("when component is mounted", () => {
		it("should render component", () => {
			const { wrapper, wrapperVM } = setup();

			expect(wrapper.exists()).toBe(true);
			expect(wrapper.findComponent(AddMembers)).toBeTruthy();
			expect(wrapperVM.memberList).toStrictEqual(mockPotentialMembers);
			expect(wrapperVM.schoolList).toStrictEqual(roomMembersSchools);
			expect(wrapperVM.schoolList).toHaveLength(3);
		});

		describe("AutoComplete components", () => {
			it("should render Autocomplete components", () => {
				const { wrapper } = setup();
				const autoCompleteComponents = wrapper.findAllComponents({
					name: "v-autocomplete",
				});

				expect(autoCompleteComponents).toHaveLength(3);
			});

			it("should have proper props for autoCompleteSchool component", () => {
				const { wrapper, wrapperVM } = setup();
				const schoolComponent = wrapper.findComponent({
					name: "v-autocomplete",
					ref: "autoCompleteSchool",
				});

				expect(schoolComponent).toBeTruthy();
				expect(schoolComponent.props("items")).toStrictEqual(
					wrapperVM.schoolList
				);
				expect(schoolComponent.props("modelValue")).toBe(
					wrapperVM.schoolList[0].id
				);
			});

			it("should have proper props for autoCompleteRole component", () => {
				const { wrapper, wrapperVM } = setup();
				const roleComponent = wrapper.findComponent({
					name: "v-autocomplete",
					ref: "autoCompleteRole",
				});

				expect(roleComponent).toBeTruthy();
				expect(roleComponent.props("items")).toStrictEqual(wrapperVM.roles);
				expect(roleComponent.props("modelValue")).toBe(wrapperVM.roles[0].id);
			});

			it("should have proper props for autoCompleteUsers component", () => {
				const { wrapper, wrapperVM } = setup();
				const userComponent = wrapper.findComponent({
					name: "v-autocomplete",
					ref: "autoCompleteUsers",
				});

				expect(userComponent).toBeTruthy();
				expect(userComponent.props("items")).toStrictEqual(
					wrapperVM.memberList
				);
				expect(userComponent.props("modelValue")).toHaveLength(0);
			});
		});
	});

	describe("when userRole is changed", () => {
		it("should emit the userRole", async () => {
			const { wrapper } = setup();
			const roleComponent = wrapper.findComponent({
				name: "v-autocomplete",
				ref: "autoCompleteRole",
			});

			expect(roleComponent).toBeTruthy();
			await roleComponent.vm.$emit("update:modelValue", RoleName.RoomViewer);
			await nextTick();
			expect(wrapper.emitted("update:role")).toHaveLength(1);
			expect(wrapper.emitted("update:role")![0]).toStrictEqual([
				{ role: RoleName.RoomViewer, schoolId: roomMembersSchools[0].id },
			]);
		});
	});

	describe("when user(s) selected", () => {
		it("should add user to selectedUsers", async () => {
			const { wrapper, wrapperVM } = setup();
			const userComponent = wrapper.findComponent({
				name: "v-autocomplete",
				ref: "autoCompleteUsers",
			});

			expect(userComponent).toBeTruthy();
			await userComponent.vm.$emit("update:modelValue", [
				mockPotentialMembers[0].userId,
				mockPotentialMembers[1].userId,
			]);
			await nextTick();
			expect(wrapperVM.selectedUsers).toHaveLength(2);
			expect(userComponent.props("modelValue")).toStrictEqual([
				mockPotentialMembers[0].userId,
				mockPotentialMembers[1].userId,
			]);
		});
	});

	describe("when add button clicked", () => {
		it("should emit the selectedUsers", async () => {
			const { wrapper, wrapperVM } = setup();
			const userComponent = wrapper.findComponent({
				name: "v-autocomplete",
				ref: "autoCompleteUsers",
			});

			expect(userComponent).toBeTruthy();
			await userComponent.vm.$emit("update:modelValue", [
				mockPotentialMembers[0].userId,
				mockPotentialMembers[1].userId,
			]);
			await nextTick();

			const addButton = wrapper.findComponent({
				name: "v-btn",
				ref: "addButton",
			});
			expect(addButton).toBeTruthy();
			await addButton.trigger("click");
			await nextTick();
			expect(wrapper.emitted("add:members")).toHaveLength(1);
			expect(wrapper.emitted("add:members")![0]).toStrictEqual([
				wrapperVM.selectedUsers,
			]);
			expect(wrapper.emitted("close")).toHaveLength(1);
		});
	});

	describe("when cancel button clicked", () => {
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
