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
					ref: "autoCompleteRole",
				});

				expect(roleComponent.props("items")).toStrictEqual(roles);
				expect(roleComponent.props("modelValue")).toBe(roles[0].id);
			});

			it("should have proper props for autoCompleteUsers component", () => {
				const { wrapper, potentialRoomMembers } = setup();
				const userComponent = wrapper.getComponent({
					ref: "autoCompleteUsers",
				});

				expect(userComponent.props("items")).toStrictEqual(
					potentialRoomMembers
				);
				expect(userComponent.props("modelValue")).toHaveLength(0);
			});
		});
	});

	describe("when school is changed", () => {
		it("should emit 'update:role'", async () => {
			const { wrapper, roomMembersSchools } = setup();
			const selectedSchool = roomMembersSchools[1].id;
			const schoolComponent = wrapper.getComponent({
				ref: "autoCompleteSchool",
			});

			await schoolComponent.setValue(selectedSchool);

			expect(wrapper.emitted("update:role")).toHaveLength(1);
			expect(wrapper.emitted("update:role")![0]).toStrictEqual([
				{ role: RoleName.Roomeditor, schoolId: selectedSchool },
			]);
		});

		it("should set the role to room editor", async () => {
			const { wrapper } = setup();
			const schoolComponent = wrapper.getComponent({
				ref: "autoCompleteSchool",
			});

			await schoolComponent.setValue("schoolId");

			const roleComponent = wrapper.getComponent({
				ref: "autoCompleteRole",
			});

			expect(roleComponent.props("modelValue")).toBe(RoleName.Roomeditor);
		});

		it("should reset selectedUsers", async () => {
			const { wrapper } = setup();
			const schoolComponent = wrapper.getComponent({
				ref: "autoCompleteSchool",
			});

			const userComponent = wrapper.getComponent({
				ref: "autoCompleteUsers",
			});

			await schoolComponent.setValue("schoolId");

			expect(userComponent.props("modelValue")).toEqual([]);
		});
	});

	describe("when userRole is changed", () => {
		it("should emit the userRole", async () => {
			const { wrapper, roomMembersSchools } = setup();
			const selectedRole = RoleName.Roomeditor;
			const roleComponent = wrapper.getComponent({
				ref: "autoCompleteRole",
			});

			await roleComponent.setValue(selectedRole);

			expect(wrapper.emitted("update:role")).toHaveLength(1);
			expect(wrapper.emitted("update:role")![0]).toStrictEqual([
				{ role: selectedRole, schoolId: roomMembersSchools[0].id },
			]);
		});

		it("should reset selectedUsers", async () => {
			const { wrapper } = setup();
			const roleComponent = wrapper.getComponent({
				ref: "autoCompleteRole",
			});

			const userComponent = wrapper.getComponent({
				ref: "autoCompleteUsers",
			});

			await roleComponent.setValue(RoleName.Roomeditor);

			expect(wrapper.emitted()).toHaveProperty("update:role");
			expect(userComponent.props("modelValue")).toEqual([]);
		});
	});

	describe("when user(s) selected", () => {
		it("should add user to selectedUsers", async () => {
			const { wrapper, potentialRoomMembers } = setup();
			const userComponent = wrapper.getComponent({
				ref: "autoCompleteUsers",
			});

			await userComponent.setValue([
				potentialRoomMembers[0].userId,
				potentialRoomMembers[1].userId,
			]);

			expect(userComponent.props("modelValue")).toHaveLength(2);
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
				ref: "autoCompleteUsers",
			});

			const selectedUsers = [
				potentialRoomMembers[0].userId,
				potentialRoomMembers[1].userId,
			];
			userComponent.setValue(selectedUsers);

			const addButton = wrapper.getComponent({
				ref: "addButton",
			});
			await addButton.trigger("click");

			expect(wrapper.emitted("add:members")).toHaveLength(1);
			expect(wrapper.emitted("add:members")![0]).toStrictEqual([selectedUsers]);
			expect(wrapper.emitted("close")).toHaveLength(1);
		});

		it("should emit 'close'", async () => {
			const { wrapper, potentialRoomMembers } = setup();
			const userComponent = wrapper.getComponent({
				ref: "autoCompleteUsers",
			});

			const selectedUsers = [
				potentialRoomMembers[0].userId,
				potentialRoomMembers[1].userId,
			];
			userComponent.setValue(selectedUsers);

			const addButton = wrapper.getComponent({
				ref: "addButton",
			});
			await addButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("close");
		});
	});

	describe("when cancel button clicked", () => {
		it("should emit the selectedUsers", async () => {
			const { wrapper } = setup();

			const cancelButton = wrapper.getComponent({
				ref: "cancelButton",
			});

			await cancelButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("close");
		});
	});
});

// TODO: add tests for focus trap (@update:menu)
