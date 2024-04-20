import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import { AlertPayload } from "@/store/types/alert-payload";
import { ComponentProps } from "@/types/vue";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	axiosErrorFactory,
	businessErrorFactory,
	envsFactory,
	externalToolDisplayDataFactory,
	mediaExternalToolElementResponseFactory,
} from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import {
	useContextExternalToolApi,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { MediaElementDisplay } from "./data";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";
import MediaBoardExternalToolElement from "./MediaBoardExternalToolElement.vue";

jest.mock("@data-external-tool");

describe("MediaBoardExternalToolElement", () => {
	let useContextExternalToolApiMock: DeepMocked<
		ReturnType<typeof useContextExternalToolApi>
	>;
	let useExternalToolLaunchStateMock: DeepMocked<
		ReturnType<typeof useExternalToolLaunchState>
	>;

	const getWrapper = (
		props: ComponentProps<typeof MediaBoardExternalToolElement>
	) => {
		const refreshTime = 299000;
		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: envsFactory.build({ CTL_TOOLS_RELOAD_TIME_MS: refreshTime }),
		});
		const notifierModule = createModuleMocks(NotifierModule);

		const wrapper = shallowMount(MediaBoardExternalToolElement, {
			global: {
				plugins: [createTestingI18n()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
			props,
		});

		return {
			wrapper,
			notifierModule,
			refreshTime,
		};
	};

	beforeEach(() => {
		useContextExternalToolApiMock =
			createMock<ReturnType<typeof useContextExternalToolApi>>();
		useExternalToolLaunchStateMock = createMock<
			ReturnType<typeof useExternalToolLaunchState>
		>({
			error: ref(),
		});

		jest
			.mocked(useContextExternalToolApi)
			.mockReturnValue(useContextExternalToolApiMock);
		jest
			.mocked(useExternalToolLaunchState)
			.mockReturnValue(useExternalToolLaunchStateMock);

		jest.useFakeTimers("legacy");
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when loading external tool data", () => {
		describe("when the api returns data", () => {
			const setup = async () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();
				const displayDataResponse = externalToolDisplayDataFactory.build({
					name: "name",
					description: "description",
				});

				useContextExternalToolApiMock.fetchDisplayDataCall.mockResolvedValue(
					displayDataResponse
				);

				const { wrapper } = getWrapper({
					element: externalToolElement,
				});

				await flushPromises();

				return {
					wrapper,
					externalToolElement,
					displayDataResponse,
				};
			};

			it("should call the api to load display data", async () => {
				const { externalToolElement } = await setup();

				expect(
					useContextExternalToolApiMock.fetchDisplayDataCall
				).toHaveBeenCalledWith(
					externalToolElement.content.contextExternalToolId
				);
			});

			it("should call the state to load the launch request", async () => {
				const { externalToolElement } = await setup();

				expect(
					useExternalToolLaunchStateMock.fetchLaunchRequest
				).toHaveBeenCalledWith(
					externalToolElement.content.contextExternalToolId
				);
			});

			it("should map to the display props", async () => {
				const { wrapper, displayDataResponse } = await setup();

				const displayComponent = wrapper.findComponent(
					MediaBoardElementDisplay
				);

				expect(displayComponent.props().element).toEqual<MediaElementDisplay>({
					title: displayDataResponse.name,
					description: displayDataResponse.description,
					thumbnail: undefined,
				});
			});
		});

		describe("when the display data api returns an error", () => {
			const setup = async () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();
				const error = axiosErrorFactory.build();

				useContextExternalToolApiMock.fetchDisplayDataCall.mockRejectedValue(
					error
				);

				const logger = jest.spyOn(console, "error").mockImplementation();

				const { wrapper } = getWrapper({
					element: externalToolElement,
				});

				await flushPromises();

				return {
					wrapper,
					logger,
					error,
				};
			};

			it("should log the error", async () => {
				const { logger, error } = await setup();

				expect(logger).toHaveBeenCalledWith(error);
			});
		});
	});

	describe("when the refresh time is over", () => {
		const setup = () => {
			const { wrapper, refreshTime } = getWrapper({
				element: mediaExternalToolElementResponseFactory.build(),
			});

			return {
				wrapper,
				refreshTime,
			};
		};

		it("should refresh the display data", async () => {
			const { refreshTime } = setup();
			await nextTick();

			expect(
				useExternalToolLaunchStateMock.fetchLaunchRequest
			).toHaveBeenCalledTimes(1);

			jest.advanceTimersByTime(refreshTime + 1000);
			await nextTick();

			expect(
				useExternalToolLaunchStateMock.fetchLaunchRequest
			).toHaveBeenCalledTimes(2);
		});
	});

	describe("when clicking the element", () => {
		describe("when a launch request is available", () => {
			const setup = () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();
				const { wrapper } = getWrapper({
					element: externalToolElement,
				});

				return {
					wrapper,
					externalToolElement,
				};
			};

			it("should launch the tool", async () => {
				const { wrapper } = setup();

				await wrapper.trigger("click");

				expect(useExternalToolLaunchStateMock.launchTool).toHaveBeenCalled();
			});

			it("should load the next launch request", async () => {
				const { wrapper, externalToolElement } = setup();

				await wrapper.trigger("click");

				expect(
					useExternalToolLaunchStateMock.fetchLaunchRequest
				).toHaveBeenCalledWith(
					externalToolElement.content.contextExternalToolId
				);
			});
		});

		describe("when loading the launch request failed", () => {
			const setup = () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();
				const { wrapper, notifierModule } = getWrapper({
					element: externalToolElement,
				});

				useExternalToolLaunchStateMock.error.value =
					businessErrorFactory.build();

				return {
					wrapper,
					externalToolElement,
					notifierModule,
				};
			};

			it("should show an error notification", async () => {
				const { wrapper, notifierModule } = setup();

				await wrapper.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith<[AlertPayload]>({
					status: "error",
					text: "error.generic",
				});
			});
		});
	});
});
