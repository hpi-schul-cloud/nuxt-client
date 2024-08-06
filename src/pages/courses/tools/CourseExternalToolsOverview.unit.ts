import { ConfigResponse } from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import CourseModule from "@/store/course";
import { CourseFeatures } from "@/store/types/course";
import { ENV_CONFIG_MODULE_KEY, COURSE_MODULE_KEY } from "@/utils/inject";
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
import CourseExternalToolsOverview from "@/pages/courses/tools/CourseExternalToolsOverview.vue";
import CourseExternalToolsSection from "@/pages/courses/tools/CourseExternalToolsSection.vue";

jest.mock("@data-external-tool");

describe("CourseExternalToolOverview", () => {
	let useExternalToolDisplayListStateMock: DeepMocked<
		ReturnType<typeof useExternalToolDisplayListState>
	>;

	const getWrapper = () => {
		const courseModule = createModuleMocks(CourseModule, {
			getLoading: false,
		});

		const refreshTime = 299000;
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: { CTL_TOOLS_RELOAD_TIME_MS: refreshTime } as ConfigResponse,
		});

		courseModule.fetchCourse.mockResolvedValue(null);

		const wrapper = shallowMount(CourseExternalToolsOverview, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
					[COURSE_MODULE_KEY.valueOf()]: courseModule,
				},
			},
			props: {
				roomId: "testRoolId",
			},
		});

		return {
			wrapper,
			courseModule,
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
			const { wrapper, courseModule } = getWrapper();

			courseModule.fetchCourse.mockResolvedValue(
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
				name: "course-video-conference-section",
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
				name: "course-video-conference-section",
			});

			expect(vcSection.exists()).toEqual(false);
		});
	});

	describe("when refresh time is over", () => {
		afterEach(() => {
			jest.useRealTimers();
		});
		const setup = () => {
			jest.useFakeTimers("legacy");
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

			const section = wrapper.findComponent(CourseExternalToolsSection);
			section.vm.$emit("delete", displayData);

			expect(
				useExternalToolDisplayListStateMock.deleteContextExternalTool
			).toHaveBeenCalledWith(displayData.contextExternalToolId);
		});
	});
});
