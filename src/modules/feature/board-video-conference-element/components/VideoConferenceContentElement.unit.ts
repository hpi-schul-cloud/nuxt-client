import { VideoConferenceElementContent } from "@/serverApi/v3/api";
import AuthModule from "@/store/auth";
import { VideoConferenceState } from "@/store/types/video-conference";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { videoConferenceElementContentFactory } from "@@/tests/test-utils/factory/videoConferenceElementContentFactory";
import { videoConferenceElementResponseFactory } from "@@/tests/test-utils/factory/videoConferenceElementResponseFactory";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	useBoardFeatures,
	useBoardFocusHandler,
	useBoardPermissions,
	useContentElementState,
} from "@data-board";
import { VideoConferenceContentElement } from "@feature-board-video-conference-element";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { BoardMenu } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { flushPromises } from "@vue/test-utils";
import { computed, ref } from "vue";
import { Router, useRoute, useRouter } from "vue-router";
import { useVideoConference } from "../composables/VideoConference.composable";
import VideoConferenceContentElementCreate from "./VideoConferenceContentElementCreate.vue";
import VideoConferenceContentElementDisplay from "./VideoConferenceContentElementDisplay.vue";
import { Mock } from "vitest";

vi.mock("@data-board/ContentElementState.composable");
vi.mock("@data-board/BoardFocusHandler.composable");
vi.mock("@data-board/BoardPermissions.composable");
vi.mock("../composables/VideoConference.composable");

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;
const useRouteMock = <Mock>useRoute;
useRouteMock.mockReturnValue({ params: { id: "room-id" } });

vi.mock("@data-board/BoardFeatures.composable");
vi.mocked(useBoardFeatures).mockImplementation(() => {
	return {
		isFeatureEnabled: vi.fn().mockReturnValue(true),
	};
});

const mockedUseContentElementState = vi.mocked(useContentElementState);

let defaultElement = videoConferenceElementResponseFactory.build();

describe("VideoConferenceContentElement", () => {
	window.open = vi.fn();

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
		vi.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);

		defaultElement = videoConferenceElementResponseFactory.build();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setupWrapper = (
		options: {
			content?: VideoConferenceElementContent;
			isEditMode: boolean;
			isNotFirstElement?: boolean;
			isNotLastElement?: boolean;
			role?: "teacher" | "student";
			columnIndex?: number;
			rowIndex?: number;
			elementIndex?: number;
			isRunning?: boolean;
			error?: Error | null;
			hasManageVideoConferencePermission?: boolean;
		} = {
			content: undefined,
			isEditMode: true,
			role: "teacher",
			columnIndex: 0,
			rowIndex: 1,
			elementIndex: 2,
			hasManageVideoConferencePermission: false,
		}
	) => {
		const {
			content,
			isEditMode,
			isNotFirstElement,
			isNotLastElement,
			role = "teacher",
			columnIndex = 0,
			rowIndex = 1,
			elementIndex = 2,
			isRunning = false,
			error = null,
			hasManageVideoConferencePermission = false,
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
		});

		const useVideoConferenceMock: DeepMocked<
			ReturnType<typeof useVideoConference>
		> = createMock<ReturnType<typeof useVideoConference>>();

		vi.mocked(useVideoConference).mockReturnValue(useVideoConferenceMock);

		useVideoConferenceMock.fetchVideoConferenceInfo.mockImplementation(vi.fn());
		useVideoConferenceMock.joinVideoConference.mockImplementation(() =>
			Promise.resolve("https://example.com")
		);
		useVideoConferenceMock.videoConferenceInfo = ref({
			state: VideoConferenceState.NOT_STARTED,
			options: {
				everyAttendeeJoinsMuted: false,
				everybodyJoinsAsModerator: false,
				moderatorMustApproveJoinRequests: true,
			},
		});
		useVideoConferenceMock.isRunning = computed(() => isRunning);
		useVideoConferenceMock.error = ref(error);

		const authModule = createModuleMocks(AuthModule, {
			getUserRoles: [role],
		});

		useBoardPermissionsMock = createMock<
			ReturnType<typeof useBoardPermissions>
		>({
			hasManageVideoConferencePermission: ref(
				hasManageVideoConferencePermission
			),
			isTeacher: ref(role === "teacher"),
			isStudent: ref(role === "student"),
		});

		vi.mocked(useBoardPermissions).mockReturnValue(useBoardPermissionsMock);

		const wrapper = mount(VideoConferenceContentElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[BOARD_IS_LIST_LAYOUT as symbol]: false,
				},
				stubs: {
					VideoConferenceConfigurationDialog: true,
					VideoConferenceContentElementDisplay: true,
				},
			},
			props: {
				element,
				isEditMode,
				columnIndex,
				rowIndex,
				elementIndex,
				isNotFirstElement,
				isNotLastElement,
			},
		});

		return {
			element,
			useVideoConferenceMock,
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
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContent,
					isEditMode: false,
				});

				const videoConferenceElementDisplay = wrapper.findComponent(
					VideoConferenceContentElementDisplay
				);

				expect(videoConferenceElementDisplay.exists()).toBe(true);
			});

			it("should have the correct aria-label", () => {
				const videoConferenceElementContent =
					videoConferenceElementContentFactory.build({ title: "test-title" });
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

			describe("when user has manage video conference permission", () => {
				const localSetup = (
					options: {
						content?: VideoConferenceElementContent;
						isEditMode: boolean;
						role: "teacher" | "student";
						hasManageVideoConferencePermission: boolean;
					} = {
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
						role: "teacher",
						hasManageVideoConferencePermission: true,
					}
				) => {
					return setupWrapper({
						...options,
					});
				};
				it("should have the permission to join the conference", async () => {
					const { wrapper } = localSetup();

					const videoConferenceElement = wrapper.getComponent(
						VideoConferenceContentElementDisplay
					);

					expect(
						videoConferenceElement.props("hasParticipationPermission")
					).toEqual(true);
				});

				it("should have the permission to start the conference", async () => {
					const { wrapper } = localSetup();

					const videoConferenceElement = wrapper.getComponent(
						VideoConferenceContentElementDisplay
					);

					expect(videoConferenceElement.props("canStart")).toEqual(true);
				});

				it("should have tabindex of 0", () => {
					const { wrapper } = localSetup();
					const videoConferenceElement = wrapper.findComponent(
						'[data-testid="video-conference-element"]'
					);

					expect(videoConferenceElement.attributes("tabindex")).toEqual("0");
				});
			});

			describe("when the user does not have manage video conference permission", () => {
				it("should have the permission to join the conference", async () => {
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
						role: "student",
						hasManageVideoConferencePermission: false,
					});

					const videoConferenceElement = wrapper.getComponent(
						VideoConferenceContentElementDisplay
					);

					expect(
						videoConferenceElement.props("hasParticipationPermission")
					).toEqual(true);
				});

				it("should not have the permission to start the conference", () => {
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
						role: "student",
						hasManageVideoConferencePermission: false,
					});

					const videoConferenceElement = wrapper.getComponent(
						VideoConferenceContentElementDisplay
					);

					expect(videoConferenceElement.props("canStart")).toEqual(false);
				});

				it("should have undefined tabindex if conference has not started", () => {
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
						role: "student",
						isRunning: false,
						hasManageVideoConferencePermission: false,
					});
					const videoConferenceElement = wrapper.findComponent(
						'[data-testid="video-conference-element"]'
					);

					expect(videoConferenceElement.attributes("tabindex")).toEqual(
						undefined
					);
				});

				it("should have tabindex of 0 if conference has started", () => {
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
						role: "student",
						isRunning: true,
						hasManageVideoConferencePermission: false,
					});
					const videoConferenceElement = wrapper.findComponent(
						'[data-testid="video-conference-element"]'
					);

					expect(videoConferenceElement.attributes("tabindex")).toEqual("0");
				});
			});

			describe("and element is in edit mode", () => {
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

				describe("when element is first element", () => {
					describe("and move up menu item is clicked", () => {
						it("should emit 'move-up:edit' event", () => {
							const videoConferenceElementContent =
								videoConferenceElementContentFactory.build();
							const { wrapper } = setupWrapper({
								content: videoConferenceElementContent,
								isEditMode: true,
								isNotFirstElement: false,
							});

							const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);

							expect(menuItem.exists()).toBe(false);
						});
					});
				});

				describe("when element is not first element", () => {
					describe("and move up menu item is clicked", () => {
						it("should emit 'move-up:edit' event", async () => {
							const videoConferenceElementContent =
								videoConferenceElementContentFactory.build();
							const { wrapper } = setupWrapper({
								content: videoConferenceElementContent,
								isEditMode: true,
								isNotFirstElement: true,
							});

							const menuBtn = wrapper
								.findComponent({ name: "BoardMenu" })
								.findComponent({ name: "VBtn" });
							await menuBtn.trigger("click");

							const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);
							await menuItem.trigger("click");

							expect(wrapper.emitted()).toHaveProperty("move-up:edit");
						});
					});
				});

				describe("when element is last element", () => {
					describe("and move down menu item is clicked", () => {
						it("should emit 'move-down:edit' event ", () => {
							const videoConferenceElementContent =
								videoConferenceElementContentFactory.build();
							const { wrapper } = setupWrapper({
								content: videoConferenceElementContent,
								isEditMode: true,
								isNotLastElement: false,
							});

							const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);

							expect(menuItem.exists()).toBe(false);
						});
					});
				});

				describe("when element is not last element", () => {
					describe("and move down menu item is clicked", () => {
						it("should emit 'move-down:edit' event ", async () => {
							const videoConferenceElementContent =
								videoConferenceElementContentFactory.build();
							const { wrapper } = setupWrapper({
								content: videoConferenceElementContent,
								isEditMode: true,
								isNotLastElement: true,
							});

							const menuBtn = wrapper
								.findComponent({ name: "BoardMenu" })
								.findComponent({ name: "VBtn" });
							await menuBtn.trigger("click");

							const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);
							await menuItem.trigger("click");

							expect(wrapper.emitted()).toHaveProperty("move-down:edit");
						});
					});
				});

				describe("and delete menu item is clicked", () => {
					it("should emit 'delete:element' event", async () => {
						const videoConferenceElementContent =
							videoConferenceElementContentFactory.build();
						const { wrapper } = setupWrapper({
							content: videoConferenceElementContent,
							isEditMode: true,
						});

						const menuBtn = wrapper
							.findComponent({ name: "BoardMenu" })
							.findComponent({ name: "VBtn" });
						await menuBtn.trigger("click");

						const menuItem = wrapper.findComponent(KebabMenuActionDelete);
						menuItem.vm.$emit("click", Promise.resolve(true));
						await flushPromises();

						expect(wrapper.emitted()).toHaveProperty("delete:element");
					});
				});
			});

			describe("and element is in view mode", () => {
				describe.each(["up", "down"])("and arrow key %s is pressed", (key) => {
					it("should not 'emit move-keyboard:edit'", async () => {
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
					});
				});
			});

			describe("when display element was clicked", () => {
				describe("and video conference is not running", () => {
					it("should open the configuration dialog", async () => {
						const { wrapper } = setupWrapper({
							content: videoConferenceElementContentFactory.build(),
							isEditMode: false,
							isRunning: false,
						});

						const videoConferenceElementDisplay = wrapper.getComponent(
							VideoConferenceContentElementDisplay
						);
						videoConferenceElementDisplay.vm.$emit("click");
						await flushPromises();

						const configurationDialog = wrapper.findComponent({
							name: "VideoConferenceConfigurationDialog",
						});

						expect(configurationDialog.exists()).toBe(true);
					});
				});

				describe("and video conference is running", () => {
					it("should call joinVideoConference", async () => {
						const { useVideoConferenceMock, wrapper } = setupWrapper({
							content: videoConferenceElementContentFactory.build(),
							isEditMode: false,
							isRunning: true,
						});

						const videoConferenceElementDisplay = wrapper.findComponent(
							VideoConferenceContentElementDisplay
						);
						videoConferenceElementDisplay.vm.$emit("click");
						await flushPromises();

						expect(
							useVideoConferenceMock.joinVideoConference
						).toHaveBeenCalledTimes(1);
					});
				});
			});

			describe("when video conference is refreshed", () => {
				it("should call fetchVideoConferenceInfo", () => {
					const { useVideoConferenceMock, wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
					});

					const videoConferenceElementDisplay = wrapper.findComponent(
						VideoConferenceContentElementDisplay
					);
					videoConferenceElementDisplay.vm.$emit("refresh");

					expect(
						useVideoConferenceMock.fetchVideoConferenceInfo
					).toHaveBeenCalledTimes(2);
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
					const { wrapper } = setupWrapper({ isEditMode: true });
					const videoConferenceElement = wrapper.findComponent(
						'[data-testid="video-conference-element"]'
					);

					await videoConferenceElement.trigger(`keydown.${key}`);

					expect(wrapper.emitted()).not.toHaveProperty("move-keyboard:edit");
				}
			);

			describe("when video conference element menu is clicked", () => {
				it("should render video conference element menu", () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
					});
					const videoConferenceElementMenu = wrapper.findComponent(BoardMenu);

					expect(videoConferenceElementMenu.exists()).toBe(true);
				});

				describe("and element is first element", () => {
					it("should hide 'move-up' menu item", () => {
						const { wrapper } = setupWrapper({
							isEditMode: true,
							isNotFirstElement: false,
						});

						const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);

						expect(menuItem.exists()).toBe(false);
					});
				});

				describe("and element is not first element", () => {
					describe("and move up menu item is clicked", () => {
						it("should emit 'move-up:edit' event", async () => {
							const { wrapper } = setupWrapper({
								isEditMode: true,
								isNotFirstElement: true,
							});

							const menuBtn = wrapper
								.getComponent({ name: "BoardMenu" })
								.getComponent({ name: "VBtn" });
							await menuBtn.trigger("click");

							const menuItem = wrapper.getComponent(KebabMenuActionMoveUp);
							await menuItem.trigger("click");
							const emitted = wrapper.emitted();
							expect(emitted).toHaveProperty("move-up:edit");
						});
					});
				});

				describe("and element is last element", () => {
					describe("and move down menu item is clicked", () => {
						it("should emit 'move-down:edit' event", () => {
							const { wrapper } = setupWrapper({
								isEditMode: true,
								isNotLastElement: false,
							});

							const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);

							expect(menuItem.exists()).toBe(false);
						});
					});
				});

				describe("and element is not last element", () => {
					describe("and move down menu item is clicked", () => {
						it("should emit 'move-down:edit' event", async () => {
							const { wrapper } = setupWrapper({
								isEditMode: true,
								isNotLastElement: true,
							});

							const menuBtn = wrapper
								.getComponent({ name: "BoardMenu" })
								.getComponent({ name: "VBtn" });
							await menuBtn.trigger("click");

							const menuItem = wrapper.getComponent(KebabMenuActionMoveDown);
							await menuItem.trigger("click");

							expect(wrapper.emitted()).toHaveProperty("move-down:edit");
						});
					});
				});

				describe("and delete menu item is clicked", () => {
					it("should emit 'delete:element' event", async () => {
						const { wrapper } = setupWrapper({
							isEditMode: true,
						});

						const menuBtn = wrapper
							.findComponent({ name: "BoardMenu" })
							.findComponent({ name: "VBtn" });
						await menuBtn.trigger("click");

						const menuItem = wrapper.findComponent(KebabMenuActionDelete);
						menuItem.vm.$emit("click", Promise.resolve(true));
						await flushPromises();

						expect(wrapper.emitted()).toHaveProperty("delete:element");
					});
				});
			});
		});

		describe("onCreateTitle", () => {
			describe("and title was provided", () => {
				it("should display the title ", () => {
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
				const { wrapper, useVideoConferenceMock } = setupWrapper({
					content: videoConferenceElementContentFactory.build(),
					isEditMode: false,
				});

				const videoConferenceElement = wrapper.findComponent(
					'[data-testid="video-conference-element"]'
				);
				await videoConferenceElement.trigger("click");

				useVideoConferenceMock.error.value = new Error("error");
				await flushPromises();

				const dialog = wrapper.findComponent({
					ref: "errorDialog",
				});

				expect(dialog.props("modelValue")).toBe(true);
			});
		});

		describe("and no error occurs", () => {
			it("should not display an error dialog", async () => {
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContentFactory.build(),
					isEditMode: false,
				});

				const videoConferenceElement = wrapper.findComponent(
					'[data-testid="video-conference-element"]'
				);
				await videoConferenceElement.trigger("click");

				const dialog = wrapper.findComponent({
					ref: "errorDialog",
				});

				expect(dialog.props("modelValue")).toBe(false);
			});
		});
	});
});
