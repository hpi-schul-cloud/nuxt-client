import * as serverApi from "@/serverApi/v3/api";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { AUTH_MODULE_KEY, ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import { envsFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { RoomDetailsPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import AuthModule from "@/store/auth";
import { nextTick, Ref } from "vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import setupStores from "@@/tests/test-utils/setupStores";
import { roomDetailsFactory } from "@@/tests/test-utils/factory/roomDetailsFactory";
import { flushPromises } from "@vue/test-utils";
import { Router, useRoute, useRouter } from "vue-router";
import { createMock } from "@golevelup/ts-jest";
import { RoomColorEnum } from "@/types/room/Room";

jest.mock("vue-router", () => ({
	useRoute: jest.fn(),
	useRouter: jest.fn(),
}));

describe("@pages/RoomsDetailsSwitch.page.vue", () => {
	const router = createMock<Router>();
	const useRouteMock = <jest.Mock>useRoute;
	useRouteMock.mockReturnValue({ params: { id: "room-id" }, push: jest.fn() });
	const useRouterMock = <jest.Mock>useRouter;

	beforeEach(() => {
		useRouterMock.mockReturnValue(router);
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = (
		{
			isLoading,
			roomVariant,
			envs,
		}: {
			isLoading: boolean;
			roomVariant?: RoomVariant;
			envs?: Record<string, unknown>;
			isTeacher?: boolean;
			hasEditPermission?: boolean;
		} = { isLoading: false, roomVariant: RoomVariant.ROOM }
	) => {
		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: envsFactory.build({
				FEATURE_ROOMS_ENABLED: true,
				...envs,
			}),
		});

		const wrapper = shallowMount(RoomDetailsPage, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia(),
				],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
				stubs: {
					RoomDetailsPage: true,
					CourseRoomDetailsPage: true,
				},
			},
			router,
		});

		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		const room = roomDetailsFactory.build();
		roomDetailsStore.room = room;
		roomDetailsStore.roomVariant = roomVariant;
		roomDetailsStore.isLoading = isLoading;
		roomDetailsStore.roomBoards = [];

		return {
			wrapper,
			roomDetailsStore,
		};
	};

	describe("when page is mounted", () => {
		it("should be rendered in DOM", () => {
			const { wrapper } = setup();

			expect(wrapper.vm).toBeDefined();
		});

		describe("when FEATURE_ROOMS_ENABLED flag is set true", () => {
			it("should call fetchRoom on mounted", () => {
				const { roomDetailsStore } = setup();

				expect(roomDetailsStore.fetchRoom).toHaveBeenCalledWith("room-id");
				expect(roomDetailsStore.deactivateRoom).not.toHaveBeenCalled();
			});
		});

		describe("when FEATURE_ROOMS_ENABLED flag is set false", () => {
			it("should not call fetchRoom on mounted", () => {
				const { roomDetailsStore } = setup({
					envs: { FEATURE_ROOMS_ENABLED: false },
					isLoading: false,
				});

				expect(roomDetailsStore.deactivateRoom).toHaveBeenCalled();
				expect(roomDetailsStore.fetchRoom).not.toHaveBeenCalled();
			});
		});
	});

	describe("when loading", () => {
		it("should render a loading indication", () => {
			const { wrapper } = setup({ isLoading: true });

			const div = wrapper.find("[data-testid=loading]");
			expect(div.exists()).toBe(true);
		});
	});

	describe("when roomVariant is COURSE_ROOM", () => {
		it("should not render RoomDetails", () => {
			const { wrapper } = setup({
				roomVariant: RoomVariant.COURSE_ROOM,
				isLoading: false,
			});

			const roomDetailsComponent = wrapper.findComponent({
				name: "RoomDetails",
			});
			expect(roomDetailsComponent.exists()).toBe(false);
		});
	});

	describe("when not loading", () => {
		it("should not render a loading indication", async () => {
			const { wrapper } = setup({ isLoading: false });
			await flushPromises();

			const div = wrapper.find('[data-testid="loading"]');
			expect(div.exists()).toBe(false);
		});

		describe("when roomVariant is ROOM", () => {
			it("should render DefaultLayout ", async () => {
				const { wrapper } = setup({
					isLoading: false,
					roomVariant: RoomVariant.ROOM,
				});
				await flushPromises();

				const defaultWireframe = wrapper.findComponent(DefaultWireframe);
				expect(defaultWireframe.exists()).toBe(true);
			});
		});
	});
});
