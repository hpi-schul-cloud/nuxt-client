import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import AddMembers from "./AddMembers.vue";
import { RoleName } from "@/serverApi/v3";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { authModule, schoolsModule } from "@/store";
import {
	meResponseFactory,
	mockedPiniaStoreTyping,
	roomMemberFactory,
	roomMemberSchoolResponseFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import { VueWrapper } from "@vue/test-utils";
import { VAutocomplete } from "vuetify/lib/components/index";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { createTestingPinia } from "@pinia/testing";
import { useRoomMembersStore } from "@data-room";
import { useBoardNotifier } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import setupStores from "@@/tests/test-utils/setupStores";
import SchoolsModule from "@/store/schools";
import AuthModule from "@/store/auth";

jest.mock("@vueuse/integrations/useFocusTrap", () => {
	return {
		...jest.requireActual("@vueuse/integrations/useFocusTrap"),
		useFocusTrap: jest.fn(),
	};
});

jest.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("AddMembers", () => {
	let wrapper: VueWrapper<InstanceType<typeof AddMembers>>;
	let pauseMock: jest.Mock;
	let unpauseMock: jest.Mock;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		pauseMock = jest.fn();
		unpauseMock = jest.fn();
		(useFocusTrap as jest.Mock).mockReturnValue({
			pause: pauseMock,
			unpause: unpauseMock,
		});

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		setupStores({
			schoolsModule: SchoolsModule,
			authModule: AuthModule,
		});

		schoolsModule.setSchool(
			schoolFactory.build({
				id: "school-id",
				name: "Paul-Gerhardt-Gymnasium",
			})
		);

		const mockMe = meResponseFactory.build();
		authModule.setMe(mockMe);
	});

	const setup = () => {
		const potentialRoomMembers = roomMemberFactory.buildList(3);
		const roomMembersSchools = roomMemberSchoolResponseFactory.buildList(3);

		wrapper = mount(AddMembers, {
			attachTo: document.body,
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomMembersStore: {
								potentialRoomMembers,
								schools: roomMembersSchools,
							},
						},
					}),
				],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
			},
		});

		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);

		return {
			wrapper,
			potentialRoomMembers,
			roomMembersSchools,
			roomMembersStore,
		};
	};

	afterEach(() => {
		wrapper.unmount(); // necessary due focus trap
	});

	describe("when component is mounted", () => {
		it("should render component", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
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

				const roles = [{ id: RoleName.Teacher, name: "common.labels.teacher" }];

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
		it("should call getPotentialMembers", async () => {
			const { wrapper, roomMembersSchools, roomMembersStore } = setup();
			const selectedSchool = roomMembersSchools[1].id;
			const schoolComponent = wrapper.getComponent({
				ref: "autoCompleteSchool",
			});

			await schoolComponent.setValue(selectedSchool);

			expect(roomMembersStore.getPotentialMembers).toHaveBeenCalledTimes(1);
			expect(roomMembersStore.getPotentialMembers).toHaveBeenCalledWith(
				RoleName.Teacher,
				selectedSchool
			);
		});

		it("should set the role to teacher", async () => {
			const { wrapper } = setup();
			const schoolComponent = wrapper.getComponent({
				ref: "autoCompleteSchool",
			});

			await schoolComponent.setValue("schoolId");

			const roleComponent = wrapper.getComponent({
				ref: "autoCompleteRole",
			});

			expect(roleComponent.props("modelValue")).toBe(RoleName.Teacher);
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
		it("should call getPotentialMembers", async () => {
			const { wrapper, roomMembersSchools, roomMembersStore } = setup();
			const selectedRole = RoleName.Teacher;
			const roleComponent = wrapper.getComponent({
				ref: "autoCompleteRole",
			});

			await roleComponent.setValue(selectedRole);

			expect(roomMembersStore.getPotentialMembers).toHaveBeenCalledTimes(1);
			expect(roomMembersStore.getPotentialMembers).toHaveBeenCalledWith(
				selectedRole,
				roomMembersSchools[0].id
			);
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

		it("should disable autocomplete for school and role selection", async () => {
			const { wrapper, potentialRoomMembers } = setup();
			const schoolComponent = wrapper.getComponent({
				ref: "autoCompleteSchool",
			});
			const roleComponent = wrapper.getComponent({
				ref: "autoCompleteRole",
			});

			const userComponent = wrapper.getComponent({
				ref: "autoCompleteUsers",
			});

			await userComponent.setValue([
				potentialRoomMembers[0].userId,
				potentialRoomMembers[1].userId,
			]);

			expect(schoolComponent.props("disabled")).toBe(true);
			expect(roleComponent.props("disabled")).toBe(true);
		});

		it("should enable autocomplete for school and role selection when alls users are removed from selection", async () => {
			const { wrapper, potentialRoomMembers } = setup();
			const schoolComponent = wrapper.getComponent({
				ref: "autoCompleteSchool",
			});
			const roleComponent = wrapper.getComponent({
				ref: "autoCompleteRole",
			});
			const userComponent = wrapper.getComponent({
				ref: "autoCompleteUsers",
			});

			await userComponent.setValue([
				potentialRoomMembers[0].userId,
				potentialRoomMembers[1].userId,
			]);
			expect(schoolComponent.props("disabled")).toBe(true);
			expect(roleComponent.props("disabled")).toBe(true);

			await userComponent.setValue([]);
			expect(schoolComponent.props("disabled")).toBe(false);
			expect(roleComponent.props("disabled")).toBe(false);
		});
	});

	describe("when add button clicked", () => {
		it("should call addMembers", async () => {
			const { wrapper, potentialRoomMembers, roomMembersStore } = setup();
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

			expect(roomMembersStore.addMembers).toHaveBeenCalledTimes(1);
			expect(roomMembersStore.addMembers).toHaveBeenCalledWith(selectedUsers);
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
		it("should emit 'close''", async () => {
			const { wrapper } = setup();

			const cancelButton = wrapper.getComponent({
				ref: "cancelButton",
			});

			await cancelButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("close");
		});
	});

	describe("focus trap", () => {
		it("should pause focus trap when any autocomplete menu is open", async () => {
			const { wrapper } = setup();
			const schoolComponent = wrapper.getComponent({
				ref: "autoCompleteSchool",
			});

			schoolComponent.vm.menu = true;

			expect(pauseMock).toHaveBeenCalledTimes(1);
		});

		it("should unpause focus trap when all autocomplete menus are closed", async () => {
			const { wrapper } = setup();
			const schoolComponent = wrapper.getComponent({
				ref: "autoCompleteSchool",
			});

			schoolComponent.vm.menu = true;
			expect(pauseMock).toHaveBeenCalledTimes(1);

			schoolComponent.vm.menu = false;
			expect(unpauseMock).toHaveBeenCalled();
		});

		it("should not unpause focus trap when a autocomplete is closed while another one is opened", async () => {
			// this happens when user switches between autocomplete components for brief moment both are treated as open
			const { wrapper } = setup();
			const schoolComponent = wrapper.getComponent({
				ref: "autoCompleteSchool",
			});

			const roleComponent = wrapper.getComponent({
				ref: "autoCompleteRole",
			});

			schoolComponent.vm.menu = true;
			roleComponent.vm.menu = true;

			expect(pauseMock).toHaveBeenCalled();
			expect(unpauseMock).not.toHaveBeenCalled();

			schoolComponent.vm.menu = false;
			expect(unpauseMock).not.toHaveBeenCalled();
		});
	});
});
