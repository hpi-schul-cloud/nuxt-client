import RoomParticipantsPage from "./RoomParticipants.page.vue";
import { createTestingPinia } from "@pinia/testing";
import {
	mockedPiniaStoreTyping,
	roomParticipantResponseFactory,
	roomParticipantSchoolResponseFactory,
} from "@@/tests/test-utils";
import { useParticipants, useRoomDetailsStore } from "@data-room";
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
import { RoomColor } from "@/serverApi/v3";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";

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

const mockParticipants = roomParticipantResponseFactory.buildList(3);
const mockPotentialParticipants = roomParticipantResponseFactory.buildList(3);
const roomParticipantsSchools =
	roomParticipantSchoolResponseFactory.buildList(3);

jest.mock("../../data/room/roomParticipants/participants.composable");
const mockUseParticipants = jest.mocked(useParticipants);

jest.mock("@ui-confirmation-dialog");
jest.mock("@ui-confirmation-dialog");
const mockedUseDeleteConfirmationDialog = jest.mocked(
	useDeleteConfirmationDialog
);

describe("RoomParticipantsPage", () => {
	let router: DeepMocked<Router>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;
	let mockUseParticipantsCalls: DeepMocked<ReturnType<typeof useParticipants>>;

	beforeEach(() => {
		route = createMock<ReturnType<typeof useRoute>>();
		useRouteMock.mockReturnValue(route);
		useRouteMock.mockReturnValue({ params: { id: "room-id" } });

		router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
		mockUseParticipantsCalls = createMock<ReturnType<typeof useParticipants>>();
		mockUseParticipantsCalls.getPotentialParticipants = jest.fn();
		mockUseParticipantsCalls.fetchParticipants = jest.fn();
		mockUseParticipantsCalls.removeParticipants = jest.fn();
		mockUseParticipants.mockReturnValue({
			...mockUseParticipantsCalls,
			schools: ref(roomParticipantsSchools),
			participants: ref(mockParticipants),
			isLoading: ref(false),
			potentialParticipants: ref(mockPotentialParticipants),
		});

		const askDeleteConfirmationMock = async () => await Promise.resolve(true);
		setupDeleteConfirmationComposableMock({
			askDeleteConfirmationMock,
		});
		mockedUseDeleteConfirmationDialog.mockReturnValue({
			askDeleteConfirmation: askDeleteConfirmationMock,
			isDeleteDialogOpen: ref(false),
		});

		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = () => {
		const wrapper = mount(RoomParticipantsPage, {
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							useRoomDetailsStore: {
								room: store,
							},
						},
					}),
					createTestingI18n(),
					createTestingVuetify(),
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
			isParticipantsDialogOpen: boolean;
			onFabClick: ReturnType<typeof jest.fn>;
		};

		return { wrapper, roomDetailsStore, wrapperVM };
	};

	describe("when page is mounted", () => {
		it("should be found in the dom", async () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
			expect(wrapper.findComponent(RoomParticipantsPage)).toBeTruthy();
		});

		it("should call 'fetchRoom' method in the store", async () => {
			const { roomDetailsStore } = setup();
			expect(roomDetailsStore.fetchRoom).toHaveBeenCalledWith("room-id");
		});

		it("should set the page title", async () => {
			const { wrapperVM } = setup();
			expect(wrapperVM.pageTitle).toContain("Room 1");
			expect(wrapperVM.pageTitle).toContain(
				"pages.rooms.participants.manageParticipants"
			);
		});

		it("should have the correct title", async () => {
			const { wrapper } = setup();
			expect(wrapper.find("h1").text()).toContain(
				"pages.rooms.participants.manageParticipants"
			);
		});
	});

	describe("@methods", () => {
		describe("@onFabClick", () => {
			it("should call getPotantialParticipants method", async () => {
				const { wrapper } = setup();
				const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });
				await wireframe.vm.$emit("fab:clicked");

				expect(
					mockUseParticipantsCalls.getPotentialParticipants
				).toHaveBeenCalledWith("teacher");
			});
		});

		describe("@onDialogClose", () => {
			it("should set isParticipantsDialogOpen to false", async () => {
				const { wrapper, wrapperVM } = setup();

				const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });
				wireframe.vm.$emit("fab:clicked");
				await flushPromises();
				const dialogAfter = wrapper.findComponent({ name: "AddParticipants" });
				expect(dialogAfter.exists()).toBe(true);
				expect(wrapperVM.isParticipantsDialogOpen).toBe(true);

				dialogAfter.vm.$emit("close");
				await flushPromises();
				expect(wrapperVM.isParticipantsDialogOpen).toBe(false);
			});
		});

		describe("@onAddParticipants", () => {
			it("should call getPotantialParticipants method", async () => {
				const { wrapper } = setup();
				const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });
				wireframe.vm.$emit("fab:clicked");
				await flushPromises();
				const dialog = wrapper.findComponent({ name: "AddParticipants" });
				await dialog.vm.$emit("update:role");

				expect(
					mockUseParticipantsCalls.getPotentialParticipants
				).toHaveBeenCalled();
			});
		});

		describe("@onRemoveParticipant", () => {
			it("should call deleteParticipant method", async () => {
				const { wrapper } = setup();
				const participantsTable = wrapper.findComponent({
					name: "ParticipantsTable",
				});
				await participantsTable.vm.$emit(
					"remove:participant",
					mockParticipants[0]
				);
				await flushPromises();
				expect(
					mockUseParticipantsCalls.removeParticipants
				).toHaveBeenCalledWith([mockParticipants[0].userId]);
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

	describe("ParticpantsTable", () => {
		it("should render ParticipantsTable", async () => {
			const { wrapper } = setup();
			const participantsTable = wrapper.findComponent({
				name: "ParticipantsTable",
			});
			expect(participantsTable.exists()).toBe(true);
		});
	});

	describe("AddParticipant Dialog", () => {
		it("should render AddParticipants", async () => {
			const { wrapper, wrapperVM } = setup();

			const dialogBefore = wrapper.findComponent({ name: "AddParticipants" });
			expect(dialogBefore.exists()).toBe(false);
			expect(wrapperVM.isParticipantsDialogOpen).toBe(false);

			const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });
			expect(wireframe.exists()).toBe(true);
			await wireframe.vm.$emit("fab:clicked");
			await flushPromises();
			const dialogAfter = wrapper.findComponent({ name: "AddParticipants" });
			expect(dialogAfter.exists()).toBe(true);
			expect(wrapperVM.isParticipantsDialogOpen).toBe(true);
			expect(mockUseParticipantsCalls.fetchParticipants).toHaveBeenCalled();
		});

		it("should close AddParticipants dialog", async () => {
			const { wrapper, wrapperVM } = setup();

			const wireframe = wrapper.findComponent({ name: "DefaultWireframe" });
			wireframe.vm.$emit("fab:clicked");
			await flushPromises();
			const dialogAfter = wrapper.findComponent({ name: "AddParticipants" });
			expect(dialogAfter.exists()).toBe(true);
			expect(wrapperVM.isParticipantsDialogOpen).toBe(true);

			dialogAfter.vm.$emit("close");
			await flushPromises();
			expect(wrapperVM.isParticipantsDialogOpen).toBe(false);
		});
	});
});
