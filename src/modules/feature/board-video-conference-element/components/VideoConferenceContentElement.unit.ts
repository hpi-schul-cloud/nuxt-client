import VideoConferenceContentElementCreate from "./VideoConferenceContentElementCreate.vue";
import VideoConferenceContentElementDisplay from "./VideoConferenceContentElementDisplay.vue";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import { createTestAppStore, mockComposable } from "@@/tests/test-utils";
import { videoConferenceElementContentFactory } from "@@/tests/test-utils/factory/videoConferenceElementContentFactory";
import { videoConferenceElementResponseFactory } from "@@/tests/test-utils/factory/videoConferenceElementResponseFactory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoleName, VideoConferenceElementContent, VideoConferenceStateResponse } from "@api-server";
import { useVideoConference } from "@data-access";
import { useBoardFeatures, useBoardFocusHandler, useContentElementState } from "@data-board";
import { VideoConferenceContentElement } from "@feature-board-video-conference-element";
import { createTestingPinia } from "@pinia/testing";
import { BoardMenu } from "@ui-board";
import { SvsDialog } from "@ui-dialog";
import { KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed, ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("@data-board/ContentElementState.composable");
vi.mock("@data-board/BoardFocusHandler.composable");
vi.mock("@data-access");
vi.mock("@data-board/BoardFeatures.composable");

vi.mocked(useBoardFeatures).mockImplementation(() => ({
	isFeatureEnabled: vi.fn().mockReturnValue(true),
}));

const mockedUseContentElementState = vi.mocked(useContentElementState);

let defaultElement = videoConferenceElementResponseFactory.build();

describe("VideoConferenceContentElement", () => {
	window.open = vi.fn();

	let useBoardFocusHandlerMock: Mocked<ReturnType<typeof useBoardFocusHandler>>;

	beforeEach(() => {
		const { router } = injectRouterMock(createRouterMock());
		router.setParams({ id: "room-id" });

		useBoardFocusHandlerMock = mockComposable(useBoardFocusHandler);
		vi.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);

		defaultElement = videoConferenceElementResponseFactory.build();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const createAuthTestUser = (userId: string, roleName: RoleName) => {
		createTestAppStore({
			me: {
				roles: [{ id: userId, name: roleName }],
				user: { id: userId },
			},
		});
	};

	const setupWrapper = (options: {
		content?: VideoConferenceElementContent;
		isEditMode: boolean;
		isNotFirstElement?: boolean;
		isNotLastElement?: boolean;
		role?: RoleName;
		columnIndex?: number;
		rowIndex?: number;
		elementIndex?: number;
		isConferenceRunning?: boolean;
		fetchError?: Error;
		startError?: Error;
		joinError?: Error;
		hasManageVideoConferencePermission?: boolean;
	}) => {
		const {
			content,
			isEditMode = true,
			isNotFirstElement,
			isNotLastElement,
			role = RoleName.TEACHER,
			columnIndex = 0,
			rowIndex = 1,
			elementIndex = 2,
			isConferenceRunning = false,
			fetchError,
			startError,
			joinError,
			hasManageVideoConferencePermission = false,
		} = options;

		setActivePinia(createTestingPinia());

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

		const useVideoConferenceMock = mockComposable(useVideoConference, {
			videoConferenceInfo: ref({
				state: VideoConferenceStateResponse.NOT_STARTED,
				options: {
					everyAttendeeJoinsMuted: false,
					everybodyJoinsAsModerator: false,
					moderatorMustApproveJoinRequests: true,
				},
			}),
			isLoading: computed(() => false),
			fetchError: ref(fetchError),
			startError: ref(startError),
			joinError: ref(joinError),
			isConferenceRunning: computed(() => isConferenceRunning),
			isWaitingRoomActive: computed(() => true),
			fetchVideoConferenceInfo: vi.fn().mockResolvedValue(undefined),
			startVideoConference: vi.fn().mockResolvedValue(undefined),
			joinVideoConference: vi.fn().mockResolvedValue({
				success: true,
				result: { data: { url: "https://example.com" } },
			}),
		});

		vi.mocked(useVideoConference).mockReturnValue(useVideoConferenceMock);

		const wrapper = mount(VideoConferenceContentElement, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							boardStore: {
								board: {
									allowedOperations: { manageVideoConference: hasManageVideoConferencePermission },
								},
							},
						},
						stubActions: false,
					}),
				],
				provide: {
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

		createAuthTestUser("test-user-id", role);

		return { element, useVideoConferenceMock, wrapper };
	};

	describe("when rendered in view mode", () => {
		describe("and content title is undefined", () => {
			it("should not render display of video conference content", () => {
				const { wrapper } = setupWrapper({ isEditMode: false });

				const videoConferenceElementDisplay = wrapper.findComponent(VideoConferenceContentElementDisplay);

				expect(videoConferenceElementDisplay.exists()).toBe(false);
			});

			it("should hide video conference element", () => {
				const { wrapper } = setupWrapper({ isEditMode: false });

				const videoConferenceElement = wrapper.findComponent('[data-testid="video-conference-element"]');

				expect(videoConferenceElement.attributes("class")).toContain("d-none");
			});

			it("should not render video conference element menu", () => {
				const { wrapper } = setupWrapper({ isEditMode: false });

				const videoConferenceElementMenu = wrapper.findComponent(BoardMenu);

				expect(videoConferenceElementMenu.exists()).toBe(false);
			});
		});

		describe("and content title is defined", () => {
			it("should render display of video conference content with correct props", () => {
				const videoConferenceElementContent = videoConferenceElementContentFactory.build({ title: "test-title" });
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContent,
					isEditMode: false,
				});

				const videoConferenceElementDisplay = wrapper.findComponent(VideoConferenceContentElementDisplay);

				expect(videoConferenceElementDisplay.exists()).toBe(true);
			});

			it("should have the correct aria-label", () => {
				const videoConferenceElementContent = videoConferenceElementContentFactory.build({ title: "test-title" });
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContent,
					isEditMode: false,
				});

				const videoConferenceElement = wrapper.findComponent('[data-testid="video-conference-element"]');

				expect(videoConferenceElement.attributes("aria-label")).toEqual(
					"components.cardElement.videoConferenceElement, common.ariaLabel.newTab"
				);
			});

			it("should render the title", () => {
				const videoConferenceTitle = "Very specific vc title";
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContentFactory.build({ title: videoConferenceTitle }),
					isEditMode: false,
				});

				expect(wrapper.html()).toEqual(expect.stringContaining(videoConferenceTitle));
			});

			describe("when user has manage video conference permission", () => {
				const localSetup = (
					options: {
						content?: VideoConferenceElementContent;
						isEditMode?: boolean;
						role?: RoleName;
						hasManageVideoConferencePermission?: boolean;
					} = {}
				) =>
					setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
						role: RoleName.TEACHER,
						hasManageVideoConferencePermission: true,
						...options,
					});

				it("should have the permission to join the conference", async () => {
					const { wrapper } = localSetup({ hasManageVideoConferencePermission: true });

					const videoConferenceElement = wrapper.getComponent(VideoConferenceContentElementDisplay);

					expect(videoConferenceElement.props("hasParticipationPermission")).toEqual(true);
				});

				it("should have the permission to start the conference", () => {
					const { wrapper } = localSetup();

					const videoConferenceElement = wrapper.getComponent(VideoConferenceContentElementDisplay);

					expect(videoConferenceElement.props("canStart")).toEqual(true);
				});

				it("should have tabindex of 0", () => {
					const { wrapper } = localSetup();

					const videoConferenceElement = wrapper.findComponent('[data-testid="video-conference-element"]');

					expect(videoConferenceElement.attributes("tabindex")).toEqual("0");
				});
			});

			describe("when the user does not have manage video conference permission", () => {
				it("should have the permission to join the conference", async () => {
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
						role: RoleName.STUDENT,
						hasManageVideoConferencePermission: false,
					});

					const videoConferenceElement = wrapper.getComponent(VideoConferenceContentElementDisplay);
					await flushPromises();

					expect(videoConferenceElement.props("hasParticipationPermission")).toEqual(true);
				});

				it("should not have the permission to start the conference", async () => {
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
						role: RoleName.STUDENT,
						hasManageVideoConferencePermission: false,
					});

					const videoConferenceElement = wrapper.getComponent(VideoConferenceContentElementDisplay);

					expect(videoConferenceElement.props("canStart")).toEqual(false);
				});

				it("should have undefined tabindex if conference has not started", () => {
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
						role: RoleName.STUDENT,
						isConferenceRunning: false,
						hasManageVideoConferencePermission: false,
					});

					const videoConferenceElement = wrapper.findComponent('[data-testid="video-conference-element"]');

					expect(videoConferenceElement.attributes("tabindex")).toEqual(undefined);
				});

				it("should have tabindex of 0 if conference has started", () => {
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
						role: RoleName.STUDENT,
						isConferenceRunning: true,
						hasManageVideoConferencePermission: false,
					});

					const videoConferenceElement = wrapper.findComponent('[data-testid="video-conference-element"]');

					expect(videoConferenceElement.attributes("tabindex")).toEqual("0");
				});
			});

			describe("when the user is an external person", () => {
				it("should have participation permission when waiting room is active", async () => {
					const { wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
						role: RoleName.EXTERNAL_PERSON,
						hasManageVideoConferencePermission: false,
					});

					await flushPromises();
					const videoConferenceElement = wrapper.getComponent(VideoConferenceContentElementDisplay);

					expect(videoConferenceElement.props("hasParticipationPermission")).toEqual(true);
				});
			});

			describe("and element is in view mode", () => {
				describe.each(["up", "down"])("and arrow key %s is pressed", (key) => {
					it("should not emit 'move-keyboard:edit'", async () => {
						const videoConferenceElementContent = videoConferenceElementContentFactory.build();
						const { wrapper } = setupWrapper({
							content: videoConferenceElementContent,
							isEditMode: false,
						});

						const videoConferenceElement = wrapper.findComponent('[data-testid="video-conference-element"]');
						await videoConferenceElement.trigger(`keydown.${key}`);

						expect(wrapper.emitted()).not.toHaveProperty("move-keyboard:edit");
					});
				});
			});

			describe("when display element was clicked", () => {
				describe("and video conference is not running and user can start", () => {
					it("should open the configuration dialog", async () => {
						const { wrapper } = setupWrapper({
							content: videoConferenceElementContentFactory.build(),
							isEditMode: false,
							isConferenceRunning: false,
							hasManageVideoConferencePermission: true,
						});

						const videoConferenceElementDisplay = wrapper.getComponent(VideoConferenceContentElementDisplay);
						await videoConferenceElementDisplay.vm.$emit("click");
						await flushPromises();

						const configurationDialog = wrapper.findComponent({
							name: "VideoConferenceConfigurationDialog",
						});

						expect(configurationDialog.props("isOpen")).toBe(true);
					});
				});

				describe("and video conference is running", () => {
					it("should call fetchVideoConferenceInfo", async () => {
						const { useVideoConferenceMock, wrapper } = setupWrapper({
							content: videoConferenceElementContentFactory.build(),
							isEditMode: false,
							isConferenceRunning: true,
						});

						const videoConferenceElementDisplay = wrapper.findComponent(VideoConferenceContentElementDisplay);
						await videoConferenceElementDisplay.vm.$emit("click");
						await flushPromises();

						expect(useVideoConferenceMock.fetchVideoConferenceInfo).toHaveBeenCalled();
					});
				});
			});

			describe("when video conference is refreshed", () => {
				it("should call fetchVideoConferenceInfo", () => {
					const { useVideoConferenceMock, wrapper } = setupWrapper({
						content: videoConferenceElementContentFactory.build(),
						isEditMode: false,
					});

					const videoConferenceElementDisplay = wrapper.findComponent(VideoConferenceContentElementDisplay);
					videoConferenceElementDisplay.vm.$emit("refresh");

					expect(useVideoConferenceMock.fetchVideoConferenceInfo).toHaveBeenCalledTimes(2);
				});
			});
		});
	});

	describe("when a videoconference is started or joined", () => {
		describe("and an error occurs", () => {
			it("should display an error dialog when fetchError is set", async () => {
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContentFactory.build(),
					isEditMode: false,
					fetchError: new Error("fetch error"),
				});

				const dialog = wrapper.findComponent(SvsDialog);
				await flushPromises();

				expect(dialog.props("modelValue")).toBe(true);
			});

			it("should display an error dialog when startError is set", async () => {
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContentFactory.build(),
					isEditMode: false,
					startError: new Error("start error"),
				});

				const dialog = wrapper.findComponent(SvsDialog);
				await flushPromises();

				expect(dialog.props("modelValue")).toBe(true);
			});

			it("should display an error dialog when joinError is set", async () => {
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContentFactory.build(),
					isEditMode: false,
					joinError: new Error("join error"),
				});

				const dialog = wrapper.findComponent(SvsDialog);
				await flushPromises();

				expect(dialog.props("modelValue")).toBe(true);
			});

			it("should dismiss the error dialog when dismissed", async () => {
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContentFactory.build(),
					isEditMode: false,
					fetchError: new Error("fetch error"),
				});

				const dialog = wrapper.findComponent(SvsDialog);
				await flushPromises();
				expect(dialog.props("modelValue")).toBe(true);

				dialog.vm.$emit("cancel");
				await flushPromises();

				expect(dialog.props("modelValue")).toBe(false);
			});
		});

		describe("and no error occurs", () => {
			it("should not display an error dialog", async () => {
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContentFactory.build(),
					isEditMode: false,
				});

				const videoConferenceElement = wrapper.findComponent('[data-testid="video-conference-element"]');
				await videoConferenceElement.trigger("click");

				const dialog = wrapper.findComponent(SvsDialog);
				expect(dialog.props("modelValue")).toBe(false);
			});
		});
	});

	describe("when video conference feature is disabled", () => {
		it("should not call fetchVideoConferenceInfo on mount", async () => {
			vi.mocked(useBoardFeatures).mockImplementation(() => ({
				isFeatureEnabled: vi.fn().mockReturnValue(false),
			}));

			const { useVideoConferenceMock } = setupWrapper({
				content: videoConferenceElementContentFactory.build(),
				isEditMode: false,
			});

			await flushPromises();

			expect(useVideoConferenceMock.fetchVideoConferenceInfo).not.toHaveBeenCalled();

			vi.mocked(useBoardFeatures).mockImplementation(() => ({
				isFeatureEnabled: vi.fn().mockReturnValue(true),
			}));
		});
	});

	describe("when rendered in edit mode", () => {
		describe("and the conference is not running", () => {
			it("should render the create component when no title exists", () => {
				const { wrapper } = setupWrapper({ isEditMode: true });

				const videoConferenceCreateComponent = wrapper.findComponent(VideoConferenceContentElementCreate);
				const videoConferenceElementDisplay = wrapper.findComponent(VideoConferenceContentElementDisplay);

				expect(videoConferenceCreateComponent.exists()).toBe(true);
				expect(videoConferenceElementDisplay.exists()).toBe(false);
			});

			it("should render the create component with an existing title", () => {
				const videoConferenceTitle = "Existing conference title";
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContentFactory.build({ title: videoConferenceTitle }),
					isEditMode: true,
				});

				const videoConferenceCreateComponent = wrapper.getComponent(VideoConferenceContentElementCreate);
				const videoConferenceElementDisplay = wrapper.findComponent(VideoConferenceContentElementDisplay);

				expect(videoConferenceCreateComponent.props("existingTitle")).toEqual(videoConferenceTitle);
				expect(videoConferenceElementDisplay.exists()).toBe(false);
			});

			it("should render the video conference element menu", () => {
				const { wrapper } = setupWrapper({ isEditMode: true });

				const videoConferenceElementMenu = wrapper.findComponent(BoardMenu);

				expect(videoConferenceElementMenu.exists()).toBe(true);
			});

			describe.each(["up", "down"])("and arrow key %s is pressed", (key) => {
				it("should emit 'move-keyboard:edit'", async () => {
					const { wrapper } = setupWrapper({ isEditMode: true });

					const videoConferenceElement = wrapper.findComponent('[data-testid="video-conference-element"]');
					await videoConferenceElement.trigger(`keydown.${key}`);

					expect(wrapper.emitted()).toHaveProperty("move-keyboard:edit");
				});
			});

			describe("menu actions", () => {
				it("should not render move-up when element is first", () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
						isNotFirstElement: false,
					});

					const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);

					expect(menuItem.exists()).toBe(false);
				});

				it("should emit 'move-up:edit' when move up is clicked", async () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
						isNotFirstElement: true,
					});

					const menuBtn = wrapper.getComponent({ name: "BoardMenu" }).getComponent({ name: "VBtn" });
					await menuBtn.trigger("click");

					const menuItem = wrapper.getComponent(KebabMenuActionMoveUp);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-up:edit");
				});

				it("should not render move-down when element is last", () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
						isNotLastElement: false,
					});

					const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);

					expect(menuItem.exists()).toBe(false);
				});

				it("should emit 'move-down:edit' when move down is clicked", async () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
						isNotLastElement: true,
					});

					const menuBtn = wrapper.getComponent({ name: "BoardMenu" }).getComponent({ name: "VBtn" });
					await menuBtn.trigger("click");

					const menuItem = wrapper.getComponent(KebabMenuActionMoveDown);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-down:edit");
				});

				it("should emit 'delete:element' when delete is clicked", async () => {
					vi.spyOn(confirmDialogUtils, "askDeletionForType").mockResolvedValue(true);
					const { wrapper } = setupWrapper({ isEditMode: true });

					const menuBtn = wrapper.findComponent({ name: "BoardMenu" }).findComponent({ name: "VBtn" });
					await menuBtn.trigger("click");

					const menuItem = wrapper.findComponent(KebabMenuActionDelete);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("delete:element");
				});
			});
		});

		describe("and the conference is running", () => {
			it("should only render the display component", () => {
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContentFactory.build({ title: "test-title" }),
					isEditMode: true,
					isConferenceRunning: true,
				});

				const videoConferenceCreateComponent = wrapper.findComponent(VideoConferenceContentElementCreate);
				const videoConferenceElementDisplay = wrapper.findComponent(VideoConferenceContentElementDisplay);

				expect(videoConferenceCreateComponent.exists()).toBe(false);
				expect(videoConferenceElementDisplay.exists()).toBe(true);
			});

			it("should keep the card focusable", () => {
				const { wrapper } = setupWrapper({
					content: videoConferenceElementContentFactory.build({ title: "test-title" }),
					isEditMode: true,
					isConferenceRunning: true,
				});

				const videoConferenceElement = wrapper.findComponent('[data-testid="video-conference-element"]');

				expect(videoConferenceElement.attributes("tabindex")).toEqual("0");
			});
		});
	});

	describe("onStartVideoConference", () => {
		it("should start the video conference and join it", async () => {
			const { wrapper, useVideoConferenceMock } = setupWrapper({
				content: videoConferenceElementContentFactory.build(),
				isEditMode: false,
				hasManageVideoConferencePermission: true,
				isConferenceRunning: false,
			});

			const configDialog = wrapper.findComponent({ name: "VideoConferenceConfigurationDialog" });
			configDialog.vm.$emit("start-video-conference");
			await flushPromises();

			expect(useVideoConferenceMock.startVideoConference).toHaveBeenCalled();
			expect(useVideoConferenceMock.joinVideoConference).toHaveBeenCalled();
		});

		it("should not join when start fails", async () => {
			const { wrapper, useVideoConferenceMock } = setupWrapper({
				content: videoConferenceElementContentFactory.build(),
				isEditMode: false,
				hasManageVideoConferencePermission: true,
				isConferenceRunning: false,
				startError: new Error("start failed"),
			});

			const configDialog = wrapper.findComponent({ name: "VideoConferenceConfigurationDialog" });
			configDialog.vm.$emit("start-video-conference");
			await flushPromises();

			expect(useVideoConferenceMock.startVideoConference).toHaveBeenCalled();
			expect(useVideoConferenceMock.joinVideoConference).not.toHaveBeenCalled();
		});

		it("should close the configuration dialog after starting", async () => {
			const { wrapper } = setupWrapper({
				content: videoConferenceElementContentFactory.build(),
				isEditMode: false,
				hasManageVideoConferencePermission: true,
				isConferenceRunning: false,
			});

			const configDialog = wrapper.findComponent({ name: "VideoConferenceConfigurationDialog" });
			configDialog.vm.$emit("start-video-conference");
			await flushPromises();

			expect(configDialog.props("isOpen")).toBe(false);
		});
	});

	describe("onContentEnter", () => {
		it("should delegate to onContentClick when not in edit mode", async () => {
			const { wrapper, useVideoConferenceMock } = setupWrapper({
				content: videoConferenceElementContentFactory.build(),
				isEditMode: false,
			});

			const videoConferenceElement = wrapper.findComponent('[data-testid="video-conference-element"]');
			await videoConferenceElement.trigger("keyup.enter");
			await flushPromises();

			expect(useVideoConferenceMock.fetchVideoConferenceInfo).toHaveBeenCalled();
		});

		it("should not call onContentClick when in edit mode", async () => {
			const { wrapper, useVideoConferenceMock } = setupWrapper({
				content: videoConferenceElementContentFactory.build(),
				isEditMode: true,
			});

			useVideoConferenceMock.fetchVideoConferenceInfo.mockClear();

			const videoConferenceElement = wrapper.findComponent('[data-testid="video-conference-element"]');
			await videoConferenceElement.trigger("keyup.enter");
			await flushPromises();

			expect(useVideoConferenceMock.fetchVideoConferenceInfo).not.toHaveBeenCalled();
		});
	});
});
