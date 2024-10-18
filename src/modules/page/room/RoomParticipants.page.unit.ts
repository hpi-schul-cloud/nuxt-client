import RoomParticipantsPage from "./RoomParticipants.page.vue";
import { createTestingPinia } from "@pinia/testing";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { useRoomDetailsStore } from "@data-room";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { Router, useRoute, useRouter } from "vue-router";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { RoomColor } from "@/serverApi/v3";
import { nextTick } from "vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { flushPromises } from "@vue/test-utils";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { authModule } from "@/store";

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;
const useRouteMock = <jest.Mock>useRoute;
useRouteMock.mockReturnValue({ params: { id: "room-id" } });

const store = {
	isLoading: false,
	room: {
		id: "1",
		name: "Room 1",
		color: "blue-gray" as RoomColor,
		createdAt: new Date().toString(),
		updatedAt: new Date().toString(),
	},
};

describe("RoomParticipantsPage", () => {
	let router: DeepMocked<Router>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;

	beforeEach(() => {
		route = createMock<ReturnType<typeof useRoute>>();
		useRouteMock.mockReturnValue(route);
		useRouteMock.mockReturnValue({ params: { id: "room-id" } });

		router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
		setupStores({
			envConfigModule: EnvConfigModule,
			authModule: AuthModule,
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
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
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

	describe("ParticipantsTable", () => {
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
			wireframe.vm.$emit("fab:clicked");
			await flushPromises();
			const dialogAfter = wrapper.findComponent({ name: "AddParticipants" });
			expect(dialogAfter.exists()).toBe(true);
			expect(wrapperVM.isParticipantsDialogOpen).toBe(true);
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
