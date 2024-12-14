import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	VIDEO_CONFERENCE_MODULE_KEY,
} from "@/utils/inject";

import { videoConferenceElementResponseFactory } from "@@/tests/test-utils/factory/videoConferenceElementResponseFactory";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useContentElementState,
} from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { shallowMount } from "@vue/test-utils";
import { computed, ref } from "vue";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	ConfigResponse,
	VideoConferenceElementContent,
	VideoConferenceScope,
} from "@/serverApi/v3/api";
import VideoConferenceContentElementDisplay from "./VideoConferenceContentElementDisplay.vue";
import VideoConferenceContentElementCreate from "./VideoConferenceContentElementCreate.vue";
import { videoConferenceElementContentFactory } from "@@/tests/test-utils/factory/videoConferenceElementContentFactory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
} from "@ui-board";
import { VideoConferenceContentElement } from "@feature-board-video-conference-element";
import AuthModule from "@/store/auth";
import VideoConferenceModule from "@/store/video-conference";
import EnvConfigModule from "@/store/env-config";
import { Router, useRoute, useRouter } from "vue-router";
import { VideoConferenceState } from "@/store/types/video-conference";
import { VDialog } from "vuetify/lib/components/index.mjs";

jest.mock("@data-board/ContentElementState.composable");
jest.mock("@data-board/BoardFocusHandler.composable");
jest.mock("@data-board/BoardPermissions.composable");

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;
const useRouteMock = <jest.Mock>useRoute;
useRouteMock.mockReturnValue({ params: { id: "room-id" } });

const mockedUseContentElementState = jest.mocked(useContentElementState);

let defaultElement = videoConferenceElementResponseFactory.build();
const mockedEnvConfigModule = createModuleMocks(EnvConfigModule, {
	getEnv: createMock<ConfigResponse>({
		FEATURE_VIDEOCONFERENCE_ENABLED: true,
	}),
});

describe("VideoConferenceContentElement", () => {
	let router: DeepMocked<Router>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;
	let useBoardFocusHandlerMock: DeepMocked<
		ReturnType<typeof useBoardFocusHandler>
	>;
	let useBoardPermissionsMock: DeepMocked<
		ReturnType<typeof useBoardPermissions>
	>;

	beforeEach(() => {
		route = createMock<ReturnType<typeof useRoute>>();
		useRouteMock.mockReturnValue(route);
		useRouteMock.mockReturnValue({ params: { id: "room-id" } });

		router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		useBoardFocusHandlerMock =
			createMock<ReturnType<typeof useBoardFocusHandler>>();
		useBoardPermissionsMock = createMock<
			ReturnType<typeof useBoardPermissions>
		>({
			isTeacher: true,
			hasMovePermission: false,
			hasCreateCardPermission: false,
			hasCreateColumnPermission: false,
			hasEditPermission: false,
			hasDeletePermission: false,
			isStudent: false,
		});

		jest.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);

		jest.mocked(useBoardPermissions).mockReturnValue(useBoardPermissionsMock);
		defaultElement = videoConferenceElementResponseFactory.build();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const setupWrapper = (
		options: {
			content?: VideoConferenceElementContent;
			isEditMode: boolean;
			role?: "teacher" | "student";
			columnIndex?: number;
			rowIndex?: number;
			elementIndex?: number;
			videoConferenceModuleGetter?: Partial<VideoConferenceModule>;
		} = {
			content: undefined,
			isEditMode: true,
			role: "teacher",
			columnIndex: 0,
			rowIndex: 1,
			elementIndex: 2,
		}
	) => {
		const {
			content,
			isEditMode,
			role = "teacher",
			columnIndex = 0,
			rowIndex = 1,
			elementIndex = 2,
			videoConferenceModuleGetter,
		} = options;

		const element = {
			...defaultElement,
			content: videoConferenceElementContentFactory.build({
				title: undefined,
				...content,
			}),
		};

		mockedUseContentElementState.mockReturnValue({
			modelValue: ref(element.content),
			computedElement: computed(() => element),
			isLoading: ref(false),
		});

		const notifierModule = createModuleMocks(NotifierModule);
		const authModule = createModuleMocks(AuthModule, {
			getUserRoles: [role],
		});

		const videoConferenceModule = createModuleMocks(VideoConferenceModule, {
			getVideoConferenceInfo: {
				state: VideoConferenceState.NOT_STARTED,
				options: {
					everyAttendeeJoinsMuted: false,
					moderatorMustApproveJoinRequests: false,
					everybodyJoinsAsModerator: false,
				},
			},
			getLoading: false,
			...videoConferenceModuleGetter,
		});

		const wrapper = shallowMount(VideoConferenceContentElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: mockedEnvConfigModule,
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[VIDEO_CONFERENCE_MODULE_KEY.valueOf()]: videoConferenceModule,
				},
			},
			props: {
				element,
				isEditMode,
				columnIndex,
				rowIndex,
				elementIndex,
			},
		});

		return {
			element,
			videoConferenceModule,
			wrapper,
		};
	};

	describe("when video conference element is displayed", () => {
		describe("and content title is undefined", () => {
			it("should not render display of video conference content", () => {
				const { wrapper } = setupWrapper({
					isEditMode: false,
				});

				const videoConferenceElementDisplay = wrapper.findComponent(
					VideoConferenceContentElementDisplay
				);

				expect(videoConferenceElementDisplay.exists()).toBe(false);
			});

			it("should not render video conference element menu", () => {
				const { wrapper } = setupWrapper({
					isEditMode: false,
				});

				const videoConferenceElementMenu = wrapper.findComponent(BoardMenu);

				expect(videoConferenceElementMenu.exists()).toBe(false);
			});
		});

		describe("and content title is defined", () => {
			it("should render display of video conference content with correct props", () => {
				const videoConferenceElementContent =
					videoConferenceElementContentFactory.build({ title: "test-title" });
				const { wrapper, element } = setupWrapper({
					content: videoConferenceElementContent,
					isEditMode: false,
				});

				const videoConferenceElementDisplay = wrapper.findComponent(
					VideoConferenceContentElementDisplay
				);

				expect(videoConferenceElementDisplay.props().title).toEqual(
					element.content.title
				);
				expect(videoConferenceElementDisplay.props().isEditMode).toEqual(false);
				expect(videoConferenceElementDisplay.props().canStart).toEqual(true);
				expect(
					videoConferenceElementDisplay.props().hasParticipationPermission
				).toEqual(true);
				expect(videoConferenceElementDisplay.props().isRunning).toEqual(false);
			});

			it("should have the correct aria-label", () => {
				const videoConferenceElementContent =
					videoConferenceElementContentFactory.build();
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContent,
					isEditMode: false,
				});

				const videoConferenceElement = wrapper.findComponent(
					'[data-testid="video-conference-element"]'
				);

				expect(videoConferenceElement.attributes("aria-label")).toEqual(
					"components.cardElement.videoConferenceElement, common.ariaLabel.newTab"
				);
			});

			describe("and element is in edit mode", () => {
				it.each(["up", "down"])(
					"should 'emit move-keyboard:edit' when arrow key %s is pressed",
					async (key) => {
						const videoConferenceElementContent =
							videoConferenceElementContentFactory.build();
						const { wrapper } = setupWrapper({
							content: videoConferenceElementContent,
							isEditMode: true,
						});

						const videoConferenceElement = wrapper.findComponent(
							'[data-testid="video-conference-element"]'
						);

						await videoConferenceElement.trigger(`keydown.${key}`);

						expect(wrapper.emitted()).toHaveProperty("move-keyboard:edit");
					}
				);
			});

			describe("and element is in view mode", () => {
				it.each(["up", "down"])(
					"should not 'emit move-keyboard:edit' when arrow key %s is pressed",
					async (key) => {
						const videoConferenceElementContent =
							videoConferenceElementContentFactory.build();
						const { wrapper } = setupWrapper({
							content: videoConferenceElementContent,
							isEditMode: false,
						});

						const videoConferenceElement = wrapper.findComponent(
							'[data-testid="video-conference-element"]'
						);

						await videoConferenceElement.trigger(`keydown.${key}`);

						expect(wrapper.emitted()).not.toHaveProperty("move-keyboard:edit");
					}
				);
			});

			describe("video conference element menu", () => {
				it("should render video conference element menu", () => {
					const videoConferenceElementContent =
						videoConferenceElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContent,
						isEditMode: true,
					});

					const videoConferenceElementMenu = wrapper.findComponent(BoardMenu);

					expect(videoConferenceElementMenu.exists()).toBe(true);
				});

				it("should emit 'move-down:edit' event when move down menu item is clicked", async () => {
					const videoConferenceElementContent =
						videoConferenceElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContent,
						isEditMode: true,
					});

					const menuItem = wrapper.findComponent(BoardMenuActionMoveDown);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-down:edit");
				});

				it("should emit 'move-up:edit' event when move up menu item is clicked", async () => {
					const videoConferenceElementContent =
						videoConferenceElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContent,
						isEditMode: true,
					});

					const menuItem = wrapper.findComponent(BoardMenuActionMoveUp);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-up:edit");
				});

				it("should emit 'delete:element' event when delete menu item is clicked", async () => {
					const videoConferenceElementContent =
						videoConferenceElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContent,
						isEditMode: true,
					});

					const menuItem = wrapper.findComponent(BoardMenuActionDelete);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("delete:element");
				});
			});

			describe("onElementClick", () => {
				describe("and video conference is not running", () => {
					it("should open the configuration dialog", async () => {
						const { wrapper } = setupWrapper({
							content: videoConferenceElementContentFactory.build(),
							isEditMode: false,
						});

						const videoConferenceElementDisplay = wrapper.findComponent(
							VideoConferenceContentElementDisplay
						);
						await videoConferenceElementDisplay.vm.$emit("click");

						const configurationDialog = wrapper.findComponent<typeof VDialog>(
							'[data-testid="videoconference-config-dialog"]'
						);

						expect(configurationDialog.props("modelValue")).toBe(true);
					});
				});

				describe("and video conference is running", () => {
					it("should call joinVideoConference", async () => {
						const { element, videoConferenceModule, wrapper } = setupWrapper({
							content: videoConferenceElementContentFactory.build(),
							isEditMode: false,
							videoConferenceModuleGetter: {
								getVideoConferenceInfo: {
									state: VideoConferenceState.RUNNING,
									options: {
										everyAttendeeJoinsMuted: false,
										moderatorMustApproveJoinRequests: false,
										everybodyJoinsAsModerator: false,
									},
								},
								getLoading: true,
							},
						});

						const videoConferenceElementDisplay = wrapper.findComponent(
							VideoConferenceContentElementDisplay
						);
						await videoConferenceElementDisplay.vm.$emit("click");

						expect(
							videoConferenceModule.joinVideoConference
						).toHaveBeenCalledWith({
							scope: VideoConferenceScope.VideoConferenceElement,
							scopeId: element.id,
						});
					});
				});
			});

			describe("onRefresh", () => {
				it("should call fetchVideoConferenceInfo", async () => {
					const { element, videoConferenceModule, wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
					});

					const videoConferenceElementDisplay = wrapper.findComponent(
						VideoConferenceContentElementDisplay
					);
					await videoConferenceElementDisplay.vm.$emit("refresh");

					expect(
						videoConferenceModule.fetchVideoConferenceInfo
					).toHaveBeenCalledWith({
						scope: VideoConferenceScope.VideoConferenceElement,
						scopeId: element.id,
					});
				});
			});
		});
	});

	describe("when video conference element is being created", () => {
		describe("and no title was entered", () => {
			it("should hide video conference element in view mode", () => {
				const { wrapper } = setupWrapper({
					isEditMode: false,
				});

				const videoConferenceElement = wrapper.findComponent(
					'[data-testid="video-conference-element"]'
				);

				expect(videoConferenceElement.attributes("class")).toContain("d-none");
			});

			it("should not render video conference element menu in view mode", () => {
				const { wrapper } = setupWrapper({
					isEditMode: false,
				});

				const videoConferenceElementMenu = wrapper.findComponent(BoardMenu);

				expect(videoConferenceElementMenu.exists()).toBe(false);
			});
		});

		describe("and element is in edit mode", () => {
			it("should render VideoConferenceContentElementCreate component", () => {
				const { wrapper } = setupWrapper({ isEditMode: true });

				const videoConferenceCreateComponent = wrapper.findComponent(
					VideoConferenceContentElementCreate
				);

				expect(videoConferenceCreateComponent.exists()).toBe(true);
			});

			it.each(["up", "down"])(
				"should not 'emit move-keyboard:edit' when arrow key %s is pressed",
				async (key) => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
					});

					const videoConferenceElement = wrapper.findComponent(
						'[data-testid="video-conference-element"]'
					);

					await videoConferenceElement.trigger(`keydown.${key}`);

					expect(wrapper.emitted()).not.toHaveProperty("move-keyboard:edit");
				}
			);

			describe("video conference element menu", () => {
				it("should render video conference element menu", () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
					});

					const videoConferenceElementMenu = wrapper.findComponent(BoardMenu);

					expect(videoConferenceElementMenu.exists()).toBe(true);
				});

				it("should emit 'move-down:edit' event when move down menu item is clicked", async () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
					});

					const menuItem = wrapper.findComponent(BoardMenuActionMoveDown);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-down:edit");
				});

				it("should emit 'move-up:edit' event when move up menu item is clicked", async () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
					});

					const menuItem = wrapper.findComponent(BoardMenuActionMoveUp);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-up:edit");
				});

				it("should emit 'delete:element' event when delete menu item is clicked", async () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
					});

					const menuItem = wrapper.findComponent(BoardMenuActionDelete);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("delete:element");
				});
			});
		});

		describe("onCreateTitle", () => {
			describe("and title was provided", () => {
				it("should display the title ", async () => {
					const videoConferenceTitle = "Very specific vc title";
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build({
							title: videoConferenceTitle,
						}),
						isEditMode: false,
					});

					expect(wrapper.html()).toEqual(
						expect.stringContaining(videoConferenceTitle)
					);
				});
			});
		});
	});
	describe("when a videoconference is started or joined", () => {
		describe("and an error occurs", () => {
			it("should display an error dialog", async () => {
				const error = jest.fn(() => {
					throw new Error();
				});
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContentFactory.build(),
					isEditMode: false,
					videoConferenceModuleGetter: {
						getError: error,
					},
				});

				const videoConferenceElement = wrapper.findComponent(
					'[data-testid="video-conference-element"]'
				);
				await videoConferenceElement.trigger("click");

				const dialog = wrapper.findComponent({
					ref: "vDialog",
				});

				expect(dialog.props("modelValue")).toBe(true);
			});
		});

		describe("and no error occurs", () => {
			it("should not display an error dialog", async () => {
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContentFactory.build(),
					isEditMode: false,
					videoConferenceModuleGetter: {
						getError: null,
					},
				});

				const videoConferenceElement = wrapper.findComponent(
					'[data-testid="video-conference-element"]'
				);
				await videoConferenceElement.trigger("click");

				const dialog = wrapper.findComponent({
					ref: "vDialog",
				});

				expect(dialog.props("modelValue")).toBe(false);
			});
		});
	});
});
