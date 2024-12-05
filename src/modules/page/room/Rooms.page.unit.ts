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
import { useRoomsState } from "@data-room";
import { createMock } from "@golevelup/ts-jest";
import { flushPromises } from "@vue/test-utils";
import { useTitle } from "@vueuse/core";
import { ref } from "vue";
import { RouteLocation, Router, useRoute, useRouter } from "vue-router";
import RoomsPage from "./Rooms.page.vue";

jest.mock("@vueuse/core", () => {
	return {
		...jest.requireActual("@vueuse/core"),
		useTitle: jest.fn(),
	};
});
jest.mocked(useTitle).mockReturnValue(ref(null));

jest.mock("vue-router");
const useRouteMock = useRoute as jest.Mock;
const useRouterMock = useRouter as jest.Mock;

jest.mock("@data-room/Rooms.state");
const useRoomsStateMock = useRoomsState as jest.Mock;

describe("RoomsPage", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = (routeQuery: RouteLocation["query"] = {}) => {
		const envConfigModule = createModuleMocks(EnvConfigModule, {});
		const copyModule = createModuleMocks(CopyModule);
		const loadingState = createModuleMocks(LoadingStateModule);
		const notifierModuleMock = createModuleMocks(NotifierModule);

		const route = createMock<RouteLocation>({
			query: routeQuery,
		});
		useRouteMock.mockReturnValue(route);

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

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
			notifierModuleMock,
			router,
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

	describe("when the page is in import mode", () => {
		const setupImportMode = () => {
			const token = "6S6s-CWVVxEG";
			const { wrapper, notifierModuleMock, router } = setup({ import: token });

			return {
				wrapper,
				token,
				notifierModuleMock,
				router,
			};
		};

		it("should activate import flow", () => {
			const { wrapper } = setupImportMode();
			const importFLow = wrapper.findComponent({ name: "ImportFlow" });

			expect(importFLow.props().isActive).toBe(true);
		});

		it("should pass the token to the import flow", () => {
			const { wrapper, token } = setupImportMode();
			const importFLow = wrapper.findComponent({ name: "ImportFlow" });

			expect(importFLow.props().token).toBe(token);
		});

		describe("when the import flow succeeded", () => {
			it("should notify about successful import", () => {
				const { wrapper, notifierModuleMock } = setupImportMode();
				const importFLow = wrapper.findComponent({ name: "ImportFlow" });
				importFLow.vm.$emit("success", "newName", "newId");

				expect(notifierModuleMock.show).toHaveBeenCalledWith(
					expect.objectContaining({
						text: "components.molecules.import.options.success",
						status: "success",
					})
				);
			});

			it("should go to the room details page", () => {
				const { wrapper, router } = setupImportMode();
				const importFLow = wrapper.findComponent({ name: "ImportFlow" });
				importFLow.vm.$emit("success", "newName", "newId");

				expect(router.replace).toHaveBeenCalledWith({
					name: "rooms-id",
					params: { id: "newId" },
				});
			});
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
