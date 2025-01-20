import RoomMembersPage from "./RoomMembers.page.vue";
import { createTestingPinia } from "@pinia/testing";
import {
	roomMemberListFactory,
	mockedPiniaStoreTyping,
	roomMemberFactory,
	roomMemberSchoolResponseFactory,
} from "@@/tests/test-utils";
import { useRoomMembers, useRoomDetailsStore } from "@data-room";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { Router, useRoute, useRouter } from "vue-router";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { ref } from "vue";
import { RoleName, RoomDetailsResponse } from "@/serverApi/v3";
import { roomFactory } from "@@/tests/test-utils/factory/room";
import { VBtn, VDialog } from "vuetify/lib/components/index.mjs";
import { AddMembers, MembersTable } from "@feature-room";
import { mdiPlus } from "@icons/material";
import { VueWrapper } from "@vue/test-utils";

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;
const useRouteMock = <jest.Mock>useRoute;

jest.mock("../../data/room/roomMembers/roomMembers.composable");
const mockUseRoomMembers = jest.mocked(useRoomMembers);

jest.mock("@vueuse/integrations"); // mock focus trap from add members because we use mount

describe("RoomMembersPage", () => {
	let router: DeepMocked<Router>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;
	let mockRoomMemberCalls: DeepMocked<ReturnType<typeof useRoomMembers>>;
	let wrapper: VueWrapper<InstanceType<typeof RoomMembersPage>>;

	const routeRoomId = "room-id";

	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});

		route = createMock<ReturnType<typeof useRoute>>();
		useRouteMock.mockReturnValue(route);
		useRouteMock.mockReturnValue({ params: { id: routeRoomId } });

		router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		mockRoomMemberCalls = createMock<ReturnType<typeof useRoomMembers>>();
		mockUseRoomMembers.mockReturnValue(mockRoomMemberCalls);
	});

	const buildRoom = () => {
		const roomMembersSchools = roomMemberSchoolResponseFactory.buildList(3);
		const room = roomFactory.build();
		const potentialMembers = roomMemberListFactory.buildList(3);

		mockRoomMemberCalls.schools = ref(roomMembersSchools);
		mockRoomMemberCalls.getSchools.mockResolvedValue();

		mockRoomMemberCalls.potentialRoomMembers = ref(potentialMembers);
		mockRoomMemberCalls.getPotentialMembers.mockResolvedValue();

		return room;
	};

	const setup = (options?: { createRoom?: boolean }) => {
		const { createRoom } = {
			createRoom: true,

			...options,
		};

		const room = createRoom ? buildRoom() : undefined;

		const members = roomMemberFactory(RoleName.Roomeditor).buildList(3);
		mockRoomMemberCalls.roomMembers = ref(members);

		wrapper = mount(RoomMembersPage, {
			attachTo: document.body,
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							roomDetailsStore: {
								isLoading: false,
								room,
							},
						},
					}),
					createTestingI18n(),
					createTestingVuetify(),
				],
			},
		});

		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);

		return { wrapper, roomDetailsStore, members, room };
	};

	afterEach(() => {
		wrapper.unmount(); // necessary due focus trap in AddMembers
	});

	it("should be found in the dom", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.findComponent(RoomMembersPage).exists()).toBe(true);
	});

	it("should fetch members", async () => {
		setup();

		expect(mockRoomMemberCalls.fetchMembers).toHaveBeenCalled();
	});

	it("should fetch room from store when room is undefined", () => {
		const { roomDetailsStore } = setup({ createRoom: false });

		expect(roomDetailsStore.fetchRoom).toHaveBeenCalledWith(routeRoomId);
	});

	it("should set the page title", () => {
		const { room } = setup();

		expect(document.title).toContain(
			`${room?.name} - pages.rooms.members.manage`
		);
	});

	it("should have the correct heading", async () => {
		const { wrapper } = setup();

		const heading = wrapper.get("h1");

		expect(heading.text()).toBe("pages.rooms.members.manage");
	});

	it("should render info text", async () => {
		const { wrapper } = setup();

		const infoText = wrapper.get("[data-testid=info-text]");

		expect(infoText.text()).toBe("pages.rooms.members.infoText");
	});

	describe("DefaultWireframe", () => {
		const buildBreadcrumbs = (room: RoomDetailsResponse) => {
			return [
				{
					title: "pages.rooms.title",
					to: "/rooms",
				},
				{
					title: room.name || "",
					to: `/rooms/${routeRoomId}`,
				},
				{
					title: "pages.rooms.members.manage",
					disabled: true,
				},
			];
		};

		it("should render DefaultWireframe", async () => {
			const { wrapper } = setup();
			const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });

			expect(wireframe.exists()).toBe(true);
		});

		it("should set the breadcrumbs and fab items", async () => {
			const { wrapper, room } = setup();
			const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });

			const expectedBreadcrumbs = buildBreadcrumbs(room!);

			expect(wireframe.props("breadcrumbs")).toEqual(expectedBreadcrumbs);
			expect(wireframe.props("fabItems")).toEqual({
				icon: mdiPlus,
				title: "pages.rooms.members.add",
				ariaLabel: "pages.rooms.members.add",
				dataTestId: "fab-add-members",
			});
		});

		describe("add members fab", () => {
			it("should call getSchools and getPotantialMembers method", async () => {
				const { wrapper } = setup();
				const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });

				const addMemberButton = wireframe
					.getComponent("[data-testid=fab-add-members]")
					.getComponent(VBtn);

				await addMemberButton.trigger("click");

				expect(mockRoomMemberCalls.getSchools).toHaveBeenCalled();
				expect(mockRoomMemberCalls.getPotentialMembers).toHaveBeenCalledWith({
					role: RoleName.Roomeditor,
				});
			});

			it("should open Dialog", async () => {
				const { wrapper } = setup();
				const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });
				const addMemberDialogBeforeClick = wrapper
					.getComponent(VDialog)
					.findComponent(AddMembers);

				expect(addMemberDialogBeforeClick.exists()).toBe(false);

				const addMemberButton = wireframe
					.getComponent("[data-testid=fab-add-members]")
					.getComponent(VBtn);

				await addMemberButton.trigger("click");

				const addMemberDialogAfterClick = wrapper
					.getComponent(VDialog)
					.findComponent(AddMembers);

				expect(addMemberDialogAfterClick.exists()).toBe(true);
			});

			describe("add members dialog", () => {
				it("should set isMembersDialogOpen to false on @close", async () => {
					const { wrapper } = setup();

					const dialog = wrapper.findComponent(VDialog);
					await dialog.setValue(true);
					expect(dialog.props("modelValue")).toBe(true);

					const addMemberComponent = dialog.findComponent(AddMembers);
					await addMemberComponent.vm.$emit("close");

					expect(dialog.props("modelValue")).toBe(false);
				});

				it("should close dialog on escape key", async () => {
					const { wrapper } = setup();

					const dialog = wrapper.getComponent(VDialog);
					await dialog.setValue(true);

					const dialogContent = dialog.getComponent(AddMembers);
					await dialogContent.trigger("keydown.escape");

					expect(dialog.props("modelValue")).toBe(false);
				});

				it("should call addMembers method on @add:members", async () => {
					const { wrapper } = setup();

					const dialog = wrapper.findComponent(VDialog);
					await dialog.setValue(true);
					const addMemberComponent = dialog.findComponent(AddMembers);

					await addMemberComponent.vm.$emit("add:members");

					expect(mockRoomMemberCalls.addMembers).toHaveBeenCalled();
				});

				it("should call getPotentialMembers method on @update:role", async () => {
					const { wrapper } = setup();

					const dialog = wrapper.getComponent(VDialog);
					await dialog.setValue(true);
					const addMemberComponent = dialog.getComponent(AddMembers);

					await addMemberComponent.vm.$emit("update:role");

					expect(mockRoomMemberCalls.getPotentialMembers).toHaveBeenCalled();
				});
			});
		});

		describe("MembersTable", () => {
			it("should render MembersTable if isLoading false", async () => {
				mockRoomMemberCalls.isLoading = ref(false);
				const { wrapper } = setup();

				const membersTable = wrapper.findComponent(MembersTable);
				expect(membersTable.exists()).toBe(true);
			});

			it("should not render MembersTable if isLoading true", async () => {
				mockRoomMemberCalls.isLoading = ref(true);
				const { wrapper } = setup();

				const membersTable = wrapper.findComponent(MembersTable);
				expect(membersTable.exists()).toBe(false);
			});

			it("should call remove members method on @remove:members", async () => {
				mockRoomMemberCalls.isLoading = ref(false);
				const { wrapper } = setup();

				const membersTable = wrapper.findComponent(MembersTable);
				await membersTable.vm.$emit("remove:members");

				expect(mockRoomMemberCalls.removeMembers).toHaveBeenCalled();
			});
		});
	});
});
