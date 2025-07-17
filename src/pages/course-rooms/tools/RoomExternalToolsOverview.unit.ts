import { ConfigResponse } from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import CourseRoomDetailsModule from "@/store/course-room-details";
import { CourseFeatures } from "@/store/types/room";
import {
	ENV_CONFIG_MODULE_KEY,
	COURSE_ROOM_DETAILS_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	businessErrorFactory,
	courseFactory,
	externalToolDisplayDataFactory,
} from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	ExternalToolDisplayData,
	useExternalToolDisplayListState,
} from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { ref } from "vue";
import RoomExternalToolsOverview from "./RoomExternalToolsOverview.vue";
import RoomExternalToolsSection from "./RoomExternalToolsSection.vue";
import { EmptyState } from "@ui-empty-state";

vi.mock("@data-external-tool");

describe("RoomExternalToolOverview", () => {
	let useExternalToolDisplayListStateMock: DeepMocked<
		ReturnType<typeof useExternalToolDisplayListState>
	>;

	const getWrapper = () => {
		const courseRoomDetailsModule = createModuleMocks(CourseRoomDetailsModule, {
			getLoading: false,
		});

		const refreshTime = 299000;
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: { CTL_TOOLS_RELOAD_TIME_MS: refreshTime } as ConfigResponse,
		});

		courseRoomDetailsModule.fetchCourse.mockResolvedValue(null);

		const wrapper = shallowMount(RoomExternalToolsOverview, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
					[COURSE_ROOM_DETAILS_MODULE_KEY.valueOf()]: courseRoomDetailsModule,
				},
			},
			props: {
				roomId: "testRoolId",
			},
		});

		return {
			wrapper,
			courseRoomDetailsModule,
			refreshTime,
		};
	};

	beforeEach(() => {
		useExternalToolDisplayListStateMock = createMock<
			ReturnType<typeof useExternalToolDisplayListState>
		>({
			error: ref(),
			isLoading: ref(),
			displayData: ref([]),
		});

		vi.mocked(useExternalToolDisplayListState).mockReturnValue(
			useExternalToolDisplayListStateMock
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when no tools or no videoconference is in the list", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should display empty state", () => {
			const { wrapper } = setup();
			const emptyState = wrapper.findComponent(EmptyState);

			expect(emptyState.exists()).toBe(true);
			expect(emptyState.props("title")).toEqual("pages.rooms.tools.emptyState");
		});
	});

	describe("when the tools are loading", () => {
		const setup = () => {
			useExternalToolDisplayListStateMock.isLoading.value = true;

			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should display progressbar", () => {
			const { wrapper } = setup();

			const progressbar = wrapper.findComponent('[data-testId="progress-bar"]');

			expect(progressbar.attributes("active")).toEqual("true");
		});
	});

	describe("when an error occurred", () => {
		const setup = () => {
			useExternalToolDisplayListStateMock.error.value =
				businessErrorFactory.build();

			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should display the error in the alert", () => {
			const { wrapper } = setup();

			const alert = wrapper.findComponent({ name: "v-alert" });

			expect(alert.exists()).toEqual(true);
		});
	});

	describe("when video conferences are enabled", () => {
		const setup = async () => {
			const { wrapper, courseRoomDetailsModule } = getWrapper();

			courseRoomDetailsModule.fetchCourse.mockResolvedValue(
				courseFactory.build({ features: [CourseFeatures.VIDEOCONFERENCE] })
			);

			await flushPromises();

			return {
				wrapper,
			};
		};

		it("should display the video conference section", async () => {
			const { wrapper } = await setup();

			const vcSection = wrapper.findComponent({
				name: "room-video-conference-section",
			});

			expect(vcSection.exists()).toEqual(true);
		});
	});

	describe("when video conferences are disabled", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should display the video conference section", () => {
			const { wrapper } = setup();

			const vcSection = wrapper.findComponent({
				name: "room-video-conference-section",
			});

			expect(vcSection.exists()).toEqual(false);
		});
	});

	describe("when refresh time is over", () => {
		afterEach(() => {
			vi.useRealTimers();
		});
		const setup = () => {
			vi.useFakeTimers({ legacyFakeTimers: true });
			const { refreshTime } = getWrapper();

			return {
				refreshTime,
			};
		};

		it("should call tool reference endpoint again", () => {
			const { refreshTime } = setup();

			expect(
				useExternalToolDisplayListStateMock.fetchDisplayData
			).toHaveBeenCalledTimes(1);

			vi.advanceTimersByTime(refreshTime + 1000);

			expect(
				useExternalToolDisplayListStateMock.fetchDisplayData
			).toHaveBeenCalledTimes(2);
		});
	});

	describe("when deleting a tool", () => {
		const setup = () => {
			const displayData: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper } = getWrapper();

			return {
				wrapper,
				displayData,
			};
		};

		it("should call tool reference endpoint again", () => {
			const { wrapper, displayData } = setup();

			const section = wrapper.findComponent(RoomExternalToolsSection);
			section.vm.$emit("delete", displayData);

			expect(
				useExternalToolDisplayListStateMock.deleteContextExternalTool
			).toHaveBeenCalledWith(displayData.contextExternalToolId);
		});
	});

	describe("when emit refresh", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should call tool reference endpoint again", () => {
			const { wrapper } = setup();

			const section = wrapper.findComponent(RoomExternalToolsSection);
			section.vm.$emit("refresh");

			expect(
				useExternalToolDisplayListStateMock.fetchDisplayData
			).toHaveBeenCalledTimes(2);
		});
	});
});
