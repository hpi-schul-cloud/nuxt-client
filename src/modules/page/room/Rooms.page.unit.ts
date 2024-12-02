import CopyModule from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import {
	COPY_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	LOADING_STATE_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock } from "@golevelup/ts-jest";
import { flushPromises } from "@vue/test-utils";
import { useTitle } from "@vueuse/core";
import { ref } from "vue";
import { RouteLocation, useRoute } from "vue-router";
import RoomsPage from "./Rooms.page.vue";
import { useRoomsState } from "@data-room";

jest.mock("@vueuse/core", () => {
	return {
		...jest.requireActual("@vueuse/core"),
		useTitle: jest.fn(),
	};
});
jest.mocked(useTitle).mockReturnValue(ref(null));

jest.mock("vue-router");
const useRouteMock = useRoute as jest.Mock;

jest.mock("@data-room/Rooms.state");
const useRoomsStateMock = useRoomsState as jest.Mock;

describe("RoomsPage", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = () => {
		const envConfigModule = createModuleMocks(EnvConfigModule, {});
		const copyModule = createModuleMocks(CopyModule);
		const loadingState = createModuleMocks(LoadingStateModule);
		const notifierModuleMock = createModuleMocks(NotifierModule);

		const route = createMock<RouteLocation>({});
		useRouteMock.mockReturnValue(route);

		useRoomsStateMock.mockReturnValue({
			rooms: ref([]),
			isLoading: ref(false),
			isEmpty: ref(false),
			fetchRooms: jest.fn(),
			deleteRoom: jest.fn(),
		});

		const wrapper = mount(RoomsPage, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				provide: {
					[ENV_CONFIG_MODULE_KEY]: envConfigModule,
					[COPY_MODULE_KEY]: copyModule,
					[LOADING_STATE_MODULE_KEY]: loadingState,
					[NOTIFIER_MODULE_KEY]: notifierModuleMock,
				},
			},
		});
		const wrapperVM = wrapper.vm as unknown as {
			pageTitle: string;
			fabItem: {
				icon: string;
				title: string;
				to: string;
				ariaLabel: string;
				testId: string;
			};
		};

		return {
			wrapper,
			wrapperVM,
		};
	};

	describe("when the page is mounted", () => {
		it("should be found in the dom", async () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
		});

		it("should have the correct title", async () => {
			const { wrapperVM } = setup();
			await flushPromises();
			expect(useTitle).toHaveBeenCalled();
			expect(wrapperVM.pageTitle).toContain("pages.rooms.title");
		});
	});

	describe("Page Components", () => {
		describe("DefaultWireframe", () => {
			it("should be found in the dom", async () => {
				const { wrapper } = setup();
				const wireframe = wrapper.findComponent({
					name: "DefaultWireframe",
				});

				expect(wireframe.exists()).toBe(true);
			});

			it("should have the correct props", async () => {
				const { wrapper, wrapperVM } = setup();
				const wireframe = wrapper.findComponent({
					name: "DefaultWireframe",
				});

				expect(wireframe.vm["fab-items"]).toBe(wrapperVM.fabItem);
			});
		});

		describe("RoomGrid", () => {
			it("should be found in the dom", async () => {
				const { wrapper } = setup();
				const roomGrid = wrapper.findComponent({ name: "RoomGrid" });

				expect(roomGrid.exists()).toBe(true);
			});
		});
	});
});
