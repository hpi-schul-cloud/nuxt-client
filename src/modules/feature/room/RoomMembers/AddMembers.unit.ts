import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import AddMembers from "./AddMembers.vue";
import { RoleName } from "@/serverApi/v3";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { authModule } from "@/store";
import {
	roomMemberListFactory,
	roomMemberSchoolResponseFactory,
} from "@@/tests/test-utils";
import { VueWrapper } from "@vue/test-utils";
import { VAutocomplete } from "vuetify/lib/components/index.mjs";

jest.mock("@/store/store-accessor", () => {
	return {
		...jest.requireActual("@/store/store-accessor"),
		authModule: {
			getSchool: { id: "schoolId", name: "sample-school-name" },
		},
	};
});

describe("AddMembers", () => {
	let wrapper: VueWrapper<InstanceType<typeof AddMembers>>;

	const setup = () => {
		const potentialRoomMembers = roomMemberListFactory.buildList(3);
		const roomMembersSchools = roomMemberSchoolResponseFactory.buildList(3);
		wrapper = mount(AddMembers, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
			},
			props: {
				memberList: potentialRoomMembers,
				schools: roomMembersSchools,
			},
		});

		return {
			wrapper,
			potentialRoomMembers,
			roomMembersSchools,
		};
	};

	afterEach(() => {
		wrapper.unmount(); // necessary due focus trap
	});

	describe("when component is mounted", () => {
		it("should render component", () => {
			const { wrapper, potentialRoomMembers, roomMembersSchools } = setup();

			expect(wrapper.exists()).toBe(true);
			expect(wrapper.props()).toEqual({
				memberList: potentialRoomMembers,
				schools: roomMembersSchools,
			});
		});

		describe("Autocomplete components", () => {
			it("should render autocomplete components", () => {
				const { wrapper } = setup();
				const autoCompleteComponents = wrapper.findAllComponents(VAutocomplete);

				expect(autoCompleteComponents).toHaveLength(3);
			});

			it("should have proper props for autoCompleteSchool component", () => {
				const { wrapper, roomMembersSchools } = setup();
				const schoolComponent = wrapper.getComponent({
					name: "v-autocomplete",
					ref: "autoCompleteSchool",
				});

				expect(schoolComponent.props("items")).toStrictEqual(
					roomMembersSchools
				);
				expect(schoolComponent.props("modelValue")).toBe(
					roomMembersSchools[0].id
				);
			});
			it("should have proper props for autoCompleteRole component", () => {
				const { wrapper } = setup();

				const roles = [
					{ id: RoleName.Roomeditor, name: "common.labels.teacher" },
				];

				const roleComponent = wrapper.getComponent({
					name: "v-autocomplete",
					ref: "autoCompleteRole",
				});

				expect(roleComponent.props("items")).toStrictEqual(roles);
				expect(roleComponent.props("modelValue")).toBe(roles[0].id);
			});

			it("should have proper props for autoCompleteUsers component", () => {
				const { wrapper, potentialRoomMembers } = setup();
				const userComponent = wrapper.getComponent({
					name: "v-autocomplete",
					ref: "autoCompleteUsers",
				});

				expect(userComponent.props("items")).toStrictEqual(
					potentialRoomMembers
				);
				expect(userComponent.props("modelValue")).toHaveLength(0);
			});
		});
	});

	describe("when userRole is changed", () => {
		it("should emit the userRole", async () => {
			const { wrapper, roomMembersSchools } = setup();
			const roleComponent = wrapper.getComponent({
				name: "v-autocomplete",
				ref: "autoCompleteRole",
			});

			await roleComponent.setValue(RoleName.Roomviewer);

			expect(wrapper.emitted("update:role")).toHaveLength(1);
			expect(wrapper.emitted("update:role")![0]).toStrictEqual([
				{ role: RoleName.Roomviewer, schoolId: roomMembersSchools[0].id },
			]);
		});
	});

	describe("when user(s) selected", () => {
		it("should add user to selectedUsers", async () => {
			const { wrapper, potentialRoomMembers } = setup();
			const userComponent = wrapper.getComponent({
				name: "v-autocomplete",
				ref: "autoCompleteUsers",
			});

			await userComponent.setValue([
				potentialRoomMembers[0].userId,
				potentialRoomMembers[1].userId,
			]);

			// todo refactor expect without wrapperVM
			// expect(wrapperVM.selectedUsers).toHaveLength(2);
			expect(userComponent.props("modelValue")).toStrictEqual([
				potentialRoomMembers[0].userId,
				potentialRoomMembers[1].userId,
			]);
		});
	});

	describe("when add button clicked", () => {
		it("should emit the selectedUsers", async () => {
			const { wrapper, potentialRoomMembers } = setup();
			const userComponent = wrapper.getComponent({
				name: "v-autocomplete",
				ref: "autoCompleteUsers",
			});

			const selectedUsers = [
				potentialRoomMembers[0].userId,
				potentialRoomMembers[1].userId,
			];

			userComponent.setValue(selectedUsers);

			const addButton = wrapper.getComponent({
				name: "v-btn",
				ref: "addButton",
			});

			await addButton.trigger("click");

			expect(wrapper.emitted("add:members")).toHaveLength(1);
			expect(wrapper.emitted("add:members")![0]).toStrictEqual([selectedUsers]);
			expect(wrapper.emitted("close")).toHaveLength(1);
		});
	});

	describe("when cancel button clicked", () => {
		it("should emit the selectedUsers", async () => {
			const { wrapper } = setup();

			const cancelButton = wrapper.getComponent({
				name: "v-btn",
				ref: "cancelButton",
			});

			await cancelButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("close");
		});
	});
});

// TODO: add tests for focus trap (@update:menu)
