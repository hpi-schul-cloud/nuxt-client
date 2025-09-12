import { ToolContextType } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { AlertPayload } from "@/store/types/alert-payload";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import {
	businessErrorFactory,
	createTestEnvStore,
	mediaAvailableLineElementResponseFactory,
	mediaBoardResponseFactory,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { useExternalToolLaunchState } from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { useDragAndDrop } from "@util-board";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import { MediaElementDisplay, useSharedMediaBoardState } from "./data";
import MediaBoardAvailableElement from "./MediaBoardAvailableElement.vue";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";

vi.mock("@data-external-tool");
vi.mock("./data");

describe("MediaBoardAvailableElement", () => {
	let useExternalToolLaunchStateMock: DeepMocked<
		ReturnType<typeof useExternalToolLaunchState>
	>;

	let useSharedMediaBoardStateMock: DeepMocked<
		ReturnType<typeof useSharedMediaBoardState>
	>;

	const getWrapper = (
		props: ComponentProps<typeof MediaBoardAvailableElement>
	) => {
		const refreshTime = 299000;
		createTestEnvStore({
			CTL_TOOLS_RELOAD_TIME_MS: refreshTime,
		});
		const notifierModule = createModuleMocks(NotifierModule);

		const mediaBoard = mediaBoardResponseFactory.build();
		useSharedMediaBoardStateMock.mediaBoard.value = mediaBoard;

		const wrapper = shallowMount(MediaBoardAvailableElement, {
			global: {
				plugins: [createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
			props,
		});

		return {
			wrapper,
			notifierModule,
			refreshTime,
			mediaBoard,
		};
	};

	beforeEach(() => {
		useExternalToolLaunchStateMock = createMock<
			ReturnType<typeof useExternalToolLaunchState>
		>({
			error: ref(),
		});

		useSharedMediaBoardStateMock = createMock<
			ReturnType<typeof useSharedMediaBoardState>
		>({
			mediaBoard: ref(),
		});

		vi.mocked(useExternalToolLaunchState).mockReturnValue(
			useExternalToolLaunchStateMock
		);

		vi.mocked(useSharedMediaBoardState).mockReturnValue(
			useSharedMediaBoardStateMock
		);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when loading external tool data", () => {
		describe("when the api returns data", () => {
			const setup = async () => {
				const availableLineElement =
					mediaAvailableLineElementResponseFactory.build({
						name: "title",
						description: "description",
						logoUrl: "logoUrl",
					});

				const { wrapper, mediaBoard } = getWrapper({
					element: availableLineElement,
				});

				await flushPromises();

				return {
					wrapper,
					availableLineElement,
					mediaBoard,
				};
			};

			it("should call the state to load the launch request", async () => {
				const { availableLineElement, mediaBoard } = await setup();

				expect(
					useExternalToolLaunchStateMock.fetchSchoolLaunchRequest
				).toHaveBeenCalledWith(availableLineElement.schoolExternalToolId, {
					contextId: mediaBoard.id,
					contextType: ToolContextType.MediaBoard,
				});
			});

			it("should map the props", async () => {
				const { wrapper, availableLineElement } = await setup();

				const displayComponent = wrapper.findComponent(
					MediaBoardElementDisplay
				);

				expect(displayComponent.props().element).toEqual<MediaElementDisplay>({
					title: availableLineElement.name,
					domain: availableLineElement.domain,
					description: availableLineElement.description,
					thumbnail: availableLineElement.logoUrl,
				});
			});
		});
	});

	describe("when the refresh time is over", () => {
		const setup = () => {
			const { wrapper, refreshTime } = getWrapper({
				element: mediaAvailableLineElementResponseFactory.build(),
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
				useExternalToolLaunchStateMock.fetchSchoolLaunchRequest
			).toHaveBeenCalledTimes(1);

			vi.advanceTimersByTime(refreshTime + 1000);
			await nextTick();

			expect(
				useExternalToolLaunchStateMock.fetchSchoolLaunchRequest
			).toHaveBeenCalledTimes(2);
		});
	});

	describe("when clicking the element", () => {
		describe("when a launch request is available", () => {
			const setup = () => {
				const availableLineElement =
					mediaAvailableLineElementResponseFactory.build();
				const { wrapper } = getWrapper({
					element: availableLineElement,
				});

				return {
					wrapper,
					availableLineElement,
				};
			};

			it("should launch the tool", async () => {
				const { wrapper } = setup();

				await wrapper.trigger("click");

				expect(useExternalToolLaunchStateMock.launchTool).toHaveBeenCalled();
			});

			it("should load the next launch request", async () => {
				const { wrapper, availableLineElement } = setup();

				await wrapper.trigger("click");

				expect(
					useExternalToolLaunchStateMock.fetchSchoolLaunchRequest
				).toHaveBeenCalledWith(availableLineElement.schoolExternalToolId, {
					contextId: expect.any(String),
					contextType: ToolContextType.MediaBoard,
				});
			});
		});

		describe("when dragging", () => {
			const setup = () => {
				const availableLineElement =
					mediaAvailableLineElementResponseFactory.build();
				const { wrapper } = getWrapper({
					element: availableLineElement,
				});

				useDragAndDrop().dragStart();

				return {
					wrapper,
					availableLineElement,
				};
			};

			it("should not launch the tool", async () => {
				const { wrapper } = setup();

				await wrapper.trigger("click");

				expect(
					useExternalToolLaunchStateMock.launchTool
				).not.toHaveBeenCalled();
			});
		});

		describe("when loading the launch request failed", () => {
			const setup = () => {
				const availableLineElement =
					mediaAvailableLineElementResponseFactory.build();
				const { wrapper, notifierModule } = getWrapper({
					element: availableLineElement,
				});

				useExternalToolLaunchStateMock.error.value =
					businessErrorFactory.build();

				return {
					wrapper,
					availableLineElement,
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
