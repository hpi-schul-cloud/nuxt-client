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
import { participants } from "@data-room";

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
			onFabClick: ReturnType<typeof vi.fn>;
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
			await nextTick();
			expect(wireframe.exists()).toBe(true);
			expect(wireframe.vm.breadcrumbs).toBe(wrapperVM.breadcrumbs);
			expect(wireframe.vm["fab-items"]).toBe(wrapperVM.fabItem);
		});
	});

	describe("ParticpantsTable", () => {
		it("should render ParticipantsTable", async () => {
			const { wrapper } = setup();
			const participantsTable = wrapper.findComponent({
				name: "ParticipantsTable",
			});
			expect(participantsTable.exists()).toBe(true);
			expect(participantsTable.vm.participants).toBe(participants);
		});
	});
});
