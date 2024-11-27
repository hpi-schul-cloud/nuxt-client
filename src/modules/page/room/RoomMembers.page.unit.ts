import RoomMembersPage from "./RoomMembers.page.vue";
import { createTestingPinia } from "@pinia/testing";
import {
	roomMemberListFactory,
	mockedPiniaStoreTyping,
	roomMemberResponseFactory,
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
import { nextTick, ref } from "vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { flushPromises } from "@vue/test-utils";
import { RoleName, RoomColor } from "@/serverApi/v3";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { useTitle } from "@vueuse/core";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;
const useRouteMock = <jest.Mock>useRoute;
useRouteMock.mockReturnValue({ params: { id: "room-id" } });

const store = {
	isLoading: false,
	room: {
		id: "1",
		name: "Room 1",
		color: RoomColor.BlueGrey,
		createdAt: new Date().toString(),
		updatedAt: new Date().toString(),
	},
};

jest.mock("@vueuse/core", () => {
	return {
		...jest.requireActual("@vueuse/core"),
		useTitle: jest.fn(),
	};
});

jest.mocked(useTitle).mockReturnValue(ref(null));

const mockMembers = roomMemberResponseFactory.buildList(3);
const mockPotentialMembers = roomMemberListFactory.buildList(3);
const roomMembersSchools = roomMemberSchoolResponseFactory.buildList(3);

jest.mock("../../data/room/roomMembers/roomMembers.composable");
const mockUseMembers = jest.mocked(useRoomMembers);

jest.mock("@ui-confirmation-dialog");
jest.mock("@ui-confirmation-dialog");
const mockedUseDeleteConfirmationDialog = jest.mocked(useConfirmationDialog);

describe("RoomMembersPage", () => {
	let router: DeepMocked<Router>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;
	let mockUseMembersCalls: DeepMocked<ReturnType<typeof useRoomMembers>>;
	const askConfirmationMock = jest
		.fn()
		.mockImplementation(async () => await Promise.resolve(true));

	beforeEach(() => {
		route = createMock<ReturnType<typeof useRoute>>();
		useRouteMock.mockReturnValue(route);
		useRouteMock.mockReturnValue({ params: { id: "room-id" } });

		router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
		mockUseMembersCalls = createMock<ReturnType<typeof useRoomMembers>>();
		mockUseMembersCalls.getPotentialMembers = jest.fn();
		mockUseMembersCalls.fetchMembers = jest.fn();
		mockUseMembersCalls.removeMembers = jest.fn();
		mockUseMembersCalls.getSchools = jest.fn();
		mockUseMembers.mockReturnValue({
			...mockUseMembersCalls,
			schools: ref(roomMembersSchools),
			roomMembers: ref(mockMembers),
			isLoading: ref(false),
			potentialRoomMembers: ref(mockPotentialMembers),
		});

		setupConfirmationComposableMock({
			askConfirmationMock,
		});
		mockedUseDeleteConfirmationDialog.mockReturnValue({
			askConfirmation: askConfirmationMock,
			isDialogOpen: ref(false),
		});

		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = () => {
		const wrapper = mount(RoomMembersPage, {
			global: {
				plugins: [
					createTestingPinia(),
					createTestingI18n(),
					createTestingVuetify(),
					vueDompurifyHTMLPlugin,
				],
			},
		});

		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		roomDetailsStore.room = store.room;

		const wrapperVM = wrapper.vm as unknown as {
			room: {
				id: string;
				name: string;
				color: RoomColor;
				createdAt: string;
				updatedAt: string;
			};
			pageTitle: string;
			breadcrumbs: Breadcrumb[];
			fabItem: {
				icon: string;
				title: string;
				ariaLabel: string;
				testId: string;
			};
			isMembersDialogOpen: boolean;
			onFabClick: ReturnType<typeof jest.fn>;
		};

		return { wrapper, roomDetailsStore, wrapperVM };
	};

	describe("when page is mounted", () => {
		it("should be found in the dom", async () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
			expect(wrapper.findComponent(RoomMembersPage)).toBeTruthy();
		});

		it("should call 'fetchRoom' method in the store", async () => {
			const { roomDetailsStore } = setup();
			expect(roomDetailsStore.fetchRoom).toHaveBeenCalledWith("room-id");
		});

		it("should set the page title", async () => {
			const { wrapperVM } = setup();
			expect(wrapperVM.pageTitle).toContain("Room 1");
			expect(wrapperVM.pageTitle).toContain("pages.rooms.members.manage");
			expect(useTitle).toHaveBeenCalled();
		});

		it("should have the correct title", async () => {
			const { wrapper } = setup();
			expect(wrapper.find("h1").text()).toContain("pages.rooms.members.manage");
		});
	});

	describe("@methods", () => {
		describe("@onFabClick", () => {
			it("should call getPotantialMembers method", async () => {
				const { wrapper } = setup();
				const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });
				await wireframe.vm.$emit("fab:clicked");
				await flushPromises();

				expect(mockUseMembersCalls.getSchools).toHaveBeenCalled();
				expect(mockUseMembersCalls.getPotentialMembers).toHaveBeenCalledWith({
					role: RoleName.RoomEditor,
				});
			});
		});

		describe("@onDialogClose", () => {
			it("should set isMembersDialogOpen to false", async () => {
				const { wrapper, wrapperVM } = setup();

				const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });
				wireframe.vm.$emit("fab:clicked");
				await flushPromises();
				const dialogAfter = wrapper.findComponent({ name: "AddMembers" });
				expect(dialogAfter.exists()).toBe(true);
				expect(wrapperVM.isMembersDialogOpen).toBe(true);

				dialogAfter.vm.$emit("close");
				await flushPromises();
				expect(wrapperVM.isMembersDialogOpen).toBe(false);
			});
		});

		describe("@onAddMembers", () => {
			it("should call getPotantialMembers method", async () => {
				const { wrapper } = setup();
				const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });
				wireframe.vm.$emit("fab:clicked");
				await flushPromises();
				const dialog = wrapper.findComponent({ name: "AddMembers" });
				await dialog.vm.$emit("update:role");

				expect(mockUseMembersCalls.getPotentialMembers).toHaveBeenCalled();
			});
		});

		describe("@onRemoveMember", () => {
			describe("when user confirms the removal", () => {
				it("should call removeMember method", async () => {
					const { wrapper } = setup();
					const membersTable = wrapper.findComponent({
						name: "MembersTable",
					});
					await membersTable.vm.$emit("remove:members", [
						mockMembers[0].userId,
					]);
					await flushPromises();
					expect(mockUseMembersCalls.removeMembers).toHaveBeenCalledWith([
						mockMembers[0].userId,
					]);
					expect(askConfirmationMock).toHaveBeenCalledWith({
						confirmActionLangKey: "common.actions.remove",
						message: "pages.rooms.members.remove.confirmation",
					});
				});
			});

			describe("when user confirms multiple removal ", () => {
				it("should call removeMember method", async () => {
					const { wrapper } = setup();
					const membersTable = wrapper.findComponent({
						name: "MembersTable",
					});
					await membersTable.vm.$emit("remove:members", [
						mockMembers[0].userId,
						mockMembers[1].userId,
					]);
					await flushPromises();
					expect(mockUseMembersCalls.removeMembers).toHaveBeenCalledWith([
						mockMembers[0].userId,
						mockMembers[1].userId,
					]);
					expect(askConfirmationMock).toHaveBeenCalledWith({
						confirmActionLangKey: "common.actions.remove",
						message: "pages.rooms.members.multipleRemove.confirmation",
					});
				});
			});
		});
	});

	describe("DefaultWireframe", () => {
		it("should render DefaultWireframe", async () => {
			const { wrapper, wrapperVM } = setup();
			const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });
			expect(wireframe.exists()).toBe(true);
			await nextTick();
			expect(wireframe.vm.breadcrumbs).toBe(wrapperVM.breadcrumbs);
			expect(wireframe.vm["fab-items"]).toBe(wrapperVM.fabItem);
		});

		it("should set the breadcrumbs", async () => {
			const { wrapper, wrapperVM } = setup();
			const breadcrumbComponent = wrapper.findComponent({
				name: "v-breadcrumbs",
			});

			await nextTick();
			expect(breadcrumbComponent.exists()).toBe(true);
			expect(breadcrumbComponent.vm.items).toBe(wrapperVM.breadcrumbs);
		});
	});

	describe("MembersTable", () => {
		it("should render MembersTable", async () => {
			const { wrapper } = setup();
			const membersTable = wrapper.findComponent({
				name: "MembersTable",
			});
			expect(membersTable.exists()).toBe(true);
		});
	});

	describe("AddMembers Dialog", () => {
		it("should open AddMembers dialog", async () => {
			const { wrapper, wrapperVM } = setup();

			const dialogBefore = wrapper.findComponent({ name: "AddMembers" });
			expect(dialogBefore.exists()).toBe(false);
			expect(wrapperVM.isMembersDialogOpen).toBe(false);

			const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });
			expect(wireframe.exists()).toBe(true);
			await wireframe.vm.$emit("fab:clicked");
			await flushPromises();
			const dialogAfter = wrapper.findComponent({ name: "AddMembers" });
			expect(dialogAfter.exists()).toBe(true);
			expect(wrapperVM.isMembersDialogOpen).toBe(true);
			expect(mockUseMembersCalls.fetchMembers).toHaveBeenCalled();
		});

		it("should close AddMembers dialog", async () => {
			const { wrapper, wrapperVM } = setup();

			const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });
			wireframe.vm.$emit("fab:clicked");
			await flushPromises();
			const dialogAfter = wrapper.findComponent({ name: "AddMembers" });
			expect(dialogAfter.exists()).toBe(true);
			expect(wrapperVM.isMembersDialogOpen).toBe(true);

			dialogAfter.vm.$emit("close");
			await flushPromises();
			expect(wrapperVM.isMembersDialogOpen).toBe(false);
		});
	});
});
