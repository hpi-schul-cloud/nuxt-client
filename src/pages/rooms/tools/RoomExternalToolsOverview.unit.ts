import { ConfigResponse } from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import CourseRoomDetailModule from "@/store/course-room-detail";
import { CourseFeatures } from "@/store/types/course-room-detail";
import { ENV_CONFIG_MODULE_KEY, ROOM_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
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
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { ref } from "vue";
import RoomExternalToolsOverview from "./RoomExternalToolsOverview.vue";
import RoomExternalToolsSection from "./RoomExternalToolsSection.vue";

jest.mock("@data-external-tool");

describe("RoomExternalToolOverview", () => {
	let useExternalToolDisplayListStateMock: DeepMocked<
		ReturnType<typeof useExternalToolDisplayListState>
	>;

	const getWrapper = () => {
		const courseRoomDetailModule = createModuleMocks(CourseRoomDetailModule, {
			getLoading: false,
		});

		const refreshTime = 299000;
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: { CTL_TOOLS_RELOAD_TIME_MS: refreshTime } as ConfigResponse,
		});

		courseRoomDetailModule.fetchCourse.mockResolvedValue(null);

		const wrapper = shallowMount(RoomExternalToolsOverview, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
					[ROOM_MODULE_KEY.valueOf()]: courseRoomDetailModule,
				},
			},
			props: {
				roomId: "testRoolId",
			},
		});

		return {
			wrapper,
			courseRoomDetailModule,
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

		jest
			.mocked(useExternalToolDisplayListState)
			.mockReturnValue(useExternalToolDisplayListStateMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
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

			expect(wrapper.findComponent({ ref: "tools-empty-state" }).exists()).toBe(
				true
			);
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
			const { wrapper, courseRoomDetailModule } = getWrapper();

			courseRoomDetailModule.fetchCourse.mockResolvedValue(
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
			jest.useRealTimers();
		});
		const setup = () => {
			jest.useFakeTimers({ legacyFakeTimers: true });
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

			jest.advanceTimersByTime(refreshTime + 1000);

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
});
